import Link from 'next/link';
import { FaCalendarAlt } from 'react-icons/fa';

export default function BookMeButton() {
  return (
    <Link href="/contact" className="book-me-button">
      <FaCalendarAlt /> Book Me
    </Link>
  );
}

