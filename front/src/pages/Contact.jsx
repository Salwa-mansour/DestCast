import  { useState } from 'react';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { urlFor } from '../utils/urlFor'

export default function Contact() {
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }
  const [loading, setLoading] = useState(false);
  const { pageMetaData, metaDataLoading } = usePageMetadata('contact');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          ...data,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
        e.target.reset();
      } else {
        setStatus({ type: 'error', message: result.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page"style={{minHeight:'100vh',padding:'4rem', background:'#fffbee'}}>
    <header className="page-header">

        <figure className="header-img" tabIndex={-1}>
            {pageMetaData?.headerImage && pageMetaData?.headerImage.asset && (
                <img
                src={urlFor(pageMetaData?.headerImage).width(1200).height(600).url()}
                alt={pageMetaData.title}
                />
            )}
        </figure>
    </header>
      <div className="contact-header" style={{color:'#333'}}>
        <h1>Get in Touch</h1>
        <p>Have a question or want to collaborate? Send a message directly to our inbox.</p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        {/* Hidden Honeypot Spam Protection */}
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" name="name" required placeholder="John Doe" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" name="email" required placeholder="john@example.com" />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required placeholder="Write your message here..."></textarea>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>

        {status && (
          <p className={`form-status ${status.type}`} style={{color:'#333'}}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}