/**
 * Christmas card copy. Edit this file to change the greeting.
 * The page, the share sheet, and the link-preview text all read from here.
 */
export const christmasCard = {
  pageTitle: 'Merry Christmas from Jana',
  description:
    'Wishing you a joyful holiday season and a happy 2027. Love, Jana',
  eyebrow: 'Jana Elise Lister',
  headlineLead: 'Merry',
  headlineRest: 'Christmas',
  message: 'Wishing you a joyful holiday season and a happy 2027.',
  signoff: 'Love, Jana',
  shareTitle: 'Merry Christmas from Jana',
  shareText:
    'Wishing you a joyful holiday season and a happy 2027. Love, Jana',
  cardsHeading: 'The cards',
  shareLabel: 'Share',
  copiedLabel: 'Link copied',
  copyFallbackLabel: 'Copy this link',
  homeHint: 'home',
} as const;

export const SITE_ORIGIN = 'https://janalister.com';
export const CARD_PATH = '/christmas';
export const OG_IMAGE_PATH = '/christmas/og.jpg';
export const OG_IMAGE_URL = `${SITE_ORIGIN}${OG_IMAGE_PATH}`;
export const CARD_URL = `${SITE_ORIGIN}${CARD_PATH}`;

export const heroImage = {
  alt: 'Jana Lister and her young son smile in matching green and red elf costumes, with a lit Christmas tree and stockings by the fireplace behind them.',
  width: 960,
  height: 1280,
  src: '/christmas/hero-960.jpg',
  webpSrcSet:
    '/christmas/hero-640.webp 640w, /christmas/hero-960.webp 960w, /christmas/hero-1280.webp 1280w',
  sizes: '(min-width: 960px) 400px, calc(100vw - 4.5rem)',
} as const;

export const cardDesigns = [
  {
    id: 'classic',
    caption: 'Classic red & gold',
    alt: 'Classic red and gold Christmas card. A gold frame surrounds the portrait of Jana and her son in elf costumes. Gold script reads Merry Christmas, with Happy New Year 2026 below.',
    width: 1100,
    height: 1540,
    src: '/christmas/style-1-1100.jpg',
    webpSrcSet:
      '/christmas/style-1-700.webp 700w, /christmas/style-1-1100.webp 1100w',
    sizes: '(min-width: 960px) 300px, calc(100vw - 2.5rem)',
  },
  {
    id: 'modern',
    caption: 'Merry & Bright',
    alt: 'Cream Christmas card with a green border and holly. The portrait of Jana and her son in elf costumes sits above the words Merry and Bright and Season\'s Greetings 2026.',
    width: 1100,
    height: 1540,
    src: '/christmas/style-2-1100.jpg',
    webpSrcSet:
      '/christmas/style-2-700.webp 700w, /christmas/style-2-1100.webp 1100w',
    sizes: '(min-width: 960px) 300px, calc(100vw - 2.5rem)',
  },
] as const;
