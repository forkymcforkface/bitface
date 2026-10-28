import { useEffect, useMemo, useState } from 'react';
import { generateAvatar, getAvatarAnimation } from '../../src/renderer/avatar/index.ts';
import type { AvatarConfig } from '../../src/renderer/avatar/types.ts';
import { SvgPreview } from './Preview.tsx';

export function AvatarPreview({ config, animation, intensity = 50 }: {
  config: AvatarConfig;
  animation?: string;
  intensity?: number;
}) {
  const sequence = useMemo(() => getAvatarAnimation(animation, intensity), [animation, intensity]);
  const [playback, setPlayback] = useState({ sequence, index: 0 });

  useEffect(() => {
    setPlayback({ sequence, index: 0 });
    if (!sequence || !sequence.frames.length) return;
    let index = 0;
    let timer: ReturnType<typeof setTimeout>;
    const advance = () => {
      index = (index + 1) % sequence.frames.length;
      setPlayback({ sequence, index });
      timer = setTimeout(advance, sequence.frames[index].duration);
    };
    timer = setTimeout(advance, sequence.frames[0].duration);
    return () => clearTimeout(timer);
  }, [sequence]);

  // Switching animation/intensity starts at the base frame immediately.
  const index = playback.sequence === sequence ? playback.index : 0;
  const overrides = sequence?.frames[index]?.overrides;
  const svg = useMemo(() => generateAvatar({ ...config, ...overrides }), [config, overrides]);
  return <SvgPreview svg={svg} config={config} />;
}
