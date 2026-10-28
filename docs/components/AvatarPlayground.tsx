import { useState } from 'react';
import {
  generateRandomAvatarConfig, getAvailableAvatarParts, getAvatarAnimationNames,
  getAvatarPartThumbnail, AVATAR_COLOR_PRESETS,
  getAvatarPartLabel, getAvatarColorLabel,
} from '../../src/renderer/avatar/index.ts';
import type { AvatarCategory, AvatarColorKey, AvatarConfig } from '../../src/renderer/avatar/index.ts';
import { BG_PRESETS } from '../../src/renderer/palette.ts';
import { PartSelector } from './PartSelector.tsx';
import { ColorPicker } from './ColorPicker.tsx';
import { AvatarPreview } from './AvatarPreview.tsx';

const parts = getAvailableAvatarParts();
const label = (name: string) => {
  const words = name.replace(/([a-z])([A-Z])/g, '$1 $2');
  return words.charAt(0).toUpperCase() + words.slice(1);
};

export function AvatarPlayground() {
  const [config, setConfig] = useState<AvatarConfig>(() => generateRandomAvatarConfig({ seed: 'bitface', eyes: 'variant01' }));
  const [background, setBackground] = useState('transparent');
  const [animation, setAnimation] = useState('none');
  const [intensity, setIntensity] = useState(50);
  const update = (key: string, value: string) => setConfig(previous => ({ ...previous, [key]: value }));

  return (
    <div className="grid grid-cols-2 gap-8 items-start max-sm:grid-cols-1">
      <div className="sticky top-4 max-sm:static">
        <AvatarPreview config={config} animation={animation} intensity={intensity} />
        <p className="mt-3 text-sm text-muted">
          <a href="https://www.dicebear.com/styles/pixel-art/" target="_blank" rel="noopener noreferrer" className="text-accent">Pixel Art by DiceBear</a> · CC0 1.0
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <button
          className="px-4 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold cursor-pointer hover:bg-accent-hover"
          onClick={() => setConfig(generateRandomAvatarConfig({ backgroundColor: config.backgroundColor }))}
        >Randomize</button>
        <label className="flex items-center gap-3 text-sm text-muted-light">
          Animation
          <select
            aria-label="Avatar animation"
            className="toolbar-select flex-1 px-4 py-2.5 bg-card border-2 border-border rounded-lg cursor-pointer"
            value={animation}
            onChange={event => setAnimation(event.target.value)}
          >
            {['none', ...getAvatarAnimationNames()].map(name => (
              <option key={name} value={name}>{name === 'none' ? 'No Animation' : label(name)}</option>
            ))}
          </select>
        </label>
        {animation !== 'none' && (
          <label className="flex items-center gap-3 text-sm text-muted-light">
            <span className="whitespace-nowrap min-w-[110px]">Intensity: {intensity}%</span>
            <input
              aria-label="Avatar animation intensity"
              type="range" min={0} max={100} value={intensity}
              className="slider flex-1 h-1.5 bg-border rounded-sm outline-none"
              onChange={event => setIntensity(Number(event.target.value))}
            />
          </label>
        )}
        {(Object.keys(parts) as AvatarCategory[]).map(category => (
          <PartSelector
            key={category}
            category={category}
            label={label(category)}
            variants={parts[category]}
            selected={config[category] ?? 'none'}
            onChange={value => update(category, value)}
            onRandomize={() => update(category, parts[category][Math.floor(Math.random() * parts[category].length)])}
            getThumbnail={name => getAvatarPartThumbnail(category, name, config)}
            getLabel={name => getAvatarPartLabel(category, name)}
            showLabels
          />
        ))}
        {(Object.keys(AVATAR_COLOR_PRESETS) as AvatarColorKey[]).map(key => (
          <div key={key}>
            <ColorPicker
              label={label(key)}
              presets={Object.fromEntries(AVATAR_COLOR_PRESETS[key].map(color => [color, color]))}
              selected={config[key] ?? ''}
              onChange={value => update(key, value)}
              getLabel={getAvatarColorLabel}
              showLabels
            />
            <label className="flex items-center gap-2 mt-2 text-xs text-muted-light">
              Custom color
              <input
                aria-label={`Custom ${label(key).toLowerCase()}`}
                type="color"
                value={config[key]?.slice(0, 7) ?? AVATAR_COLOR_PRESETS[key][0]}
                onChange={event => update(key, event.target.value)}
                className="w-8 h-6 cursor-pointer"
              />
            </label>
          </div>
        ))}
        <ColorPicker
          label="Background" presets={BG_PRESETS} selected={background}
          getLabel={name => getAvatarColorLabel(BG_PRESETS[name] ?? name)}
          showLabels
          onChange={value => {
            setBackground(value);
            update('backgroundColor', BG_PRESETS[value] ?? value);
          }}
        />
      </div>
    </div>
  );
}
