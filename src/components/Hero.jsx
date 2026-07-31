import { Download, ArrowRight } from 'lucide-react';
import TextType from './TextType';
import SplitText from './SplitText';
import SpecularButton from './SpecularButton';
import SideRays from './SideRays';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen pt-36 pb-20 px-6 flex items-center justify-center max-w-full mx-auto overflow-hidden bg-[#0B192C]">
      {/* SideRays WebGL Light Rays Animation Backdrop from React Bits */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-70">
        <SideRays
          speed={2.0}
          rayColor1="#38BDF8"
          rayColor2="#1E293B"
          intensity={1.6}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.4}
          blend={0.6}
          falloff={1.6}
          opacity={0.7}
        />
      </div>

      {/* Soft Radial Background Glow Effects */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1E293B]/60 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#38BDF8]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8 w-full relative z-10">
        {/* Left Text Column */}
        <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E293B] border border-[#334155] text-xs font-bold text-[#38BDF8] mb-5 shadow-sm hover:border-[#38BDF8]/50 transition-all">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <span>MERN Stack Developer & MCA Student</span>
          </div>

          {/* Name - Smaller & Sleek Sizing */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            Priyanka Gupta
          </h1>

          {/* Animated Role / Title using TextType Component from React Bits */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#38BDF8] mb-5 min-h-[44px] flex items-center justify-center lg:justify-start font-sans">
            <TextType
              text={[
                "Full Stack & MERN Developer",
                "React.js & Node.js Developer",
                "REST API & UI Specialist"
              ]}
              typingSpeed={70}
              deletingSpeed={35}
              pauseDuration={1800}
              showCursor={true}
              cursorCharacter="|"
              className="text-[#38BDF8]"
            />
          </h2>

          {/* Tagline with SplitText GSAP Animation from React Bits */}
          <div className="mb-8 max-w-xl text-center lg:text-left">
            <SplitText
              text="Specializing in MongoDB, Express.js, React.js, and Node.js. Building high-performance, responsive web applications, robust REST APIs, and database solutions."
              className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-sans"
              delay={30}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 15 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              textAlign="left"
            />
          </div>

          {/* CTA Buttons - SpecularButton WebGL Glint Effects from React Bits */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
            <SpecularButton
              size="sm"
              radius={99}
              tint="#ffffff"
              tintOpacity={0.95}
              textColor="#0B192C"
              lineColor="#38BDF8"
              baseColor="#1E293B"
              intensity={1.2}
              shineSize={20}
              shineFade={30}
              onClick={() => {
                document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <SplitText
                text="View Skills"
                delay={20}
                duration={0.5}
                ease="power2.out"
                splitType="chars"
                from={{ opacity: 0, y: 10 }}
                to={{ opacity: 1, y: 0 }}
              />
              <ArrowRight className="w-3.5 h-3.5 text-[#0B192C]" />
            </SpecularButton>

            <SpecularButton
              size="sm"
              radius={99}
              tint="#1E293B"
              tintOpacity={0.6}
              textColor="#ffffff"
              lineColor="#38BDF8"
              baseColor="#334155"
              intensity={1}
              shineSize={20}
              shineFade={30}
              onClick={() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <SplitText
                text="Contact Me"
                delay={20}
                duration={0.5}
                ease="power2.out"
                splitType="chars"
                from={{ opacity: 0, y: 10 }}
                to={{ opacity: 1, y: 0 }}
              />
            </SpecularButton>

            <SpecularButton
              size="sm"
              radius={99}
              tint="#1E293B"
              tintOpacity={0.3}
              textColor="#38BDF8"
              lineColor="#38BDF8"
              baseColor="#334155"
              intensity={1}
              shineSize={20}
              shineFade={30}
              onClick={() => {
                const a = document.createElement('a');
                a.href = '/Priyanka_Gupta_Resume.pdf';
                a.download = 'Priyanka_Gupta_Resume.pdf';
                a.click();
              }}
            >
              <Download className="w-3.5 h-3.5 text-[#38BDF8]" />
              <SplitText
                text="Resume"
                delay={20}
                duration={0.5}
                ease="power2.out"
                splitType="chars"
                from={{ opacity: 0, y: 10 }}
                to={{ opacity: 1, y: 0 }}
              />
            </SpecularButton>
          </div>
        </div>

        {/* Right Photo Column - Wide Clean Photo Card */}
        <div className="lg:col-span-5 flex justify-center items-center w-full">
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-md h-[400px] sm:h-[460px] rounded-3xl p-3 bg-[#1E293B] border border-[#334155] shadow-2xl group overflow-hidden hover:border-[#38BDF8]/50 transition-all duration-300">
            
            {/* Inner Portrait Card */}
            <div className="w-full h-full rounded-2xl overflow-hidden bg-[#0B192C] relative border border-[#334155]/80">
              <img
                src="/priyanka.png"
                alt="Priyanka Gupta - Full Stack Developer"
                className="w-full h-full object-cover object-top filter brightness-[1.03] contrast-[1.02] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/50 via-transparent to-transparent opacity-80" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
