import Link from 'next/link';
import { FaInstagram, FaCog } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-connect">Connect with me:</div>
        <div className="footer-icon">
          <a href="https://www.instagram.com/jana.listerr" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Jana Elise Lister. All Rights Reserved.
        </div>
        <Link href="/admin" className="footer-admin-link" title="Admin">
          <FaCog size={16} />
        </Link>
      </div>
    </footer>
  );
}
