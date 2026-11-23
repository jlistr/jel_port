import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-connect">Connect with me:</div>
        <div className="footer-icon">
          <a href="https://www.instagram.com/jana.listerr" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} aria-hidden="true" />
            <span className="ContactLinks-visually-hidden">Instagram</span>
          </a>
        </div>
        <nav className="footer-legal" aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Jana Elise Lister. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
