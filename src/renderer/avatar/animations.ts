import { applyIntensity } from '../animations.ts';
import type { AnimationFrame, AnimationSequence } from '../animations.ts';
import type { AvatarConfig } from './types.ts';

export type AvatarAnimationName = 'idle' | 'talk' | 'blink' | 'sleepy' | 'emote';
export type AvatarAnimationFrame = AnimationFrame<AvatarConfig>;
export type AvatarAnimationSequence = AnimationSequence<AvatarConfig>;

/** Empty overrides restore the user's selected parts, including accessories. */
export const AVATAR_ANIMATIONS: Record<AvatarAnimationName, AvatarAnimationSequence> = {
  idle: {
    name: 'idle',
    frames: [
      { duration: 3000, overrides: {} },
      { duration: 150, overrides: { eyes: 'variant05' } },
      { duration: 150, overrides: {} },
    ],
  },
  talk: {
    name: 'talk',
    frames: [
      { duration: 200, overrides: {} },
      { duration: 200, overrides: { mouth: 'happy12' } },
      { duration: 200, overrides: {} },
      { duration: 200, overrides: { mouth: 'happy12' } },
      { duration: 300, overrides: {} },
    ],
  },
  blink: {
    name: 'blink',
    frames: [
      { duration: 2500, overrides: {} },
      { duration: 100, overrides: { eyes: 'variant12' } },
      { duration: 200, overrides: {} },
    ],
  },
  sleepy: {
    name: 'sleepy',
    frames: [
      { duration: 2000, overrides: {} },
      { duration: 400, overrides: { eyes: 'sleepy', accessories: 'sleepSymbol' } },
      { duration: 800, overrides: { eyes: 'sleepy', accessories: 'sleepSymbol' } },
      { duration: 400, overrides: {} },
      { duration: 1500, overrides: {} },
      { duration: 300, overrides: { eyes: 'sleepy', accessories: 'sleepSymbol' } },
      { duration: 1200, overrides: { eyes: 'sleepy', accessories: 'sleepSymbol' } },
      { duration: 300, overrides: {} },
    ],
  },
  emote: {
    name: 'emote',
    frames: [
      { duration: 500, overrides: {} },
      { duration: 800, overrides: { eyes: 'variant09', mouth: 'happy12' } },
      { duration: 300, overrides: {} },
    ],
  },
};

export function getAvatarAnimationNames(): AvatarAnimationName[] {
  return Object.keys(AVATAR_ANIMATIONS) as AvatarAnimationName[];
}

/** Same 0–100 speed control as Face and Emoji: 50 is normal speed. */
export function getAvatarAnimation(name?: string, intensity = 50): AvatarAnimationSequence | undefined {
  if (!name || !Object.prototype.hasOwnProperty.call(AVATAR_ANIMATIONS, name)) return undefined;
  return applyIntensity(AVATAR_ANIMATIONS[name as AvatarAnimationName], intensity);
}
