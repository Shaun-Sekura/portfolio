import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Sun, Moon, Github, Linkedin, Mail, 
  ChevronRight, ExternalLink, Download, FileText, 
  MapPin, Calendar, Award, Briefcase, Wrench, ChevronLeft,
  Terminal, ShieldCheck, Printer, ArrowLeft, Grid
} from 'lucide-react';

/* ==============================================================================
   DATA FILE: /data/profile.js
   INSTRUCTIONS: Copy this block to a new file at /data/profile.js when using Next.js.
   Update your personal info, skills, and experience here. 
============================================================================== */
const PROFILE = {
  name: "Shaun Sekura",
  title: "Mechanical Engineering @ The Ohio State University",
  tagline: "Driven by a passion for automotive design, finite element analysis, and sustainable engineering solutions.",
  school: "The Ohio State University",
  degree: "B.S. Mechanical Engineering",
  graduation: "Expected Dec 2027",
  gpa: "3.404",
  email: "sekura.2@buckeyemail.osu.edu",
  linkedin: "linkedin.com/in/shaun-sekura",
  phone: "440 319 5672",
  bio: "I am a Mechanical Engineering student at The Ohio State University, deeply involved in the Center for Automotive Research (EcoCAR & Formula SAE). I specialize in CAD design, FEA simulation, and physical testing, with a strong interest in sustainable technology and automotive innovation.",
  skills: {
    Software: ["SolidWorks", "CATIA", "Onshape", "Python", "MATLAB", "Excel", "Arduino IDE", "EES", "Abaqus FEA", "Siemens TestLab"],
    Fabrication: ["CNC Machining", "Vertical Mill", "Lathe", "3D Printing (FDM & Resin)", "Soldering/Wiring", "Drafting/GD&T"],
    Research: ["CAD Software", "FEA Analysis", "Machining", "Equipment Operation", "Modal Testing"]
  },
  experience: [
    {
      role: "Mechanical Engineering Intern",
      company: "Hankook Tire",
      date: "Upcoming",
      location: "Akron, OH",
      bullets: [
        "Simulated tire loading and deformation conditions using Abaqus FEA, analyzing stress distribution and structural behavior to validate designs across 5+ OEM programs including Tesla, GM, and Lucid Motors.",
        "Conducted physical modal testing on tire assemblies using Siemens TestLab, extracting frequency response data to characterize dynamic behavior under varying load conditions.",
        "Organized and compared large experimental and simulated datasets using Python and Excel, identifying discrepancies between physical and virtual results to improve model accuracy.",
        "Contributed to an ongoing initiative to replace physical tire testing with validated virtual simulations, reducing reliance on costly lab testing while maintaining OEM-grade accuracy standards."
      ]
    },
    {
      role: "Undergraduate Teaching Assistant",
      company: "The Ohio State University - Intro To Mechanical Design (MECHENG 2900)",
      date: "Spring 2026 - Present",
      location: "Columbus, OH",
      bullets: [
        "Mentored students in circuit construction and embedded systems programming.",
        "Communicated complex engineering concepts clearly to students with varying technical backgrounds."
      ]
    },
    {
      role: "Volunteer Undergraduate Researcher",
      company: "EcoCAR Competition Team - Center For Automotive Research",
      date: "Fall 2025 - Present",
      location: "Columbus, OH",
      bullets: [
        "Designed and analyzed 10+ vehicle components using SOLIDWORKS simulations to test and improve strength-to-weight ratios and general vehicle design.",
        "Collaborated across sub-teams (electronics, efficiency, automation, etc.) to integrate structural designs into final build for testing."
      ]
    },
    {
      role: "Volunteer Undergraduate Researcher",
      company: "Formula SAE - Center For Automotive Research",
      date: "Fall 2024 - Spring 2025",
      location: "Columbus, OH",
      bullets: [
        "Assisted with mechanical design for the Formula SAE race car.",
        "Participated in vehicle testing and iterative improvements to support performance and reliability."
      ]
    },
    {
      role: "Executive Board",
      company: "American Society of Mechanical Engineers (ASME)",
      date: "Fall 2024 - Present",
      location: "Columbus, OH",
      bullets: [
        "Organized social events and design challenges, increasing club participation by 320% compared to previous years.",
        "Coordinated industry speaker series and professional networking events for 100+ members."
      ]
    },
    {
      role: "Leadership Council",
      company: "Humanitarian Engineering Scholars (HES)",
      date: "Fall 2024 - Present",
      location: "Columbus, OH",
      bullets: [
        "Spearheaded program engagement efforts by doubling the number of events hosted and tripling student attendance compared to the previous year."
      ]
    },
    {
      role: "Maintenance",
      company: "Valleaire Golf Club",
      date: "2024 - Present",
      location: "Hinckley, OH",
      bullets: [
        "Operated heavy-duty machinery to maintain a golf course spanning over 150 acres.",
        "Reduced water usage on the golf course by 15% saving the company $4,000 through sustainable irrigation practices."
      ]
    }
  ]
};

/* ==============================================================================
   DATA FILE: /data/projects.js
   INSTRUCTIONS: Copy this block to a new file at /data/projects.js when using Next.js.
   To add a project, copy the format of an existing object below and add it to the array.
============================================================================== */
const PROJECTS = [
  {
    slug: "hankook-virtual-testing",
    title: "Hankook Tire Virtual Testing Initiative",
    categories: ["Simulation", "Testing"],
    tags: ["Abaqus FEA", "Siemens TestLab", "Python", "Excel"],
    thumbnail: "hankook-thumb.jpg",
    description: "Virtual simulation and modal testing to validate tire designs for major OEMs (Tesla, GM, Lucid).",
    what: "Contributed to an ongoing initiative to replace physical tire testing with validated virtual simulations, reducing reliance on costly lab testing while maintaining OEM-grade accuracy standards.",
    how: [
      "Simulated tire loading and deformation conditions using Abaqus FEA, analyzing stress distribution and structural behavior.",
      "Conducted physical modal testing on tire assemblies using Siemens TestLab, extracting frequency response data.",
      "Organized and compared large experimental and simulated datasets using Python and Excel."
    ],
    results: [
      "Validated designs across 5+ OEM programs including Tesla, GM, and Lucid Motors.",
      "Characterized dynamic behavior under varying load conditions.",
      "Identified discrepancies between physical and virtual results to improve model accuracy."
    ],
    links: {},
    featured: true
  },
  {
    slug: "reverse-engineering-motor-mount",
    title: "Reverse Engineering of Motor Mount",
    categories: ["Mechanical Design", "Simulation"],
    tags: ["CATIA V5", "FEA Analysis", "Reverse Engineering"],
    thumbnail: "motor-mount-thumb.jpg",
    description: "Reverse engineered and validated a Cadillac Lyriq motor mount to resolve engine ticking noise for EcoCAR.",
    what: "The EcoCAR team identified a ticking noise when the engine started and determined a failing motor mount was the cause. The goal was to reverse engineer the part, test its structural integrity, and reinstall it.",
    how: [
      "Used CATIA V5 to reverse engineer and design the mount.",
      "Performed FEA Analysis to determine stress on the mount, ensuring the part would not fail under load.",
      "Communicated with the manufacturer to confirm critical dimensions and tolerances.",
      "Worked with the team to disassemble the car, replace the motor mount, and reassemble the vehicle."
    ],
    results: [
      "Maintained critical tolerances within 0.25 millimeters.",
      "Successfully replaced the part, resolving the ticking issue.",
      "Established professional relations with the manufacturer."
    ],
    links: { portfolio: true },
    featured: true
  },
  {
    slug: "sustainable-rocket-redesign",
    title: "Sustainable Rocket Redesign",
    categories: ["Simulation", "Mechanical Design"],
    tags: ["Python", "AeroSandbox", "SOLIDWORKS"],
    thumbnail: "rocket-thumb.jpg",
    description: "Reduced order simulation and CAD redesign of a rocket system focusing on descent parameters.",
    what: "A Humanitarian Engineering Scholars (HES) project focused on analyzing and designing a sustainable rocket descent system.",
    how: [
      "Used Python (AeroSandbox library) to build a reduced order simulation of the rocket's descent.",
      "Used SOLIDWORKS to reverse engineer a simplified model of the top of Starship.",
      "Analyzed altitude, velocity, and dynamic pressure over time."
    ],
    results: [
      "Successfully modeled flight characteristics and descent parameters.",
      "Generated detailed performance graphs to validate the theoretical redesign."
    ],
    links: { report: true },
    featured: false
  },
  {
    slug: "slide-grip-development",
    title: "Slide Grip Development System",
    categories: ["Prototyping", "Mechanical Design"],
    tags: ["SOLIDWORKS", "Gantt Chart", "Pugh Matrix"],
    thumbnail: "slide-grip-thumb.jpg",
    description: "Low-cost, lightweight system designed to alleviate wrist pain for performing trombone players.",
    what: "Designed a low cost, lightweight system to alleviate wrist pain for musicians. Tested and approved by international performing trombone players.",
    how: [
      "Used SOLIDWORKS to design the ergonomic system.",
      "Utilized organizational tools including Pairwise Comparison Chart, Pugh Scoring Matrix, and Gantt Charts to guide the iterative design process."
    ],
    results: [
      "Reduced overall design weight by 20% through iterative testing.",
      "Increased playability by 35%, successfully helping alleviate wrist pain during performances."
    ],
    links: { report: true },
    featured: false
  },
  {
    slug: "hmi-mount",
    title: "Human Machine Interface Mount",
    categories: ["Mechanical Design"],
    tags: ["SolidWorks", "Thermal Analysis"],
    thumbnail: "hmi-mount-thumb.jpg",
    description: "Redesigned HMI mount for EcoCAR to resolve collision and thermal buildup issues.",
    what: "Needed to improve upon a previous design for the human machine interface (HMI) mount in the EcoCAR vehicle, which had problems with heat buildup and collision with the vehicle's front structure.",
    how: [
      "Used SolidWorks to design the improved HMI mount.",
      "Worked closely with other subteams to ensure no wiring or collision problems occurred during integration."
    ],
    results: [
      "Eliminated collision points with the vehicle's front structure.",
      "Adjusted geometry to improve thermal airflow, reducing predicted heat buildup by 15%."
    ],
    links: {},
    featured: true
  },
  {
    slug: "osu-led-panel",
    title: "OSU Branded LED Panel",
    categories: ["Prototyping"],
    tags: ["3D Printing (Resin)", "Electronics"],
    thumbnail: "led-panel-thumb.jpg",
    description: "Resin 3D-printed translucent casing for an 8x8 LED charging indicator.",
    what: "Designed and fabricated a casing for the LED panel that indicates when the EcoCAR is charging.",
    how: [
      "Used resin to 3D Print a translucent casing customized for the 8x8 LED.",
      "Worked with the electrical team to replace the previous LED system with the new 8x8 LED matrix."
    ],
    results: [
      "Successfully integrated a branded, highly visible charging indicator into the vehicle's electrical system."
    ],
    links: {},
    featured: false
  }
];

/* ==============================================================================
   COMPONENTS
============================================================================== */

// Helper to handle copying email in constrained environments
const EmailButton = ({ email, className, children }) => {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = (e) => {
    // Attempt to copy to clipboard (great UX fallback for iframes where mailto might be blocked)
    const textArea = document.createElement("textarea");
    textArea.value = email;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <a 
      href={`mailto:${email}`}
      onClick={handleEmailClick}
      className={`relative overflow-hidden ${className}`}
    >
      <AnimatePresence>
        {copied && (
          <motion.span 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="flex items-center justify-center w-full h-full absolute inset-0 bg-emerald-500 text-white z-10 font-bold"
          >
            Copied to Clipboard!
          </motion.span>
        )}
      </AnimatePresence>
      <span className={copied ? 'opacity-0' : 'opacity-100 flex items-center justify-center w-full'}>
        {children}
      </span>
    </a>
  );
};

const PlaceholderImage = ({ filename, title, className = "", small = false, darkMode }) => {
  // Logic to dynamically show the correct -light or -dark filename instruction
  const parts = filename.split('.');
  const ext = parts.pop();
  const base = parts.join('.');
  const themedFilename = `${base}-${darkMode ? 'dark' : 'light'}.${ext}`;

  return (
    <div className={`relative flex flex-col items-center justify-center overflow-hidden bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg ${small ? 'p-3' : 'p-6'} text-center group ${className}`}>
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#0284c7_1px,transparent_1px),linear-gradient(to_bottom,#0284c7_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#bb0000_1px,transparent_1px),linear-gradient(to_bottom,#bb0000_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none transition-colors duration-300"></div>
      
      {!small && (
        <>
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-sky-500/50 dark:border-[#BB0000]/50 transition-colors duration-300"></div>
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-sky-500/50 dark:border-[#BB0000]/50 transition-colors duration-300"></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-sky-500/50 dark:border-[#BB0000]/50 transition-colors duration-300"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-sky-500/50 dark:border-[#BB0000]/50 transition-colors duration-300"></div>
        </>
      )}
      
      <div className="z-10 flex flex-col items-center">
        <Wrench className={`text-sky-600 dark:text-[#BB0000] ${small ? 'mb-1' : 'mb-2'} opacity-80 transition-colors duration-300`} size={small ? 16 : 24} />
        <span className={`text-slate-700 dark:text-slate-300 ${small ? 'text-xs' : 'text-sm'} font-semibold tracking-wider uppercase ${small ? '' : 'mb-1'} line-clamp-1`}>{title}</span>
        {!small && (
          <code className="text-xs text-sky-700 dark:text-red-400 bg-sky-100 dark:bg-[#BB0000]/10 border border-sky-200 dark:border-[#BB0000]/20 px-3 py-1.5 rounded mt-2 transition-colors duration-300">
            Replace with: {themedFilename}
          </code>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false); // Default to Light Mode
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Reset logo error state when theme changes so it tries loading the appropriate dark/light image again
  useEffect(() => {
    setLogoError(false);
  }, [darkMode]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setSelectedProject(null);
    setMobileMenuOpen(false);
    setShowResumeModal(false);
    window.scrollTo(0, 0);
  };

  const openProject = (project) => {
    setSelectedProject(project);
    window.scrollTo(0, 0);
  };

  const logoSrc = darkMode ? '/images/logo-dark.gif' : '/images/logo-light.gif';

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'dark bg-neutral-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Background Subtle Gradient */}
      <div className="fixed top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-sky-500/5 dark:from-[#BB0000]/5 via-transparent to-transparent pointer-events-none z-0 transition-colors duration-300"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-neutral-950/70 border-b border-slate-200 dark:border-neutral-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 cursor-pointer flex items-center gap-2 group" onClick={() => handleNavClick('home')}>
              {!logoError ? (
                <img 
                  src={logoSrc} 
                  alt="Logo" 
                  className="w-8 h-8 rounded object-cover" 
                  onError={() => setLogoError(true)} 
                />
              ) : (
                <div className="w-8 h-8 rounded bg-sky-600 dark:bg-[#BB0000] flex items-center justify-center font-bold text-white tracking-tighter transition-colors duration-300">
                  S
                </div>
              )}
              <span className="font-bold text-lg tracking-tight">S. SEKURA</span>
              <span className="text-sky-600 dark:text-[#BB0000] font-bold transition-colors duration-300">.</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-sm font-medium transition-colors hover:text-sky-600 dark:hover:text-[#BB0000] ${
                      activeTab === item.id && !selectedProject && !showResumeModal ? 'text-sky-600 dark:text-[#BB0000]' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="px-3 py-1.5 border border-sky-600/30 dark:border-[#BB0000]/30 text-sky-600 dark:text-[#BB0000] rounded hover:bg-sky-50 dark:hover:bg-[#BB0000]/10 text-xs font-semibold transition-colors duration-300"
                >
                  Resume
                </button>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Toggle theme"
                >
                  {darkMode ? <Sun size={18} className="text-slate-300 hover:text-white" /> : <Moon size={18} className="text-slate-600 hover:text-slate-900" />}
                </button>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setShowResumeModal(true)}
                className="px-2.5 py-1 border border-sky-600/30 dark:border-[#BB0000]/30 text-sky-600 dark:text-[#BB0000] rounded hover:bg-sky-50 dark:hover:bg-[#BB0000]/10 text-xs font-semibold transition-colors duration-300"
              >
                Resume
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-neutral-800 transition-colors"
              >
                {darkMode ? <Sun size={18} className="text-slate-300" /> : <Moon size={18} className="text-slate-600" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-300"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-white dark:bg-neutral-950 border-b border-slate-200 dark:border-neutral-900"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.id && !selectedProject
                        ? 'text-sky-600 dark:text-[#BB0000] bg-sky-50 dark:bg-[#BB0000]/10'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area */}
      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
        <AnimatePresence mode="wait">
          {showResumeModal ? (
            <ResumeView key="resume-view" onClose={() => setShowResumeModal(false)} />
          ) : selectedProject ? (
            <ProjectDetailView 
              key="project-detail" 
              project={selectedProject} 
              onBack={() => setSelectedProject(null)} 
              darkMode={darkMode}
            />
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'home' && <HomeView setTab={handleNavClick} openResume={() => setShowResumeModal(true)} />}
              {activeTab === 'about' && <AboutView openResume={() => setShowResumeModal(true)} darkMode={darkMode} />}
              {activeTab === 'experience' && <ExperienceView />}
              {activeTab === 'projects' && <ProjectsView openProject={openProject} darkMode={darkMode} />}
              {activeTab === 'contact' && <ContactView />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-200 dark:border-neutral-900 py-12 mt-12 bg-white dark:bg-neutral-950/40 backdrop-blur z-10 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href={`https://${PROFILE.linkedin}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-sky-600 dark:hover:text-[#BB0000] transition-colors flex items-center gap-1.5 text-sm">
              <Linkedin size={18} /> LinkedIn
            </a>
            <EmailButton email={PROFILE.email} className="text-slate-400 hover:text-sky-600 dark:hover:text-[#BB0000] transition-colors flex items-center gap-1.5 text-sm cursor-pointer rounded">
              <Mail size={18} /> Email
            </EmailButton>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ==============================================================================
   PAGE VIEWS
============================================================================== */

function HomeView({ setTab, openResume }) {
  return (
    <div className="relative flex flex-col justify-center min-h-[75vh]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none rounded-3xl -z-10"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl relative p-6 sm:p-12 border border-slate-200/50 dark:border-neutral-900/50 bg-white/50 dark:bg-neutral-950/20 rounded-3xl backdrop-blur-sm transition-colors duration-300"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-600/10 text-sky-700 border border-sky-600/20 dark:bg-[#BB0000]/10 dark:text-red-400 dark:border-[#BB0000]/20 rounded-full mb-6 text-xs tracking-wider uppercase font-semibold transition-colors duration-300">
          <Wrench size={14} className="mr-1" />
          Mechanical Engineer
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight leading-none text-slate-900 dark:text-white">
          Shaun Sekura<span className="text-sky-600 dark:text-[#BB0000] transition-colors duration-300">.</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-6 tracking-tight font-medium">
          Mechanical Engineering @ The Ohio State University
        </p>

        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
          {PROFILE.tagline} Specialize in CAD modeling, physical load testing, and finite element validation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => setTab('projects')}
            className="group flex items-center justify-center px-8 py-3.5 bg-sky-600 hover:bg-sky-700 dark:bg-[#BB0000] dark:hover:bg-[#990000] text-white rounded-lg font-semibold transition-all shadow-lg shadow-sky-600/20 dark:shadow-[#BB0000]/20"
          >
            View Projects
            <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={openResume}
            className="flex items-center justify-center px-8 py-3.5 bg-white dark:bg-neutral-900 text-sky-700 dark:text-red-400 border border-slate-300 hover:border-sky-600 dark:border-neutral-800 dark:hover:border-[#BB0000] rounded-lg font-semibold transition-all"
          >
            <FileText size={18} className="mr-2" />
            View Resume
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function AboutView({ openResume, darkMode }) {
  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        <div className="md:col-span-1">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-indigo-400 dark:from-[#BB0000] dark:to-red-900 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <PlaceholderImage 
              title="Headshot" 
              filename="/public/images/headshot.jpg" 
              className="relative w-full aspect-square rounded-2xl shadow-xl object-cover bg-white dark:bg-neutral-900"
              darkMode={darkMode}
            />
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
          </div>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            {PROFILE.bio}
          </p>
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-colors duration-300">
              <p className="text-sky-700 dark:text-red-400 uppercase tracking-wider font-bold mb-2 text-xs">Education</p>
              <p className="font-semibold text-slate-900 dark:text-white">{PROFILE.school}</p>
              <p className="text-slate-600 dark:text-slate-400 mt-1">{PROFILE.degree}</p>
              <p className="text-slate-500 dark:text-slate-500 mt-1">{PROFILE.graduation} • GPA: {PROFILE.gpa}</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-colors duration-300">
              <p className="text-sky-700 dark:text-red-400 uppercase tracking-wider font-bold mb-2 text-xs">Contact Info</p>
              <p className="font-semibold text-slate-900 dark:text-white">{PROFILE.email}</p>
              <p className="text-slate-600 dark:text-slate-400 mt-1">{PROFILE.phone}</p>
              <p className="text-slate-500 dark:text-slate-500 mt-1">Akron / Columbus, OH</p>
            </div>
          </div>
          <div className="pt-4">
             <button 
              onClick={openResume}
              className="inline-flex items-center text-sky-600 hover:text-sky-700 dark:text-[#BB0000] dark:hover:text-[#990000] font-semibold transition-colors duration-300"
            >
              <FileText size={18} className="mr-2" /> View or Download Resume
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-8 space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">Technical Skills</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(PROFILE.skills).map(([category, skills]) => (
            <div key={category} className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-slate-200 dark:border-neutral-800 shadow-sm hover:border-sky-500/30 dark:hover:border-[#BB0000]/30 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                {category === 'Software' && <Terminal className="text-sky-600 dark:text-[#BB0000] mr-2" size={20} />}
                {category === 'Fabrication' && <Wrench className="text-sky-600 dark:text-[#BB0000] mr-2" size={20} />}
                {category === 'Research' && <ShieldCheck className="text-sky-600 dark:text-[#BB0000] mr-2" size={20} />}
                <h4 className="text-lg font-bold tracking-tight">{category}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-neutral-700 text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceView() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 space-y-2 text-center md:text-left">
        <h2 className="text-3xl font-bold tracking-tight">Professional Experience</h2>
      </div>
      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-sky-200 dark:before:via-red-900/50 before:to-transparent">
        {PROFILE.experience.map((exp, i) => (
          <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-neutral-950 bg-sky-600 dark:bg-[#BB0000] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300">
              <Briefcase size={16} />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-neutral-900 p-6 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-sm hover:border-sky-300 dark:hover:border-[#BB0000]/40 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col space-y-1 mb-4">
                <h3 className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">{exp.role}</h3>
                <span className="text-sky-700 dark:text-red-400 font-semibold">{exp.company}</span>
                <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400 mt-2">
                  <span className="flex items-center"><Calendar size={14} className="mr-1" /> {exp.date}</span>
                  <span className="flex items-center"><MapPin size={14} className="mr-1" /> {exp.location}</span>
                </div>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                {exp.bullets.map((bullet, j) => {
                  return (
                    <li key={j} className="pl-1 leading-relaxed">{bullet}</li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsView({ openProject, darkMode }) {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(PROJECTS.flatMap(p => p.categories))];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.categories.includes(filter));

  const featuredProjects = PROJECTS.filter(p => p.featured);
  const pastProjects = PROJECTS.filter(p => !p.featured);

  if (showAllProjects) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <button 
          onClick={() => setShowAllProjects(false)}
          className="flex items-center text-slate-500 hover:text-sky-600 dark:hover:text-[#BB0000] transition-colors mb-8 font-semibold text-sm"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to Highlights
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">All Projects Archive</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => {
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filter === cat 
                      ? 'bg-sky-600 dark:bg-[#BB0000] text-white' 
                      : 'bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map(project => {
              return (
                <ProjectCard key={project.slug} project={project} openProject={openProject} darkMode={darkMode} />
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map(project => {
            return (
              <ProjectCard key={project.slug} project={project} openProject={openProject} large={true} darkMode={darkMode} />
            );
          })}
        </div>
      </div>

      <div className="mb-12 border-t border-slate-200 dark:border-neutral-900 pt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Recent Past Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pastProjects.slice(0, 3).map(project => {
            return (
              <ProjectCard key={project.slug} project={project} openProject={openProject} small={true} darkMode={darkMode} />
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-12 mb-4">
        <button 
          onClick={() => setShowAllProjects(true)}
          className="flex items-center justify-center px-8 py-3.5 bg-slate-100 dark:bg-neutral-900 text-sky-700 dark:text-red-400 hover:bg-slate-200 dark:hover:bg-neutral-800 rounded-lg font-semibold transition-all border border-slate-200 dark:border-neutral-800"
        >
          <Grid size={18} className="mr-2" />
          View All Past Projects
        </button>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, openProject, large = false, small = false, darkMode }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={() => openProject(project)}
      className={`group cursor-pointer bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 shadow-sm hover:border-sky-300 dark:hover:border-[#BB0000]/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col`}
    >
      <div className={`${large ? 'aspect-[16/10]' : 'aspect-video'} relative overflow-hidden bg-slate-100 dark:bg-neutral-950`}>
        <PlaceholderImage 
          title={project.title} 
          filename={`/public/images/projects/${project.slug}/${project.thumbnail}`}
          className="w-full h-full border-0 rounded-none rounded-t-xl absolute inset-0 bg-transparent"
          small={small}
          darkMode={darkMode}
        />
      </div>
      <div className={`${small ? 'p-4' : 'p-6'} flex-1 flex flex-col`}>
        <div className={`${small ? 'mb-2' : 'mb-3'} flex items-center justify-between flex-wrap gap-2`}>
          <div className="flex flex-wrap gap-1">
            {project.categories.slice(0, 2).map((cat, i) => {
              return (
                <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-red-400 px-2 py-0.5 rounded bg-sky-100 dark:bg-[#BB0000]/10 border border-sky-200 dark:border-[#BB0000]/20 transition-colors duration-300">
                  {cat}
                </span>
              );
            })}
          </div>
          {project.featured && !small && (
            <span className="flex items-center text-[10px] font-bold bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-500 border border-amber-200 dark:border-amber-500/20 px-2 py-0.5 rounded shrink-0">
              Featured
            </span>
          )}
        </div>
        <h3 className={`${large ? 'text-2xl' : small ? 'text-lg' : 'text-xl'} font-bold mb-2 group-hover:text-sky-600 dark:group-hover:text-[#BB0000] transition-colors line-clamp-2`}>
          {project.title}
        </h3>
        <p className={`text-slate-600 dark:text-slate-400 ${small ? 'text-xs' : 'text-sm'} leading-relaxed ${small ? 'mb-3' : 'mb-4'} line-clamp-2 flex-1`}>
          {project.description}
        </p>
        
        {!small && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.slice(0, 3).map(tag => {
              return (
                <span key={tag} className="text-[11px] font-medium px-2 py-1 bg-slate-50 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-neutral-700">
                  {tag}
                </span>
              );
            })}
            {project.tags.length > 3 && (
              <span className="text-[11px] font-medium px-2 py-1 bg-slate-50 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-neutral-700">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ProjectDetailView({ project, onBack, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      className="max-w-4xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-sky-600 dark:hover:text-[#BB0000] transition-colors mb-8 font-semibold text-sm"
      >
        <ChevronLeft size={18} className="mr-1" />
        Back to Projects
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {project.categories.map((cat, i) => {
            return (
              <span key={i} className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-red-400 px-3 py-1 bg-sky-100 dark:bg-[#BB0000]/10 border border-sky-200 dark:border-[#BB0000]/20 rounded transition-colors duration-300">
                {cat}
              </span>
            );
          })}
          {project.featured && (
            <span className="text-xs font-bold bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-500 border border-amber-200 dark:border-amber-500/20 px-3 py-1 rounded ml-1">
              Featured Project
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{project.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map(tag => {
            return (
              <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium border border-slate-200 dark:border-neutral-800">
                {tag}
              </span>
            );
          })}
        </div>
      </div>

      <div className="aspect-video relative rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 shadow-xl mb-12">
        <PlaceholderImage 
          title={`${project.title} Image`} 
          filename={`/public/images/projects/${project.slug}/${project.thumbnail}`}
          className="w-full h-full border-0 rounded-none absolute inset-0"
          darkMode={darkMode}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-10">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center text-slate-900 dark:text-white">
              <span className="bg-sky-600 dark:bg-[#BB0000] w-1.5 h-6 mr-3 rounded transition-colors duration-300"></span>
              The Problem (What)
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              {project.what}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center text-slate-900 dark:text-white">
              <span className="bg-sky-600 dark:bg-[#BB0000] w-1.5 h-6 mr-3 rounded transition-colors duration-300"></span>
              The Solution (How)
            </h2>
            <ul className="space-y-4">
              {project.how.map((point, i) => {
                return (
                  <li key={i} className="flex">
                    <div className="mt-1.5 mr-3 text-sky-600 dark:text-[#BB0000] shrink-0 transition-colors duration-300">
                      <ChevronRight size={18} />
                    </div>
                    <span className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">{point}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center text-slate-900 dark:text-white">
              <span className="bg-sky-600 dark:bg-[#BB0000] w-1.5 h-6 mr-3 rounded transition-colors duration-300"></span>
              The Impact (Results)
            </h2>
            <div className="bg-slate-50 dark:bg-neutral-900 rounded-xl p-6 border border-slate-200 dark:border-neutral-800 transition-colors duration-300">
              <ul className="space-y-3">
                {project.results.map((point, i) => {
                  return (
                    <li key={i} className="flex items-start">
                      <div className="mt-1 mr-3 text-emerald-600 dark:text-emerald-500 shrink-0">
                        <Award size={20} />
                      </div>
                      <span className="text-slate-800 dark:text-slate-200 text-base font-medium">{point}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>

        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            {Object.keys(project.links).length > 0 && (
              <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-slate-200 dark:border-neutral-800 shadow-sm transition-colors duration-300">
                <h3 className="text-lg font-bold mb-4">Project Links</h3>
                <div className="space-y-3 font-medium text-sm">
                  {project.links.report && (
                    <a href="#" className="flex items-center text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-[#BB0000] transition-colors">
                      <FileText size={18} className="mr-2" />
                      View Full Report
                      <ExternalLink size={14} className="ml-1 opacity-50" />
                    </a>
                  )}
                  {project.links.video && (
                    <a href="#" className="flex items-center text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-[#BB0000] transition-colors">
                      <ExternalLink size={18} className="mr-2" />
                      Watch Demo Video
                    </a>
                  )}
                  {project.links.portfolio && (
                    <a href="#" className="flex items-center text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-[#BB0000] transition-colors">
                      <ExternalLink size={18} className="mr-2" />
                      Portfolio Slide
                    </a>
                  )}
                </div>
              </div>
            )}
            
            <div className="bg-slate-50 dark:bg-neutral-900 rounded-xl p-6 border border-slate-200 dark:border-neutral-800 transition-colors duration-300">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-3">Want to know more?</p>
              <EmailButton email={PROFILE.email} className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 dark:bg-[#BB0000] dark:hover:bg-[#990000] text-white rounded-lg font-semibold transition-colors flex items-center justify-center">
                <Mail size={16} className="mr-2" />
                Contact Me
              </EmailButton>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ContactView() {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold tracking-tight">Let's Connect</h2>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
        I'm always open to discussing mechanical engineering opportunities, collaborations, or just chatting about automotive design, virtual modal analysis, and structural validation.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8 text-sm">
        <EmailButton 
          email={PROFILE.email}
          className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-sky-600 hover:bg-sky-700 dark:bg-[#BB0000] dark:hover:bg-[#990000] text-white rounded-xl font-bold transition-colors shadow-lg shadow-sky-600/20 dark:shadow-[#BB0000]/20"
        >
          <Mail size={20} className="mr-3" />
          Email Me
        </EmailButton>
        <a 
          href={`https://${PROFILE.linkedin}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white dark:bg-neutral-900 text-sky-700 dark:text-red-400 border border-slate-300 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-800 hover:border-sky-600 dark:hover:border-[#BB0000] rounded-xl font-bold transition-colors"
        >
          <Linkedin size={20} className="mr-3" />
          LinkedIn Profile
        </a>
      </div>
      
      <div className="pt-12 text-slate-500 dark:text-slate-400 font-medium">
        <p className="mb-1">{PROFILE.email}</p>
        <p>{PROFILE.phone}</p>
      </div>
    </div>
  );
}

/* ==============================================================================
   INTERACTIVE RESUME VIEWER MODAL
   This guarantees that clicking any resume button instantly displays the full,
   official resume details directly in the web browser, styled like an expert document.
============================================================================== */
function ResumeView({ onClose }) {
  
  const handlePrint = () => {
    // Attempt standard print dialog. (Might be suppressed by the Canvas iframe sandbox, works in production).
    try {
      window.print();
    } catch (e) {
      console.log("Printing blocked by sandbox.", e);
    }
  };

  const handleDownload = () => {
     // Notifies user in the preview sandbox why the download might instantly fail. 
     // Will work exactly as expected in production.
     console.log("Download requested. If this 404s, it is due to the Canvas preview environment restriction.");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-neutral-800 pb-6 transition-colors duration-300">
        <div>
          <button 
            onClick={onClose}
            className="flex items-center text-slate-500 hover:text-sky-600 dark:hover:text-[#BB0000] transition-colors font-semibold text-sm mb-2"
          >
            <ChevronLeft size={18} className="mr-1" /> Back
          </button>
          <h2 className="text-2xl font-bold tracking-tight">Interactive Resume</h2>
        </div>
        
        <div className="flex gap-3 text-sm w-full sm:w-auto font-medium">
          <button 
            onClick={handlePrint}
            title="Note: Local printing is often blocked in the Canvas preview sandbox, but will work in production."
            className="flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-neutral-700 hover:border-sky-600 dark:hover:border-[#BB0000] bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-300 rounded-lg transition-all flex-1 sm:flex-none"
          >
            <Printer size={16} className="mr-2" /> Print Resume
          </button>
          <a 
            href="/resume.pdf" 
            download
            onClick={handleDownload}
            title="Note: Downloading local files is restricted in the Canvas sandbox, but will work in production."
            className="flex items-center justify-center px-4 py-2 bg-sky-600 hover:bg-sky-700 dark:bg-[#BB0000] dark:hover:bg-[#990000] text-white rounded-lg transition-all flex-1 sm:flex-none"
          >
            <Download size={16} className="mr-2" /> Download PDF
          </a>
        </div>
      </div>

      {/* Structured Document Canvas */}
      <div className="bg-white text-slate-950 p-6 sm:p-12 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200 font-sans tracking-tight dark:bg-slate-50 dark:border-transparent">
        
        {/* Header Block */}
        <div className="border-b-2 border-slate-800 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">{PROFILE.name}</h1>
            <div className="text-sm text-slate-700 mt-2 sm:mt-0 text-left sm:text-right font-medium">
              <p>{PROFILE.email} | {PROFILE.phone}</p>
              <p>{PROFILE.linkedin}</p>
            </div>
          </div>
        </div>

        {/* Education Block */}
        <section className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-sky-700 dark:text-[#BB0000] border-b border-slate-200 pb-1 mb-3 transition-colors duration-300">EDUCATION</h3>
          <div className="flex justify-between items-baseline mb-1">
            <h4 className="font-extrabold text-slate-900 text-base">{PROFILE.school}</h4>
            <span className="text-sm font-medium text-slate-600">{PROFILE.graduation}</span>
          </div>
          <div className="flex justify-between items-baseline text-sm text-slate-700">
            <p>{PROFILE.degree}</p>
            <span className="font-semibold">GPA: {PROFILE.gpa}</span>
          </div>
        </section>

        {/* Skills Block */}
        <section className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-sky-700 dark:text-[#BB0000] border-b border-slate-200 pb-1 mb-3 transition-colors duration-300">TECHNICAL SKILLS</h3>
          <div className="space-y-1.5 text-sm">
            {Object.entries(PROFILE.skills).map(([cat, items]) => (
              <p key={cat} className="text-slate-800">
                <span className="font-extrabold text-slate-900">{cat}:</span> {items.join(', ')}
              </p>
            ))}
          </div>
        </section>

        {/* Experience Block */}
        <section className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-sky-700 dark:text-[#BB0000] border-b border-slate-200 pb-1 mb-4 transition-colors duration-300">EXPERIENCE</h3>
          <div className="space-y-6">
            {PROFILE.experience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-extrabold text-slate-900 text-base">{exp.role}</h4>
                  <span className="text-sm font-medium text-slate-600">{exp.date}</span>
                </div>
                <div className="flex justify-between items-baseline text-sm font-semibold text-sky-700 dark:text-[#BB0000] transition-colors duration-300">
                  <span>{exp.company}</span>
                  <span className="text-slate-600 font-medium">{exp.location}</span>
                </div>
                <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-slate-800 text-sm leading-relaxed">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-sky-700 dark:text-[#BB0000] border-b border-slate-200 pb-1 mb-3 transition-colors duration-300">INTERESTS</h3>
          <p className="text-sm text-slate-800 font-medium">Hiking, Music, Tennis, Basketball, Strategy Games, Competitive Trivia, Sushi</p>
        </section>
      </div>
    </motion.div>
  );
}