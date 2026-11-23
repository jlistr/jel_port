import type { Metadata } from 'next';
import PageLayout from '../components/PageLayout';
import Gallery from '../components/Gallery';
import { portfolioImages } from './images';

export const metadata: Metadata = {
  title: 'Professional Model Portfolio | Jana Elise Lister',
  description: "Explore Jana Elise Lister's professional modeling portfolio featuring editorial, commercial, and creative photoshoots. Hire in Austin, San Antonio, and New Braunfels.",
  keywords: 'Professional Model Portfolio, Jana Elise Lister, Editorial Model, Commercial Model, Fashion Photoshoot, Austin Model, San Antonio Model, New Braunfels Model',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  return (
    <PageLayout>
      <section id="portfolio" className="portfolio">
        <h1>Professional Modeling Portfolio of Jana Elise Lister</h1>
        <h2>Editorial, Commercial, and Creative Photoshoots</h2>
        <h2>Available for Hire in Austin, San Antonio &amp; New Braunfels</h2>
        <Gallery images={portfolioImages} />
      </section>
    </PageLayout>
  );
}
