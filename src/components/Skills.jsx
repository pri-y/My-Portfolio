import {
  FaReact,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGitAlt,
  FaJava,
  FaGithub,
} from 'react-icons/fa';
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiMysql,
  SiPostman,
  SiVercel,
} from 'react-icons/si';

export default function Skills() {
  const skillCategories = [
    {
      category: 'Frontend & UI',
      items: [
        { name: 'React.js', icon: FaReact, color: 'text-cyan-600' },
        { name: 'JavaScript (ES6+)', icon: FaJsSquare, color: 'text-amber-500' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-sky-500' },
        { name: 'HTML5', icon: FaHtml5, color: 'text-orange-600' },
        { name: 'CSS3', icon: FaCss3Alt, color: 'text-blue-600' },
      ],
    },
    {
      category: 'Backend & Databases',
      items: [
        { name: 'Node.js', icon: FaNodeJs, color: 'text-emerald-600' },
        { name: 'Express.js', icon: SiExpress, color: 'text-slate-700' },
        { name: 'MongoDB', icon: SiMongodb, color: 'text-emerald-600' },
        { name: 'MySQL', icon: SiMysql, color: 'text-cyan-600' },
        { name: 'Java (Primary)', icon: FaJava, color: 'text-amber-600' },
      ],
    },
    {
      category: 'Tools & Practices',
      items: [
        { name: 'Git', icon: FaGitAlt, color: 'text-rose-600' },
        { name: 'GitHub', icon: FaGithub, color: 'text-slate-800' },
        { name: 'Postman', icon: SiPostman, color: 'text-orange-600' },
        { name: 'Vercel', icon: SiVercel, color: 'text-slate-900' },
      ],
    },
  ];

  return (
    <section id="skills" className="pt-10 pb-20 px-6 max-w-5xl mx-auto text-center bg-[#F8FAFC]">
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-12">
        Technical Skills
      </h2>

      {/* Skill Categories */}
      <div className="space-y-10 text-left">
        {skillCategories.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0B192C]" />
              <span>{group.category}</span>
            </h3>

            {/* Hoverable Skill Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {group.items.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={index}
                    className="group flex flex-col items-center justify-center gap-2.5 bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm hover:-translate-y-1.5 hover:shadow-md hover:border-[#0B192C]/40 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                  >
                    <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] group-hover:bg-[#0B192C] group-hover:border-[#0B192C] transition-all duration-300">
                      <Icon className={`text-3xl ${skill.color} group-hover:text-white transition-colors duration-300`} />
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] text-center group-hover:text-[#0B192C] transition-colors">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
