// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, render, act, fireEvent, cleanup } from '@testing-library/react';
import { useAvatar, useAnimatedAvatar, Avatar } from '../src/react.tsx';
import { generateFace } from '../src/renderer/index.ts';
import type { FaceConfig } from '../src/types.ts';
import { generateEmoji } from '../src/renderer/emoji/index.ts';
import { EMOJI_PRESETS } from '../src/renderer/parts/emoji/index.ts';
import { EmojiPreview } from '../docs/components/EmojiPreview.tsx';
import { EmojiPlayground } from '../docs/components/EmojiPlayground.tsx';

const CONFIG: FaceConfig = {
  faceShape: 'round',
  eyes: 'big',
  eyebrows: 'thick',
  mouth: 'smile',
  nose: 'small',
  ears: 'small',
  hair: 'short',
  beard: 'none',
  accessories: 'none',
  skinColor: 'medium',
  hairColor: 'black',
  eyeColor: 'brown',
};

describe('useAvatar', () => {
  it('returns SVG matching generateFace for a given config', () => {
    const { result } = renderHook(() => useAvatar(CONFIG));
    expect(result.current).toBe(generateFace(CONFIG));
  });

  it('returns stable SVG when no config is provided (random)', () => {
    const { result, rerender } = renderHook(() => useAvatar());
    const first = result.current;
    expect(first).toMatch(/^<svg/);
    rerender();
    expect(result.current).toBe(first);
  });
});

describe('useAnimatedAvatar', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('returns static SVG when animation is undefined', () => {
    const { result } = renderHook(() => useAnimatedAvatar(CONFIG, undefined));
    expect(result.current).toBe(generateFace(CONFIG));
  });

  it('cycles through frames with blink animation', () => {
    const { result } = renderHook(() => useAnimatedAvatar(CONFIG, 'blink'));
    const frame0 = result.current;

    // blink: frame 0 has duration 2500ms, frame 1 overrides eyes: 'narrow'
    act(() => { vi.advanceTimersByTime(2500); });
    const frame1 = result.current;

    expect(frame0).not.toBe(frame1);
  });
});

describe('Avatar component', () => {
  it('renders a div with SVG content', () => {
    const { container } = render(<Avatar config={CONFIG} />);
    const div = container.firstElementChild as HTMLElement;
    expect(div.tagName).toBe('DIV');
    expect(div.innerHTML).toMatch(/^<svg/);
  });

  it('applies size to style', () => {
    const { container } = render(<Avatar config={CONFIG} size={64} />);
    const div = container.firstElementChild as HTMLElement;
    expect(div.style.width).toBe('64px');
    expect(div.style.height).toBe('64px');
  });

  it('applies className', () => {
    const { container } = render(<Avatar config={CONFIG} className="my-avatar" />);
    const div = container.firstElementChild as HTMLElement;
    expect(div.className).toBe('my-avatar');
  });

  it('sets pixelated image rendering', () => {
    const { container } = render(<Avatar config={CONFIG} />);
    const div = container.firstElementChild as HTMLElement;
    expect(div.style.imageRendering).toBe('pixelated');
  });

  it('renders random face when no config is provided', () => {
    const { container } = render(<Avatar />);
    const div = container.firstElementChild as HTMLElement;
    expect(div.innerHTML).toMatch(/^<svg/);
  });
});

describe('Emoji preview', () => {
  const config = {
    ...EMOJI_PRESETS[0]!,
    color: 'cyan',
    eyebrows: 'angry',
    mouth: 'flat',
    accessories: 'halo',
  };

  function expectedSvg(overrides = {}) {
    const element = document.createElement('div');
    element.innerHTML = generateEmoji({ ...config, ...overrides });
    return element.innerHTML;
  }

  beforeEach(() => {
    cleanup();
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it.each([
    { name: 'idle', delay: 3000, holds: [150], overrides: { eyes: 'closed' } },
    { name: 'talk', delay: 200, holds: [200], overrides: { mouth: 'darkSmirk' } },
    { name: 'blink', delay: 2500, holds: [100, 100, 100], overrides: { eyes: 'closed' } },
    { name: 'sleepy', delay: 2000, holds: [400, 800], overrides: { eyes: 'sleepyWide', accessories: 'sleepSymbol' } },
    { name: 'emote', delay: 500, holds: [400, 400], overrides: { eyebrows: 'raised', mouth: 'darkSmirk' } },
  ])('$name displays the requested parts and restores the selected parts', ({ name, delay, holds, overrides }) => {
    const { container } = render(<EmojiPreview config={config} animation={name} intensity={50} />);
    const preview = () => container.querySelector('.preview-svg')!.innerHTML;
    expect(preview()).toBe(expectedSvg());

    act(() => { vi.advanceTimersByTime(delay); });
    expect(preview()).toBe(expectedSvg(overrides));
    expect(preview()).not.toBe(expectedSvg());

    for (let i = 0; i < holds.length; i++) {
      act(() => { vi.advanceTimersByTime(holds[i]); });
      expect(preview()).toBe(expectedSvg(i === holds.length - 1 ? {} : overrides));
    }
    expect(JSON.parse(container.querySelector('pre')!.textContent!)).toEqual(config);
  });

  it('uses the Faces intensity scaling', () => {
    const { container } = render(<EmojiPreview config={config} animation="idle" intensity={100} />);
    act(() => { vi.advanceTimersByTime(599); });
    expect(container.querySelector('.preview-svg')!.innerHTML).toBe(expectedSvg());
    act(() => { vi.advanceTimersByTime(1); });
    expect(container.querySelector('.preview-svg')!.innerHTML).toBe(expectedSvg({ eyes: 'closed' }));
  });

  it('stops animation timers when disabled or unmounted', () => {
    const { rerender, unmount } = render(<EmojiPreview config={config} animation="talk" />);
    expect(vi.getTimerCount()).toBe(1);
    rerender(<EmojiPreview config={config} />);
    expect(vi.getTimerCount()).toBe(0);
    rerender(<EmojiPreview config={config} animation="blink" />);
    expect(vi.getTimerCount()).toBe(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('resets the frame when the animation changes and renders new selected parts', () => {
    const { container, rerender } = render(<EmojiPreview config={config} animation="talk" />);
    act(() => { vi.advanceTimersByTime(200); });
    expect(container.querySelector('.preview-svg')!.innerHTML).toBe(expectedSvg({ mouth: 'darkSmirk' }));
    rerender(<EmojiPreview config={{ ...config, color: 'red' }} animation="idle" />);
    expect(container.querySelector('.preview-svg')!.innerHTML).toBe(expectedSvg({ color: 'red' }));
  });

  it('randomizes only unlocked parts and offers the five Emoji animations', () => {
    const { container, getByRole, getByTitle, getByText } = render(<EmojiPlayground />);
    const select = getByRole('combobox') as HTMLSelectElement;
    expect(Array.from(select.options, option => option.value)).toEqual(['none', 'idle', 'talk', 'blink', 'sleepy', 'emote']);
    fireEvent.click(getByTitle('cyan'));
    const random = vi.spyOn(Math, 'random').mockReturnValue(0);
    try {
      fireEvent.click(getByText('Randomize', { exact: true }));
      expect(JSON.parse(container.querySelector('pre')!.textContent!)).toEqual({
        color: 'cyan', eyes: 'none', eyebrows: 'none', nose: 'none', mouth: 'none', accessories: 'none', backgroundColor: 'transparent',
      });
    } finally {
      random.mockRestore();
    }
  });

  it('preserves the background across layered presets, symbols and randomization', () => {
    const { container, getByTitle, getByText } = render(<EmojiPlayground />);
    fireEvent.click(getByTitle('sky'));
    for (const title of ['Steam Puffed Squint', 'Rainbow Heart']) {
      fireEvent.click(getByTitle(title));
      expect(JSON.parse(container.querySelector('pre')!.textContent!).backgroundColor).toBe('#87CEEB');
      expect(container.querySelector('.preview-svg svg > rect')!.getAttribute('fill')).toBe('#87CEEB');
    }
    fireEvent.click(getByText('Randomize', { exact: true }));
    expect(JSON.parse(container.querySelector('pre')!.textContent!).backgroundColor).toBe('#87CEEB');
  });
});
