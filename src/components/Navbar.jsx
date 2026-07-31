import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
    { name: 'Reviews', href: '#reviews' },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B192C]/90 backdrop-blur-xl border-b border-[#1E293B] shadow-lg py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-end">
          {/* Desktop Navigation - Animated Staggered Slide In From Right */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
            <nav className="flex items-center gap-1.5">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  style={{ animationDelay: `${index * 90}ms` }}
                  className="animate-slide-right text-xs sm:text-sm font-bold text-slate-200 hover:text-[#38BDF8] px-3.5 py-2 rounded-full transition-all duration-300 hover:bg-[#1E293B] hover:scale-105 active:scale-95"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              style={{ animationDelay: `${navLinks.length * 90}ms` }}
              className="animate-slide-right text-xs font-extrabold bg-[#38BDF8] text-[#0B192C] px-5 py-2.5 rounded-full shadow-md hover:bg-[#7DD3FC] hover:scale-105 hover:shadow-sky-400/30 active:scale-95 transition-all duration-300"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            className="md:hidden text-lg text-white focus:outline-none p-2.5 rounded-xl bg-[#1E293B] border border-[#334155] hover:bg-[#334155] transition-all ml-auto"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Over Backdrop */}
      {isOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300"
        />
      )}

      {/* Mobile Right-Side Slide-Over Navigation Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-72 max-w-[80vw] bg-[#0B192C] border-l border-[#1E293B] z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#1E293B] mb-6">
            <span className="text-xs font-extrabold text-[#38BDF8] uppercase tracking-wider">
              Navigation
            </span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close Drawer"
              className="text-white text-base p-2 rounded-lg bg-[#1E293B] border border-[#334155] hover:bg-[#334155] transition-all"
            >
              <FaTimes />
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="text-base font-bold text-slate-200 hover:text-[#0B192C] hover:bg-[#38BDF8] px-4 py-3 rounded-xl transition-all border-b border-[#1E293B]/50"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Drawer Bottom CTA Button */}
        <div className="pt-6 border-t border-[#1E293B]">
          <a
            href="#contact"
            onClick={closeMenu}
            className="block text-center text-sm font-extrabold bg-[#38BDF8] text-[#0B192C] px-5 py-3 rounded-full shadow-lg hover:bg-[#7DD3FC] transition-all"
          >
            Hire Me
          </a>
        </div>
      </aside>
    </>
  );
}
