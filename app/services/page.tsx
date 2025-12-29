import Image from 'next/image';
import PageLayout from '../components/PageLayout';

export const metadata = {
  title: 'Modeling Services in Austin, San Antonio and New Braunfels | Hire a Professional Model',
  description: 'Professional modeling services in Austin, San Antonio, and New Braunfels. Hire a model for fashion, commercial, and print projects.',
  keywords: 'Professional Model Austin, Modeling Services San Antonio, Hire Model New Braunfels, Texas Fashion Model, Commercial Model Texas',
};

export default function ServicesPage() {
  return (
    <PageLayout>
      {/* Services Section */}
      <section className="services-container">
        <h1>Professional Modeling Services in Austin, San Antonio &amp; New Braunfels</h1>
        <h2>Hire a Model for Fashion, Runway, and Commercial Work</h2>
        <div className="services-image-container">
          <Image
            className="services-image"
            src="/img/37B05E61-BA8B-4951-A42D-B97C723AF103.webp"
            alt="Jana Lister's Comp Card"
            width={600}
            height={800}
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="services-info">
          <h1>Jana Elise Lister / Model</h1>
          <p>Height: 5&apos;10&quot; | Shoes: 9.5 | Bust: 33&quot; | Waist: 27&quot; | Hips: 32&quot;</p>
          <p>Hair: Dirty Blonde | Eyes: Blue/Gray</p>
        </div>
      </section>

      <section className="modeling-services">
        <h2>Modeling Services: (min. 1 hour)</h2>
        <p><i>I do not shoot any nude or boudoir photography.</i></p>
        <ul>
          <li>Commercial: $120 an hour</li>
          <li>Editorial: $120 an hour</li>
          <li>Swimwear: $100 an hour</li>
          <li>Fitness: $100 an hour</li>
          <li>Bridal: $100 an hour</li>
          <li>Portfolio Building Shoot: $70 an hour</li>
        </ul>
        <h3>Discounted Prices:</h3>
        <ul>
          <li>Half Day (4 hours): $300</li>
          <li>Full Day (8 hours): $650</li>
        </ul>
        <p className="note">*Rates are subject to change depending on the project, these are just my standard rates. Minimum shoot time is 1 hour.</p>
      </section>
    </PageLayout>
  );
}

