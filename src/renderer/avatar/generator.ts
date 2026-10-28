import type { PixelGrid } from '../../types.ts';
import { AVATAR_PARTS, body, getAvatarPart } from '../parts/avatar/index.ts';
import type { AvatarPart } from '../parts/avatar/types.ts';
import type { AvatarCategory, AvatarConfig, AvatarColorKey, ResolvedAvatarConfig } from './types.ts';
import { resolveAvatarConfig } from './config.ts';

type Rgba = [number, number, number, number];
type Canvas = Rgba[][];
const empty = (): Canvas => Array.from({ length: 16 }, () => Array.from({ length: 16 }, () => [0, 0, 0, 0]));

function parseColor(hex: string): Rgba {
  let digits = hex.slice(1);
  if (digits.length <= 4) digits = [...digits].map(digit => digit + digit).join('');
  if (digits.length === 6) digits += 'ff';
  return [0, 2, 4, 6].map(index => parseInt(digits.slice(index, index + 2), 16) / 255) as Rgba;
}

function over(destination: Rgba, source: Rgba, opacity: number): Rgba {
  const alpha = source[3] * opacity;
  const remaining = destination[3] * (1 - alpha);
  const combined = alpha + remaining;
  if (!combined) return [0, 0, 0, 0];
  return [
    (source[0] * alpha + destination[0] * remaining) / combined,
    (source[1] * alpha + destination[1] * remaining) / combined,
    (source[2] * alpha + destination[2] * remaining) / combined,
    combined,
  ];
}

function stamp(canvas: Canvas, part: AvatarPart, colors: Record<string, Rgba>) {
  const target = part.opacity === undefined ? canvas : empty();
  for (const layer of part.layers) {
    for (let py = 0; py < layer.pixels.length; py++) {
      for (let px = 0; px < layer.pixels[py].length; px++) {
        const slot = layer.pixels[py][px];
        if (!slot) continue;
        const role = layer.slotMap[slot];
        const color = colors[role] ?? (role.startsWith('#') ? parseColor(role) : undefined);
        const x = layer.offsetX + px, y = layer.offsetY + py;
        if (color && x >= 0 && x < 16 && y >= 0 && y < 16) {
          target[y][x] = over(target[y][x], color, layer.opacity ?? 1);
        }
      }
    }
  }
  if (part.opacity !== undefined) {
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) canvas[y][x] = over(canvas[y][x], target[y][x], part.opacity);
    }
  }
}

function colorMap(config: ResolvedAvatarConfig): Record<string, Rgba> {
  const colors: Record<string, Rgba> = {};
  for (const key of ['accessories', 'clothing', 'eyes', 'glasses', 'hair', 'hat', 'mouth', 'skin']) {
    colors[key] = parseColor(config[`${key}Color` as AvatarColorKey]);
  }
  return colors;
}

function toGrid(canvas: Canvas): PixelGrid {
  return canvas.map(row => row.map(pixel => {
    if (pixel[3] === 0) return null;
    const channels = pixel[3] >= 1 ? pixel.slice(0, 3) : pixel;
    return '#' + channels.map(value => Math.round(value * 255).toString(16).padStart(2, '0')).join('');
  }));
}

export function generateAvatarGrid(config: AvatarConfig = {}): PixelGrid {
  const resolved = resolveAvatarConfig(config);
  const colors = colorMap(resolved);
  const canvas = empty();
  stamp(canvas, body, colors);
  for (const category of Object.keys(AVATAR_PARTS) as AvatarCategory[]) {
    // Sleep is an effect overlay; source earrings keep their original layer order.
    if (category === 'accessories' && resolved.accessories === 'sleepSymbol') continue;
    const part = getAvatarPart(category, resolved[category]);
    if (part) stamp(canvas, part, colors);
  }
  if (resolved.accessories === 'sleepSymbol') {
    stamp(canvas, AVATAR_PARTS.accessories.sleepSymbol, colors);
  }
  return toGrid(canvas);
}

export function generateAvatarPartGrid(category: string, name: string, config: AvatarConfig = {}): PixelGrid {
  const canvas = empty();
  const part = getAvatarPart(category, name);
  if (part) stamp(canvas, part, colorMap(resolveAvatarConfig(config)));
  return toGrid(canvas);
}
