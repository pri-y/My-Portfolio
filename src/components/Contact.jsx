import { FaEnvelope, FaLinkedin, FaPhoneAlt } from 'react-icons/fa';

export default function Contact() {
  const contactLinks = [
    {
      name: 'Email',
      label: 'Priyankagupta1697@gmail.com',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=Priyankagupta1697@gmail.com',
      icon: FaEnvelope,
      target: '_blank',
    },
    {
      name: 'Phone',
      label: '+91-6267457658',
      href: 'tel:+916267457658',
      icon: FaPhoneAlt,
      target: '_self',
    },
    {
      name: 'LinkedIn',
      label: 'linkedin.com/in/Priyanka-Gupta',
      href: 'https://www.linkedin.com/in/Priyanka-Gupta',
      icon: FaLinkedin,
      target: '_blank',
    },
  ];

  return (
    <section id="contact" className="pt-10 pb-20 px-6 bg-white border-t border-[#E2E8F0] text-center">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
          Get In Touch
        </h2>

        {/* Intro Text */}
        <p className="text-base md:text-lg text-[#475569] mb-12 leading-relaxed max-w-xl mx-auto font-sans">
          Feel free to reach out — I'm always open to discussing web application projects, frontend/backend roles, or new opportunities.
        </p>

        {/* Hoverable Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {contactLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                target={link.target}
                rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="group flex flex-col items-center justify-center p-6 text-[#0F172A] border border-[#E2E8F0] bg-[#F8FAFC] rounded-2xl shadow-sm hover:-translate-y-2 hover:bg-white hover:shadow-md hover:border-[#0B192C]/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] text-[#0B192C] flex items-center justify-center mb-3 shadow-sm group-hover:bg-[#0B192C] group-hover:text-white transition-all duration-300">
                  <Icon className="text-xl" />
                </div>
                <span className="text-xs font-extrabold text-[#0B192C] uppercase tracking-wider mb-1 font-sans">
                  {link.name}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#0F172A] break-all text-center group-hover:text-[#0B192C] font-sans">
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
