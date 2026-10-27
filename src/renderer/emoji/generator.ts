import type { EmojiConfig, PixelGrid } from '../../types.ts';
import { stampPart } from '../generator.ts';
import {
  EMOJI_SYMBOLS,
  EMOJI_PRESETS,
  EMOJI_PRESET_NAMES,
  EMOJI_COLOR_ROLES,
  getEmojiPart,
} from '../parts/emoji/index.ts';
import { resolveSkinColor, resolveSkinShadow, resolveSkinHighlight } from '../palette.ts';

const BASE_SIZE = 16;

function buildColorMap(color: string): Record<string, string> {
  const skin = resolveSkinColor(color);
  return {
    ...EMOJI_COLOR_ROLES,
    body: skin,
    highlight: resolveSkinHighlight(skin),
    shadow: resolveSkinShadow(skin),
  };
}

const LAYER_ORDER: { category: string; configKey: keyof EmojiConfig }[] = [
  { category: 'eyes', configKey: 'eyes' },
  { category: 'eyebrows', configKey: 'eyebrows' },
  { category: 'nose', configKey: 'nose' },
  { category: 'mouth', configKey: 'mouth' },
  { category: 'accessories', configKey: 'accessories' },
];

export function generateEmojiGrid(config: EmojiConfig = EMOJI_PRESETS[0]!): PixelGrid {
  const grid: PixelGrid = Array.from({ length: BASE_SIZE }, () =>
    Array.from({ length: BASE_SIZE }, () => null)
  );

  const colorMap = buildColorMap(config.color);
  const base = getEmojiPart('color', 'round');
  if (base) {
    stampPart(grid, base, colorMap);
  }

  for (const layer of LAYER_ORDER) {
    const name = config[layer.configKey];
    if (!name || name === 'none') continue;

    const part = getEmojiPart(layer.category, name);
    if (!part) continue;

    stampPart(grid, part, colorMap);
  }

  for (const row of grid) {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === '#00000000') row[x] = null;
    }
  }

  return grid;
}

export function generateEmojiPartThumbnail(
  category: string,
  name: string,
  color?: string
): PixelGrid {
  const grid: PixelGrid = Array.from({ length: BASE_SIZE }, () =>
    Array.from({ length: BASE_SIZE }, () => null)
  );

  const selectedColor = category === 'color' ? name : color ?? 'yellow';
  const colorMap = buildColorMap(selectedColor);
  const partName = category === 'color' ? 'round' : name;
  const part = getEmojiPart(category, partName);
  if (part) {
    stampPart(grid, part, colorMap);
  }

  return grid;
}

export function generateEmojiSymbolGrid(index: number | string): PixelGrid | undefined {
  const name = typeof index === 'number' ? EMOJI_PRESET_NAMES[index] : index;
  if (!Object.prototype.hasOwnProperty.call(EMOJI_SYMBOLS, name)) return undefined;

  const grid: PixelGrid = Array.from({ length: BASE_SIZE }, () =>
    Array.from({ length: BASE_SIZE }, () => null)
  );

  const part = EMOJI_SYMBOLS[name];
  stampPart(grid, part, EMOJI_COLOR_ROLES);
  return grid;
}
