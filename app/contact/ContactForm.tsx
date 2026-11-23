"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type Toast = {
  tone: "success" | "error";
  message: string;
};

const EMPTY = { name: "", email: "", message: "", company: "" };

export default function ContactForm() {
  const [formData, setFormData] = useState(EMPTY);
  const [toast, setToast] = useState<Toast | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSending) return;

    setIsSending(true);
    setToast(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      const data = (await response.json().catch(() => null)) as { error?: unknown } | null;
      const serverMessage = data && typeof data.error === "string" ? data.error : "";

      if (response.ok) {
        setToast({ tone: "success", message: "Thank you. Your message has been sent." });
        setFormData(EMPTY);
      } else if (response.status === 503) {
        setToast({
          tone: "error",
          message:
            serverMessage ||
            "The contact form is not available right now. Please reach out on Instagram instead.",
        });
      } else {
        setToast({
          tone: "error",
          message: serverMessage || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setToast({
        tone: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate={false}>
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={formData.company}
            onChange={(event) => setFormData({ ...formData, company: event.target.value })}
          />
        </div>

        <label htmlFor="name">
          Name <span className="required">(required)</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
          required
          maxLength={100}
          autoComplete="name"
          value={formData.name}
          onChange={(event) => setFormData({ ...formData, name: event.target.value })}
        />

        <label htmlFor="email">
          Email <span className="required">(required)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          required
          maxLength={254}
          autoComplete="email"
          value={formData.email}
          onChange={(event) => setFormData({ ...formData, email: event.target.value })}
        />

        <label htmlFor="message">
          Message <span className="required">(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Your message"
          rows={5}
          required
          maxLength={4000}
          value={formData.message}
          onChange={(event) => setFormData({ ...formData, message: event.target.value })}
        />

        <button type="submit" className="submit-btn" disabled={isSending}>
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>

      <p className="contact-consent">
        By sending this message, you agree that your name, email, and message will be emailed to
        Jana so she can reply. Read the <Link href="/privacy">privacy policy</Link>.
      </p>

      <div
        className={`toaster${toast ? " show" : ""}${toast?.tone === "error" ? " error" : ""}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {toast?.message ?? ""}
      </div>
    </>
  );
}
