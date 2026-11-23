import type { Metadata, Viewport } from 'next';
import { Cardo } from 'next/font/google';
import Link from 'next/link';
import ShareButton from './ShareButton';
import Snow from './Snow';
import {
  CARD_URL,
  cardDesigns,
  christmasCard,
  heroImage,
  OG_IMAGE_URL,
  SITE_ORIGIN,
} from './content';
import styles from './christmas.module.css';

const cardoItalic = Cardo({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-cardo-italic',
  display: 'swap',
});

const ogImageAlt =
  'Jana Lister and her young son in matching elf outfits, beside the words Merry Christmas. Love, Jana.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    absolute: christmasCard.pageTitle,
  },
  description: christmasCard.description,
  keywords: ['Christmas', 'holiday card', 'Jana Elise Lister'],
  alternates: {
    canonical: CARD_URL,
  },
  openGraph: {
    title: christmasCard.pageTitle,
    description: christmasCard.description,
    url: CARD_URL,
    siteName: 'Jana Elise Lister',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE_URL,
        secureUrl: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: ogImageAlt,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: christmasCard.pageTitle,
    description: christmasCard.description,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#10241c',
};

export const dynamic = 'force-static';

export default function ChristmasPage() {
  return (
    <main className={`${styles.page} ${cardoItalic.variable}`}>
      <link
        rel="preload"
        as="image"
        type="image/webp"
        imageSrcSet={heroImage.webpSrcSet}
        imageSizes={heroImage.sizes}
      />
      <Snow />
      <div className={styles.layout}>
        <article className={styles.stage}>
          <div className={styles.card}>
            <div className={styles.cardInner}>
              <p>
                <Link href="/" className={styles.wordmark}>
                  {christmasCard.eyebrow}
                  <span className={styles.srOnly}> ({christmasCard.homeHint})</span>
                </Link>
              </p>
              <h1 className={styles.headline}>
                <span>{christmasCard.headlineLead}</span>
                <span>{christmasCard.headlineRest}</span>
              </h1>
              <div className={styles.rule} aria-hidden="true">
                <span className={styles.ruleDiamond} />
              </div>
              <figure className={styles.heroFrame}>
                <picture>
                  <source
                    type="image/webp"
                    srcSet={heroImage.webpSrcSet}
                    sizes={heroImage.sizes}
                  />
                  <img
                    className={styles.hero}
                    src={heroImage.src}
                    alt={heroImage.alt}
                    width={heroImage.width}
                    height={heroImage.height}
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </figure>
              <p className={styles.message}>{christmasCard.message}</p>
              <p className={styles.signoff}>{christmasCard.signoff}</p>
              <ShareButton />
            </div>
          </div>
        </article>

        <section className={styles.gallerySection} aria-labelledby="christmas-cards-heading">
          <h2 id="christmas-cards-heading" className={styles.galleryHeading}>
            {christmasCard.cardsHeading}
          </h2>
          <ul className={styles.gallery}>
            {cardDesigns.map((card) => (
              <li key={card.id}>
                <figure className={styles.cardFigure}>
                  <a
                    className={styles.cardLink}
                    href={card.src}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={card.webpSrcSet}
                        sizes={card.sizes}
                      />
                      <img
                        className={styles.cardImage}
                        src={card.src}
                        alt={card.alt}
                        width={card.width}
                        height={card.height}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                    <span className={styles.srOnly}>Opens full size in a new tab.</span>
                  </a>
                  <figcaption className={styles.caption}>{card.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
