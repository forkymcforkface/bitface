import { gridToSvg } from '../svg.ts';
import { AVATAR_PARTS } from '../parts/avatar/index.ts';
import { generateAvatarGrid, generateAvatarPartGrid } from './generator.ts';
import type { AvatarCategory, AvatarConfig } from './types.ts';

export { generateAvatarGrid } from './generator.ts';
export { generateRandomAvatarConfig } from './config.ts';
export { AVATAR_ANIMATIONS, getAvatarAnimationNames, getAvatarAnimation } from './animations.ts';
export type { AvatarAnimationName, AvatarAnimationFrame, AvatarAnimationSequence } from './animations.ts';
export { getAvatarPartLabel, getAvatarColorLabel } from './labels.ts';
export { AVATAR_COLOR_NAMES } from '../parts/avatar/color-names.ts';
export { AVATAR_COLOR_PRESETS, AVATAR_FEATURES } from '../parts/avatar/index.ts';
export type { AvatarConfig, AvatarSelections, ResolvedAvatarConfig, AvatarCategory, AvatarColorKey } from './types.ts';

export function generateAvatar(config: AvatarConfig = {}): string {
  return gridToSvg(generateAvatarGrid(config), config.backgroundColor ?? 'transparent');
}

export function getAvailableAvatarParts(): Record<AvatarCategory, string[]> {
  return Object.fromEntries(Object.entries(AVATAR_PARTS).map(([category, parts]) =>
    [category, ['none', ...Object.keys(parts)]]
  )) as Record<AvatarCategory, string[]>;
}

export function getAvatarPartThumbnail(category: string, name: string, config: AvatarConfig = {}): string {
  return gridToSvg(generateAvatarPartGrid(category, name, config), 'transparent');
}
