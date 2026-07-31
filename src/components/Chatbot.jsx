import { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  User, 
  Minimize2, 
  RotateCcw, 
  ChevronRight,
  ExternalLink,
  Code2,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Mail,
  FileText,
  Heart,
  Award
} from 'lucide-react';


const PRIYANKA_KNOWLEDGE = {
  name: "Priyanka Gupta",
  role: "Full Stack & MERN Stack Developer",
  availability: "Open to Work! Available immediately for Full-Time Full Stack / MERN Developer roles, Internships, and Freelance opportunities (Remote or On-site).",
  hobbies: ["Cooking", "Coding & Building Web Apps", "Reading Books", "Diary Writing & Reflection"],
  softSkills: [
    "Observing Nature & Mindful Reflection",
    "Leadership & Initiative",
    "Quick Learner & Adaptable",
    "Problem Solving & Logical Thinking",
    "Team Collaboration & Effective Communication"
  ],
  education: [
    "MCA (Master of Computer Applications) from Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal (2023-2025) with 8.08 CGPA.",
    "B.Sc (Bachelor of Science) from Maharaja Chhatrasal University, Chhatarpur (2020-2023) with 62.12%.",
    "12th Higher Secondary from Govt. H.S. School, Bandakpur, Damoh (83.3%)."
  ],
  skills: {
    frontend: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3"],
    backend: ["Node.js", "Express.js", "MongoDB", "MySQL", "Java (Primary)"],
    tools: ["Git", "GitHub", "Postman", "Vercel"]
  },
  projects: [
    {
      name: "Weather Application Project",
      tech: "React.js, Tailwind CSS, Weather API",
      description: "Real-time weather forecast web app with clean UI and API integration."
    },
    {
      name: "Wedding Management System",
      tech: "MongoDB, Express.js, React.js, Node.js, Tailwind CSS, Material UI",
      description: "Full-stack event management solution for booking, guest management, and services."
    }
  ],
  experience: [
    "MERN Stack Trainee & Intern at CodeBetter Training & IT Solution, Indore (Dec 2025) - Built full-stack web applications and REST API integrations.",
    "Freelance Digital Marketing & SEO Specialist - Worked on content optimization and search rankings."
  ],
  contact: {
    email: "Priyankagupta1697@gmail.com",
    github: "https://github.com/pri-y",
    linkedin: "https://www.linkedin.com/in/Priyanka-Gupta",
    location: "India"
  }
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 17) return "Good afternoon!";
    return "Good evening!";
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `${getGreeting()} I'm **Priyanka's AI Assistant**.\n\nHow can I help you today? Ask me about her **availability, soft skills, hobbies, technical stack, projects**, or **contact details**!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: [
        { label: 'Open to Work?', action: 'availability' },
        { label: 'Soft Skills', action: 'soft skills' },
        { label: 'Hobbies', action: 'hobbies' },
        { label: 'Skills', action: 'skills' },
        { label: 'Projects', action: 'projects' },
        { label: 'Contact', action: 'contact' }
      ]
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Hide teaser after 10 seconds or when opened
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTeaser(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setShowTeaser(false);
  };

  const handleReset = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: `Conversation reset! What would you like to know about Priyanka?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: [
          { label: 'Availability', action: 'availability' },
          { label: 'Soft Skills', action: 'soft skills' },
          { label: 'Hobbies', action: 'hobbies' },
          { label: 'Skills', action: 'skills' },
          { label: 'Projects', action: 'projects' },
          { label: 'Contact Info', action: 'contact' }
        ]
      }
    ]);
  };

  const generateBotReply = (query) => {
    const q = query.toLowerCase().trim();

    // How are you / pleasantries
    if (q.includes('how are you') || q.includes('how r u') || q.includes('how are u') || q.includes("how's it going") || q.includes('how do you do') || q.includes('wbu') || q.includes('what about you')) {
      return {
        text: `I am fine 😊 Thank you for asking!\n\nI'm ready to help you learn more about Priyanka—her technical skills, soft skills, hobbies, projects, or work availability.\n\nHow can I help you right now?`,
        quickReplies: [
          { label: 'Is she Open to Work?', action: 'availability' },
          { label: 'Surprise Me!', action: 'surprise me' },
          { label: 'What are her Soft Skills?', action: 'soft skills' },
          { label: 'What are her Hobbies?', action: 'hobbies' }
        ]
      };
    }

    // Developer Jokes / Funny
    if (q.includes('joke') || q.includes('funny') || q.includes('laugh') || q.includes('humor')) {
      return {
        text: `Here is a developer joke for you:\n\n` +
              `"Why do programmers prefer dark mode?"\n` +
              `"Because light attracts bugs!" 😂\n\n` +
              `Want another one, or should we check out Priyanka's actual non-buggy code?`,
        quickReplies: [
          { label: 'Tell me another joke', action: 'joke' },
          { label: 'Show Projects', action: 'projects' }
        ]
      };
    }

    // Fun Fact / Secret / Easter Egg
    if (q.includes('fact') || q.includes('secret') || q.includes('easter egg') || q.includes('hidden')) {
      return {
        text: `Fun Fact about Priyanka:\n\n` +
              `When faced with a tough coding bug, Priyanka takes a quick break to observe nature or write in her diary. Returning with fresh eyes helps her solve the bug on the very first try!`,
        quickReplies: [
          { label: 'Soft Skills', action: 'soft skills' },
          { label: 'Hobbies', action: 'hobbies' }
        ]
      };
    }

    // Superpower
    if (q.includes('superpower') || q.includes('super power') || q.includes('magic') || q.includes('talent')) {
      return {
        text: `Priyanka's Superpower:\n\n` +
              `Turning complex UI/UX designs into responsive, high-performance React & MERN stack applications faster than you can run 'npm install'!`,
        quickReplies: [
          { label: 'Technical Skills', action: 'skills' },
          { label: 'Open to Work?', action: 'availability' }
        ]
      };
    }

    // Bot Identity / Robot vs Human
    if (q.includes('who are you') || q.includes('robot') || q.includes('human') || q.includes('are you real') || q.includes('who made you')) {
      return {
        text: `I'm Priyanka's custom AI Assistant!\n\n` +
              `I'm 100% code and require zero coffee, while Priyanka herself is powered by MCA knowledge, React.js, and dedication!`,
        quickReplies: [
          { label: 'Tell me a joke', action: 'joke' },
          { label: 'Skills', action: 'skills' }
        ]
      };
    }

    // Availability / Open to work
    if (q.includes('availab') || q.includes('open to work') || q.includes('hiring') || q.includes('hire') || q.includes('join') || q.includes('notice') || q.includes('relocat') || q.includes('full time') || q.includes('internship')) {
      return {
        text: `**Status: Open to Work!**\n\n` +
              `Priyanka is **actively seeking** exciting full-time opportunities as a **MERN Stack / Full Stack Developer** or Software Engineer.\n\n` +
              `• **Availability:** Immediate Joiner\n` +
              `• **Work Preference:** Remote, Hybrid, or On-site\n` +
              `• **Role Focus:** React.js, Node.js, Express.js, MongoDB, Java & REST APIs\n\n` +
              `Would you like to get in touch with her directly or open the contact form?`,
        actions: [
          { label: 'Open Contact Form', scrollTo: '#contact', type: 'scroll' },
          { label: 'Send Email Directly', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=Priyankagupta1697@gmail.com', type: 'link' }
        ]
      };
    }

    // Hobbies & Interests
    if (q.includes('hobby') || q.includes('hobbies') || q.includes('interest') || q.includes('cook') || q.includes('reading') || q.includes('book') || q.includes('diary') || q.includes('free time') || q.includes('passionate')) {
      return {
        text: `Beyond writing clean code, Priyanka enjoys engaging in creative and reflective hobbies:\n\n` +
              `• **Cooking** - Experimenting with recipes and preparing delicious meals.\n` +
              `• **Coding & Tech Exploring** - Building side projects & mastering new web technologies.\n` +
              `• **Reading Books** - Reading tech, personal growth, and insightful literature.\n` +
              `• **Diary Writing** - Daily journaling for clarity, mindfulness, and self-growth.`,
        quickReplies: [
          { label: 'Soft Skills', action: 'soft skills' },
          { label: 'Open to Work?', action: 'availability' }
        ]
      };
    }

    // Soft Skills & Qualities
    if (q.includes('soft skill') || q.includes('softskills') || q.includes('strength') || q.includes('quality') || q.includes('qualities') || q.includes('nature') || q.includes('leader') || q.includes('quick learner') || q.includes('observe') || q.includes('personality')) {
      return {
        text: `Key **Soft Skills & Personal Strengths** that Priyanka brings to a team:\n\n` +
              `• **Observing Nature** - Keen sense of observation, mindfulness, and detail-oriented perspective.\n` +
              `• **Leadership & Initiative** - Takes ownership of tasks, guides projects, and drives positive momentum.\n` +
              `• **Quick Learner** - Adapts rapidly to new frameworks, libraries, and technical environments.\n` +
              `• **Problem Solving** - Analytical approach to debugging and architectural solutions.\n` +
              `• **Team Collaboration** - Effective communication and positive team synergy.`,
        quickReplies: [
          { label: 'Technical Skills', action: 'skills' },
          { label: 'Open to Work?', action: 'availability' }
        ]
      };
    }

    // Why Hire Priyanka?
    if (q.includes('why hire') || q.includes('why priyanka') || q.includes('should i hire') || q.includes('best candidate') || q.includes('why choose')) {
      return {
        text: `Here is why Priyanka is a strong candidate for your team:\n\n` +
              `1. **Solid Academic Foundation:** MCA Graduate with 8.08 CGPA.\n` +
              `2. **Hands-on MERN Expertise:** Full-stack development using MongoDB, Express, React & Node.\n` +
              `3. **Key Soft Skills:** Leadership, quick learning ability, and keen attention to detail.\n` +
              `4. **Immediate Availability:** Ready to join and add value from Day 1.`,
        actions: [
          { label: 'Contact Priyanka', scrollTo: '#contact', type: 'scroll' },
          { label: 'Download Resume', href: '/Priyanka_Gupta_Resume.pdf', download: true, type: 'download' }
        ]
      };
    }

    // Technical Skills
    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('react') || q.includes('node') || q.includes('mongo') || q.includes('java')) {
      return {
        text: `Priyanka is a **Full Stack & MERN Developer** proficient in:\n\n` +
              `• **Frontend:** React.js, JavaScript (ES6+), Tailwind CSS, HTML5, CSS3\n` +
              `• **Backend:** Node.js, Express.js, Java (Primary), REST APIs\n` +
              `• **Databases:** MongoDB, MySQL\n` +
              `• **Tools:** Git, GitHub, Postman, Vercel\n\n` +
              `Would you like to check out her projects or scroll to the skills section?`,
        actions: [
          { label: 'View Skills Section', scrollTo: '#skills', type: 'scroll' },
          { label: 'See Projects', action: 'projects', type: 'quick' }
        ]
      };
    }

    // Projects
    if (q.includes('project') || q.includes('work') || q.includes('weather') || q.includes('wedding') || q.includes('app')) {
      return {
        text: `Here are Priyanka's key featured projects:\n\n` +
              `1. **Weather Application**\n   • Tech: React.js, Tailwind CSS, Weather API\n   • Real-time weather forecasting tool with responsive design.\n\n` +
              `2. **Wedding Management System**\n   • Tech: MongoDB, Express.js, React.js, Node.js, Tailwind CSS, Material UI\n   • Comprehensive web solution for managing events, bookings & guests.\n\n` +
              `Would you like to scroll to the Projects section?`,
        actions: [
          { label: 'Go to Projects Section', scrollTo: '#projects', type: 'scroll' }
        ]
      };
    }

    // Education
    if (q.includes('edu') || q.includes('mca') || q.includes('bsc') || q.includes('college') || q.includes('degree') || q.includes('grade') || q.includes('study')) {
      return {
        text: `Here is Priyanka's educational background:\n\n` +
              `• **Master of Computer Applications (MCA)**\n   • Institution: Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal\n   • Period: Aug 2023 – June 2025\n   • Performance: **CGPA 8.08**\n\n` +
              `• **Bachelor of Science (B.Sc)**\n   • Institution: Maharaja Chhatrasal University, Chhatarpur\n   • Period: 2020 – 2023 | Grade: 62.12%\n\n` +
              `• **12th Higher Secondary** (83.3%)`,
        actions: [
          { label: 'View Education Cards', scrollTo: '#about', type: 'scroll' }
        ]
      };
    }

    // Experience
    if (q.includes('exp') || q.includes('intern') || q.includes('job') || q.includes('codebetter') || q.includes('freelance') || q.includes('history')) {
      return {
        text: `Priyanka's work & internship experience:\n\n` +
              `• **MERN Stack Trainee & Intern**\n   • *CodeBetter Training & IT Solution, Indore* (Dec 2025)\n   • Developed responsive full-stack applications with MongoDB, Express, React, and Node.js.\n\n` +
              `• **Freelance Digital Marketing & SEO**\n   • Strategic content marketing, SEO optimization, and keyword performance improvement.`,
        actions: [
          { label: 'View Experience Section', scrollTo: '#experience', type: 'scroll' }
        ]
      };
    }

    // Contact
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('reach') || q.includes('message') || q.includes('github') || q.includes('linkedin') || q.includes('phone') || q.includes('social')) {
      return {
        text: `You can easily reach out to Priyanka:\n\n` +
              `• **Email:** Priyankagupta1697@gmail.com\n` +
              `• **GitHub:** github.com/pri-y\n` +
              `• **LinkedIn:** linkedin.com/in/Priyanka-Gupta\n` +
              `• **Location:** India\n\n` +
              `Or you can send a direct message using the contact form!`,
        actions: [
          { label: 'Open Contact Form', scrollTo: '#contact', type: 'scroll' },
          { label: 'Send Direct Email', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=Priyankagupta1697@gmail.com', type: 'link' }
        ]
      };
    }

    // Resume
    if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
      return {
        text: `You can download Priyanka's latest resume directly using the button below:`,
        actions: [
          { label: 'Download Resume (PDF)', href: '/Priyanka_Gupta_Resume.pdf', download: true, type: 'download' }
        ]
      };
    }

    // Greetings
    if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('greetings') || q.includes('good morning') || q.includes('good evening')) {
      return {
        text: `Hello! Great to meet you. Feel free to ask anything about Priyanka's **availability, soft skills, hobbies, technical stack, projects**, or **contact info**!`,
        quickReplies: [
          { label: 'Open to Work?', action: 'availability' },
          { label: 'Soft Skills', action: 'soft skills' },
          { label: 'Hobbies', action: 'hobbies' },
          { label: 'Skills', action: 'skills' }
        ]
      };
    }

    // Default Fallback
    return {
      text: `I'm happy to help! Here are a few things you can ask me:\n\n` +
            `• "Is Priyanka Open to Work?"\n` +
            `• "What are her soft skills?"\n` +
            `• "What are her hobbies?"\n` +
            `• "What are her technical skills?"\n` +
            `• "Tell me about her projects"`,
      quickReplies: [
        { label: 'Open to Work?', action: 'availability' },
        { label: 'Soft Skills', action: 'soft skills' },
        { label: 'Hobbies', action: 'hobbies' },
        { label: 'Skills', action: 'skills' }
      ]
    };
  };

  const handleSendMessage = (textToSend = null) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputMsg('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const replyData = generateBotReply(query);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyData.text,
        actions: replyData.actions,
        quickReplies: replyData.quickReplies,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleQuickReply = (action) => {
    handleSendMessage(action);
  };

  const handleActionClick = (action) => {
    if (action.scrollTo) {
      const el = document.querySelector(action.scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action.href) {
      if (action.download) {
        const a = document.createElement('a');
        a.href = action.href;
        a.download = 'Priyanka_Gupta_Resume.pdf';
        a.click();
      } else {
        window.open(action.href, '_blank');
      }
    } else if (action.action) {
      handleSendMessage(action.action);
    }
  };

  // Helper function to render text with bold syntax
  const renderFormattedText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // replace **text** with <strong>text</strong>
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={idx} className="block min-h-[1.25em]">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-extrabold text-[#0B192C]">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </span>
      );
    });
  };

  return (
    <div className="fixed bottom-20 right-5 sm:bottom-20 sm:right-6 z-[9999] font-sans">
      {/* Teaser Popup Bubble */}
      {showTeaser && !isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 w-64 p-3.5 bg-[#0B192C] text-white rounded-2xl shadow-2xl border border-[#1E293B] text-xs animate-bounce flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-[#38BDF8] text-[#0B192C] flex items-center justify-center shrink-0 font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-grow">
            <p className="font-bold text-[#38BDF8] mb-0.5">Need help?</p>
            <p className="text-[#94A3B8] text-[11px]">Ask Priyanka AI anything about skills, projects & resume!</p>
          </div>
          <button 
            onClick={() => setShowTeaser(false)}
            className="text-slate-400 hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button (Launcher) */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="group relative flex items-center gap-2.5 px-4 py-3.5 bg-[#0B192C] text-white rounded-full shadow-2xl hover:shadow-sky-500/25 border border-[#1E293B] hover:border-[#38BDF8]/60 hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Open Chatbot"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-[#1E293B] text-[#38BDF8] flex items-center justify-center border border-[#334155]">
              <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0B192C] rounded-full" />
          </div>
          <div className="hidden sm:flex flex-col items-start pr-1">
            <span className="text-xs font-extrabold tracking-wide text-white leading-tight">
              Ask AI Assistant
            </span>
            <span className="text-[10px] text-[#38BDF8] font-bold">
              Online • Quick Answers
            </span>
          </div>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[520px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-[#0B192C] text-white flex items-center justify-between border-b border-[#1E293B] shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-[#1E293B] text-[#38BDF8] flex items-center justify-center border border-[#334155]">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#0B192C] rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-extrabold text-white leading-tight">
                    Priyanka AI Assistant
                  </h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-[#94A3B8]">
                  Portfolio Guide & Helper
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset Chat"
                className="p-2 text-slate-400 hover:text-white hover:bg-[#1E293B] rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-2 text-slate-400 hover:text-white hover:bg-[#1E293B] rounded-xl transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-[#F8FAFC]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end gap-2 max-w-[85%]">
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-lg bg-[#0B192C] text-[#38BDF8] flex items-center justify-center shrink-0 mb-1 text-xs">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#0B192C] text-white rounded-br-none font-medium'
                        : 'bg-white text-[#334155] border border-[#E2E8F0] rounded-bl-none'
                    }`}
                  >
                    {renderFormattedText(msg.text)}

                    {/* Interactive Action Buttons inside response */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 flex flex-col gap-1.5 pt-2 border-t border-[#E2E8F0]">
                        {msg.actions.map((act, i) => (
                          <button
                            key={i}
                            onClick={() => handleActionClick(act)}
                            className="w-full px-3 py-2 bg-[#F8FAFC] hover:bg-[#0B192C] text-[#0B192C] hover:text-white border border-[#E2E8F0] hover:border-[#0B192C] rounded-xl text-[11px] font-bold transition-all duration-200 flex items-center justify-between group"
                          >
                            <span>{act.label}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#38BDF8] group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <span className="text-[9px] text-[#94A3B8] mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Quick Reply Chips below bot message */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.quickReplies.map((qr, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickReply(qr.action)}
                        className="px-2.5 py-1 bg-white hover:bg-[#0B192C] text-[#0F172A] hover:text-white border border-[#E2E8F0] hover:border-[#0B192C] rounded-full text-[11px] font-semibold shadow-xs transition-all duration-200"
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#0B192C] text-[#38BDF8] flex items-center justify-center shrink-0 text-xs">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-[#E2E8F0] p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Preset Quick Chips Bar */}
          <div className="px-3 py-2 bg-white border-t border-[#E2E8F0] flex gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSendMessage('Is she Open to Work?')}
              className="px-2.5 py-1 bg-[#F8FAFC] hover:bg-[#0B192C] text-[#475569] hover:text-white rounded-lg text-[10px] font-bold border border-[#E2E8F0] shrink-0 transition-colors flex items-center gap-1"
            >
              <Briefcase className="w-3 h-3 text-[#38BDF8]" />
              <span>Open to Work</span>
            </button>
            <button
              onClick={() => handleSendMessage('What are her soft skills?')}
              className="px-2.5 py-1 bg-[#F8FAFC] hover:bg-[#0B192C] text-[#475569] hover:text-white rounded-lg text-[10px] font-bold border border-[#E2E8F0] shrink-0 transition-colors flex items-center gap-1"
            >
              <Award className="w-3 h-3 text-[#38BDF8]" />
              <span>Soft Skills</span>
            </button>
            <button
              onClick={() => handleSendMessage('What are her hobbies?')}
              className="px-2.5 py-1 bg-[#F8FAFC] hover:bg-[#0B192C] text-[#475569] hover:text-white rounded-lg text-[10px] font-bold border border-[#E2E8F0] shrink-0 transition-colors flex items-center gap-1"
            >
              <Heart className="w-3 h-3 text-[#38BDF8]" />
              <span>Hobbies</span>
            </button>
            <button
              onClick={() => handleSendMessage('What are your skills?')}
              className="px-2.5 py-1 bg-[#F8FAFC] hover:bg-[#0B192C] text-[#475569] hover:text-white rounded-lg text-[10px] font-bold border border-[#E2E8F0] shrink-0 transition-colors flex items-center gap-1"
            >
              <Code2 className="w-3 h-3 text-[#38BDF8]" />
              <span>Skills</span>
            </button>
            <button
              onClick={() => handleSendMessage('Show me projects')}
              className="px-2.5 py-1 bg-[#F8FAFC] hover:bg-[#0B192C] text-[#475569] hover:text-white rounded-lg text-[10px] font-bold border border-[#E2E8F0] shrink-0 transition-colors flex items-center gap-1"
            >
              <FolderGit2 className="w-3 h-3 text-[#38BDF8]" />
              <span>Projects</span>
            </button>
            <button
              onClick={() => handleSendMessage('Tell me about education')}
              className="px-2.5 py-1 bg-[#F8FAFC] hover:bg-[#0B192C] text-[#475569] hover:text-white rounded-lg text-[10px] font-bold border border-[#E2E8F0] shrink-0 transition-colors flex items-center gap-1"
            >
              <GraduationCap className="w-3 h-3 text-[#38BDF8]" />
              <span>Education</span>
            </button>
            <button
              onClick={() => handleSendMessage('How to contact?')}
              className="px-2.5 py-1 bg-[#F8FAFC] hover:bg-[#0B192C] text-[#475569] hover:text-white rounded-lg text-[10px] font-bold border border-[#E2E8F0] shrink-0 transition-colors flex items-center gap-1"
            >
              <Mail className="w-3 h-3 text-[#38BDF8]" />
              <span>Contact</span>
            </button>
          </div>

          {/* Input Box Bar */}
          <div className="p-3 bg-white border-t border-[#E2E8F0] flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask a question..."
              className="flex-grow px-3.5 py-2.5 text-xs text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0B192C] focus:bg-white transition-all font-sans"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMsg.trim()}
              className="p-2.5 bg-[#0B192C] text-[#38BDF8] rounded-xl hover:bg-[#1E293B] hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all shadow-sm"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
