import type { EmojiConfig } from '../../types.ts';
import { generateEmojiGrid, generateEmojiPartThumbnail } from './generator.ts';
import { gridToSvg } from '../svg.ts';
import { EMOJI_PARTS } from '../parts/emoji/index.ts';
import { SKIN_PRESETS } from '../palette.ts';

export { generateEmojiGrid, generateEmojiSymbolGrid } from './generator.ts';

export function generateEmoji(config?: EmojiConfig): string {
  const grid = generateEmojiGrid(config);
  return gridToSvg(grid, config?.backgroundColor ?? 'transparent');
}

export function getAvailableEmojiParts(): Record<string, string[]> {
  return {
    color: Object.keys(SKIN_PRESETS),
    eyes: ['none', ...Object.keys(EMOJI_PARTS.eyes)],
    eyebrows: ['none', ...Object.keys(EMOJI_PARTS.eyebrows)],
    nose: ['none', ...Object.keys(EMOJI_PARTS.nose)],
    mouth: ['none', ...Object.keys(EMOJI_PARTS.mouth)],
    accessories: ['none', ...Object.keys(EMOJI_PARTS.accessories)],
  };
}

export function getEmojiPartThumbnail(category: string, name: string, color?: string): string {
  const grid = generateEmojiPartThumbnail(category, name, color);
  return gridToSvg(grid);
}
