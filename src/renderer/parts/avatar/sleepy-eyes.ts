import type { AvatarPart } from './types.ts';

/** Closed eyelids fitted to the avatar's eye position on the 16×16 canvas. */
const sleepyEyes = {
  layers: [{
    pixels: [
      [1,0,1,0,0,1,0,1],
      [0,1,0,0,0,0,1,0],
    ],
    slotMap: { 1: 'eyes' },
    offsetX: 4,
    offsetY: 6,
  }],
  tags: ['expression:sleepy'],
} satisfies AvatarPart;

export default sleepyEyes;
