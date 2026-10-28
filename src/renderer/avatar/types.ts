import type { AVATAR_PARTS, AvatarCategory } from '../parts/avatar/index.ts';
import type { AVATAR_COLOR_PRESETS } from '../parts/avatar/palette.ts';

export type AvatarColorKey = keyof typeof AVATAR_COLOR_PRESETS;
export type AvatarSelections = {
  [K in AvatarCategory]: keyof (typeof AVATAR_PARTS)[K] | 'none';
};

/** Explicit part selections take precedence over random selection probabilities. */
export type AvatarConfig = Partial<AvatarSelections> &
  Partial<Record<AvatarColorKey, string>> &
  Partial<Record<`${AvatarCategory}Probability`, number>> & {
    seed?: string;
    backgroundColor?: string;
  };

export type ResolvedAvatarConfig = AvatarConfig & AvatarSelections & Record<AvatarColorKey, string>;
export type { AvatarCategory };
