'use client';

import { useState, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import BookMeButton from './BookMeButton';

interface PageLayoutProps {
  children: ReactNode;
  showBookMe?: boolean;
}

export default function PageLayout({ children, showBookMe = true }: PageLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="wrapper">
      <Header onMenuToggle={() => setIsMenuOpen(true)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <main>{children}</main>
      {showBookMe && <BookMeButton />}
      <Footer />
    </div>
  );
}

