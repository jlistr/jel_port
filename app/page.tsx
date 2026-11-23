import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <div className="landing-page">
      <div className="nav-content">
        <nav className="vertical-nav" aria-label="Primary">
          <Link href="/portfolio" className="nav-link">Portfolio</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </nav>
      </div>
    </div>
  );
}
