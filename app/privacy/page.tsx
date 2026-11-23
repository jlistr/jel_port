import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "../components/PageLayout";

export const metadata: Metadata = {
  title: "Privacy | Jana Elise Lister",
  description:
    "What janalister.com collects: the name, email, and message you send through the contact form. The site does not use analytics or cookies.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <PageLayout showBookMe={false}>
      <article className="legal-page">
        <h1>Privacy</h1>
        <p>
          This page describes what janalister.com collects. It is a plain-language placeholder
          until the business details marked below are filled in.
        </p>
        <p className="legal-todo">
          TODO for John: add the legal name, mailing address, and the email or phone number people
          should use for privacy questions. Do not treat this page as final until those are filled
          in.
        </p>

        <h2>What the site collects</h2>
        <p>
          The only information the site asks you to provide is what you type into the{" "}
          <Link href="/contact">contact form</Link>: your name, your email address, and your
          message.
        </p>

        <h2>How that information is used</h2>
        <p>
          The form is delivered by email through Resend so Jana can reply. The site does not save
          the message in a database. The email contains the name, email address, and message you
          sent, and your email address is used as the reply-to address.
        </p>

        <h2>Analytics and cookies</h2>
        <p>
          This site does not use analytics and does not set cookies. There are no advertising
          pixels and no account login.
        </p>
        <p>
          The company that hosts the site may keep ordinary server logs, such as an IP address and
          which page was requested. TODO for John: name the host and say how long those logs are
          kept.
        </p>

        <h2>Spam protection</h2>
        <p>
          The form has a hidden field that people are not asked to fill in, and a basic limit on
          how many messages can be sent from the same connection in a short time. That limit uses
          the connection address in memory on the server and does not store it.
        </p>

        <h2>How long messages are kept</h2>
        <p>
          TODO for John: say how long contact emails are kept, who can read them, and how someone
          can ask for a message to be deleted.
        </p>

        <p>
          See also the <Link href="/terms">terms</Link>.
        </p>
      </article>
    </PageLayout>
  );
}
