import type { PartCategory } from '../../../types.ts';

const mouth: PartCategory = {
  smile: {
    pixels: [
      [1,0,0,0,0,0,0,1],
      [0,1,1,1,1,1,1,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 9,
  },
  flat: {
    pixels: [
      [1,1,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 6,
    offsetY: 10,
  },
  frown: {
    pixels: [
      [0,1,1,1,1,1,1,0],
      [1,0,0,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 9,
  },
  grin: {
    pixels: [
      [1,1,1,1,1,1,1,1],
      [1,2,2,2,2,2,2,1],
      [0,1,1,1,1,1,1,0],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_ffffffff' },
    offsetX: 4,
    offsetY: 9,
  },
  highStraightMouth: {
    pixels: [
      [1,1,1,1,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 5,
  },
  highFrown: {
    pixels: [
      [0,1,1,1,1,1,1,0],
      [1,0,0,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 5,
  },
  lowStraightMouth: {
    pixels: [
      [1,1,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 6,
    offsetY: 11,
  },
  smallOpenMouth: {
    pixels: [
      [1,1],
      [1,1],
      [1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 7,
    offsetY: 9,
  },
  tongueOutSmile: {
    pixels: [
      [1,0,0,0,0,0,0,1],
      [0,1,1,1,1,1,1,0],
      [0,0,0,2,2,0,0,0],
      [0,0,0,2,2,0,0,0],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_fb3b4cff' },
    offsetX: 4,
    offsetY: 9,
  },
  wideStraightMouth: {
    pixels: [
      [1,1,1,1,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 10,
  },
  kiss: {
    pixels: [
      [0,1,0],
      [0,0,1],
      [1,1,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 7,
    offsetY: 9,
  },
  openTongueMouth: {
    pixels: [
      [1,1,1,1],
      [1,1,1,1],
      [1,2,2,1],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_f20f24ff' },
    offsetX: 6,
    offsetY: 9,
  },
  worriedMouth: {
    pixels: [
      [0,1,1,1,1,0],
      [1,0,0,0,0,1],
      [0,0,1,1,0,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 9,
  },
  smirk: {
    pixels: [
      [0,0,0,0,1],
      [1,1,1,1,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 6,
    offsetY: 10,
  },
  smallSmile: {
    pixels: [
      [1,0,0,0,0,1],
      [0,1,1,1,1,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 10,
  },
  grayZigzagMouth: {
    pixels: [
      [0,1,0,1,0,1,0],
      [1,0,1,0,1,0,1],
      [0,0,0,0,0,0,1],
    ],
    slotMap: { 1: 'rgba_847e87ff' },
    offsetX: 5,
    offsetY: 9,
  },
  vomitingMouth: {
    pixels: [
      [0,0,1,1,1,1,0,0],
      [0,1,1,2,3,1,1,0],
      [1,1,3,2,3,3,1,1],
      [0,0,2,3,2,3,0,0],
      [0,0,3,2,2,3,0,0],
      [0,0,2,3,2,3,0,0],
      [0,0,3,2,2,3,0,0],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_6abe30ff', 3: 'rgba_99e550ff' },
    offsetX: 4,
    offsetY: 9,
  },
  smallFrown: {
    pixels: [
      [0,1,1,1,1,0],
      [1,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 10,
  },
  laughingMouth: {
    pixels: [
      [1,1,1,1,1,1,1,1],
      [1,3,3,3,3,3,3,1],
      [1,1,2,2,2,2,1,1],
      [0,1,1,1,1,1,1,0],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_fb3b4cff', 3: 'rgba_ffffffff' },
    offsetX: 4,
    offsetY: 8,
  },
  jaggedMouth: {
    pixels: [
      [1,0,1,0,1,0,1,0],
      [0,1,0,1,0,1,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 10,
  },
  tinyTongueMouth: {
    pixels: [
      [1,1],
      [1,1],
      [2,2],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_fb3b4cff' },
    offsetX: 7,
    offsetY: 10,
  },
  fangedSmile: {
    pixels: [
      [1,1,2,2,1,1],
      [0,1,1,1,1,0],
      [0,0,1,1,0,0],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_ffffffff' },
    offsetX: 5,
    offsetY: 10,
  },
  flatSidedSmile: {
    pixels: [
      [1,1,0,0,0,0,1,1],
      [0,0,1,1,1,1,0,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 10,
  },
  tinyStraightMouth: {
    pixels: [
      [1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 7,
    offsetY: 10,
  },
  redOvalMouth: {
    pixels: [
      [0,1,1,0],
      [1,3,3,1],
      [1,3,3,1],
      [1,2,2,1],
      [0,1,1,0],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_df0e21ff', 3: 'rgba_f20f24ff' },
    offsetX: 6,
    offsetY: 8,
  },
  narrowOpenMouth: {
    pixels: [
      [1,1],
      [1,1],
      [1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 7,
    offsetY: 10,
  },
  crookedSmile: {
    pixels: [
      [1,0,0,0,0,1,1],
      [1,0,0,1,1,0,0],
      [0,1,1,0,0,0,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 8,
  },
  singleToothSmile: {
    pixels: [
      [1,1,1,2,1,1],
      [0,1,1,1,1,0],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_ffffffff' },
    offsetX: 5,
    offsetY: 10,
  },
  clenchedTeeth: {
    pixels: [
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,2,2,1,1,1,2,2,1],
      [1,1,2,1,1,2,2,1,2,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_ffffffff' },
    offsetX: 3,
    offsetY: 8,
  },
  wideTongueSmile: {
    pixels: [
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [0,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,1,1,2,2,2,2,1,1,0,0],
      [0,0,0,1,2,2,2,2,1,0,0,0],
      [0,0,0,0,1,1,1,1,0,0,0,0],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_f20f24ff' },
    offsetX: 2,
    offsetY: 7,
  },
  stitchedMouth: {
    pixels: [
      [0,1,0,1,0,1,0,0],
      [1,1,1,1,1,1,1,1],
      [0,0,1,0,1,0,1,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 9,
  },
  lowWideFrown: {
    pixels: [
      [0,1,1,1,1,1,1,0],
      [1,0,0,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 10,
  },
  sideFlatMouth: {
    pixels: [
      [1,0,0,0,0,0,0],
      [0,1,1,1,1,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 4,
    offsetY: 9,
  },
  openFrown: {
    pixels: [
      [1,1,1,1],
      [1,1,1,1],
      [1,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 6,
    offsetY: 9,
  },
  darkSmirk: {
    pixels: [
      [1,1,1,1,1,1],
      [0,1,1,1,1,0],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 10,
  },
  chatteringTeeth: {
    pixels: [
      [0,1,1,1,1,1,1,1,1,0],
      [1,2,1,2,1,2,2,1,2,1],
      [0,1,1,1,1,1,1,1,1,0],
    ],
    slotMap: { 1: 'outline', 2: 'rgba_ffffffff' },
    offsetX: 3,
    offsetY: 9,
  },
  raisedSmallFrown: {
    pixels: [
      [0,1,1,1,1,0],
      [1,0,0,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 5,
    offsetY: 9,
  },
  crossedMouth: {
    pixels: [
      [1,0,0,1],
      [0,1,1,0],
      [1,0,0,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 6,
    offsetY: 9,
  },
  tallOpenMouth: {
    pixels: [
      [2,2],
      [2,2],
      [1,1],
      [1,1],
      [1,1],
    ],
    slotMap: { 1: 'highlight', 2: 'outline' },
    offsetX: 7,
    offsetY: 9,
  },
  wideOpenMouth: {
    pixels: [
      [1,1,1,1],
      [1,1,1,1],
      [1,1,1,1],
    ],
    slotMap: { 1: 'outline' },
    offsetX: 6,
    offsetY: 9,
  },
};

export default mouth;
