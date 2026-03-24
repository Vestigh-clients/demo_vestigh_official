export const normalizeHex = (input: string): string => {
  const value = input.trim();
  if (/^#[0-9a-f]{6}$/i.test(value)) {
    return value.toUpperCase();
  }

  if (/^#[0-9a-f]{3}$/i.test(value)) {
    const [, r, g, b] = value;
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }

  return "#000000";
};

export const hexToRgb = (hex: string) => {
  const normalized = normalizeHex(hex).slice(1);
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return { r, g, b };
};

export const rgbToHsl = ({ r, g, b }: { r: number; g: number; b: number }): string => {
  const nr = r / 255;
  const ng = g / 255;
  const nb = b / 255;
  const max = Math.max(nr, ng, nb);
  const min = Math.min(nr, ng, nb);
  const delta = max - min;

  let hue = 0;
  if (delta !== 0) {
    if (max === nr) {
      hue = ((ng - nb) / delta) % 6;
    } else if (max === ng) {
      hue = (nb - nr) / delta + 2;
    } else {
      hue = (nr - ng) / delta + 4;
    }
  }

  hue = Math.round((hue * 60 + 360) % 360);
  const lightness = (max + min) / 2;
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  return `${hue} ${Math.round(saturation * 100)}% ${Math.round(lightness * 100)}%`;
};

export const rgbString = (hex: string): string => {
  const { r, g, b } = hexToRgb(hex);
  return `${r}, ${g}, ${b}`;
};

export const mixHex = (baseHex: string, overlayHex: string, overlayWeight: number): string => {
  const base = hexToRgb(baseHex);
  const overlay = hexToRgb(overlayHex);
  const weight = Math.min(1, Math.max(0, overlayWeight));
  const r = Math.round(base.r * (1 - weight) + overlay.r * weight);
  const g = Math.round(base.g * (1 - weight) + overlay.g * weight);
  const b = Math.round(base.b * (1 - weight) + overlay.b * weight);
  return `#${[r, g, b].map((entry) => entry.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
};

export const buildFontStack = (family: string, fallback: string): string => {
  const trimmedFamily = family.trim();
  if (!trimmedFamily) {
    return fallback;
  }

  const familyToken = /\s/.test(trimmedFamily) ? `"${trimmedFamily}"` : trimmedFamily;
  return `${familyToken}, ${fallback}`;
};
