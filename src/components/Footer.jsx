import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Email',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=Priyankagupta1697@gmail.com',
      icon: FaEnvelope,
      ariaLabel: 'Send email to Priyanka Gupta in Gmail',
      target: '_blank',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/pri-y',
      icon: FaGithub,
      ariaLabel: 'Priyanka Gupta GitHub Profile',
      target: '_blank',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/Priyanka-Gupta',
      icon: FaLinkedin,
      ariaLabel: 'Priyanka Gupta LinkedIn Profile',
      target: '_blank',
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-4 sm:py-5 px-6 border-t border-[#1E293B] bg-[#0B192C] text-center relative font-sans">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Copyright & Subtle Quote */}
        <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 text-xs sm:text-sm text-[#94A3B8]">
          <p className="font-medium">
            &copy; {currentYear} Priyanka Gupta.
          </p>
          <span className="hidden sm:inline text-[#38BDF8]/40">•</span>
          <p className="italic text-[#38BDF8] text-xs font-semibold tracking-wide">
            "I don't just write code — I solve problems."
          </p>
        </div>

        {/* Social Icons Row */}
        <div className="flex justify-center items-center gap-3">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                target={social.target}
                rel={social.target === '_blank' ? 'noopener noreferrer' : undefined}
                aria-label={social.ariaLabel}
                className="text-base text-white p-2 rounded-full bg-[#1E293B] border border-[#334155] hover:scale-110 hover:text-[#38BDF8] hover:border-[#38BDF8] transition-all duration-300"
              >
                <Icon />
              </a>
            );
          })}

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-2 rounded-full bg-white text-[#0B192C] font-bold shadow-md ml-1 hover:scale-110 hover:bg-[#38BDF8] transition-all duration-300"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
