import accessories from './accessories.ts';
import beard from './beard.ts';
import clothes from './clothes.ts';
import eyes from './eyes.ts';
import glasses from './glasses.ts';
import hair from './hair.ts';
import hat from './hat.ts';
import mouth from './mouth.ts';
import type { AvatarPart } from './types.ts';
import sleepyEyes from './sleepy-eyes.ts';
import sleepSymbol from './sleep-symbol.ts';

export { default as body } from './body.ts';
export { AVATAR_COLOR_PRESETS } from './palette.ts';
export type { AvatarLayer, AvatarPart } from './types.ts';

/** Source canvas order: accessories, clothes, eyes, glasses, beard, mouth, hair, hat. */
export const AVATAR_SOURCE_PARTS = { accessories, clothes, eyes, glasses, beard, mouth, hair, hat };
export const AVATAR_PARTS = {
  ...AVATAR_SOURCE_PARTS,
  accessories: { ...accessories, sleepSymbol },
  eyes: { ...eyes, sleepy: sleepyEyes },
};
export type AvatarCategory = keyof typeof AVATAR_PARTS;

export const AVATAR_FEATURES = {
  accessories: { probability: 10, color: 'accessoriesColor' },
  clothes: { probability: 100, color: 'clothingColor' },
  eyes: { probability: 100, color: 'eyesColor' },
  glasses: { probability: 20, color: 'glassesColor' },
  beard: { probability: 5, color: 'hairColor' },
  mouth: { probability: 100, color: 'mouthColor' },
  hair: { probability: 100, color: 'hairColor' },
  hat: { probability: 5, color: 'hatColor' },
} as const;

export function getAvatarPart(category: string, name: string): AvatarPart | undefined {
  if (!Object.prototype.hasOwnProperty.call(AVATAR_PARTS, category)) return undefined;
  const parts: Record<string, AvatarPart> = AVATAR_PARTS[category as AvatarCategory];
  return Object.prototype.hasOwnProperty.call(parts, name) ? parts[name] : undefined;
}
