import { AVATAR_SOURCE_PARTS, AVATAR_FEATURES, AVATAR_COLOR_PRESETS } from '../parts/avatar/index.ts';
import { sanitizeColor } from '../palette.ts';
import type { AvatarCategory, AvatarColorKey, AvatarConfig, ResolvedAvatarConfig } from './types.ts';

/** Stable local PRNG. Seeds are deterministic within Bitface, independent of DiceBear's PRNG. */
function randomFromSeed(seed: string): () => number {
  let state = 2166136261;
  for (let i = 0; i < seed.length; i++) state = Math.imul(state ^ seed.charCodeAt(i), 16777619);
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function resolveAvatarConfig(config: AvatarConfig = {}): ResolvedAvatarConfig {
  const random = randomFromSeed(config.seed ?? 'bitface');
  const pick = <T>(values: readonly T[]): T => values[Math.floor(random() * values.length)];
  const selections: Record<string, string> = {};
  for (const category of Object.keys(AVATAR_SOURCE_PARTS) as AvatarCategory[]) {
    const requested = config[`${category}Probability`];
    const probability = typeof requested === 'number' && Number.isFinite(requested)
      ? Math.max(0, Math.min(100, requested)) : AVATAR_FEATURES[category].probability;
    const visible = random() * 100 < probability;
    const variant = pick(Object.keys(AVATAR_SOURCE_PARTS[category]));
    selections[category] = config[category] ?? (visible ? variant : 'none');
  }
  for (const key of Object.keys(AVATAR_COLOR_PRESETS) as AvatarColorKey[]) {
    const preset = pick(AVATAR_COLOR_PRESETS[key]);
    const value = config[key] ?? preset;
    selections[key] = sanitizeColor(value.startsWith('#') ? value : `#${value}`, preset);
  }
  return { ...config, ...selections } as ResolvedAvatarConfig;
}

/** Omit seed for a fresh avatar; pass seed to reproduce selections and palette colors. */
export function generateRandomAvatarConfig(config: AvatarConfig = {}): ResolvedAvatarConfig {
  return resolveAvatarConfig({ ...config, seed: config.seed ?? Math.random().toString(36).slice(2) });
}
