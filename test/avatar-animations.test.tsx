// @vitest-environment jsdom
import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  generateAvatar, generateAvatarGrid, getAvailableAvatarParts,
  getAvatarAnimation, getAvatarAnimationNames,
} from '../src/index.ts';
import type { AvatarConfig, AvatarAnimationName } from '../src/index.ts';
import { AvatarPreview } from '../docs/components/AvatarPreview.tsx';
import emojiAccessories from '../src/renderer/parts/emoji/accessories.ts';
import { EMOJI_COLOR_ROLES } from '../src/renderer/parts/emoji/palette.ts';

const base: AvatarConfig = Object.freeze({
  seed: 'animation-test',
  eyes: 'variant01', mouth: 'sad07', hair: 'none', beard: 'none',
  glasses: 'none', hat: 'none', clothes: 'variant03', accessories: 'variant01',
  eyesColor: '#123456', skinColor: '#ffdbac',
});

function normalizedSvg(config: AvatarConfig): string {
  const element = document.createElement('div');
  element.innerHTML = generateAvatar(config);
  return element.innerHTML;
}

function expectPreview(container: HTMLElement, config: AvatarConfig) {
  const previews = container.querySelectorAll('.preview-svg');
  expect(previews).toHaveLength(3);
  for (const preview of previews) expect(preview.innerHTML).toBe(normalizedSvg(config));
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.clearAllTimers();
  vi.useRealTimers();
});

describe('avatar animation playback', () => {
  const cases: [AvatarAnimationName, number, number, AvatarConfig][] = [
    ['idle', 3000, 150, { eyes: 'variant05' }],
    ['talk', 200, 200, { mouth: 'happy12' }],
    ['blink', 2500, 100, { eyes: 'variant12' }],
    ['emote', 500, 800, { eyes: 'variant09', mouth: 'happy12' }],
  ];

  it.each(cases)('%s shows the requested expression and restores selected parts', (animation, rest, duration, overrides) => {
    const { container } = render(<AvatarPreview config={base} animation={animation} />);
    expectPreview(container, base);
    act(() => vi.advanceTimersByTime(rest));
    expectPreview(container, { ...base, ...overrides });
    act(() => vi.advanceTimersByTime(duration));
    expectPreview(container, base);
  });

  it('sleepy closes the eyes and shows the Emoji symbol, then restores earrings and eyes', () => {
    const { container } = render(<AvatarPreview config={base} animation="sleepy" />);
    act(() => vi.advanceTimersByTime(2000));
    expectPreview(container, { ...base, eyes: 'sleepy', accessories: 'sleepSymbol' });
    act(() => vi.advanceTimersByTime(1200));
    expectPreview(container, base);
    expect(base.eyes).toBe('variant01');
    expect(base.accessories).toBe('variant01');
  });

  it('loops playback and uses updated selections when returning to the base frame', () => {
    const { container, rerender } = render(<AvatarPreview config={base} animation="talk" />);
    act(() => vi.advanceTimersByTime(200));
    const updated: AvatarConfig = { ...base, mouth: 'sad06', hairColor: '#ff0000' };
    rerender(<AvatarPreview config={updated} animation="talk" />);
    expectPreview(container, { ...updated, mouth: 'happy12' });
    act(() => vi.advanceTimersByTime(200));
    expectPreview(container, updated);
    act(() => vi.advanceTimersByTime(900));
    expectPreview(container, { ...updated, mouth: 'happy12' });
  });

  it('intensity changes speed and resets playback without leaving old timers', () => {
    const { container, rerender, unmount } = render(<AvatarPreview config={base} animation="idle" intensity={100} />);
    act(() => vi.advanceTimersByTime(599));
    expectPreview(container, base);
    act(() => vi.advanceTimersByTime(1));
    expectPreview(container, { ...base, eyes: 'variant05' });
    rerender(<AvatarPreview config={base} animation="idle" intensity={0} />);
    expectPreview(container, base);
    act(() => vi.advanceTimersByTime(14999));
    expectPreview(container, base);
    act(() => vi.advanceTimersByTime(1));
    expectPreview(container, { ...base, eyes: 'variant05' });
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('stopping or switching animation clears sleepy eyes and the symbol immediately', () => {
    const { container, rerender } = render(<AvatarPreview config={base} animation="sleepy" />);
    act(() => vi.advanceTimersByTime(2000));
    rerender(<AvatarPreview config={base} animation="blink" />);
    expectPreview(container, base);
    act(() => vi.advanceTimersByTime(2500));
    expectPreview(container, { ...base, eyes: 'variant12' });
    rerender(<AvatarPreview config={base} animation="none" />);
    expectPreview(container, base);
    expect(vi.getTimerCount()).toBe(0);
    act(() => vi.advanceTimersByTime(10000));
    expectPreview(container, base);
  });
});

describe('avatar animation parts and public API', () => {
  it('exposes all five animations and safely ignores unknown names', () => {
    expect(getAvatarAnimationNames()).toEqual(['idle', 'talk', 'blink', 'sleepy', 'emote']);
    for (const name of ['none', 'unknown', '__proto__', 'constructor']) expect(getAvatarAnimation(name)).toBeUndefined();
    expect(getAvatarAnimation('idle', NaN)).toEqual(getAvatarAnimation('idle', 50));
    expect(getAvatarAnimation('idle', -10)).toEqual(getAvatarAnimation('idle', 0));
    expect(getAvatarAnimation('idle', 110)).toEqual(getAvatarAnimation('idle', 100));
  });

  it('makes sleepy eyes and the sleep symbol selectable parts', () => {
    const parts = getAvailableAvatarParts();
    expect(parts.eyes).toContain('sleepy');
    expect(parts.accessories).toContain('sleepSymbol');
    const sleepy = generateAvatarGrid({ ...base, eyes: 'sleepy' });
    // Closed eyelids use the chosen eye color and do not keep the open eye whites.
    expect(sleepy[6].slice(4, 12)).toEqual(['#123456', '#ffdfb4', '#123456', '#ffdfb4', '#ffdfb4', '#123456', '#ffdfb4', '#123456']);
    expect(sleepy[7][5]).toBe('#123456');
    expect(sleepy[7][10]).toBe('#123456');
  });

  it('reuses every sleep-symbol pixel and color from Emoji, above hair and hats', () => {
    const config: AvatarConfig = { ...base, eyes: 'sleepy', accessories: 'sleepSymbol', hair: 'short14', hat: 'variant06' };
    const grid = generateAvatarGrid(config);
    const withoutSymbol = generateAvatarGrid({ ...config, accessories: 'none' });
    const source = emojiAccessories.sleepSymbol;
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const slot = source.pixels[y - source.offsetY]?.[x - source.offsetX] ?? 0;
        if (slot) expect(grid[y][x]).toBe(EMOJI_COLOR_ROLES[source.slotMap[slot]].slice(0, 7));
        else expect(grid[y][x]).toBe(withoutSymbol[y][x]);
      }
    }
  });
});
