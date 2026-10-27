import type { PartCategory } from '../../../types.ts';

const nose: PartCategory = {
  clown: {
    pixels: [
      [1,1],
      [1,1],
    ],
    slotMap: { 1: 'rgba_f20f24ff' },
    offsetX: 7,
    offsetY: 7,
  },
  smallLow: {
    pixels: [
      [1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 7,
    offsetY: 8,
  },
  long: {
    pixels: [
      [1,1,1,1,1,0],
      [0,0,0,0,0,1],
      [1,1,1,1,1,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 7,
    offsetY: 6,
  },
  small: {
    pixels: [
      [1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 7,
    offsetY: 7,
  },
};

export default nose;
