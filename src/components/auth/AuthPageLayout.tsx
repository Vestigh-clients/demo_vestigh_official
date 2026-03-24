import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import StoreLogo from "@/components/StoreLogo";
import { contentConfig } from "@/config/content.config";
import { useStorefrontConfig } from "@/contexts/StorefrontConfigContext";
import { cn } from "@/lib/utils";

interface AuthPageLayoutProps {
  children: ReactNode;
  contentClassName?: string;
}

const AuthPageLayout = ({ children, contentClassName }: AuthPageLayoutProps) => {
  const { storefrontConfig } = useStorefrontConfig();

  return (
    <div className="min-h-screen bg-[var(--color-secondary)]">
      <aside className="fixed inset-y-0 left-0 hidden w-1/2 overflow-hidden md:block">
        <img
          src={contentConfig.auth.panelImageUrl}
          alt={`${storefrontConfig.storeName} ${contentConfig.auth.panelImageAlt.toLowerCase()}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--color-primary-rgb),0.3),rgba(var(--color-primary-rgb),0.5))]" />

        <div className="absolute bottom-10 left-10">
          <StoreLogo className="h-12 w-auto" textClassName="text-[32px] text-white" />
          <p className="mt-2 font-body text-[12px] text-[rgba(var(--color-secondary-rgb),0.7)]">{storefrontConfig.storeTagline}</p>
        </div>
      </aside>

      <section className="min-h-screen overflow-y-auto md:ml-[50%]">
        <div className={cn("mx-auto flex min-h-screen w-full max-w-[400px] flex-col justify-center px-6 py-10 md:px-10 md:py-[60px]", contentClassName)}>
          <Link
            to="/"
            className="mb-10 text-center font-display text-[30px] italic text-[var(--color-primary)] md:hidden"
          >
            <StoreLogo className="mx-auto h-11 w-auto" textClassName="text-[30px] text-[var(--color-primary)]" />
          </Link>

          {children}
        </div>
      </section>
    </div>
  );
};

export default AuthPageLayout;
