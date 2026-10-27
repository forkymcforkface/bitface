export const SKIN_PRESETS: Record<string, string> = {
  light: '#FDDCB5',
  medium: '#E8B88A',
  tan: '#D19A6A',
  brown: '#A0673C',
  dark: '#6B4226',
  pale: '#FFF0E0',
  yellow: '#F7CC50',
  cyan: '#5FCDE4',
  white: '#FFFFFF',
  purple: '#AA5BC8',
  green: '#6ABE30',
  red: '#F20F24',
};

export const SKIN_SHADOW_MAP: Record<string, string> = {
  '#FDDCB5': '#E5C49D',
  '#E8B88A': '#CFA072',
  '#D19A6A': '#B98252',
  '#A0673C': '#885524',
  '#6B4226': '#533010',
  '#FFF0E0': '#E7D8C8',
  '#F7CC50': '#D79F36',
  '#5FCDE4': '#45B2C8',
  '#FFFFFF': '#EDEDED',
  '#AA5BC8': '#7F4296',
  '#6ABE30': '#5BA825',
  '#F20F24': '#D70D20',
};

export const SKIN_HIGHLIGHT_MAP: Record<string, string> = {
  '#F7CC50': '#FFDF83',
  '#5FCDE4': '#45B2C8',
  '#FFFFFF': '#EDEDED',
  '#AA5BC8': '#BA63DB',
  '#6ABE30': '#89E44B',
  '#F20F24': '#FF4C5C',
};

export const HAIR_PRESETS: Record<string, string> = {
  black: '#1A1A2E',
  brown: '#6B3A2A',
  blonde: '#E8C84A',
  red: '#B83A1E',
  gray: '#9E9E9E',
  white: '#E8E8E8',
  auburn: '#8B3A1A',
  strawberry: '#D4713A',
  platinum: '#E8E0D0',
  pink: '#E8559E',
  blue: '#3A6BD5',
  purple: '#6B3A8B',
  teal: '#2A9E8B',
};

export const EYE_PRESETS: Record<string, string> = {
  brown: '#5C3A1E',
  blue: '#3A7BD5',
  green: '#3A9D5C',
  gray: '#7A7A7A',
};

export const BG_PRESETS: Record<string, string> = {
  sky: '#87CEEB',
  white: '#FFFFFF',
  gray: '#888888',
  dark: '#1A1A2E',
  green: '#4CAF50',
  transparent: 'transparent',
};

const HEX_COLOR_RE = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

/** Validate that a string is a safe hex color. Returns the color or the fallback. */
export function sanitizeColor(value: string, fallback: string): string {
  if (HEX_COLOR_RE.test(value)) return value;
  return fallback;
}

export function resolveSkinColor(value: string | undefined): string {
  if (!value) return SKIN_PRESETS.medium;
  if (Object.prototype.hasOwnProperty.call(SKIN_PRESETS, value)) return SKIN_PRESETS[value];
  return sanitizeColor(value, SKIN_PRESETS.medium);
}

export function resolveSkinShadow(skinHex: string): string {
  return SKIN_SHADOW_MAP[skinHex] ?? darken(skinHex, 30);
}

export function resolveSkinHighlight(skinHex: string): string {
  return SKIN_HIGHLIGHT_MAP[skinHex] ?? skinHex;
}

export function resolveHairColor(value: string | undefined): string {
  if (!value) return HAIR_PRESETS.black;
  return HAIR_PRESETS[value] ?? sanitizeColor(value, HAIR_PRESETS.black);
}

export function resolveEyeColor(value: string | undefined): string {
  if (!value) return EYE_PRESETS.brown;
  return EYE_PRESETS[value] ?? sanitizeColor(value, EYE_PRESETS.brown);
}

function darken(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xFF) - amount);
  const b = Math.max(0, (num & 0xFF) - amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0').toUpperCase()}`;
}
