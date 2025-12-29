'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaInstagram } from 'react-icons/fa';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="Layout_Header">
      <div className="logo-container">
        <Link href="/" className="logo-link">
          <div className="logo-name">Jana Elise Lister</div>
          <div className="logo-tagline">Model</div>
        </Link>
      </div>
      <div className="Layout_Header-menu">
        <div className="Layout_Header-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'Layout_selected' : ''}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="Layout_Header-contact">
          <div className="ContactLinks">
            <div className="ContactLinks-icon-link">
              <a
                className="ContactLinks-link"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/jana.listerr"
              >
                <span className="ContactLinks-visually-hidden">Instagram</span>
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="Layout_Header-menu-toggle" onClick={onMenuToggle}>
        <svg width="24" height="15" viewBox="0 0 24 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" width="20" height="3"></rect>
          <rect y="6" width="24" height="3"></rect>
          <rect x="9.3335" y="12" width="14.6667" height="3"></rect>
        </svg>
      </div>
    </header>
  );
}

