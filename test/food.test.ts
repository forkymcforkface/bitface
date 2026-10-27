import { createHash } from 'node:crypto';
import { describe, it, expect } from 'vitest';
import { generateFood, generateFoodGrid, getAvailableFoods } from '../src/renderer/food/index.ts';
import sourceHashes from './food-pixels.json';

function pixelHash(name: string): string {
  const pixels = generateFoodGrid(name).flat().flatMap(color =>
    color === null ? [0, 0, 0, 0] : [...Buffer.from(color.slice(1), 'hex')]
  );
  return createHash('sha256').update(Buffer.from(pixels)).digest('hex');
}

describe('food artwork', () => {
  it('preserves every original pixel and color in all 188 foods', () => {
    expect(getAvailableFoods()).toEqual(Object.keys(sourceHashes));
    for (const [name, hash] of Object.entries(sourceHashes)) {
      expect(pixelHash(name), name).toBe(hash);
    }
  });

  it('generates transparent 16x16 SVG with the existing renderer', () => {
    const svg = generateFood('apple_red');
    expect(svg).toContain('viewBox="0 0 16 16"');
    expect(svg).toContain('shape-rendering="crispEdges"');
    expect(svg).not.toContain('fill="#87CEEB"');
  });

  it('skips unknown names like unknown face parts', () => {
    expect(generateFoodGrid('unknown').flat().every(pixel => pixel === null)).toBe(true);
    expect(generateFoodGrid('__proto__').flat().every(pixel => pixel === null)).toBe(true);
  });
});
