# DiceBear Pixel Art avatars

Bitface includes all 139 variants from [DiceBear Pixel Art](https://www.dicebear.com/styles/pixel-art/). The artwork is by DiceBear under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/), with its [original Figma source](https://www.figma.com/community/file/1198754108850888330).

The requested [forkymcforkface/dicebear repository](https://github.com/forkymcforkface/dicebear) contains DiceBear's core and website. Its current `11.x` branch points to [dicebear/styles](https://github.com/dicebear/styles) for artwork. This integration uses that repository's `src/pixel-art.json`, Git blob SHA `0bfea55e22db113e42896bca78cf79c2af087639`, copied into `scripts/sources/dicebear-pixel-art.json` for reproducible imports. The style definition contains no animations.

## Feature inventory

Every source variant keeps its original name. Each feature has a TypeScript file under `src/renderer/parts/avatar/`:

| Feature | File | Variants | Default visibility when generated | Color option |
| --- | --- | --- | --- | --- |
| Accessories (earrings) | `accessories.ts` | `variant01`–`variant04` (4) | 10% | `accessoriesColor` |
| Beard | `beard.ts` | `variant01`–`variant08` (8) | 5% | `hairColor` |
| Clothes | `clothes.ts` | `variant01`–`variant23` (23) | 100% | `clothingColor` |
| Eyes | `eyes.ts` | `variant01`–`variant12` (12) | 100% | `eyesColor` |
| Glasses | `glasses.ts` | `dark01`–`dark07`, `light01`–`light07` (14) | 20% | `glassesColor` |
| Hair | `hair.ts` | `long01`–`long21`, `short01`–`short24` (45) | 100% | `hairColor` |
| Hat | `hat.ts` | `variant01`–`variant10` (10) | 5% | `hatColor` |
| Mouth | `mouth.ts` | `happy01`–`happy13`, `sad01`–`sad10` (23) | 100% | `mouthColor` |
| Skin/body | `body.ts` | One fixed head, ears, neck and torso | Always | `skinColor` |

The source does not provide separate face shapes, eyebrows, noses, or ears. Its head and ears belong to the fixed body pattern. The `long` and `short` hair IDs are source names; semantic hair-length tags can differ from those names.

Bitface adds two selectable parts for animation: `eyes: 'sleepy'` in `sleepy-eyes.ts` and `accessories: 'sleepSymbol'` in `sleep-symbol.ts`. This gives 141 parts in total, including the 139 source variants. Sleepy eyes are closed eyelids fitted to the avatar's eye positions. The sleep symbol reuses the Emoji artwork, colors, and position directly, and is drawn above hair and hats. These additions are separate from generated source files, so importing the DiceBear artwork again preserves them. Seeded random generation continues to use the original 139 source variants; the new parts can be selected explicitly or by the sleepy animation.

`palette.ts` includes all source color values:

| Option | Presets (hex) |
| --- | --- |
| `accessoriesColor` | `a9a9a9`, `d3d3d3`, `daa520`, `fafad2`, `ffd700` |
| `clothingColor` | `00b159`, `03396c`, `428bca`, `44c585`, `5bc0de`, `88d8b0`, `ae0001`, `d11141`, `ff6f69`, `ffc425`, `ffd969`, `ffeead` |
| `eyesColor` | `588387`, `5b7c8b`, `647b90`, `697b94`, `76778b`, `876658` |
| `glassesColor` | `191919`, `323232`, `43677d`, `4b4b4b`, `5f705c`, `a04b5d` |
| `hairColor` | `009bbd`, `28150a`, `603015`, `603a14`, `611c17`, `612616`, `83623b`, `91cb15`, `a78961`, `bd1700`, `cab188` |
| `hatColor` | `2663a3`, `2e1e05`, `3d8a6b`, `614f8a`, `989789`, `a62116`, `cc6192` |
| `mouthColor` | `c98276`, `d29985`, `de0f0d`, `e35d6a` |
| `skinColor` | `8d5524`, `a26d3d`, `b68655`, `cb9e6e`, `e0b687`, `eac393`, `f5cfa0`, `ffdbac` |

Variant tags are preserved in the part definitions: `accessory:earrings`, `facialHair`, `eyewear:sunglasses`, `eyewear:glasses`, `hairLength:long`, `hairLength:medium`, `hairLength:short`, `hairLength:bald`, `headwear:beanie`, `headwear:cap`, `headwear:hat`, `mood:positive`, and `mood:negative`.

## Use in Bitface

```ts
import {
  generateAvatar,
  generateAvatarGrid,
  generateRandomAvatarConfig,
  getAvailableAvatarParts,
  getAvatarPartThumbnail,
  AVATAR_COLOR_PRESETS,
} from '@ignaciocabeza/bitface';
import type { AvatarConfig } from '@ignaciocabeza/bitface';

const config: AvatarConfig = {
  seed: 'Felix',
  hair: 'short03',
  eyes: 'variant04',
  mouth: 'happy05',
  clothes: 'variant12',
  glasses: 'light02',
  beard: 'none',
  hat: 'none',
  skinColor: '#ffdbac',
  hairColor: '#603015',
  clothingColor: '#428bca',
  backgroundColor: 'transparent',
};

const svg = generateAvatar(config);
const grid = generateAvatarGrid(config);
const randomConfig = generateRandomAvatarConfig();
const variants = getAvailableAvatarParts();
const thumbnail = getAvatarPartThumbnail('hair', 'long01', config);
const skinPalette = AVATAR_COLOR_PRESETS.skinColor;
```

- `generateAvatar(config?)` returns a 16×16 SVG with crisp pixel edges. The default background is transparent.
- `generateAvatarGrid(config?)` returns a 16×16 grid of hex colors or `null`.
- `generateRandomAvatarConfig(overrides?)` returns concrete typed part and color selections. Without a seed it generates a fresh seed; passing a seed reproduces the result.
- `getAvailableAvatarParts()` lists every source variant, the new sleepy eyes and sleep symbol, plus `none` for hiding each feature.
- `getAvatarPartThumbnail(category, name, config?)` previews an isolated part with the supplied colors on a transparent background. Unknown parts yield an empty SVG.
- `AVATAR_COLOR_PRESETS` exports all eight palettes; `AVATAR_FEATURES` exports the source visibility probabilities and feature-to-color mapping.

Missing selections and colors are chosen deterministically from `seed` (default `bitface`). Use `accessoriesProbability`, `beardProbability`, `clothesProbability`, `eyesProbability`, `glassesProbability`, `hairProbability`, `hatProbability`, and `mouthProbability` to set visibility from 0 to 100 for unselected parts. Explicit part selections always take precedence, including `none`. Colors accept 3-, 4-, 6-, or 8-digit hex with or without `#`; invalid values fall back to the seeded palette choice. `backgroundColor` follows Bitface's existing hex validation and requires `#`, or `transparent`.

The docs playground's **Avatar** tab exposes every feature and palette, custom color inputs, randomization, SVG download, and SVG/JSON copy controls. Parts use numbered display labels: `variant04` becomes **Beard 4** in the beard picker, while source groups remain **Long 1**, **Short 1**, **Happy 1**, **Sad 1**, **Dark glasses 1**, and **Light glasses 1**. Source IDs remain unchanged in configurations and the TypeScript artwork files. `getAvatarPartLabel(category, name)` exports the same label formatting for other interfaces.

Color swatches display generic names such as Blue, Navy, Teal, Brown, and Pink, with Light/Dark qualifiers where useful. Skin colors use Dark brown, Brown, Light brown, Tan, Warm beige, Light beige, Peach, and Light peach, from darkest to lightest. Accessible labels and tooltips also include the exact hex value. `AVATAR_COLOR_NAMES` and `getAvatarColorLabel(hex)` export these labels, which are maintained in `scripts/sources/avatar-color-names.json`. These are descriptive interface labels; the original 65 palette/background values are preserved.

Framework users can render the SVG string directly; the existing framework `Avatar` components continue to accept `FaceConfig`.

## Avatar animations and intensity

The Avatar playground includes an animation selector and an intensity slider, using the same timing scale as Face and Emoji. Every expression returns to the user's selected parts; the sleepy animation also restores the selected accessories.

| Animation | Temporary parts | Return |
| --- | --- | --- |
| `idle` | Eyes 5 (`eyes: 'variant05'`) | Selected eyes |
| `talk` | Happy 12 (`mouth: 'happy12'`) | Selected mouth |
| `blink` | Eyes 12 (`eyes: 'variant12'`) | Selected eyes |
| `sleepy` | `eyes: 'sleepy'`, `accessories: 'sleepSymbol'` | Selected eyes and accessories |
| `emote` | Eyes 9 and Happy 12 together | Selected eyes and mouth |

Intensity runs from 0 to 100: 0 is five times slower, 50 is normal speed, and 100 is up to five times faster. Individual frames have a 50 ms minimum. Changing the animation or intensity starts its loop at the base frame. Selecting No Animation restores the selected appearance and stops playback.

```ts
import { generateAvatar, getAvatarAnimation, getAvatarAnimationNames } from '@ignaciocabeza/bitface';

const names = getAvatarAnimationNames(); // idle, talk, blink, sleepy, emote
const sequence = getAvatarAnimation('emote', 75)!;
const frame = sequence.frames[1];
const svg = generateAvatar({ ...config, ...frame.overrides });
// Schedule the next frame after frame.duration milliseconds.
```

`AVATAR_ANIMATIONS` exports the base sequences, and `AvatarAnimationName`, `AvatarAnimationFrame`, and `AvatarAnimationSequence` provide their types. `getAvatarAnimation(name, intensity?)` returns a scaled sequence, or `undefined` for an unknown name. Overrides use `AvatarConfig`, and empty overrides mean the selected base configuration. Playback uses JavaScript timers, like the existing previews; SVG download saves the currently displayed frame.

## Rendering and DiceBear API differences

The source canvas order is body → accessories → clothes → eyes → glasses → beard → mouth → hair → hat. Numeric patterns preserve this order, white/black highlight opacity, and the beard's group mask opacity. Patterns extend the existing `PartPattern` format with layered fills and part opacity. The renderer composites these into a grid and uses Bitface's existing SVG serializer. Artwork needs no runtime dependency, network request, image asset, or SVG mask IDs.

The importer snaps the source's fractional clothing highlight to the 16×16 pixel grid using `crispEdges` rules. Generated patterns scale as whole pixels; subpixel detail from the original SVG is represented at this base resolution. Raster comparisons allow up to two channel levels of rounding difference between compositors.

This is Bitface's native part API. Its seeded choices are independent of DiceBear's PRNG. It does not accept DiceBear's option objects or guarantee identical avatars for the same DiceBear seed. DiceBear's [shared core options](https://www.dicebear.com/customize/options/) additionally offer flip, rotation, scale, translation, output size, rounded clipping, accessible titles, SVG ID randomization, tag filters, weighted/array variant selection, array palettes, gradients, font controls, and animation controls. These belong to DiceBear's engine and are outside this part import. Pixel Art itself declares no animation or text elements. The artwork's tags are retained as metadata; Bitface does not apply tag filters.

## Regenerate and verify

```sh
node scripts/import-dicebear-avatar.mjs
npm test
npm run build
npm run build:docs
```

`scripts/sources/dicebear-pixel-art.json` is the pinned upstream input. The importer regenerates the eight feature files, body, palettes, and the color name table from `scripts/sources/avatar-color-names.json`. `test/avatar.test.ts` renders the original SVG definition with the development-only `@resvg/resvg-js` package and compares its pixels against Bitface for every variant and combined avatars. It also checks variant inventories, palettes, semantic tags, deterministic seeds, probabilities, and input validation.
