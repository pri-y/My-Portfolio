import { useState } from 'react';
import { X, Download, CheckCircle, Mail, User } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import emailjs from '@emailjs/browser';

// EmailJS Configuration Placeholders
export const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
export const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
export const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

export default function ResumeModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const submittedName = name.trim();
    const submittedEmail = email.trim();
    const downloadTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // 1. Trigger actual PDF file download IMMEDIATELY (no delay)
    const link = document.createElement('a');
    link.href = '/Priyanka_Gupta_Resume.pdf';
    link.download = 'Priyanka_Gupta_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Immediately show Thank You success state
    setIsSubmitting(false);
    setIsSuccess(true);

    // 3. Fire-and-forget background operations (non-blocking)
    // A. Firestore save
    addDoc(collection(db, 'resume_downloads'), {
      name: submittedName,
      email: submittedEmail,
      downloadedAt: serverTimestamp(),
    }).catch((err) => {
      console.warn('Firestore background notice:', err.message);
    });

    // B. EmailJS Notification
    if (EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          user_name: submittedName,
          user_email: submittedEmail,
          time: downloadTime,
        },
        EMAILJS_PUBLIC_KEY
      ).catch((err) => {
        console.warn('EmailJS background error:', err.message);
      });
    }

    // C. Gather GeoLocation & Send Email Alert ONLY to priyankaguptajpk@gmail.com with ALL details
    (async () => {
      let userIp = 'Detecting...';
      let locationStr = 'Unknown Location';
      let orgStr = 'Unknown Network';

      try {
        const geoRes = await fetch('https://ipapi.co/json/').then((r) => r.json());
        if (geoRes && geoRes.ip) {
          userIp = geoRes.ip;
          const parts = [geoRes.city, geoRes.region, geoRes.country_name].filter(Boolean);
          locationStr = parts.join(', ') || 'Unknown Location';
          orgStr = geoRes.org || geoRes.asn || 'Standard ISP';
        }
      } catch (e) {
        try {
          const geoRes2 = await fetch('https://ip-api.com/json/').then((r) => r.json());
          if (geoRes2 && geoRes2.query) {
            userIp = geoRes2.query;
            const parts = [geoRes2.city, geoRes2.regionName, geoRes2.country].filter(Boolean);
            locationStr = parts.join(', ') || 'Unknown Location';
            orgStr = geoRes2.isp || 'Standard ISP';
          }
        } catch (e2) {}
      }

      // Notify backend API
      try {
        const backendUrl = import.meta.env.VITE_API_URL || '';
        fetch(`${backendUrl}/api/notify-resume-download`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: submittedName,
            email: submittedEmail,
            userIp,
            location: locationStr,
            networkProvider: orgStr,
            downloadTime,
            userAgent: navigator.userAgent,
          }),
        }).catch(() => {});
      } catch (e) {}

      // Instant email alert to priyankaguptajpk@gmail.com with ALL details
      try {
        fetch('https://formsubmit.co/ajax/d75ab0626f92d156111ec9cbf398c58e', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: `🚨 Resume Downloaded by ${submittedName} (${locationStr})`,
            '👤 Visitor Name': submittedName,
            '✉️ Visitor Email': submittedEmail,
            '📅 Download Time': downloadTime,
            '📍 Location (City/Country)': locationStr,
            '🏢 Internet Provider (ISP)': orgStr,
            '🌐 Visitor IP Address': userIp,
            '📱 Device & Browser': navigator.userAgent,
            '🖥️ Screen Size': `${window.screen.width}x${window.screen.height}`,
            '🔗 Page Source': document.referrer || window.location.href,
            _captcha: 'false',
          }),
        }).catch(() => {});
      } catch (e) {}
    })();

    // 4. Close modal after 2 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setEmail('');
      setErrors({});
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    setName('');
    setEmail('');
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-[#0F172A] border border-slate-700/80 rounded-2xl p-6 md:p-8 shadow-2xl text-slate-100 transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-200 transition-colors rounded-full hover:bg-slate-800"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mb-2">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-100">Thank you!</h3>
            <p className="text-sm text-slate-300">
              Your resume download has started automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-1">
                Just before you download...
              </h3>
              <p className="text-sm text-slate-400">
                Please share your name and email so I know who&apos;s interested.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Name <span className="text-sky-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className={`w-full pl-10 pr-4 py-2.5 bg-[#1E293B] border ${
                      errors.name ? 'border-rose-500/80' : 'border-slate-700 focus:border-sky-400'
                    } rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-colors`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-rose-400">{errors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Email <span className="text-sky-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 bg-[#1E293B] border ${
                      errors.email ? 'border-rose-500/80' : 'border-slate-700 focus:border-sky-400'
                    } rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-colors`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-400">{errors.email}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Resume</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
