import type { PartCategory } from '../../../types.ts';

const eyebrows: PartCategory = {
  raised: {
    pixels: [
      [0,0,0,0,0,1,0,0],
      [1,1,0,0,0,0,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 3,
  },
  worriedLow: {
    pixels: [
      [0,0,1,0,0,1,0,0],
      [1,1,0,0,0,0,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 5,
  },
  angry: {
    pixels: [
      [1,0,0,0,0,0,0,1],
      [0,1,0,0,0,0,1,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 4,
  },
  worried: {
    pixels: [
      [0,0,1,0,0,1,0,0],
      [1,1,0,0,0,0,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 3,
  },
  deepScowl: {
    pixels: [
      [1,0,0,0,0,0,0,1],
      [0,1,0,0,0,0,1,0],
      [0,0,1,0,0,1,0,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 5,
  },
  skeptical: {
    pixels: [
      [0,0,0,0,0,1,0],
      [0,0,0,0,1,0,1],
      [1,1,1,0,0,0,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 3,
  },
  singleFlat: {
    pixels: [
      [1,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 9,
    offsetY: 5,
  },
  closeSetAngry: {
    pixels: [
      [1,0,0,0,0,1],
      [0,1,0,0,1,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 3,
  },
  angryLow: {
    pixels: [
      [1,0,0,0,0,0,0,1],
      [0,1,0,0,0,0,1,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 5,
  },
};

export default eyebrows;
