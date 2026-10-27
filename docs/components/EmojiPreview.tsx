import { useMemo, useState, useEffect } from 'react';
import type { EmojiConfig } from '../../src/types.ts';
import { generateEmoji } from '../../src/renderer/emoji/index.ts';
import { EMOJI_ANIMATIONS } from '../../src/renderer/emoji/animations.ts';
import { applyIntensity } from '../../src/renderer/animations.ts';
import { SvgPreview } from './Preview.tsx';

export function EmojiPreview({ config, animation, intensity }: { config: EmojiConfig; animation?: string; intensity?: number }) {
  const sequence = useMemo(() => {
    if (!animation) return undefined;
    const seq = EMOJI_ANIMATIONS[animation];
    if (!seq) return undefined;
    return intensity !== undefined ? applyIntensity(seq, intensity) : seq;
  }, [animation, intensity]);

  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    setFrameIndex(0);
  }, [sequence]);

  useEffect(() => {
    if (!sequence) return;
    const frame = sequence.frames[frameIndex];
    if (!frame) return;

    const timer = setTimeout(() => {
      setFrameIndex((i) => (i + 1) % sequence.frames.length);
    }, frame.duration);

    return () => clearTimeout(timer);
  }, [sequence, frameIndex]);

  const mergedConfig = useMemo(() => {
    if (!sequence) return config;
    const frame = sequence.frames[frameIndex];
    if (!frame) return config;
    return { ...config, ...frame.overrides };
  }, [config, sequence, frameIndex]);

  const svg = useMemo(() => generateEmoji(mergedConfig), [mergedConfig]);
  return <SvgPreview svg={svg} config={config} />;
}
