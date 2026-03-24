import { brandingConfig } from "./branding.config";
import { catalogConfig } from "./catalog.config";
import { commerceConfig } from "./commerce.config";
import { integrationsConfig } from "./integrations.config";
import type { StoreConfig } from "./store.types";

export type {
  BrandingConfig,
  CatalogConfig,
  CategoryConfig,
  CategoryPageConfig,
  CategoryPageCopy,
  CommerceConfig,
  CurrencyPosition,
  IntegrationsConfig,
  PaymentsConfig,
  PaymentMode,
  PaystackChargeBearer,
  StoreConfig,
} from "./store.types";

export const storeConfig: StoreConfig = {
  storeName: brandingConfig.storeName,
  storeTagline: brandingConfig.storeTagline,
  logoUrl: brandingConfig.logoUrl,
  faviconUrl: brandingConfig.faviconUrl,
  defaultThemePreset: brandingConfig.defaultThemePreset,
  contact: brandingConfig.contact,
  socials: brandingConfig.socials,
  currency: brandingConfig.currency,
  features: commerceConfig.features,
  categories: catalogConfig.categories,
  categoryPage: catalogConfig.categoryPage,
  payments: commerceConfig.payments,
  styleSyncs: integrationsConfig.styleSyncs,
};

export const storeKeyPrefix = storeConfig.storeName
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "_")
  .replace(/^_+|_+$/g, "");
