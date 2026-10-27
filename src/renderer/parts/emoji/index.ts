import type { PartCategory, PartPattern } from '../../../types.ts';
import color from './color.ts';
import eyes from './eyes.ts';
import eyebrows from './eyebrows.ts';
import nose from './nose.ts';
import mouth from './mouth.ts';
import accessories from './accessories.ts';
import symbols from './symbols.ts';

export const EMOJI_PARTS: Record<string, PartCategory> = {
  color,
  eyes,
  eyebrows,
  nose,
  mouth,
  accessories,
};

export const EMOJI_SYMBOLS = symbols;
export { EMOJI_COLOR_ROLES } from './palette.ts';
export { EMOJI_PRESETS, EMOJI_PRESET_NAMES } from './presets.ts';

export function getEmojiPart(category: string, name: string): PartPattern | undefined {
  if (!Object.prototype.hasOwnProperty.call(EMOJI_PARTS, category)) return undefined;
  const parts = EMOJI_PARTS[category];
  if (!Object.prototype.hasOwnProperty.call(parts, name)) return undefined;
  return parts[name];
}
