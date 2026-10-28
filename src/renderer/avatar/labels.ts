import { AVATAR_COLOR_NAMES } from '../parts/avatar/color-names.ts';

const ITEM_NAMES: Record<string, string> = {
  accessories: 'Accessory', beard: 'Beard', clothes: 'Clothes', eyes: 'Eyes',
  glasses: 'Glasses', hair: 'Hair', hat: 'Hat', mouth: 'Mouth',
};

/** Friendly numbered labels, preserving the source groups and stored IDs. */
export function getAvatarPartLabel(category: string, name: string): string {
  if (name === 'none') return 'None';
  if (category === 'eyes' && name === 'sleepy') return 'Sleepy';
  if (category === 'accessories' && name === 'sleepSymbol') return 'Sleep symbol';
  const match = /^(variant|long|short|happy|sad|dark|light)(\d+)$/.exec(name);
  if (!match) return name;
  const [, group, digits] = match;
  const number = Number(digits);
  if (group === 'variant') {
    return Object.prototype.hasOwnProperty.call(ITEM_NAMES, category)
      ? `${ITEM_NAMES[category]} ${number}` : name;
  }
  const prefix = group.charAt(0).toUpperCase() + group.slice(1);
  return group === 'dark' || group === 'light' ? `${prefix} glasses ${number}` : `${prefix} ${number}`;
}

export function getAvatarColorLabel(hex: string): string {
  const key = hex.toLowerCase();
  return Object.prototype.hasOwnProperty.call(AVATAR_COLOR_NAMES, key) ? AVATAR_COLOR_NAMES[key] : hex;
}
