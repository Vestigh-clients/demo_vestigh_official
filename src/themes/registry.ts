import { atelierThemePreset } from "./atelier/preset";
import { sandstoneThemePreset } from "./sandstone/preset";

export const themePresetKeys = ["atelier", "sandstone"] as const;
export type ThemePresetKey = (typeof themePresetKeys)[number];

export interface ThemeTokens {
  canvas: string;
  surface: string;
  surfaceAlt: string;
  surfaceStrong: string;
  textPrimary: string;
  textMuted: string;
  textInverse: string;
  border: string;
  borderStrong: string;
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  success: string;
  successForeground: string;
  danger: string;
  dangerForeground: string;
  navSolidBg: string;
  navSolidFg: string;
  navSolidInteractive: string;
  focusRing: string;
  shadowSoft: string;
}

export interface ThemeTypography {
  headingFamily: string;
  bodyFamily: string;
  headingFallback: string;
  bodyFallback: string;
}

export interface ThemeRadiusScale {
  sm: string;
  md: string;
  lg: string;
  pill: string;
}

export interface ThemePreset {
  key: ThemePresetKey;
  label: string;
  description: string;
  tokens: ThemeTokens;
  typography: ThemeTypography;
  radius: ThemeRadiusScale;
}

export const themePresets: Record<ThemePresetKey, ThemePreset> = {
  atelier: atelierThemePreset,
  sandstone: sandstoneThemePreset,
};

export const themePresetOptions = themePresetKeys.map((key) => ({
  key,
  label: themePresets[key].label,
}));

export const isThemePresetKey = (value: string): value is ThemePresetKey => {
  return Object.prototype.hasOwnProperty.call(themePresets, value);
};

export const resolveActiveThemePreset = (
  requestedKey: string | null | undefined,
  fallbackKey: ThemePresetKey,
): { key: ThemePresetKey; preset: ThemePreset } => {
  const normalizedKey = requestedKey?.trim().toLowerCase();
  if (normalizedKey && isThemePresetKey(normalizedKey)) {
    return {
      key: normalizedKey,
      preset: themePresets[normalizedKey],
    };
  }

  return {
    key: fallbackKey,
    preset: themePresets[fallbackKey],
  };
};
