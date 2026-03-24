import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { resolveStorefrontConfig, type ResolvedStorefrontConfig } from "@/config/storefront.config";
import { fetchPublicSiteSettings, type PublicSiteSettings } from "@/services/publicSiteSettingsService";

interface StorefrontConfigContextValue {
  storefrontConfig: ResolvedStorefrontConfig;
  publicSettings: PublicSiteSettings | null;
}

const StorefrontConfigContext = createContext<StorefrontConfigContextValue | undefined>(undefined);

export const StorefrontConfigProvider = ({ children }: { children: ReactNode }) => {
  const [publicSettings, setPublicSettings] = useState<PublicSiteSettings | null>(null);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      try {
        const data = await fetchPublicSiteSettings();
        if (isActive) {
          setPublicSettings(data);
        }
      } catch {
        if (isActive) {
          setPublicSettings(null);
        }
      }
    };

    void load();

    return () => {
      isActive = false;
    };
  }, []);

  const storefrontConfig = useMemo(() => resolveStorefrontConfig(publicSettings), [publicSettings]);

  return (
    <StorefrontConfigContext.Provider value={{ storefrontConfig, publicSettings }}>
      {children}
    </StorefrontConfigContext.Provider>
  );
};

export const useStorefrontConfig = () => {
  const context = useContext(StorefrontConfigContext);
  if (!context) {
    throw new Error("useStorefrontConfig must be used within StorefrontConfigProvider");
  }

  return context;
};
