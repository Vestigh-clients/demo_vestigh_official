import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import StoreLogo from "@/components/StoreLogo";
import { contentConfig } from "@/config/content.config";
import { useStorefrontConfig } from "@/contexts/StorefrontConfigContext";
import { buildWhatsAppContactLink } from "@/lib/contact";

interface FooterSocialLink {
  label: string;
  href: string;
}

const Footer = () => {
  const { storefrontConfig } = useStorefrontConfig();

  const socialLinks: FooterSocialLink[] = [
    { label: "Instagram", href: storefrontConfig.socials.instagram },
    { label: "Facebook", href: storefrontConfig.socials.facebook },
    { label: "Twitter", href: storefrontConfig.socials.twitter },
    { label: "TikTok", href: storefrontConfig.socials.tiktok },
  ].filter((entry) => Boolean(entry.href.trim()));

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-2">
              <StoreLogo className="h-9 w-auto" textClassName="text-2xl font-bold tracking-wider text-primary-foreground" />
            </div>
            <p className="mb-3 font-body text-xs italic text-primary-foreground/60">{storefrontConfig.storeTagline}</p>
            <p className="font-body text-sm leading-relaxed text-primary-foreground/70">{contentConfig.footer.description}</p>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider">Shop</h4>
            <div className="flex flex-col gap-2">
              {contentConfig.footer.shopLinks.map((link) => (
                <Link key={link.href} to={link.href} className="font-body text-sm text-primary-foreground/70 transition-colors hover:text-accent">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider">Company</h4>
            <div className="flex flex-col gap-2">
              {contentConfig.footer.companyLinks.map((link) => (
                <Link key={link.href} to={link.href} className="font-body text-sm text-primary-foreground/70 transition-colors hover:text-accent">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider">Connect</h4>
            <div className="flex flex-col gap-3">
              {storefrontConfig.contact.whatsapp ? (
                <a
                  href={buildWhatsAppContactLink(storefrontConfig.storeName, storefrontConfig.contact.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                >
                  WhatsApp: {storefrontConfig.contact.whatsapp}
                </a>
              ) : null}
              {storefrontConfig.contact.email ? (
                <a
                  href={`mailto:${storefrontConfig.contact.email}`}
                  className="font-body text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                >
                  Email: {storefrontConfig.contact.email}
                </a>
              ) : null}
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                >
                  {social.label === "Instagram" ? <Instagram size={16} /> : null}
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-8 text-center">
          <p className="font-body text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} {storefrontConfig.storeName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
