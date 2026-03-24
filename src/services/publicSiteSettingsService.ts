import { supabase } from "@/integrations/supabase/client";

const PUBLIC_SITE_SETTING_KEYS = [
  "site_name",
  "site_tagline",
  "support_email",
  "support_phone",
  "whatsapp_number",
  "site_theme_preset",
] as const;

export interface PublicSiteSettings {
  siteName?: string;
  siteTagline?: string;
  supportEmail?: string;
  supportPhone?: string;
  whatsappNumber?: string;
  siteThemePreset?: string;
}

export const fetchPublicSiteSettings = async (): Promise<PublicSiteSettings> => {
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", [...PUBLIC_SITE_SETTING_KEYS]);

  if (error) {
    throw error;
  }

  const values = new Map((data ?? []).map((row) => [row.key, typeof row.value === "string" ? row.value.trim() : ""]));

  return {
    siteName: values.get("site_name") || undefined,
    siteTagline: values.get("site_tagline") || undefined,
    supportEmail: values.get("support_email") || undefined,
    supportPhone: values.get("support_phone") || undefined,
    whatsappNumber: values.get("whatsapp_number") || undefined,
    siteThemePreset: values.get("site_theme_preset") || undefined,
  };
};
