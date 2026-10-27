import type { AnimationSequence } from '../animations.ts';

export const EMOJI_ANIMATIONS: Record<string, AnimationSequence> = {
  idle: {
    name: 'idle',
    frames: [
      { duration: 3000, overrides: {} },
      { duration: 150, overrides: { eyes: 'closed' } },
      { duration: 150, overrides: {} },
    ],
  },
  talk: {
    name: 'talk',
    frames: [
      { duration: 200, overrides: {} },
      { duration: 200, overrides: { mouth: 'darkSmirk' } },
      { duration: 200, overrides: {} },
      { duration: 200, overrides: { mouth: 'darkSmirk' } },
      { duration: 300, overrides: {} },
    ],
  },
  blink: {
    name: 'blink',
    frames: [
      { duration: 2500, overrides: {} },
      { duration: 100, overrides: { eyes: 'closed' } },
      { duration: 100, overrides: { eyes: 'closed' } },
      { duration: 100, overrides: { eyes: 'closed' } },
      { duration: 200, overrides: {} },
    ],
  },
  sleepy: {
    name: 'sleepy',
    frames: [
      { duration: 2000, overrides: {} },
      { duration: 400, overrides: { eyes: 'sleepyWide', accessories: 'sleepSymbol' } },
      { duration: 800, overrides: { eyes: 'sleepyWide', accessories: 'sleepSymbol' } },
      { duration: 400, overrides: {} },
      { duration: 1500, overrides: {} },
      { duration: 300, overrides: { eyes: 'sleepyWide', accessories: 'sleepSymbol' } },
      { duration: 1200, overrides: { eyes: 'sleepyWide', accessories: 'sleepSymbol' } },
      { duration: 300, overrides: {} },
    ],
  },
  emote: {
    name: 'emote',
    frames: [
      { duration: 500, overrides: {} },
      { duration: 400, overrides: { eyebrows: 'raised', mouth: 'darkSmirk' } },
      { duration: 400, overrides: { eyebrows: 'raised', mouth: 'darkSmirk' } },
      { duration: 300, overrides: {} },
    ],
  },
};

export function getEmojiAnimationNames(): string[] {
  return Object.keys(EMOJI_ANIMATIONS);
}
