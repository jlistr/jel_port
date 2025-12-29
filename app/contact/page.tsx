'use client';

import { useState, FormEvent } from 'react';
import PageLayout from '../components/PageLayout';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setToasterMessage('Thank you! Your message has been sent.');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        setToasterMessage('Oops! There was a problem. Please try again.');
      }
    } catch {
      setToasterMessage('An error occurred. Please try again.');
    }

    setShowToaster(true);
    setTimeout(() => setShowToaster(false), 3000);
  };

  return (
    <PageLayout showBookMe={false}>
      <section className="contact-section">
        <h1>Contact Jana Elise Lister</h1>
        <h2>Book a Professional Model for Your Next Project</h2>
        <div className="contact-container">
          <p>Get in touch with Jana Elise Lister for editorial, commercial, and creative modeling opportunities.</p>
          <p>Please leave your name, e-mail, and a brief message about what service you are inquiring about, and I will get back to you shortly!</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">Name <span className="required">(required)</span></label>
            <div className="name-fields">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <label htmlFor="email">Email <span className="required">(required)</span></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <label htmlFor="message">Message <span className="required">(required)</span></label>
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <button type="submit" className="submit-btn">SEND</button>
          </form>

          {/* Toaster Container */}
          <div className={`toaster ${showToaster ? 'show' : 'hidden'}`}>
            {toasterMessage}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

