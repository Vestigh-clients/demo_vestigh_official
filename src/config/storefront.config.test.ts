import { describe, expect, it } from "vitest";
import { resolveStorefrontConfig } from "@/config/storefront.config";
import { storeConfig } from "@/config/store.config";

describe("resolveStorefrontConfig", () => {
  it("falls back to static branding config when no public settings are available", () => {
    const result = resolveStorefrontConfig();

    expect(result.storeName).toBe(storeConfig.storeName);
    expect(result.themePresetKey).toBe(storeConfig.defaultThemePreset);
  });

  it("uses public site settings when they are available", () => {
    const result = resolveStorefrontConfig({
      siteName: "Runtime Store",
      siteTagline: "Runtime tagline",
      supportEmail: "runtime@example.com",
      supportPhone: "0200000000",
      whatsappNumber: "0200000000",
      siteThemePreset: "sandstone",
    });

    expect(result.storeName).toBe("Runtime Store");
    expect(result.storeTagline).toBe("Runtime tagline");
    expect(result.contact.email).toBe("runtime@example.com");
    expect(result.contact.phone).toBe("0200000000");
    expect(result.contact.whatsapp).toBe("0200000000");
    expect(result.themePresetKey).toBe("sandstone");
  });

  it("falls back to the configured default preset when the public preset key is invalid", () => {
    const result = resolveStorefrontConfig({
      siteThemePreset: "not-a-real-preset",
    });

    expect(result.themePresetKey).toBe(storeConfig.defaultThemePreset);
  });
});
