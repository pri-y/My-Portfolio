import { useState } from 'react';
import { 
  FaEnvelope, 
  FaLinkedin, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaCopy, 
  FaCheck, 
  FaPaperPlane, 
  FaCheckCircle 
} from 'react-icons/fa';

export default function Contact() {
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Copy Feedback State
  const [copiedField, setCopiedField] = useState(null);

  const contactDetails = [
    {
      id: 'email',
      name: 'Email',
      value: 'Priyankagupta1697@gmail.com',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=Priyankagupta1697@gmail.com',
      icon: FaEnvelope,
      target: '_blank',
      copyText: 'Priyankagupta1697@gmail.com',
    },
    {
      id: 'phone',
      name: 'Phone',
      value: '+91-6267457658',
      href: 'tel:+916267457658',
      icon: FaPhoneAlt,
      target: '_self',
      copyText: '+916267457658',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      value: 'linkedin.com/in/Priyanka-Gupta',
      href: 'https://www.linkedin.com/in/Priyanka-Gupta',
      icon: FaLinkedin,
      target: '_blank',
      copyText: 'https://www.linkedin.com/in/Priyanka-Gupta',
    },
    {
      id: 'location',
      name: 'Location',
      value: 'India',
      href: '#',
      icon: FaMapMarkerAlt,
      target: '_self',
      copyText: 'India',
    },
  ];

  const handleCopy = (id, text, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg('');

      const API_URL = import.meta.env.VITE_API_URL || '/api/contact';

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Server error, please try again.');
      }

      setFormData({ name: '', email: '', message: '' });
      setSuccessMsg('Message sent successfully! Saved to MongoDB database.');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      console.error('Error sending message:', err);
      setErrorMsg(`Failed to send message: ${err.message || 'Failed to fetch'}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-6 bg-[#F8FAFC] border-t border-[#E2E8F0] font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#38BDF8] bg-[#0B192C] px-3.5 py-1.5 rounded-full inline-block mb-3 shadow-sm">
            Contact Me
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-3">
            Get In Touch
          </h2>
          <p className="text-sm md:text-base text-[#475569] leading-relaxed">
            Have a project in mind or want to discuss full-stack opportunities? Reach out directly or send a message below!
          </p>
        </div>

        {/* 2-Column Compact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quick Contact Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-1">
              Contact Information
            </h3>
            
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              const isCopied = copiedField === detail.id;
              return (
                <div
                  key={detail.id}
                  className="group relative flex items-center justify-between p-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:border-[#0B192C]/40 hover:shadow-md transition-all duration-300"
                >
                  <a
                    href={detail.href}
                    target={detail.target}
                    rel={detail.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3.5 flex-grow min-w-0"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0B192C] text-[#38BDF8] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <Icon className="text-base" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] font-extrabold text-[#64748B] uppercase tracking-wider">
                        {detail.name}
                      </span>
                      <span className="block text-xs sm:text-sm font-bold text-[#0F172A] truncate group-hover:text-[#38BDF8] transition-colors">
                        {detail.value}
                      </span>
                    </div>
                  </a>

                  {/* Copy button */}
                  {detail.copyText && (
                    <button
                      type="button"
                      onClick={(e) => handleCopy(detail.id, detail.copyText, e)}
                      title={`Copy ${detail.name}`}
                      className="ml-2 p-2 text-slate-400 hover:text-[#0B192C] hover:bg-[#F8FAFC] rounded-lg transition-colors border border-transparent hover:border-[#E2E8F0] shrink-0"
                    >
                      {isCopied ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                          <FaCheck className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <FaCopy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Send Message Form Card */}
          <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-extrabold text-[#0F172A] mb-1">
              Send a Message
            </h3>
            <p className="text-xs text-[#64748B] mb-6 leading-relaxed">
              Fill out the form below to send a message directly to MongoDB.
            </p>

            {successMsg && (
              <div className="mb-5 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-extrabold flex items-center gap-2">
                <FaCheckCircle className="text-base text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-5 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-extrabold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-extrabold text-[#0F172A] uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-2.5 text-xs sm:text-sm text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0B192C] focus:bg-white transition-all font-sans"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-extrabold text-[#0F172A] uppercase tracking-wider mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-2.5 text-xs sm:text-sm text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0B192C] focus:bg-white transition-all font-sans"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-extrabold text-[#0F172A] uppercase tracking-wider mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Priyanka, I'd like to discuss a project..."
                  required
                  className="w-full px-4 py-2.5 text-xs sm:text-sm text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0B192C] focus:bg-white transition-all resize-none font-sans"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto self-end py-3 px-6 bg-[#0B192C] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:bg-[#1E293B] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <FaPaperPlane className="text-xs text-[#38BDF8]" />
                <span>{submitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
