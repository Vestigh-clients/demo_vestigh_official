import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { useStorefrontConfig } from "@/contexts/StorefrontConfigContext";
import { buildWhatsAppContactLink } from "@/lib/contact";

interface SocialCard {
  label: string;
  href: string;
  value: string;
}

const toDisplayHandle = (value: string): string => {
  if (!value) return "";
  if (value.startsWith("http")) {
    try {
      const url = new URL(value);
      return url.pathname.replace(/^\/+/, "") || url.hostname;
    } catch {
      return value;
    }
  }
  return value;
};

const Contact = () => {
  const { storefrontConfig } = useStorefrontConfig();
  const socialCards: SocialCard[] = [
    { label: "Instagram", href: storefrontConfig.socials.instagram, value: toDisplayHandle(storefrontConfig.socials.instagram) },
    { label: "Facebook", href: storefrontConfig.socials.facebook, value: toDisplayHandle(storefrontConfig.socials.facebook) },
    { label: "Twitter", href: storefrontConfig.socials.twitter, value: toDisplayHandle(storefrontConfig.socials.twitter) },
    { label: "TikTok", href: storefrontConfig.socials.tiktok, value: toDisplayHandle(storefrontConfig.socials.tiktok) },
  ].filter((entry) => Boolean(entry.href.trim()));

  return (
    <div className="container mx-auto max-w-2xl px-4 py-20">
      <h1 className="mb-4 text-center font-display text-4xl font-bold md:text-5xl">Get In Touch</h1>
      <p className="mb-12 text-center font-body text-muted-foreground">
        We&apos;d love to hear from you. Reach out through any of our channels.
      </p>

      <div className="space-y-6">
        {storefrontConfig.contact.whatsapp ? (
          <a
            href={buildWhatsAppContactLink(storefrontConfig.storeName, storefrontConfig.contact.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-success)]">
              <MessageCircle size={22} className="text-card" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">WhatsApp</h3>
              <p className="font-body text-sm text-muted-foreground">{storefrontConfig.contact.whatsapp}</p>
            </div>
          </a>
        ) : null}

        {storefrontConfig.contact.phone ? (
          <a
            href={`tel:${storefrontConfig.contact.phone}`}
            className="flex items-center gap-5 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary">
              <Phone size={22} className="text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">Phone</h3>
              <p className="font-body text-sm text-muted-foreground">{storefrontConfig.contact.phone}</p>
            </div>
          </a>
        ) : null}

        {storefrontConfig.contact.email ? (
          <a
            href={`mailto:${storefrontConfig.contact.email}`}
            className="flex items-center gap-5 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent">
              <Mail size={22} className="text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">Email</h3>
              <p className="font-body text-sm text-muted-foreground">{storefrontConfig.contact.email}</p>
            </div>
          </a>
        ) : null}

        {socialCards.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-foreground">
              <Instagram size={20} className="text-background" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">{social.label}</h3>
              <p className="font-body text-sm text-muted-foreground">{social.value}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
