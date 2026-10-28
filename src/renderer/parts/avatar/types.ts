import type { PartPattern } from '../../../types.ts';

/** A numeric pixel pattern with SVG fill opacity preserved. */
export interface AvatarLayer extends PartPattern {
  opacity?: number;
}

/** Layers are composited together before applying the part's mask opacity. */
export interface AvatarPart {
  layers: AvatarLayer[];
  opacity?: number;
  tags?: string[];
}
