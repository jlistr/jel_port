import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '../components/PageLayout';

export const metadata = {
  title: 'About Jana Elise Lister | Professional Model & Creative Performer',
  description: 'Discover the professional journey of Jana Elise Lister, a model and creative performer specializing in editorial, commercial, runway, and print work.',
  keywords: 'Jana Elise Lister, professional model, editorial modeling, commercial modeling, runway model, fashion performer, creative artist, New Braunfels TX model',
};

export default function AboutPage() {
  return (
    <PageLayout>
      {/* About Page Container */}
      <div className="about-container">
        {/* Circular Profile Image */}
        <div className="image-block">
          <Image
            src="/img/model/85844D33-F39A-47D2-8313-8FE78AC1D8FE.webp"
            alt="Jana Elise Lister Professional Model"
            width={300}
            height={300}
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Welcome Text - hidden */}
        <div className="welcome-text" style={{ display: 'none' }}>
          <h2>Welcome!</h2>
        </div>
      </div>

      <section className="about-section">
        <h1>About Jana Elise Lister</h1>
        <h2 style={{ display: 'none' }}>Professional Model &amp; Creative Performer</h2>

        <p className="about-intro">
          Based in New Braunfels, TX, I specialize in editorial, commercial, runway, and print modeling.
          My passion lies in collaborating with other creatives to bring unique ideas to life.
        </p>

        <h3>What I Offer</h3>
        <ul className="about-list">
          <li><strong>Editorial:</strong> Striking and stylish concepts</li>
          <li><strong>Commercial:</strong> Professional and versatile looks</li>
          <li><strong>Runway:</strong> Graceful and captivating presence</li>
          <li><strong>Print:</strong> High-quality, impactful imagery</li>
        </ul>

        <p className="about-note">
          I am open to various modeling concepts, with the exception of boudoir. <br />
          Interested in working with me? Visit the <Link href="/services">Services</Link> page to check out my rates and portfolio!
        </p>
      </section>
    </PageLayout>
  );
}

