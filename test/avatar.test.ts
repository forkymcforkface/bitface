import { describe, it, expect } from 'vitest';
import { Resvg } from '@resvg/resvg-js';
import source from '../scripts/sources/dicebear-pixel-art.json';
import {
  generateAvatar, generateAvatarGrid, generateRandomAvatarConfig,
  getAvailableAvatarParts, getAvatarPartThumbnail, AVATAR_COLOR_PRESETS,
} from '../src/index.ts';
import type { AvatarConfig, AvatarCategory, AvatarColorKey } from '../src/index.ts';
import { AVATAR_PARTS } from '../src/renderer/parts/avatar/index.ts';

const parts = getAvailableAvatarParts();
const categories = Object.keys(parts) as AvatarCategory[];
const colors = Object.fromEntries(Object.entries(AVATAR_COLOR_PRESETS).map(([key, values]) => [key, values[0]]));
const empty = Object.fromEntries(categories.map(category => [category, 'none'])) as AvatarConfig;

interface SourceElement {
  name: string;
  type: string;
  attributes?: Record<string, string | { name: string; type: string }>;
  children?: SourceElement[];
}

/** Render the upstream SVG elements independently of Bitface's numeric patterns. */
function originalSvg(config: AvatarConfig): string {
  const components = source.components as Record<string, { variants: Record<string, { elements: SourceElement[] }> }>;
  function serialize(element: SourceElement): string {
    const attributes = Object.entries(element.attributes ?? {}).map(([key, value]) => {
      const resolved = typeof value === 'string' ? value : config[`${value.name}Color` as AvatarColorKey];
      return ` ${key}="${resolved}"`;
    }).join('');
    const children = element.type === 'component'
      ? components[element.name].variants[config[element.name as AvatarCategory] ?? 'none']?.elements ?? []
      : element.children ?? [];
    const tag = element.type === 'component' ? 'g' : element.name;
    return `<${tag}${attributes}>${children.map(serialize).join('')}</${tag}>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" shape-rendering="crispEdges">${(source.canvas.elements as SourceElement[]).map(serialize).join('')}</svg>`;
}

function assertOriginalPixels(config: AvatarConfig) {
  const options = { font: { loadSystemFonts: false } };
  const expected = new Resvg(originalSvg(config), options).render().pixels;
  const actual = new Resvg(generateAvatar(config), options).render().pixels;
  const differences = [...expected].flatMap((value, index) => Math.abs(value - actual[index]) > 2
    ? [{ x: Math.floor(index / 4) % 16, y: Math.floor(index / 64), channel: index % 4, expected: value, actual: actual[index] }]
    : []);
  // SVG compositors round intermediate alpha operations to 8-bit channels.
  expect(differences.slice(0, 8), JSON.stringify(config)).toEqual([]);
}

describe('DiceBear pixel-art avatar parts', () => {
  it('includes every source feature and all 139 named variants', () => {
    expect([...categories].sort()).toEqual(Object.keys(source.components).sort());
    let count = 0;
    for (const category of categories) {
      const names = Object.keys(source.components[category].variants);
      const extra = category === 'eyes' ? ['sleepy'] : category === 'accessories' ? ['sleepSymbol'] : [];
      expect(parts[category]).toEqual(['none', ...names, ...extra]);
      count += names.length;
    }
    expect(count).toBe(139);
  });

  it('preserves original raster pixels for every variant, including opacity and masks', () => {
    for (const category of categories) {
      for (const name of Object.keys(source.components[category].variants)) {
        assertOriginalPixels({ ...empty, ...colors, [category]: name });
      }
    }
  });

  it('preserves combined artwork and layer order with custom colors', () => {
    for (const seed of ['bitface', 'Felix', '帽子', 'another']) {
      assertOriginalPixels(generateRandomAvatarConfig({ seed, accessoriesProbability: 100, beardProbability: 100, glassesProbability: 100, hatProbability: 100 }));
    }
    assertOriginalPixels({ ...empty, ...colors, skinColor: '#abc', eyesColor: '#345678', hairColor: '#cc2200', beard: 'variant03', glasses: 'light02', eyes: 'variant02' });
  });

  it('preserves every palette and semantic tag from the source', () => {
    for (const [name, definition] of Object.entries(source.colors)) {
      expect(AVATAR_COLOR_PRESETS[`${name}Color` as AvatarColorKey]).toEqual(definition.values);
    }
    for (const category of categories) {
      const variants = source.components[category].variants as Record<string, { tags?: string[] }>;
      const imported = AVATAR_PARTS[category] as Record<string, { tags?: string[] }>;
      for (const [name, variant] of Object.entries(variants)) expect(imported[name].tags).toEqual(variant.tags);
    }
  });

  it('uses deterministic seeds, fresh random configs, and source probabilities', () => {
    expect(generateAvatar({ seed: 'Felix' })).toBe(generateAvatar({ seed: 'Felix' }));
    expect(generateAvatar({ seed: 'Felix' })).not.toBe(generateAvatar({ seed: 'Ada' }));
    const random = generateRandomAvatarConfig();
    expect(generateAvatar(random)).toBe(generateAvatar({ seed: random.seed }));
    for (const category of categories) {
      expect(generateRandomAvatarConfig({ seed: 'test', [`${category}Probability`]: 0 })[category]).toBe('none');
      expect(generateRandomAvatarConfig({ seed: 'test', [`${category}Probability`]: 100 })[category]).not.toBe('none');
    }
    expect(generateRandomAvatarConfig({ beard: 'variant01', beardProbability: 0 }).beard).toBe('variant01');
  });

  it('returns transparent 16x16 SVGs, grids and isolated part previews', () => {
    expect(generateAvatar()).toContain('viewBox="0 0 16 16"');
    expect(generateAvatar()).toContain('shape-rendering="crispEdges"');
    expect(generateAvatar()).not.toContain('fill="#87CEEB"');
    expect(generateAvatar({ backgroundColor: '#123456' })).toContain('fill="#123456"');
    expect(generateAvatarGrid()).toHaveLength(16);
    expect(generateAvatarGrid().every(row => row.length === 16)).toBe(true);
    expect(getAvatarPartThumbnail('eyes', 'variant01')).toContain('<rect');
    for (const [category, name] of [['eyes', 'none'], ['unknown', 'variant01'], ['__proto__', 'constructor'], ['hair', '__proto__']]) {
      expect(getAvatarPartThumbnail(category, name)).not.toContain('<rect');
    }
  });

  it('validates all custom colors and handles unknown runtime selections safely', () => {
    const malicious = '"><script>alert(1)</script>';
    const config = Object.fromEntries(Object.keys(AVATAR_COLOR_PRESETS).map(key => [key, malicious]));
    const svg = generateAvatar({ ...config, backgroundColor: malicious, hair: '__proto__' } as AvatarConfig);
    expect(svg).not.toContain('<script');
    expect(svg).not.toContain('NaN');
    expect(generateAvatar({ skinColor: 'ff0000' })).toContain('#ff0000');
    expect(generateAvatar({ skinColor: '#1234' })).not.toContain('NaN');
  });
});
