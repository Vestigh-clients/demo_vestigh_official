import { describe, expect, it } from "vitest";
import { resolveActiveThemePreset } from "@/themes/registry";

describe("resolveActiveThemePreset", () => {
  it("returns the fallback preset when no preset key is provided", () => {
    const result = resolveActiveThemePreset(undefined, "atelier");

    expect(result.key).toBe("atelier");
    expect(result.preset.key).toBe("atelier");
  });

  it("returns the fallback preset when the requested preset key is invalid", () => {
    const result = resolveActiveThemePreset("unknown-preset", "sandstone");

    expect(result.key).toBe("sandstone");
    expect(result.preset.key).toBe("sandstone");
  });

  it("returns the requested preset when it is valid", () => {
    const result = resolveActiveThemePreset("sandstone", "atelier");

    expect(result.key).toBe("sandstone");
    expect(result.preset.label).toBe("Sandstone");
  });
});
