import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Weather Application Project',
      subtitle: 'Real-time Weather Forecast Web App',
      description: 'Developed a responsive Weather Application using React.js, Tailwind CSS, and Weather API to display real-time weather data. Designed a clean UI and integrated APIs for a seamless user experience across all screen sizes.',
      tags: ['React.js', 'Tailwind CSS', 'Weather API', 'JavaScript'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 2,
      title: 'Wedding Management System',
      subtitle: 'Full-Stack Event Management Solution',
      description: 'Developed a comprehensive Wedding Management System using MongoDB, React.js, Node.js, Express.js, Tailwind CSS, and Material UI. Built responsive and user-friendly interfaces for managing wedding events, guest details, bookings, and services.',
      tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Material UI'],
      liveUrl: '#',
      githubUrl: '#',
    },
  ];

  return (
    <section id="projects" className="pt-10 pb-20 px-6 max-w-5xl mx-auto text-center bg-[#F8FAFC]">
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-12">
        Projects
      </h2>

      {/* Hoverable Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] flex flex-col justify-between shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-[#0B192C]/40 transition-all duration-300"
          >
            {/* Project Header Banner - Corporate Navy */}
            <div className="w-full p-6 bg-[#0B192C] text-white border-b border-[#1E293B] relative flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-[#38BDF8] uppercase tracking-wider">
                  {project.subtitle}
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1 group-hover:text-[#38BDF8] transition-colors">
                  {project.title}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#334155] text-[#38BDF8] flex items-center justify-center shrink-0 group-hover:bg-[#38BDF8] group-hover:text-[#0B192C] transition-all duration-300">
                <span className="text-xs font-bold">0{project.id}</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <p className="text-sm text-[#475569] mb-6 leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-[#F8FAFC] text-[#0B192C] px-3 py-1 rounded-full font-bold border border-[#E2E8F0] font-sans"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-5 text-sm font-semibold pt-4 border-t border-[#E2E8F0] font-sans">
                <a
                  href={project.liveUrl}
                  className="text-[#0B192C] font-extrabold flex items-center gap-1.5 hover:text-[#38BDF8] hover:translate-x-1 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
                <a
                  href={project.githubUrl}
                  className="text-[#475569] flex items-center gap-1.5 hover:text-[#0B192C] hover:translate-x-1 transition-all"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>GitHub Repo</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
