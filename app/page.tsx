import Link from 'next/link';

export default function Home() {
  return (
    <div className="landing-page">
      <div className="nav-content">
        <nav className="vertical-nav">
          <Link href="/portfolio" className="nav-link">Portfolio</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </nav>
        <Link href="/admin" className="landing-admin-link" title="Go to admin">
          Go to admin
        </Link>
      </div>
    </div>
  );
}
