import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      title: 'MERN Stack Trainee & Intern',
      company: 'CodeBetter Training & IT Solution',
      location: 'Indore, Madhya Pradesh',
      period: 'Dec 2025',
      highlights: [
        'Built responsive web applications using React.js, HTML, CSS, and JavaScript with API integrations and Git/GitHub version control.',
        'Developed full-stack web applications using MongoDB, Express.js, React.js, and Node.js, delivering a seamless user experience across all devices.',
      ],
    },
    {
      title: 'Freelance Digital Marketing',
      company: 'Content Marketing & SEO',
      location: 'Remote',
      period: 'Freelance',
      highlights: [
        'Worked on SEO, content marketing, and AI-generated content strategies to improve website visibility and organic traffic.',
        'Managed keyword optimization, forum marketing, and backlink-building to enhance search rankings and engagement.',
      ],
    },
  ];

  return (
    <section id="experience" className="pt-10 pb-20 px-6 bg-white border-y border-[#E2E8F0] text-center">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-12">
          Work Experience
        </h2>

        {/* Hoverable Experience Timeline Cards */}
        <div className="flex flex-col gap-6 text-left">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm hover:-translate-y-1.5 hover:shadow-md hover:border-[#0B192C]/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#0B192C] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-base font-extrabold text-[#0B192C] mt-0.5">
                    {exp.company}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#475569] font-semibold">
                  <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#E2E8F0] text-[#0B192C] font-bold shadow-sm group-hover:border-[#0B192C]/40 transition-colors">
                    <Calendar className="w-3.5 h-3.5 text-[#0B192C]" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#E2E8F0] text-[#0B192C] font-bold shadow-sm group-hover:border-[#0B192C]/40 transition-colors">
                    <MapPin className="w-3.5 h-3.5 text-[#0B192C]" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <ul className="space-y-2 mt-4 text-sm text-[#475569] leading-relaxed list-disc list-inside">
                {exp.highlights.map((point, i) => (
                  <li key={i} className="pl-1 font-sans">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
