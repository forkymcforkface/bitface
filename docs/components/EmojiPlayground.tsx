import { useState } from 'react';
import type { EmojiConfig } from '../../src/types.ts';
import { generateEmoji, generateEmojiSymbolGrid, getAvailableEmojiParts, getEmojiPartThumbnail } from '../../src/renderer/emoji/index.ts';
import { EMOJI_PRESETS, EMOJI_PRESET_NAMES } from '../../src/renderer/parts/emoji/index.ts';
import { getEmojiAnimationNames } from '../../src/renderer/emoji/animations.ts';
import { gridToSvg } from '../../src/renderer/svg.ts';
import { SKIN_PRESETS, BG_PRESETS } from '../../src/renderer/palette.ts';
import { PartSelector } from './PartSelector.tsx';
import { ColorPicker } from './ColorPicker.tsx';
import { SvgPreview } from './Preview.tsx';
import { EmojiPreview } from './EmojiPreview.tsx';

const ANIMATION_OPTIONS = ['none', ...getEmojiAnimationNames()];
const PART_CATEGORIES = ['eyes', 'eyebrows', 'nose', 'mouth', 'accessories'] as const;

function randomChoice(values: string[]): string {
  return values[Math.floor(Math.random() * values.length)];
}

function itemLabel(name: string): string {
  const words = name.replace(/([a-z])([A-Z])/g, '$1 $2');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function getPresetThumbnail(name: string, backgroundColor = 'transparent'): string {
  const index = EMOJI_PRESET_NAMES.indexOf(name);
  const config = EMOJI_PRESETS[index];
  if (config) return generateEmoji({ ...config, backgroundColor });

  const grid = generateEmojiSymbolGrid(name);
  if (!grid) return '';
  return gridToSvg(grid, backgroundColor);
}

export function EmojiPlayground() {
  const [config, setConfig] = useState<EmojiConfig>({ ...EMOJI_PRESETS[0]!, backgroundColor: 'transparent' });
  const [bgPreset, setBgPreset] = useState('transparent');
  const [preset, setPreset] = useState<number | null>(0);
  const [animation, setAnimation] = useState('none');
  const [intensity, setIntensity] = useState(50);
  const [randomizedParts, setRandomizedParts] = useState<Set<string>>(new Set([...PART_CATEGORIES, 'color']));
  const parts = getAvailableEmojiParts();
  const presetName = preset === null ? '' : EMOJI_PRESET_NAMES[preset];
  const isSymbol = preset !== null && !EMOJI_PRESETS[preset];
  const resolvedAnimation = animation === 'none' ? undefined : animation;

  function updateField(category: keyof EmojiConfig, value: string) {
    setPreset(null);
    setConfig((prev) => ({ ...prev, [category]: value }));
    setRandomizedParts((prev) => {
      const next = new Set(prev);
      next.delete(category);
      return next;
    });
  }

  function randomizeField(category: keyof EmojiConfig, choices: string[]) {
    setPreset(null);
    setConfig((prev) => ({ ...prev, [category]: randomChoice(choices) }));
    setRandomizedParts((prev) => new Set(prev).add(category));
  }

  function randomize() {
    setPreset(null);
    setConfig((prev) => {
      const next = { ...prev };
      for (const category of PART_CATEGORIES) {
        if (!randomizedParts.has(category)) continue;
        next[category] = randomChoice(parts[category]);
      }
      if (randomizedParts.has('color')) {
        next.color = randomChoice(Object.keys(SKIN_PRESETS));
      }
      return next;
    });
  }

  function selectPreset(value: string) {
    const index = EMOJI_PRESET_NAMES.indexOf(value);
    if (index < 0) return;
    setPreset(index);
    const selected = EMOJI_PRESETS[index];
    if (selected) setConfig((prev) => ({ ...selected, backgroundColor: prev.backgroundColor }));
  }

  function handleBgChange(name: string) {
    setBgPreset(name);
    setConfig((prev) => ({ ...prev, backgroundColor: BG_PRESETS[name] ?? name }));
  }

  return (
    <div className="grid grid-cols-2 gap-8 items-start max-sm:grid-cols-1">
      <div className="sticky top-4 max-sm:static">
        {isSymbol ? (
          <SvgPreview
            svg={getPresetThumbnail(presetName, config.backgroundColor)}
            config={{ preset: presetName, backgroundColor: config.backgroundColor }}
          />
        ) : (
          <EmojiPreview config={config} animation={resolvedAnimation} intensity={resolvedAnimation ? intensity : undefined} />
        )}
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-3 flex-wrap">
          <button
            className="flex-1 min-w-30 px-4 py-2.5 bg-accent text-white border-none rounded-lg text-sm font-semibold cursor-pointer transition-colors duration-150 hover:bg-accent-hover active:bg-accent-active"
            onClick={randomize}
          >
            Randomize
          </button>
          <select
            className="toolbar-select flex-1 min-w-30 px-4 py-2.5 pr-8 bg-card text-[#e0e0e0] border-2 border-border rounded-lg text-sm font-semibold font-[inherit] cursor-pointer transition-colors duration-150 hover:border-hover-border focus:border-accent focus:outline-none"
            value={animation}
            onChange={(e) => setAnimation(e.target.value)}
            disabled={isSymbol}
          >
            {ANIMATION_OPTIONS.map((name) => (
              <option key={name} value={name}>
                {name === 'none' ? 'No Animation' : name.charAt(0).toUpperCase() + name.slice(1)}
              </option>
            ))}
          </select>
        </div>
        {!isSymbol && animation !== 'none' && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <label className="text-sm text-muted-light whitespace-nowrap min-w-[110px]">Intensity: {intensity}%</label>
              <input
                type="range"
                className="slider flex-1 h-1.5 bg-border rounded-sm outline-none"
                min={0}
                max={100}
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
              />
            </div>
          </div>
        )}
        <PartSelector
          category="emoji"
          label="Presets"
          variants={EMOJI_PRESET_NAMES}
          selected={presetName}
          getThumbnail={getPresetThumbnail}
          getLabel={itemLabel}
          onChange={selectPreset}
          onRandomize={() => selectPreset(randomChoice(EMOJI_PRESET_NAMES))}
        />
        {!isSymbol && PART_CATEGORIES.map((category) => {
          const variants = parts[category];
          return (
            <PartSelector
              key={category}
              category={category}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              variants={variants}
              selected={config[category]}
              getThumbnail={(value) => getEmojiPartThumbnail(category, value, config.color)}
              getLabel={itemLabel}
              onChange={(value) => updateField(category, value)}
              onRandomize={() => randomizeField(category, variants)}
              isRandomized={randomizedParts.has(category)}
            />
          );
        })}
        <div className="flex flex-col gap-4">
          {!isSymbol && (
            <ColorPicker
              label="Color"
              presets={SKIN_PRESETS}
              selected={config.color}
              onChange={(value) => updateField('color', value)}
              onRandomize={() => randomizeField('color', Object.keys(SKIN_PRESETS))}
              isRandomized={randomizedParts.has('color')}
            />
          )}
          <ColorPicker
            label="Background"
            presets={BG_PRESETS}
            selected={bgPreset}
            onChange={handleBgChange}
          />
        </div>
      </div>
    </div>
  );
}
