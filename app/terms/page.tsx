import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "../components/PageLayout";

export const metadata: Metadata = {
  title: "Terms | Jana Elise Lister",
  description:
    "Plain-language terms for using Jana Elise Lister's modeling portfolio at janalister.com.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <PageLayout showBookMe={false}>
      <article className="legal-page">
        <h1>Terms</h1>
        <p>
          These terms cover use of janalister.com, the modeling portfolio of Jana Elise Lister.
          This is a placeholder, not a finished legal agreement.
        </p>
        <p className="legal-todo">
          TODO for John: add the legal business name, mailing address, and a contact email or
          phone number. Add which state&apos;s law should apply. Have a lawyer review this page
          before relying on it.
        </p>

        <h2>Using the site</h2>
        <p>
          You may browse the portfolio for your own information. Please do not copy or reuse the
          photographs without permission from Jana and from the photographer credited on the
          image.
        </p>

        <h2>Contact form</h2>
        <p>
          The <Link href="/contact">contact form</Link> sends your name, email address, and
          message by email through Resend. Send only what you are comfortable putting in an email.
          A message is an inquiry, not a confirmed booking. Rates on the site can change, and a
          booking exists only when Jana agrees to it.
        </p>

        <h2>Accounts, analytics, and cookies</h2>
        <p>
          The site does not offer user accounts. It does not use analytics and it does not set
          cookies. See the <Link href="/privacy">privacy policy</Link> for what the contact form
          sends.
        </p>

        <h2>Liability</h2>
        <p>
          The site is a portfolio. TODO for John: add any warranty or liability language a lawyer
          has reviewed. Nothing on this page invents a business address or a legal entity.
        </p>
      </article>
    </PageLayout>
  );
}
