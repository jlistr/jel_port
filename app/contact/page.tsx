import type { Metadata } from "next";
import PageLayout from "../components/PageLayout";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Jana Elise Lister | Book a Model",
  description:
    "Contact Jana Elise Lister about editorial, commercial, runway, and print modeling in Austin, San Antonio, and New Braunfels, Texas.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageLayout showBookMe={false}>
      <section className="contact-section">
        <h1>Contact Jana Elise Lister</h1>
        <h2>Book a Professional Model for Your Next Project</h2>
        <div className="contact-container">
          <p>
            Get in touch with Jana Elise Lister for editorial, commercial, and creative modeling
            opportunities.
          </p>
          <p>
            Please leave your name, email, and a brief message about what service you are inquiring
            about, and I will get back to you shortly.
          </p>
          <ContactForm />
        </div>
      </section>
    </PageLayout>
  );
}
