import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export default function About() {
  const [cardsVisible, setCardsVisible] = useState(false);
  const cardsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const educationList = [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal',
      period: 'Aug 2023 – June 2025',
      grade: 'CGPA 8.08',
      icon: GraduationCap,
    },
    {
      degree: 'Bachelor of Science (B.Sc)',
      institution: 'Maharaja Chhatrasal University, Chhatarpur',
      period: 'June 2020 – July 2023',
      grade: '62.12%',
      icon: BookOpen,
    },
    {
      degree: 'Higher Secondary Certificate (12th)',
      institution: 'Govt. Higher Secondary School, Bandakpur, Damoh, MP',
      period: 'June 2019 – May 2020',
      grade: '83.3%',
      icon: Award,
    },
  ];

  return (
    <section id="about" className="pt-12 pb-20 px-6 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto">
        
        {/* Professional Summary 2-Column Card - Hoverable */}
        <div className="bg-[#FFFDF5] rounded-3xl p-8 sm:p-12 shadow-sm mb-16 text-left hover:-translate-y-1 hover:shadow-md border border-transparent hover:border-[#E2E8F0] transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                Professional Summary
              </h2>
            </div>

            {/* Right Column: Paragraph Text */}
            <div className="lg:col-span-7">
              <p className="text-base sm:text-lg lg:text-xl text-[#334155] leading-relaxed sm:leading-loose font-normal font-sans">
                Aspiring Computer Science MCA student and MERN Stack Developer skilled in MongoDB, Express.js, React.js, and Node.js. Experienced in building responsive and user-friendly web applications, full-stack development, REST API integration, and database management. Passionate about collaborating in dynamic team environments to build clean, efficient, and scalable web solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Education Subheading & Cards */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B192C]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Education
            </h3>
          </div>

          {/* Education Cards Grid - Interactive Hoverable Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {educationList.map((edu, index) => {
              const Icon = edu.icon;
              return (
                <div
                  key={index}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  className={`group bg-[#0B192C] text-white border border-[#1E293B] rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between reveal-card ${
                    cardsVisible ? 'is-visible' : ''
                  } hover:-translate-y-2.5 hover:border-[#38BDF8]/60 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 cursor-pointer`}
                >
                  <div>
                    {/* Icon with scaling & color transition */}
                    <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-[#334155] text-[#38BDF8] flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 group-hover:bg-[#38BDF8] group-hover:text-[#0B192C] group-hover:border-[#38BDF8] transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h4 className="text-base sm:text-lg font-extrabold text-white mb-2 leading-snug group-hover:text-[#38BDF8] transition-colors duration-300">
                      {edu.degree}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#94A3B8] mb-6 leading-relaxed font-sans">
                      {edu.institution}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#1E293B] text-xs font-semibold font-sans">
                    <span className="text-[#94A3B8]">{edu.period}</span>
                    <span className="text-[#38BDF8] bg-[#1E293B] px-3 py-1.5 rounded-full border border-[#334155] shadow-sm font-extrabold group-hover:bg-[#38BDF8] group-hover:text-[#0B192C] group-hover:border-[#38BDF8] transition-all duration-300">
                      {edu.grade}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
