import { createHash } from 'node:crypto';
import { describe, it, expect } from 'vitest';
import type { PixelGrid } from '../src/types.ts';
import { generateEmoji, generateEmojiGrid, generateEmojiSymbolGrid, getAvailableEmojiParts, getEmojiPartThumbnail } from '../src/renderer/emoji/index.ts';
import { EMOJI_PARTS, EMOJI_PRESETS, EMOJI_PRESET_NAMES, EMOJI_COLOR_ROLES, getEmojiPart } from '../src/renderer/parts/emoji/index.ts';
import { ANIMATIONS } from '../src/renderer/animations.ts';
import { EMOJI_ANIMATIONS, getEmojiAnimationNames } from '../src/renderer/emoji/animations.ts';
import { SKIN_PRESETS, resolveSkinHighlight, resolveSkinShadow } from '../src/renderer/palette.ts';

describe('Emoji animations', () => {
  it('keeps the original Faces frame timings without suffering', () => {
    expect(getEmojiAnimationNames()).toEqual(['idle', 'talk', 'blink', 'sleepy', 'emote']);
    for (const name of getEmojiAnimationNames()) {
      expect(EMOJI_ANIMATIONS[name].frames.map(frame => frame.duration)).toEqual(
        ANIMATIONS[name].frames.map(frame => frame.duration)
      );
      for (const frame of EMOJI_ANIMATIONS[name].frames) {
        for (const [category, variant] of Object.entries(frame.overrides)) {
          expect(getEmojiPart(category, variant)).toBeDefined();
        }
      }
    }
  });
});

const expectedHashes = [
  "482c9a92b00d9d86ff0df2704effe77e56260e04fe6cb29865cecbd93d82b678",
  "0e1c423502108130a016b4bb7dc89edbe58ce769ef80a98d563888fb2b5feb6d",
  "010764b5fd1072fb879d8d5b4861020fcc3e31f255be6759007ba74ee4cec225",
  "4fc867af1d0f316a25e4636b87b701225724f9ce2979df470744be0b4f9d63cc",
  "307b5ca0899acebbd463899873528c7df614f99cea867ddca3d1d32f88a9537d",
  "48900839b6275132d38e226ed985ad8465bcf62793544165a73b147964758453",
  "fcddbad684b645c31bd898c83401803a4d02af9331ed7aa26b793782420ccb0b",
  "5d77036ee5db201aca0a42878b86c408a714710a67da952dfe354ba5349e33e7",
  "579a8806c6b887ca248fd92e6ff7ea2d41ba6f4f1b3177e6c926772dcdea3b0d",
  "9aef6367d9f48f3b3632202a4e84839d29e36f308af7cec8b7080d6816887704",
  "4c86ec92f88b8d51ab38e4a245fc028124f58aba0d04210760fa32699283c4c3",
  "ad7f335592c822e51806f53880d13f4ca75ccf97a842a3bfd38cd31eb5cb700d",
  "b3af415c221d3794af39f8116e4135b22338cd3b14224418931bf3633bbe3f3a",
  "d35ec03db7f6544a262821fdc3114709fe544086dc6c57575615648e4626ba6d",
  "6a4f7f35cbc061a672a684445f2cf51246f8e249fd8ab8952d71a630c49ea5be",
  "cf03b990e1affcd88e30bf84c9dfd74b8d152bcc1bc334737bc921c543aa4621",
  "95811f48749c7a7cec40cad20a332fe1d52aed66e277ff8f5799b448a175379a",
  "5dfe3c99dd970ca70d2def94e2d1c62813e45f2313da59d0eb1591204c174efa",
  "469e80c123a3df2398ebf0a6291de093b6908825dc9b27134b0a632a8df56bbc",
  "9317226b0750dd7c6778ee82846f3e4a70dfb95247f133c489ba9275e803b4c5",
  "8ad57d206e1aab946ebcb79e01890b30370a883fefc9d12dd8c1e962b068ace7",
  "5e783ec607233029770c27e3f4ebc8f481a2dae390928a867bde288a907ead36",
  "06657e47eb266d76cf371432934b8793b7cb22f418ecf1137be26a7a87b5fb87",
  "a81a2a03782207ca41ec766f3a7adf867b1e7fae58164527bae006ebbc477c6d",
  "04ef8aa39856c31504911445ec280b21387d30b8bceefc5d0ad2298f9cad22ea",
  "5124087bea59fb00cce4950e53c4705a41d901a1f442a9840587287b65ebf921",
  "e23d3479f531d58cae3d0f7e402c71ad3e0f7e7e95c4ffc4f95baee8d03aa498",
  "732bafa49643746635a2279838fe6a53030eff8e87c91e8f8ba011baf942f58c",
  "2a716c0050e8a6c29ea176742104809614227e333d6e5a8805f3310bcbd58752",
  "934e8b55e99172036f5b10fd31c95b18bad5424c23b94cf2c4020268a73d7a14",
  "a40856a8eab131c34bef8a47c20776cf0ae2e742b23e5d43c4822f242b4e5993",
  "d767fecf0ecfe739c60fc072f42d9f49f3f8258ff05ec0a0825eb33f35c02a2e",
  "32715e8a368887cda8df6c96b0cf9f16376aec76b5cce8ecf191a96b86813123",
  "2864fa3b955190ed6abf03fe670d076d5305b2646a77dbc3d7bf50c1f4856e90",
  "3cc9f68e27107ba75e4675bf7cc57ef4294c341fff8e48475af1d52a71fb716b",
  "8d531603746c4844c872850ed24098da13fd7447c3002b206de31be951159c3b",
  "5c5b27214eb19aa6c4c60fb861c9e91b118f1131e81c1b9d285ca0d0535e60d3",
  "8c515a1ada1d91ccbbe4a0ec9a837e316f6c0745a855b2d294bece4d95b45bf2",
  "f9b263165bf3a24ec96564345410269f431cb69863dc6b043c2e9f0acb742db0",
  "4bd913ba9ace9482d3721d83ab8385c1138b320da8c6ab3efb4886a41b70bd92",
  "4e0fc59a63cd553f93421f8b70c1b16a768d4a92c70a8339be45de170bdbe6dd",
  "b78447ed70b6f5b223c54db0d6487ec432577313f4ce1e58bdf269446093111e",
  "d00dffa55c6e470f2ecbb9518e4e985e88644bd486b815a0324874a24d4560f8",
  "afb75e8a72aefa1590958bae1dc5a4a51b6a2cab2970cbea66bcda851f3a2a19",
  "de85491fb7d61bce0508d54302e6f2a6f3ac1dfab060ffce9545f26f17dfed56",
  "8214552338c0bb9f08230c626d61ce2bca3766056c50dc5a14b9b8442b5a4cf4",
  "46ecb28e94e15d42542badc5e2872e773f0070c7c7e5daa18b96fbe2145ea69f",
  "5b15d1929c4e6c7cd312d88ded046c21cec881949df4edd585e17f38053eb1a9",
  "dc780f08ba1b3e66cb9e40cd36371e5b460c6056fd27b87318286c0f557b2e83",
  "79933b55be3e488534fe524f09c3f2bb5e2d8501ac5be2e003bae4be2815f8c7",
  "67b3ff3bb914440a4ccff3ce238309970eeae27a126f6af2c07942305bb22668",
  "1ed010655de2fe3af47654bae4bf4863ae0464beab5da593b7b4b42f4c83ff78",
  "56f32aaf07ac261f88fac5aeab4eb8ae5b28918c4df2ecccf9f334d0948d1ef0",
  "5af66feb962ce03b92b3024a7f6779ac83e18e68c313ae188b4bb7367b91c522",
  "f52d699c2cf401384e53266f6da4c90ce2b7f0ba4aa88f2a326df9f9b432167b",
  "2d0b7ae0217622b660b58a6c15ebf7d5f416aa07dda96c4b618b4a21883c1c5d",
  "8c3d4b80fe2cf0a5875cbe441e2d648c267a5cd0e47950256f5def101374f71a",
  "1b556a80946bf8e9a09de2feed9f98d434e97db0a203262f825f2639c52e52f0",
  "03ac59fd09ddd74687fb8010a1788667169a8a1b838079dc89adf5dbf8eb96df",
  "c60f96d0eecbb1cbda881488e8291e99130d1c607c16e76c41f5678c4626d70c",
  "6ab2540d6463be4f0ccdb8e8b296dfa19378afb84634088701c892e9bf6f66d5",
  "b06cc4e414fd1ab9d7a10676b1203e802f0d6286852a736c1f72f70ccb9f3aa6",
  "5b02acccd8b5dfdf768593c966dddca06add5a3cb22804153787fe663a925f5b",
  "854cfab30ffdc95ad59bb43c137619ac59f3b59355e807ab03b2190f6938d1cb",
  "9ba4c33ec5a027387e603bf891c6aa0d73301fabfdeff7b72f8dc57d1f322b9b",
  "cea6d22d9fb48947dca5884de0e47e1bfd83beef4360ed133be1cd8cd786a2b3",
  "417bc41d9a6a43218d235822de2014b94d7062ee2d742939197f78162b156757",
  "8a22afa870e71253a1a8ebc25bdabbef4a6bb222702c86cb8fdeb772eccf18fa",
  "e466ff7ec6457cdb2d51435b8ac2d079a577d5024ae607cfb908cdffad604d39",
  "84a6c2333daac0e2362eb4989427374b1779d8421a580a2b592f06e9d9fded01",
  "e93d0815d1e76dd8ce7df006cc8b6399af54178b962e16acb9c821aca69bd904",
  "6301ba067be0d2f6ef1771d55d04788cc826ddf47a55a244e6908d26aa57c33e",
  "cd04aa4bb3d018f4f77b2df61812f010b7fcc1fbfe78e0e4095bc4cacfe9dc47",
  "0b4a651d86ff6bb4e449aa865229c3d62735456bb96ba7b13cf50f188bcd52d0",
  "ae609565659eaaf0d0f5efab2723946433dcb2b744fe0664a13c2b0cadc393fe",
  "ba5a3411215013b2a0d521ee827256912097400fd5e0c99d56444ffe80556a7d",
  "9e034b137030d399b8f1f4ba8f33acddc9264e16b95d00adce7679e933504a2e",
  "cdf8e4d8db54a4e41a86d59a75f75a6a849ef65cf8f7e82cec32d34e61932c07",
  "e37a974a40395d7670da3e5a2e3913cc22b323ed432cd4238996c6487811ecf5",
  "908e9542e3280734b9c416afd617194d727085f14b3451e8b67d10cd944e991b",
  "9b337177e31cea875f97a69bfb8e8e810ad45d4ab272e5bd9dfbfc422cbd3ca4",
  "5ecf064e0a4474fb49a35269c12b20c4c67ede5c01a2e7c3416dc1c30e480d3d",
  "05f724c1111e8c438bd918bb44279daf16cc1241b4e1f8acf73b40f41f93389e",
  "466ba857db6174370d8d5f0c88a3d0ac9527a982ba9e39087420aed5755761b7",
  "7ddd8e5e00918609508110028e9aa4733fe827986b5288c80cfa9e5a6245dd0c",
  "3861c3335c894aab9bfab1b517468cb6f1c863e46b144636e23700fceb18cd85",
  "0841b2743069729842824c1fc4dc6334fc7ab5be7856dc03c14a5b99370e8e7f",
  "0396504931552890a6b09465f558ab8374b5f18ec29aaa8738654e563e996b4e",
  "5a0210a3bccff9fc086313589378e00313122e8dae5567097c7fff98522ec4fa",
  "499aeb3c5aca401822bb5998fccfb90dd35d9caf9eb3d7c0041223fed14203b9",
  "97f7d4a609ed4b226cb074903fd6cec1a4a90ae7ce1831bbd1416abf1aa11f55",
  "2e53857788981f9542121664efe88e1a8e65b8b6059c0b5a1210f2355a1c12dc",
  "5d20079ac702f4c1ca7caad192283bf3379a1cb3b047fe32be768402fe1b22de",
  "903a308ec1bdeff01022f16307e0a982a2c44cdcc4cd536023cd72ea20ec50fe",
  "46ec37f31949d17cb2d4eb4f21bda31f1f1007f2734e8890d71b9bfec22f5dbc",
  "4f82bf410f951cbe92bef5273ecb3756574c5a20e33d0463ab156a879441badc",
  "073aa1197c857b3aa12f473de2619582e5d69779b4bfe1b1061a4641c38d2186",
  "04b8b697be637a19f524a4eb755037cc5ee2fc7c1870a83cde4a08735ba6836c",
  "c658b1a50aa31827ca413d1bb3391690db512fd643002409e8e607164d240804",
  "9c2a95289ffacd365fec9d7141dc6f9a0b06933826f47689c889342a131f5ebb",
  "09515ac03474db6a9f6366ae7196115a10d0ba86f0970dc145fce01568d36a94",
  "401422cf76252776069b0c5cd3b161c883d1f2648f0426f82ccb3195db98a063",
  "05bad7d7968cfa1ac68acec9a0a19a1103882c7164f2a7372c2d97fceb7d7c0d",
  "a28be8207cd6dac701b4bc995d0de3b4ce3e1b9e56c1be6fd3d09024ea00b806",
  "d628a02882f77ef902842101a2055eea898d9efb4e6f2592008bd6aa4a762ef9",
  "ce18a6b4185666ade3d562c6756b278b66d4f7e0e01ee979fa3ecc03689dd40d",
  "4c1095776eb36bf6bf25a7221f7f8ac252d958f6358c194158ca17ec42898aa8",
  "4d3b4acd77ec60e7f529ae5da4a72f73cb03b59db7f08f6704bb737d70d03d75",
  "af4c1700a609f9967082521f809dff17e041476c5d433922e92426d4a7adf30f",
  "7d1dde1445b231beac77edbce22981150d2225aecfe96ca4f83ff735cf085b29",
  "de9a11a10cd34c54576eb175f64be8c77963b53c2774821f763cf6c3db6566a8",
  "de2b8239a84b4859cedcb8d5b0f111af1fbc69ba317e3ed071e6d0fa861ab859",
  "8bc3760c3a0386ebf258d931cd391b81818cb4556eae41731901c2cc2ddef49c",
  "548d0262e0365d2b6b7b5e72012f9d80f7a58392a17e36da7eca34e489990a0a",
  "32a88225184ab4c968e669ec5faaeb6ef55c0bf17d288b3ee3b3cba1f710a332",
  "0c2e5e92ae0813f0dedbb0dea22310179d278d6f9ba983dfc06f0b146300ca5e",
  "b0f7ddd90572d0ae74f64d12cc1352f2394471c556e2031012c22cc041825cf3",
  "a0d6ec0a89ac2536266b1d7af445ad089a0777192b0b217d4a9c235c45ac72f5",
  "99bb47b106c31b2e505dcd626aa332f1ee80b1dfc7a6d83ce4f68ff1901863dc",
  "a7e93f90790b55194ee0aeb829659fd5d25c1f598a2f05b416371a8639ca0d0a",
  "9f60e498ae0fc0bef2b8159d4330c12175e27e6f8bf8c60f1280c514abc1d41c",
  "0f8f62798872bfba801303ac12f9e060ef9b1c3d3f0889d045f3076eaa3de5c3",
  "e638b395b9473adef3683580c05c3a095ae32f53cc2cf406a92bba44d22eba05",
  "732b5b4f663a0e0729c2b3e66a665badfcc1f2b41523ff6d302091e7778c645b",
  "e5f499ca5da8301eb5f18f00999a7307004c754fff3df2b9811e27e8ca0aa0d9",
  "219f5d905bf12549c8df4c6d0666e42a10a5ef64edfa49a6449a4b0353af8807",
  "1a632cbd58f91b126143142663d0633720ffb5976b012d3159038e7a83c0a13f",
  "227e02b7fe254b1fb9a696c25c977504afc1e353849a7b37bde69fde41f962af"
];

function hashGrid(grid: PixelGrid): string {
  const pixels = grid.flatMap(row => row.flatMap(color => {
    if (color === null) return [0, 0, 0, 0];
    const hex = color.slice(1);
    const rgba = hex.length === 6 ? `${hex}ff` : hex;
    return [0, 2, 4, 6].map(offset => parseInt(rgba.slice(offset, offset + 2), 16));
  }));
  return createHash('sha256').update(Uint8Array.from(pixels)).digest('hex');
}

describe('emoji', () => {
  it('reconstructs all preset artwork with unified white shading', () => {
    expect(EMOJI_PRESETS).toHaveLength(128);
    expect(EMOJI_PRESETS.filter(Boolean)).toHaveLength(116);
    for (let index = 0; index < 128; index++) {
      const preset = EMOJI_PRESETS[index];
      const grid = preset ? generateEmojiGrid(preset) : generateEmojiSymbolGrid(index);
      expect(grid, `missing source ${index}`).toBeDefined();
      expect(hashGrid(grid!), `source ${index}`).toBe(expectedHashes[index]);
    }
    expect(generateEmojiSymbolGrid(-1)).toBeUndefined();
  });

  it('uses the shared Faces color choices and reusable feature categories', () => {
    const parts = getAvailableEmojiParts();
    expect(parts.color).toEqual(Object.keys(SKIN_PRESETS));
    expect(Object.keys(EMOJI_PARTS.color)).toHaveLength(1);
    expect(parts.eyes).toHaveLength(66);
    expect(parts.eyebrows).toHaveLength(10);
    expect(parts.nose).toHaveLength(5);
    expect(parts.mouth).toHaveLength(41);
    expect(parts).not.toHaveProperty('beard');
    expect(parts.accessories).toHaveLength(15);
    expect(getEmojiPart('eyes', 'invalid')).toBeUndefined();
    expect(getEmojiPart('invalid', 'toString')).toBeUndefined();
    expect(getEmojiPart('eyes', 'toString')).toBeUndefined();
  });

  it('renders only the selected part in thumbnails like Faces', () => {
    const eyes = getEmojiPartThumbnail('eyes', 'small');
    expect(eyes).toContain('<rect x="5" y="5" width="1" height="1" fill="#000000ff"/>');
    expect(eyes.match(/<rect/g)).toHaveLength(5);
    expect(eyes).not.toContain('#f7cc50ff');
    expect(getEmojiPartThumbnail('eyes', 'none').match(/<rect/g)).toHaveLength(1);
    expect(getEmojiPartThumbnail('accessories', 'angledSunglasses')).not.toContain('#f7cc50ff');
  });

  it('does not duplicate the same item between part categories', () => {
    const seen = new Set<string>();
    for (const parts of Object.values(EMOJI_PARTS)) {
      for (const part of Object.values(parts)) {
        const pixels: [number, string][] = [];
        part.pixels.forEach((row, y) => row.forEach((slot, x) => {
          if (slot) {
            const role = part.slotMap[slot];
            pixels.push([(y + part.offsetY) * 16 + x + part.offsetX, EMOJI_COLOR_ROLES[role] ?? role]);
          }
        }));
        const signature = JSON.stringify(pixels);
        expect(seen.has(signature)).toBe(false);
        seen.add(signature);
      }
    }
  });

  it('renders a deterministic transparent SVG with preset zero by default', () => {
    expect(generateEmojiGrid()).toEqual(generateEmojiGrid(EMOJI_PRESETS[0]!));
    expect(generateEmoji()).toBe(generateEmoji(EMOJI_PRESETS[0]!));
    expect(generateEmoji()).toContain('viewBox="0 0 16 16"');
    expect(generateEmoji()).not.toContain('<rect width="16" height="16"');
  });

  it('renders the configured background through the shared SVG renderer', () => {
    const config = EMOJI_PRESETS[0]!;
    expect(generateEmoji({ ...config, backgroundColor: '#87CEEB' }))
      .toContain('<rect width="16" height="16" fill="#87CEEB"/>');
    expect(generateEmoji({ ...config, backgroundColor: 'transparent' }))
      .not.toContain('<rect width="16" height="16"');
    expect(generateEmoji({ ...config, backgroundColor: '" onload="alert(1)' }))
      .not.toContain('onload');
  });

  it('keeps white face shading in Color when Accessories are removed', () => {
    for (const index of [112, 113, 114, 116]) {
      const config = EMOJI_PRESETS[index]!;
      expect(config.color).toBe('white');
      expect(config.accessories).toBe('none');
      const grid = generateEmojiGrid(config);
      expect(grid[4][2]).toBe('#EDEDED');
      expect(grid[4][13]).toBe('#EDEDED');
      expect(generateEmojiGrid({ ...config, accessories: 'none' })).toEqual(grid);
    }
  });

  it('skips invalid feature choices and uses the Faces fallback for an invalid color', () => {
    const empty = { color: 'medium', eyes: 'none', eyebrows: 'none', nose: 'none', mouth: 'none', accessories: 'none' };
    expect(generateEmojiGrid({ color: 'bad', eyes: 'bad', eyebrows: 'bad', nose: 'bad', mouth: 'bad', beard: 'bad', accessories: 'bad' }))
      .toEqual(generateEmojiGrid(empty));
  });

  it('recolors face roles while keeping the same blank silhouette', () => {
    const empty = { color: 'yellow', eyes: 'none', eyebrows: 'none', nose: 'none', mouth: 'none', accessories: 'none' };
    const yellow = generateEmojiGrid(empty);
    const green = generateEmojiGrid({ ...empty, color: 'green' });
    expect(yellow[6][6]).not.toBe(green[6][6]);
    expect(yellow.flat().map(color => color === null)).toEqual(green.flat().map(color => color === null));
  });

  it('renders every shared skin color with its shared highlights and shadows', () => {
    const empty = { color: 'yellow', eyes: 'none', eyebrows: 'none', nose: 'none', mouth: 'none', accessories: 'none' };
    for (const [color, hex] of Object.entries(SKIN_PRESETS)) {
      const grid = generateEmojiGrid({ ...empty, color });
      expect(grid[6][6]).toBe(hex);
      expect(grid[2][4]).toBe(resolveSkinHighlight(hex));
      expect(grid[11][2]).toBe(resolveSkinShadow(hex));
    }
  });

  it('accepts custom colors and safely resolves invalid names through the shared palette', () => {
    const empty = { color: 'medium', eyes: 'none', eyebrows: 'none', nose: 'none', mouth: 'none', accessories: 'none' };
    expect(generateEmojiGrid({ ...empty, color: '#123456' })[6][6]).toBe('#123456');
    for (const color of ['__proto__', 'constructor', 'toString', '" onload="alert(1)']) {
      expect(generateEmojiGrid({ ...empty, color })).toEqual(generateEmojiGrid(empty));
    }
  });

  it('separates clown and long noses from eyes and mouths', () => {
    for (const [index, x, y] of [[45, 7, 7], [88, 7, 6], [89, 7, 6]]) {
      const config = EMOJI_PRESETS[index]!;
      expect(config.nose).not.toBe('none');
      const original = generateEmojiGrid(config);
      const withoutNose = generateEmojiGrid({ ...config, nose: 'none' });
      expect(withoutNose[y][x]).not.toBe(original[y][x]);
      expect(withoutNose[5][5]).toBe(original[5][5]);
      expect(withoutNose[10][7]).toBe(original[10][7]);
    }
  });

  it('separates eyes and mouths on upside-down faces', () => {
    const config = EMOJI_PRESETS[11]!;
    const original = generateEmojiGrid(config);
    const withoutEyes = generateEmojiGrid({ ...config, eyes: 'none' });
    const withoutMouth = generateEmojiGrid({ ...config, mouth: 'none' });
    expect(withoutEyes[9][5]).not.toBe(original[9][5]);
    expect(withoutEyes[5][5]).toBe(original[5][5]);
    expect(withoutMouth[5][5]).not.toBe(original[5][5]);
    expect(withoutMouth[9][5]).toBe(original[9][5]);
  });

  it('keeps brows, eyes and accessories independently removable', () => {
    const angry = EMOJI_PRESETS[50]!;
    const original = generateEmojiGrid(angry);
    const withoutBrows = generateEmojiGrid({ ...angry, eyebrows: 'none' });
    expect(withoutBrows[4][4]).not.toBe(original[4][4]);
    expect(withoutBrows[7][5]).toBe(original[7][5]);

    const bandaged = EMOJI_PRESETS[83]!;
    const withBandage = generateEmojiGrid(bandaged);
    const withoutBandage = generateEmojiGrid({ ...bandaged, accessories: 'none' });
    expect(withoutBandage[0][7]).not.toBe(withBandage[0][7]);
    expect(withoutBandage[5][5]).toBe(withBandage[5][5]);
  });

  it('keeps each accessory in one category and removes Beard', () => {
    expect(getAvailableEmojiParts().accessories).toEqual([
      'none', 'kissHeart', 'angledSunglasses', 'eyeMask', 'faceMask', 'halo',
      'squareGlasses', 'sleepSymbol', 'steam', 'goggles', 'coldSweat', 'headBandage',
      'monocle', 'drips', 'devilHorns',
    ]);
    expect(EMOJI_PARTS).not.toHaveProperty('beard');
    for (const preset of EMOJI_PRESETS) {
      if (preset) expect(preset).not.toHaveProperty('beard');
    }
  });

  it('gives every part and preset a descriptive name', () => {
    expect(EMOJI_PRESET_NAMES).toHaveLength(EMOJI_PRESETS.length);
    expect(new Set(EMOJI_PRESET_NAMES).size).toBe(EMOJI_PRESETS.length);
    for (const names of [EMOJI_PRESET_NAMES, ...Object.values(getAvailableEmojiParts())]) {
      for (const name of names) expect(name).toMatch(/^[a-z][a-zA-Z]*$/);
    }
    expect(generateEmojiSymbolGrid('rainbowHeart')).toEqual(generateEmojiSymbolGrid(127));
    expect(generateEmojiSymbolGrid('__proto__')).toBeUndefined();
  });

  it('restores steam as one accessory shared by the source expressions', () => {
    for (const index of [64, 65]) {
      const preset = EMOJI_PRESETS[index]!;
      expect(preset.accessories).toBe('steam');
      const original = generateEmojiGrid(preset);
      const withoutSteam = generateEmojiGrid({ ...preset, accessories: 'none' });
      expect(original[9][5]).toBe('#ffffffff');
      expect(withoutSteam[9][5]).not.toBe(original[9][5]);
    }
  });

  it('treats zero as no-op and a nonzero clear role as an overwrite', () => {
    const empty = { color: 'yellow', eyes: 'none', eyebrows: 'none', nose: 'none', mouth: 'none', accessories: 'none' };
    const baseline = generateEmojiGrid(empty);
    EMOJI_PARTS.accessories.test_clear = {
      pixels: [[1, 0]], slotMap: { 1: 'clear' }, offsetX: 6, offsetY: 6,
    };
    try {
      const grid = generateEmojiGrid({ ...empty, accessories: 'test_clear' });
      expect(baseline[6][6]).not.toBeNull();
      expect(grid[6][6]).toBeNull();
      expect(grid[6][7]).toBe(baseline[6][7]);
    } finally {
      delete EMOJI_PARTS.accessories.test_clear;
    }
  });
});
