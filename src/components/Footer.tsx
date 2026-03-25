import { Facebook, Instagram, Mail, MessageCircle, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import StoreLogo from "@/components/StoreLogo";
import { contentConfig } from "@/config/content.config";
import { useStorefrontConfig } from "@/contexts/StorefrontConfigContext";
import { buildWhatsAppContactLink } from "@/lib/contact";

type FooterActionLink = {
  label: string;
  href: string;
  icon: typeof Instagram;
};

const isExternalHref = (href: string) => /^(?:https?:|mailto:|tel:)/i.test(href);

const Footer = () => {
  const { storefrontConfig } = useStorefrontConfig();

  const actionLinks: FooterActionLink[] = [
    {
      label: "Instagram",
      href: storefrontConfig.socials.instagram.trim(),
      icon: Instagram,
    },
    {
      label: "Facebook",
      href: storefrontConfig.socials.facebook.trim(),
      icon: Facebook,
    },
    {
      label: "Twitter",
      href: storefrontConfig.socials.twitter.trim(),
      icon: Twitter,
    },
    {
      label: "Email",
      href: storefrontConfig.contact.email.trim() ? `mailto:${storefrontConfig.contact.email.trim()}` : "",
      icon: Mail,
    },
    {
      label: "WhatsApp",
      href: storefrontConfig.contact.whatsapp.trim()
        ? buildWhatsAppContactLink(storefrontConfig.storeName, storefrontConfig.contact.whatsapp.trim())
        : "",
      icon: MessageCircle,
    },
  ].filter((entry) => Boolean(entry.href));

  const renderFooterLink = (link: { label: string; href: string }) => {
    if (isExternalHref(link.href)) {
      return (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-sm text-[rgba(207,226,249,0.64)] transition-colors hover:text-[var(--theme-nav-solid-interactive)]"
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link
        key={link.href}
        to={link.href}
        className="font-body text-sm text-[rgba(207,226,249,0.64)] transition-colors hover:text-[var(--theme-nav-solid-interactive)]"
      >
        {link.label}
      </Link>
    );
  };

  return (
    <footer className="bg-[var(--theme-nav-solid-bg)] text-white">
      <div className="mx-auto max-w-[1600px] px-6 py-14 lg:px-8">
        <div className="flex flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[320px]">
            <StoreLogo className="h-9 w-auto" textClassName="text-[1.2rem] font-bold tracking-[-0.03em] text-white" />
            <p className="mt-2 font-body text-sm tracking-[0.08em] text-[rgba(207,226,249,0.56)]">{storefrontConfig.storeTagline}</p>
            <p className="mt-4 font-body text-sm leading-7 text-[rgba(207,226,249,0.72)]">{contentConfig.footer.description}</p>
            <p className="mt-6 font-body text-xs tracking-[0.08em] text-[rgba(207,226,249,0.56)]">
              © {new Date().getFullYear()} {storefrontConfig.storeName}. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 md:gap-14">
            <div className="min-w-[150px]">
              <h4 className="mb-4 font-body text-[11px] uppercase tracking-[0.18em] text-[rgba(207,226,249,0.72)]">Shop</h4>
              <div className="flex flex-col gap-3">{contentConfig.footer.shopLinks.map(renderFooterLink)}</div>
            </div>

            <div className="min-w-[150px]">
              <h4 className="mb-4 font-body text-[11px] uppercase tracking-[0.18em] text-[rgba(207,226,249,0.72)]">Company</h4>
              <div className="flex flex-col gap-3">{contentConfig.footer.companyLinks.map(renderFooterLink)}</div>
            </div>
          </div>

          {actionLinks.length > 0 ? (
            <div className="flex items-center gap-3">
              {actionLinks.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={action.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/56 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    <Icon size={18} strokeWidth={1.7} />
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
