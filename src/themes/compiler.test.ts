import { describe, expect, it } from "vitest";
import { compileThemeVars } from "@/themes/compiler";
import { atelierThemePreset } from "@/themes/atelier/preset";

describe("compileThemeVars", () => {
  it("emits semantic theme variables and compatibility variables", () => {
    const vars = compileThemeVars(atelierThemePreset);

    expect(vars["--theme-primary"]).toBe("#05101D");
    expect(vars["--theme-accent"]).toBe("#4E6073");
    expect(vars["--theme-button-primary-bg"]).toBe("#05101D");
    expect(vars["--theme-button-primary-hover-bg"]).toBe("#1A2533");
    expect(vars["--theme-button-outline-hover-fg"]).toBe("#FFFFFF");
    expect(vars["--theme-heading-font"]).toContain("Noto Serif");
    expect(vars["--theme-body-font"]).toContain("Inter");
    expect(vars["--theme-radius-md"]).toBe("0.25rem");
    expect(vars["--color-primary"]).toBe("#05101D");
    expect(vars["--color-accent-rgb"]).toBe("78, 96, 115");
    expect(vars["--background"]).toBe("210 17% 98%");
    expect(vars["--ring"]).toBe("211 19% 38%");
  });
});
