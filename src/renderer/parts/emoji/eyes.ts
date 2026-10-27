import type { PartCategory } from '../../../types.ts';

const eyes: PartCategory = {
  small: {
    pixels: [
      [1,0,0,0,0,1],
      [1,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 5,
  },
  happy: {
    pixels: [
      [0,1,0,0,0,0,1,0],
      [1,0,1,0,0,1,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 5,
  },
  wink: {
    pixels: [
      [1,0,0,0,0,0,0],
      [1,0,0,0,0,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 5,
  },
  closed: {
    pixels: [
      [1,1,0,0,0,0,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 6,
  },
  smallLow: {
    pixels: [
      [1,0,0,0,0,1],
      [1,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 6,
  },
  upsideDown: {
    pixels: [
      [1,0,0,0,0,1],
      [1,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 9,
  },
  sleepy: {
    pixels: [
      [1,0,1,0,0,1,0,1],
      [0,1,0,0,0,0,1,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 8,
  },
  wideHappy: {
    pixels: [
      [0,1,1,0,0,0,0,1,1,0],
      [1,0,0,1,0,0,1,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 3,
    offsetY: 5,
  },
  softHappy: {
    pixels: [
      [0,1,1,0,0,1,1,0],
      [1,0,0,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 5,
  },
  wide: {
    pixels: [
      [2,2,2,0,0,2,2,2],
      [2,1,2,0,0,2,1,2],
      [2,2,2,0,0,2,2,2],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_ffffffff' },
    offsetX: 4,
    offsetY: 5,
  },
  heart: {
    pixels: [
      [1,0,1,0,0,1,0,1],
      [1,1,1,0,0,1,1,1],
      [0,1,0,0,0,0,1,0],
    ],
    slotMap: { 1: 'rgba_f20f24ff' },
    offsetX: 4,
    offsetY: 5,
  },
  heartsLow: {
    pixels: [
      [1,0,1,0,0,1,0,1],
      [1,1,1,0,0,1,1,1],
      [0,1,0,0,0,0,1,0],
    ],
    slotMap: { 1: 'rgba_f20f24ff' },
    offsetX: 4,
    offsetY: 8,
  },
  peaked: {
    pixels: [
      [0,1,0,0,0,0,1,0],
      [1,1,1,0,0,1,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 5,
  },
  wideLow: {
    pixels: [
      [2,2,2,0,0,2,2,2],
      [2,1,2,0,0,2,1,2],
      [2,2,2,0,0,2,2,2],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_ffffffff' },
    offsetX: 4,
    offsetY: 8,
  },
  lookingDownLeft: {
    pixels: [
      [2,2,2,0,0,2,2,2],
      [1,2,2,0,0,1,2,2],
      [1,1,2,0,0,1,1,2],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_ffffffff' },
    offsetX: 4,
    offsetY: 5,
  },
  sparkle: {
    pixels: [
      [0,1,0,0,0,0,0,0,1,0],
      [0,0,1,0,0,0,0,1,0,0],
      [1,1,1,0,0,0,0,1,1,1],
      [0,0,1,0,0,0,0,1,0,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 3,
    offsetY: 4,
  },
  cross: {
    pixels: [
      [1,0,1,0,0,1,0,1],
      [0,1,0,0,0,0,1,0],
      [1,0,1,0,0,1,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 5,
  },
  smallMiddle: {
    pixels: [
      [1,0,0,0,0,1],
      [1,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 7,
  },
  closedHigh: {
    pixels: [
      [1,1,0,0,0,0,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 5,
  },
  lookingDownRight: {
    pixels: [
      [2,2,1,0,0,2,2,1],
      [2,1,1,0,0,2,1,1],
      [1,1,2,0,0,1,1,2],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_ffffffff' },
    offsetX: 4,
    offsetY: 6,
  },
  redPupils: {
    pixels: [
      [0,1,0,0,0,0,1,0],
      [1,1,1,0,0,1,1,1],
      [1,2,1,0,0,1,2,1],
      [0,1,0,0,0,0,1,0],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_f20f24ff' },
    offsetX: 4,
    offsetY: 4,
  },
  blankWhite: {
    pixels: [
      [1,1,1,0,0,1,1,1],
      [1,1,1,0,0,1,1,1],
      [1,1,1,0,0,1,1,1],
    ],
    slotMap: { 1: 'rgba_ffffffff' },
    offsetX: 4,
    offsetY: 5,
  },
  squeezed: {
    pixels: [
      [1,0,0,0,0,0,0,1],
      [0,1,0,0,0,0,1,0],
      [0,0,1,0,0,1,0,0],
      [0,1,0,0,0,0,1,0],
      [1,0,0,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 4,
  },
  lookingUp: {
    pixels: [
      [2,1,2,0,0,2,1,2],
      [2,2,2,0,0,2,2,2],
      [2,2,2,0,0,2,2,2],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_ffffffff' },
    offsetX: 4,
    offsetY: 5,
  },
  money: {
    pixels: [
      [0,0,0,0,0,0,0,0,1],
      [0,2,2,0,0,0,2,2,0],
      [2,2,0,0,0,2,2,0,0],
      [0,2,2,0,0,0,2,2,0],
      [2,2,0,0,0,2,2,0,0],
    ],
    slotMap: { 1: 'body', 2: 'rgba_6abe30ff' },
    offsetX: 4,
    offsetY: 3,
  },
  squint: {
    pixels: [
      [1,0,0,0,0,1],
      [0,1,0,0,1,0],
      [1,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 5,
  },
  sleepyWide: {
    pixels: [
      [1,0,0,1,0,0,1,0,0,1],
      [0,1,1,0,0,0,0,1,1,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 3,
    offsetY: 6,
  },
  slantedPeaks: {
    pixels: [
      [0,1,0,0,0,0,1,0],
      [0,0,1,0,0,1,0,0],
      [1,1,1,0,0,1,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 4,
  },
  dots: {
    pixels: [
      [1,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 6,
  },
  largeWhite: {
    pixels: [
      [0,0,1,1,0,0,0,0,1,1,0,0],
      [0,1,2,2,1,0,0,1,2,2,1,0],
      [1,2,2,1,0,0,0,0,1,2,2,1],
      [1,2,1,0,0,0,0,0,0,1,2,1],
      [0,1,0,0,0,0,0,0,0,0,1,0],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_ffffffff' },
    offsetX: 2,
    offsetY: 4,
  },
  largeDark: {
    pixels: [
      [0,0,1,1,0,0,0,0,1,1,0,0],
      [0,1,1,1,1,0,0,1,1,1,1,0],
      [0,1,1,1,1,0,0,1,1,1,1,0],
      [1,1,1,1,0,0,0,0,1,1,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 2,
    offsetY: 4,
  },
  goldSparkle: {
    pixels: [
      [0,1,0,0,0,0,1,0],
      [1,1,1,0,0,1,1,1],
      [0,1,0,0,0,0,1,0],
    ],
    slotMap: { 1: 'rgba_fffa93ff' },
    offsetX: 4,
    offsetY: 5,
  },
  redPeaks: {
    pixels: [
      [0,1,0,0,0,0,1,0],
      [1,2,1,0,0,1,2,1],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_f20f24ff' },
    offsetX: 4,
    offsetY: 7,
  },
  redAngry: {
    pixels: [
      [1,0,0,0,0,0,0,1],
      [1,1,0,0,0,0,1,1],
    ],
    slotMap: { 1: 'rgba_f20f24ff' },
    offsetX: 4,
    offsetY: 6,
  },
  inwardStarsHigh: {
    pixels: [
      [0,1,0,0,0,0,1,0],
      [1,1,0,0,0,0,1,1],
      [0,1,0,0,0,0,1,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 4,
  },
  smallClose: {
    pixels: [
      [1,0,0,0,1],
      [1,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 6,
  },
  winkFlat: {
    pixels: [
      [1,1,1,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 6,
  },
  zigzagHigh: {
    pixels: [
      [1,0,0,0,0,1],
      [0,1,0,0,1,0],
      [1,0,0,0,0,1],
      [0,1,0,0,1,0],
      [1,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 4,
  },
  cyclops: {
    pixels: [
      [1,1],
      [1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 7,
    offsetY: 5,
  },
  singleEye: {
    pixels: [
      [1],
      [1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 5,
  },
  starsHigh: {
    pixels: [
      [0,1,0,0,0,0,1,0],
      [1,1,1,0,0,1,1,1],
      [0,1,0,0,0,0,1,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 4,
  },
  smallHigh: {
    pixels: [
      [1,0,0,0,0,1],
      [1,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 4,
  },
  thirdEye: {
    pixels: [
      [1,0,0,1,1,0,0,1],
      [1,0,0,1,1,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 5,
  },
  inwardCorners: {
    pixels: [
      [1,0,0,0,0,0,0,1],
      [1,1,0,0,0,0,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 5,
  },
  inwardStars: {
    pixels: [
      [0,1,0,0,0,0,1,0],
      [1,1,0,0,0,0,1,1],
      [0,1,0,0,0,0,1,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 5,
  },
  flatLow: {
    pixels: [
      [1,1,1,0,0,1,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 7,
  },
  dotsLow: {
    pixels: [
      [1,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 7,
  },
  zigzag: {
    pixels: [
      [1,0,0,0,0,1],
      [0,1,0,0,1,0],
      [1,0,0,0,0,1],
      [0,1,0,0,1,0],
      [1,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 5,
  },
  slantedCorners: {
    pixels: [
      [0,1,0,0,0,0,1,0],
      [0,0,1,0,0,1,0,0],
      [1,1,0,0,0,0,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 4,
  },
  downwardCorners: {
    pixels: [
      [0,1,0,0,0,0,1,0],
      [1,1,0,0,0,0,1,1],
      [1,0,0,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 5,
  },
  teary: {
    pixels: [
      [1,0,0,0,0,1],
      [1,0,0,0,0,1],
      [2,0,0,0,0,2],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_5fcde4ff' },
    offsetX: 5,
    offsetY: 5,
  },
  tearDrops: {
    pixels: [
      [0,0,1,0,0,0,0,1,0,0],
      [0,0,1,0,0,0,0,1,0,0],
      [0,2,0,0,0,0,0,0,2,0],
      [2,0,0,0,0,0,0,0,0,2],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_5fcde4ff' },
    offsetX: 3,
    offsetY: 5,
  },
  blushing: {
    pixels: [
      [0,1,0,0,0,0,1,0],
      [0,1,0,0,0,0,1,0],
      [2,2,0,0,0,0,2,2],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_d77bbaff' },
    offsetX: 4,
    offsetY: 5,
  },
  happyBlushing: {
    pixels: [
      [0,0,1,0,0,0,0,1,0,0],
      [0,1,0,1,0,0,1,0,1,0],
      [2,2,0,0,0,0,0,0,2,2],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_d77bbaff' },
    offsetX: 3,
    offsetY: 5,
  },
  winkBlushing: {
    pixels: [
      [0,1,0,0,0,0,0,0,0],
      [0,1,0,0,0,0,1,1,0],
      [2,2,0,0,0,0,0,2,2],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_d77bbaff' },
    offsetX: 4,
    offsetY: 5,
  },
  wideHappyBlushing: {
    pixels: [
      [0,0,1,1,0,0,0,0,1,1,0,0],
      [0,1,0,0,1,0,0,1,0,0,1,0],
      [2,2,0,0,0,0,0,0,0,0,2,2],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_d77bbaff' },
    offsetX: 2,
    offsetY: 5,
  },
  wideBlushing: {
    pixels: [
      [0,1,1,1,0,0,1,1,1,0],
      [0,1,2,1,0,0,1,2,1,0],
      [0,1,1,1,0,0,1,1,1,0],
      [3,3,0,0,0,0,0,0,3,3],
    ],
    slotMap: { 1: 'rgba_ffffffff', 2: 'outline', 3: 'rgba_d77bbaff' },
    offsetX: 3,
    offsetY: 5,
  },
  crying: {
    pixels: [
      [0,1,0,0,0,0,1,0],
      [1,1,1,0,0,1,1,1],
      [2,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,2],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_5fcde4ff' },
    offsetX: 4,
    offsetY: 5,
  },
  downcastRedCheeks: {
    pixels: [
      [0,1,1,1,0,0,1,1,1,0],
      [0,2,1,1,0,0,2,1,1,0],
      [0,2,2,1,0,0,2,2,1,0],
      [3,3,0,0,0,0,0,0,3,3],
      [3,3,0,0,0,0,0,0,3,3],
    ],
    slotMap: { 1: 'rgba_ffffffff', 2: 'outline', 3: 'rgba_f20f24ff' },
    offsetX: 3,
    offsetY: 5,
  },
  wideRedCheeks: {
    pixels: [
      [0,1,1,1,0,0,1,1,1,0],
      [0,1,2,1,0,0,1,2,1,0],
      [0,1,1,1,0,0,1,1,1,0],
      [3,3,0,0,0,0,0,0,3,3],
      [3,3,0,0,0,0,0,0,3,3],
    ],
    slotMap: { 1: 'rgba_ffffffff', 2: 'outline', 3: 'rgba_f20f24ff' },
    offsetX: 3,
    offsetY: 5,
  },
  sparkleGreenCheeks: {
    pixels: [
      [0,0,1,0,0,0,0,0,0,1,0,0],
      [0,0,0,1,0,0,0,0,1,0,0,0],
      [0,1,1,1,0,0,0,0,1,1,1,0],
      [0,0,0,1,0,0,0,0,1,0,0,0],
      [2,2,0,0,0,0,0,0,0,0,2,2],
      [2,2,0,0,0,0,0,0,0,0,2,2],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_6abe30ff' },
    offsetX: 2,
    offsetY: 4,
  },
  streamingTears: {
    pixels: [
      [0,1,1,0,0,0,0,1,1,0],
      [0,2,0,0,0,0,0,0,2,0],
      [2,2,0,0,0,0,0,0,2,2],
      [2,0,0,0,0,0,0,0,0,2],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_5fcde4ff' },
    offsetX: 3,
    offsetY: 5,
  },
  blankWhiteSweat: {
    pixels: [
      [0,0,0,0,0,0,0,1,0,0],
      [0,0,0,0,0,0,0,1,0,0],
      [0,0,0,0,0,0,0,1,0,1],
      [0,0,0,0,0,0,0,0,0,1],
      [1,1,1,0,0,1,1,1,0,1],
      [1,1,1,0,0,1,1,1,0,0],
      [1,1,1,0,0,1,1,1,0,0],
    ],
    slotMap: { 1: 'rgba_ffffffff' },
    offsetX: 4,
    offsetY: 1,
  },
  starSweat: {
    pixels: [
      [0,0,0,0,0,0,0,2,0,0],
      [0,0,0,0,0,0,0,2,0,0],
      [0,0,0,0,0,0,0,2,0,2],
      [0,1,0,0,0,0,1,0,0,2],
      [1,1,0,0,0,0,1,1,0,2],
      [0,1,0,0,0,0,1,0,0,0],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_5fcde4ff' },
    offsetX: 4,
    offsetY: 2,
  },
  angryRedCheeks: {
    pixels: [
      [0,0,1,0,0,0,0,1,0,0],
      [2,2,0,0,0,0,0,0,2,2],
      [2,2,0,0,0,0,0,0,2,2],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_a40a19ff' },
    offsetX: 3,
    offsetY: 7,
  },
};

export default eyes;
