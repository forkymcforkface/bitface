import emojiAccessories from '../emoji/accessories.ts';
import { EMOJI_COLOR_ROLES } from '../emoji/palette.ts';
import type { AvatarPart } from './types.ts';

// Reuse the Emoji artwork, position and colors; keep a single source of pixels.
const source = emojiAccessories.sleepSymbol;
const sleepSymbol = {
  layers: [{
    ...source,
    slotMap: Object.fromEntries(Object.entries(source.slotMap).map(([slot, role]) =>
      [slot, EMOJI_COLOR_ROLES[role]]
    )),
  }],
  tags: ['effect:sleep'],
} satisfies AvatarPart;

export default sleepSymbol;
