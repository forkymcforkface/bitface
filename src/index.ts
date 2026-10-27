export { generateFace, generateRandomConfig, getAvailableParts, getPartThumbnail } from './renderer/index.ts';
export { getAnimationNames, generateSufferingAnimation, applyIntensity, ANIMATIONS } from './renderer/animations.ts';
export { SKIN_PRESETS, HAIR_PRESETS, EYE_PRESETS, BG_PRESETS } from './renderer/palette.ts';
export type { FaceConfig, PixelGrid, PartPattern, PartCategory } from './types.ts';
export type { AnimationFrame, AnimationSequence } from './renderer/animations.ts';

export {
  generateEmoji,
  generateEmojiGrid,
  generateEmojiSymbolGrid,
  getAvailableEmojiParts,
  getEmojiPartThumbnail,
} from './renderer/emoji/index.ts';
export { EMOJI_PRESETS, EMOJI_PRESET_NAMES } from './renderer/parts/emoji/index.ts';
export type { EmojiConfig } from './types.ts';
export { generateFood, generateFoodGrid, getAvailableFoods } from './renderer/food/index.ts';
