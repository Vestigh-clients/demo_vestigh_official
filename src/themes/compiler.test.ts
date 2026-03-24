import { describe, expect, it } from "vitest";
import { compileThemeVars } from "@/themes/compiler";
import { atelierThemePreset } from "@/themes/atelier/preset";

describe("compileThemeVars", () => {
  it("emits semantic theme variables and compatibility variables", () => {
    const vars = compileThemeVars(atelierThemePreset);

    expect(vars["--theme-primary"]).toBe("#243843");
    expect(vars["--theme-accent"]).toBe("#4A5D66");
    expect(vars["--theme-heading-font"]).toContain("Playfair Display");
    expect(vars["--theme-body-font"]).toContain("Inter");
    expect(vars["--theme-radius-md"]).toBe("0.75rem");
    expect(vars["--color-primary"]).toBe("#243843");
    expect(vars["--color-accent-rgb"]).toBe("74, 93, 102");
    expect(vars["--background"]).toBe("0 0% 100%");
    expect(vars["--ring"]).toBe("199 16% 35%");
  });
});
