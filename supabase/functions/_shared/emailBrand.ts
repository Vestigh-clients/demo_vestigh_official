import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";
import { brandingConfig } from "../../../src/config/branding.config.ts";
import { getEmailBrandSnapshot, type EmailBrandSnapshot } from "../../../src/themes/emailBrand.ts";

const EMAIL_BRANDING_SETTING_KEYS = [
  "site_name",
  "support_email",
  "site_url",
  "instagram_url",
  "tiktok_url",
  "facebook_url",
  "unsubscribe_url",
  "site_theme_preset",
] as const;

type AdminClient = ReturnType<typeof createClient>;

const asRecord = (value: unknown): Record<string, unknown> | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
};

export const safeString = (value: unknown): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : null;

export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const normalizeSiteUrl = (value: string): string => value.replace(/\/+$/, "");

const getSettingString = (value: unknown): string | null => {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  const nested = asRecord(value);
  if (!nested) {
    return null;
  }

  for (const nestedKey of ["value", "email", "address", "url"]) {
    const candidate = safeString(nested[nestedKey]);
    if (candidate) {
      return candidate;
    }
  }

  return null;
};

const joinFooterLinks = (
  links: Array<{ href: string; label: string }>,
  color: string,
): string =>
  links
    .map((link) => `<a href="${escapeHtml(link.href)}" style="color:${color};text-decoration:none;">${escapeHtml(link.label)}</a>`)
    .join("&nbsp;|&nbsp;");

export const loadEmailBranding = async (
  adminClient: AdminClient,
  {
    fallbackSiteUrl,
  }: {
    fallbackSiteUrl: string;
  },
): Promise<EmailBrandSnapshot> => {
  const normalizedFallbackSiteUrl = normalizeSiteUrl(fallbackSiteUrl);

  const { data, error } = await adminClient
    .from("site_settings")
    .select("key, value")
    .in("key", [...EMAIL_BRANDING_SETTING_KEYS]);

  if (error && !["PGRST116", "PGRST205", "42P01"].includes(error.code ?? "")) {
    console.warn("Unable to fetch email branding settings, using configured defaults", error);
  }

  const values = new Map(
    (data ?? []).map((row) => [row.key, getSettingString(asRecord(row)?.value)]),
  );

  const siteUrl = normalizeSiteUrl(
    values.get("site_url") ||
      safeString(Deno.env.get("SITE_URL")) ||
      normalizedFallbackSiteUrl,
  );

  return getEmailBrandSnapshot({
    requestedPresetKey: values.get("site_theme_preset"),
    fallbackPresetKey: brandingConfig.defaultThemePreset,
    identity: {
      storeName: values.get("site_name") || brandingConfig.storeName,
      supportEmail:
        values.get("support_email") ||
        safeString(Deno.env.get("SUPPORT_EMAIL")) ||
        brandingConfig.contact.email,
      siteUrl,
      instagramUrl:
        values.get("instagram_url") ||
        safeString(Deno.env.get("INSTAGRAM_URL")) ||
        brandingConfig.socials.instagram,
      tiktokUrl:
        values.get("tiktok_url") ||
        safeString(Deno.env.get("TIKTOK_URL")) ||
        brandingConfig.socials.tiktok,
      facebookUrl:
        values.get("facebook_url") ||
        safeString(Deno.env.get("FACEBOOK_URL")) ||
        brandingConfig.socials.facebook,
      unsubscribeUrl:
        values.get("unsubscribe_url") ||
        safeString(Deno.env.get("UNSUBSCRIBE_URL")) ||
        `${siteUrl}/unsubscribe`,
    },
  });
};

export const formatFromEmail = (displayName: string, fallbackAddress: string): string =>
  `${displayName} <${fallbackAddress}>`;

export const renderEmailShell = ({
  snapshot,
  contentHtml,
  footerNote,
}: {
  snapshot: EmailBrandSnapshot;
  contentHtml: string;
  footerNote?: string;
}): string => {
  const socialLinks = [
    snapshot.identity.instagramUrl ? { href: snapshot.identity.instagramUrl, label: "Instagram" } : null,
    snapshot.identity.tiktokUrl ? { href: snapshot.identity.tiktokUrl, label: "TikTok" } : null,
    snapshot.identity.facebookUrl ? { href: snapshot.identity.facebookUrl, label: "Facebook" } : null,
  ].filter((entry): entry is { href: string; label: string } => Boolean(entry));

  return `
    <div style="background:${snapshot.colors.canvas};padding:28px 14px;font-family:${snapshot.typography.body};">
      <div style="max-width:640px;margin:0 auto;background:${snapshot.colors.surface};border:1px solid ${snapshot.colors.border};">
        <div style="background:${snapshot.colors.primary};padding:32px;text-align:center;">
          <p style="margin:0;font-family:${snapshot.typography.heading};font-size:20px;color:${snapshot.colors.primaryForeground};letter-spacing:0.18em;text-transform:uppercase;">
            ${escapeHtml(snapshot.identity.storeName)}
          </p>
        </div>

        <div style="padding:40px;">
          ${contentHtml}
        </div>

        <div style="padding:22px 40px 34px;border-top:1px solid ${snapshot.colors.border};text-align:center;">
          ${
            footerNote
              ? `<p style="margin:0 0 10px 0;font-family:${snapshot.typography.body};font-size:10px;color:${snapshot.colors.textMuted};">${escapeHtml(
                  footerNote,
                )}</p>`
              : ""
          }
          ${
            socialLinks.length > 0
              ? `<p style="margin:0 0 8px 0;font-family:${snapshot.typography.body};font-size:10px;color:${snapshot.colors.textMuted};">${joinFooterLinks(
                  socialLinks,
                  snapshot.colors.textMuted,
                )}</p>`
              : ""
          }
          ${
            snapshot.identity.unsubscribeUrl
              ? `<p style="margin:0;font-family:${snapshot.typography.body};font-size:10px;color:${snapshot.colors.textMuted};"><a href="${escapeHtml(
                  snapshot.identity.unsubscribeUrl,
                )}" style="color:${snapshot.colors.textMuted};text-decoration:underline;">Unsubscribe</a></p>`
              : ""
          }
        </div>
      </div>
    </div>
  `;
};
