import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Sun, Moon, Mail, 
  ChevronRight, ExternalLink, Download, FileText, 
  MapPin, Calendar, Award, Briefcase, Wrench, ChevronLeft,
  Terminal, ShieldCheck, Printer, ArrowLeft, Grid, Info, Users
} from 'lucide-react';

/* ==============================================================================
   DATA: PROFILE & PROJECTS
============================================================================== */
const PROFILE = {
  name: "Shaun Sekura",
  title: "Mechanical Engineering @ The Ohio State University",
  tagline: "Driven by a passion for mechanical design, finite element analysis, and sustainable engineering solutions.",
  school: "The Ohio State University",
  degree: "B.S Mechanical Engineering, Robotics and Autonomous Systems Minor",
  graduation: "Expected Dec 2027",
  gpa: "3.4",
  email: "ssekura08@gmail.com",
  linkedin: "linkedin.com/in/shaun-sekura",
  bio: "I am a Mechanical Engineering student at The Ohio State University, involved in the Center for Automotive Research and Mechanical Design department as a teaching assistant. I specialize in CAD design, FEA simulation, and physical testing, with a strong interest in sustainable engineering and technological innovation.",
  skills: {
    Software: ["SolidWorks", "CATIA", "Ansys", "Abaqus FEA", "Siemens Test Lab", "Python", "MATLAB", "Excel", "Arduino IDE"],
    "Lab Research/Processes": ["CAD Software", "FEA Analysis", "Machining", "Equipment Operation", "Modal Testing"],
    Fabrication: ["CNC Machining", "Vertical Mill", "Lathe", "3D Printing", "Soldering/Wiring (Arduino)", "Drafting/GD&T"],
    Coursework: ["Fluids", "Control Systems", "Sensors", "Machine Elements", "Kinematics", "System/Vibrational Dynamics", "Circuits", "Thermodynamics", "Machine Design", "Numerical Methods", "Mechanics of Materials", "Linear Algebra/Diff Eq"]
  },
  experience: [
    {
      role: "Mechanical Engineering Intern",
      company: "Hankook Tire",
      date: "Summer 2026",
      location: "Akron, OH",
      bullets: [
        "Developed Python and Excel pipeline to curve-fit stress-strain data across 244 material datasets, computing tangent moduli via numerical differentiation and achieving 93% curve-fit accuracy through least-squares error analysis.",
        "Validated a General Motors wheel through nonlinear FEA simulation in Abaqus and experimental modal analysis in Siemens Test Lab, correlating virtual and physical results to assess structural performance.",
        "Supported the Physical-to-Virtual initiative through testing and validation tasks aimed at improving virtual-to-physical test correlation for automotive clients including Rivian, Tesla, GM, Lucid, Mercedes Benz, etc."
      ]
    },
    {
      role: "Undergraduate Teaching Assistant",
      company: "Intro To Mechanical Design (MECHENG 2900) - The Ohio State University",
      date: "Spring 2026 - Present",
      location: "Columbus, OH",
      bullets: [
        "Mentored 244 students/semester in circuit construction and embedded systems programming.",
        "Communicated complex engineering concepts clearly to students with varying technical backgrounds."
      ]
    },
    {
      role: "System Design & Integration Engineer",
      company: "EcoCAR Competition Team - Center For Automotive Research",
      date: "Fall 2025 - Present",
      location: "Columbus, OH",
      bullets: [
        "Designed and analyzed 10+ vehicle components using SOLIDWORKS simulations to test and improve strength-to-weight ratios and general vehicle design.",
        "Collaborated across sub-teams (electronics, efficiency, automation, etc.) to integrate structural designs into final build for testing."
      ]
    },
    {
      role: "Student Engineer",
      company: "Formula SAE - Center For Automotive Research",
      date: "Fall 2024 - Spring 2025",
      location: "Columbus, OH",
      bullets: [
        "Assisted with mechanical design, fabrication, and assembly of a Formula SAE race car.",
        "Participated in vehicle testing and iterative improvements to support performance and reliability."
      ]
    },
    {
      role: "Executive Board",
      company: "American Society of Mechanical Engineers (ASME)",
      date: "Fall 2024 - Spring 2026",
      location: "Columbus, OH",
      bullets: [
        "Organized social events and design challenges, increasing club participation by 320% compared to previous years.",
        "Coordinated industry speaker series and professional networking events for 100+ members."
      ]
    },
    {
      role: "Leadership Council",
      company: "Humanitarian Engineering Scholars (HES)",
      date: "Fall 2024 - Spring 2026",
      location: "Columbus, OH",
      bullets: [
        "Spearheaded program engagement efforts by doubling the number of events hosted and tripling student attendance compared to the previous year."
      ]
    },
    {
      role: "Maintenance",
      company: "Valleaire Golf Club",
      date: "2024 - 2026",
      location: "Hinckley, OH",
      bullets: [
        "Operated heavy-duty machinery to maintain a golf course spanning over 150 acres.",
        "Reduced water usage on the golf course by 15% saving the company $4,000 through sustainable irrigation practices."
      ]
    }
  ]
};

const PROJECTS = [
  {
    slug: "hankook-curve-fitting",
    title: "Tire Material Curve-Fitting Pipeline",
    categories: ["Simulation"],
    filters: ["simulation"],
    tags: ["Python", "Excel", "Data Analysis", "Numerical Methods"],
    thumbnail: "curve-fit-thumb.jpg",
    description: "Automated analysis pipeline developed in Python and Excel to process and curve-fit stress-strain data across 244 complex material datasets.",
    what: "Faced with the challenge of manually analyzing high-volume material testing results, this pipeline was designed to automate material characterization and compute key tangent moduli.",
    how: [
      "Developed an automated data importing pipeline in Python to ingest raw experimental stress-strain curves.",
      "Computed tangent moduli via numerical differentiation algorithms directly within the datasets.",
      "Implemented a least-squares error optimization model to mathematically ensure maximum curve-fit accuracy."
    ],
    results: [
      "Achieved a 93% curve-fit accuracy threshold across 244 unique material datasets.",
      "Replaced manual data formatting, minimizing analytical processing time from hours to seconds.",
      "Ensured precise material input parameters for downstream finite element modeling pipelines."
    ],
    links: {},
    featured: false,
    recent: false
  },
  {
    slug: "general-motors-wheel",
    title: "General Motors Wheel Structural Validation",
    categories: ["Simulation", "Testing"],
    filters: ["simulation", "testing"],
    tags: ["Abaqus FEA", "Siemens Test Lab", "Vibration Analysis", "Modal Correlation"],
    thumbnail: "gm-wheel-thumb.jpg",
    description: "Structural validation of a General Motors wheel assembly utilizing nonlinear FEA simulation and physical modal analysis correlation.",
    what: "The project objective was to evaluate the structural performance and dynamic vibration characteristics of a General Motors OEM wheel design under heavy load constraints.",
    how: [
      "Modeled and executed nonlinear FEA structural simulations using Abaqus to analyze localized stress distributions.",
      "Conducted physical experimental modal analysis (EMA) using Siemens Test Lab equipment on live wheel mockups.",
      "Correlated virtual simulation frequencies and dynamic mode shapes with experimental accelerometers."
    ],
    results: [
      "Validated the load-carrying capacity and frequency tolerances against strict OEM structural benchmarks.",
      "Established highly correlated virtual and physical parameters, proving simulation model fidelity.",
      "Identified critical stress concentration nodes to assess fatigue life under extreme cyclic parameters."
    ],
    links: {},
    featured: true,
    recent: false
  },
  {
    slug: "hankook-virtual-testing",
    title: "Hankook Tire Virtual Testing Initiative",
    categories: ["Testing", "Simulation"],
    filters: ["testing", "simulation"],
    tags: ["Abaqus FEA", "Siemens Test Lab", "Python", "Excel"],
    thumbnail: "hankook-thumb.jpg",
    description: "Virtual simulation and test-bench validation supporting Hankook's transition to simulation-driven tire development.",
    what: "Contributed to an ongoing initiative to replace physical tire validation with high-fidelity virtual simulations, reducing reliance on costly lab testing loops while maintaining structural certification standards.",
    how: [
      "Simulated complex tire loading and deformation profiles using specialized nonlinear Abaqus models.",
      "Collected physical response metrics to validate and adjust mathematical simulation guidelines.",
      "Compiled and aligned experimental results against predicted virtual models across automotive OEM standards."
    ],
    results: [
      "Improved virtual-to-physical test correlation parameters for leading automotive partners including Rivian, Tesla, GM, Lucid, and Mercedes Benz.",
      "Reduced development dependencies on physical validation cycles for next-generation EV passenger tires.",
      "Helped validate dynamic tire loading limits with high accuracy."
    ],
    links: {},
    featured: false,
    recent: true
  },
  {
    slug: "reverse-engineering-motor-mount",
    title: "Reverse Engineering of Motor Mount",
    categories: ["Design", "Simulation"],
    filters: ["design", "simulation"],
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
    links: {},
    featured: false,
    recent: true
  },
  {
    slug: "sustainable-rocket-redesign",
    title: "Sustainable Rocket Redesign",
    categories: ["Simulation", "Design"],
    filters: ["design", "simulation"],
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
    links: { report: "rocket-redesign-report.pdf" },
    featured: true,
    recent: true
  },
  {
    slug: "slide-grip-development",
    title: "Slide Grip Development System",
    categories: ["Prototyping", "Design"],
    filters: ["design", "prototyping"],
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
    links: { report: "slide-grip-report.pdf" },
    featured: false,
    recent: false
  },
  {
    slug: "hmi-mount",
    title: "Human Machine Interface Mount",
    categories: ["Design"],
    filters: ["design"],
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
    featured: false,
    recent: false
  },
  {
    slug: "osu-led-panel",
    title: "OSU Branded LED Panel",
    categories: ["Prototyping"],
    filters: ["prototyping"],
    tags: ["3D Printing", "Electronics"],
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
    featured: false,
    recent: false
  },
  {
    slug: "arduino-sensor-system",
    title: "Arduino Sensor & Control System",
    categories: ["Prototyping", "Testing"],
    filters: ["prototyping", "testing"],
    tags: ["Arduino IDE", "Soldering/Wiring", "C++"],
    thumbnail: "arduino-thumb.jpg",
    description: "Designed, wired, and programmed a custom embedded system for data acquisition and motor control.",
    what: "Developed a standalone microcontroller system to read sensor data and actuate mechanical components effectively.",
    how: [
      "Programmed control logic using the Arduino IDE.",
      "Soldered and routed wiring for sensors, breadboards, and power supplies.",
      "Integrated the electrical system with mechanical housings."
    ],
    results: [
      "Successfully captured high-fidelity sensor data.",
      "Maintained robust electrical connections under vibration."
    ],
    links: { report: "arduino-sensor-report.pdf" },
    featured: false,
    recent: false
  },
  {
    slug: "precision-machined-assembly",
    title: "Precision Machined Assembly",
    categories: ["Design", "Prototyping"],
    filters: ["design", "prototyping"],
    tags: ["CNC Machining", "Lathe", "Vertical Mill", "GD&T"],
    thumbnail: "machining-thumb.jpg",
    description: "Manufactured custom components using manual and CNC machining processes.",
    what: "Required high-tolerance custom parts for a mechanical drivetrain assembly that could not be purchased off-the-shelf.",
    how: [
      "Interpreted technical drawings and strict GD&T specifications.",
      "Operated vertical mills and lathes to face, turn, and bore raw stock.",
      "Programmed CNC toolpaths for complex custom geometries."
    ],
    results: [
      "Achieved critical tolerances efficiently during fabrication.",
      "Delivered structural components that performed flawlessly under applied load."
    ],
    links: {},
    featured: false,
    recent: false
  }
];

const EmailButton = ({ email, className, children }) => {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = (e) => {
    e.preventDefault();
    const textArea = document.createElement("textarea");
    textArea.value = email;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fallback: Unable to copy', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <a href={`mailto:${email}`} onClick={handleEmailClick} className={`relative overflow-hidden cursor-pointer ${className}`}>
      <AnimatePresence>
        {copied && (
          <motion.span 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="flex items-center justify-center w-full h-full absolute inset-0 bg-emerald-500 text-white z-10 font-bold"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
      <span className={copied ? 'opacity-0' : 'opacity-100 flex items-center justify-center w-full'}>
        {children}
      </span>
    </a>
  );
};

// Smart image switcher for Logo (Top Left) - Adjusted to relative paths
const SmartLogoImage = ({ darkMode }) => {
  const [extIndex, setExtIndex] = useState(0);
  const extensions = ['.gif', '.png', '.jpg', '.svg', '.jpeg'];
  const baseName = darkMode ? 'logo-dark' : 'logo-light';

  useEffect(() => {
    setExtIndex(0); // Reset check when theme toggles
  }, [darkMode]);

  if (extIndex >= extensions.length) {
    // Elegant text fallback if no logo images are uploaded in public folder yet
    return (
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-xl bg-sky-600 dark:bg-[#BB0000] text-white flex items-center justify-center font-bold text-xl mr-3 shadow-lg shadow-sky-600/20 dark:shadow-[#BB0000]/20 transition-colors duration-300">
          SS
        </div>
        <span className="font-bold text-xl tracking-tight hidden sm:block">Shaun Sekura</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <img 
        src={`${baseName}${extensions[extIndex]}`} 
        alt="Shaun Sekura Logo" 
        className="h-10 w-auto object-contain" 
        onError={() => setExtIndex(prev => prev + 1)} 
      />
      <span className="font-bold text-xl tracking-tight hidden sm:block">Shaun Sekura</span>
    </div>
  );
};

// Smart image switcher for About section profile pictures
const SmartAboutHeadshot = ({ darkMode }) => {
  const [extIndex, setExtIndex] = useState(0);
  const extensions = ['.gif', '.jpg', '.png', '.jpeg', '.webp'];
  const baseName = darkMode ? 'headshot-dark' : 'headshot-light';

  useEffect(() => {
    setExtIndex(0); // Reset check when theme toggles
  }, [darkMode]);

  if (extIndex >= extensions.length) {
    // Beautiful interactive blueprint vector is served as fallback if physical files are missing
    return <CustomThemedProfilePicture fallbackName={`${baseName}.[gif/jpg/png]`} darkMode={darkMode} />;
  }

  return (
    <img 
      src={`${baseName}${extensions[extIndex]}`} 
      alt="Shaun Sekura" 
      className="w-full aspect-square rounded-3xl object-cover border border-slate-200 dark:border-neutral-800 shadow-md relative z-10" 
      onError={() => setExtIndex(prev => prev + 1)} 
    />
  );
};

const CustomThemedProfilePicture = ({ fallbackName, darkMode }) => {
  return (
    <div className="relative w-full aspect-square bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0284c7_1px,transparent_1px),linear-gradient(to_bottom,#0284c7_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#bb0000_1px,transparent_1px),linear-gradient(to_bottom,#bb0000_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
      
      <svg className="w-4/5 h-4/5" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={darkMode ? "#bb0000" : "#0284c7"} />
            <stop offset="100%" stopColor={darkMode ? "#7f0000" : "#0369a1"} />
          </linearGradient>
        </defs>
        
        {/* Dynamic Blueprint circle design */}
        <circle cx="100" cy="100" r="85" stroke="url(#avatarGrad)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="70" stroke="url(#avatarGrad)" strokeWidth="0.5" />
        
        {/* Mechanical engineer gear graphic overlay */}
        <g stroke={darkMode ? "#bb0000" : "#0284c7"} strokeWidth="1.5" strokeLinecap="round" opacity="0.8">
          <circle cx="100" cy="90" r="30" />
          <path d="M 100,50 L 100,60 M 100,120 L 100,130 M 60,90 L 70,90 M 130,90 L 140,90 M 72,62 L 79,69 M 121,111 L 128,118 M 72,118 L 79,111 M 121,69 L 128,62" />
        </g>
        
        {/* Human Head Profile Silhouette */}
        <path d="M 60,170 C 60,130 80,130 100,130 C 120,130 140,130 140,170" stroke={darkMode ? "#bb0000" : "#0284c7"} strokeWidth="3" fill="none" />
        <circle cx="100" cy="90" r="20" fill={darkMode ? "#171717" : "#f8fafc"} stroke={darkMode ? "#bb0000" : "#0284c7"} strokeWidth="3" />
        
        {/* OSU Branded safety glasses icon representation */}
        <path d="M 88,90 Q 100,98 112,90 Q 100,82 88,90 Z" fill="none" stroke={darkMode ? "#ef4444" : "#0284c7"} strokeWidth="1.5" />
        
        {/* Buckeye Leaf Icon or OSU emblem badge */}
        <circle cx="100" cy="150" r="6" fill={darkMode ? "#bb0000" : "#ef4444"} />
        <path d="M 98,146 L 102,154 M 102,146 L 98,154" stroke="#ffffff" strokeWidth="1.5" />
      </svg>

      <div className="absolute bottom-4 left-0 right-0 text-center px-4">
        <code className="text-[10px] font-mono text-slate-500 dark:text-neutral-500 bg-slate-200/50 dark:bg-neutral-800/50 py-1 px-2 rounded">
          Name headshot: {fallbackName}
        </code>
      </div>
    </div>
  );
};

const PlaceholderImage = ({ title, filename, className = "", small = false, darkMode }) => {
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
        <span className={`text-slate-700 dark:text-slate-300 ${small ? 'text-xs' : 'text-sm'} font-semibold tracking-wider uppercase ${small ? '' : 'mb-1'} line-clamp-1 text-center px-2`}>{title}</span>
        {!small && (
          <code className="text-xs text-sky-700 dark:text-red-400 bg-sky-100 dark:bg-[#BB0000]/10 border border-sky-200 dark:border-[#BB0000]/20 px-3 py-1.5 rounded mt-2 transition-colors duration-300">
            Name image: {filename || 'image.jpg'}
          </code>
        )}
      </div>
    </div>
  );
};

const SmartProjectImage = ({ filename, title, className, darkMode }) => {
  const [imageError, setImageError] = useState(false);
  const srcPath = `${filename}`; 

  if (imageError) {
    return <PlaceholderImage title={title} filename={filename} className={className} darkMode={darkMode} />;
  }

  return (
    <img 
      src={srcPath} 
      alt={title} 
      className={className} 
      onError={() => setImageError(true)} 
    />
  );
};

const HomeView = ({ setTab, openResume }) => (
  <div className="relative flex flex-col justify-center min-h-[75vh]">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none rounded-3xl -z-10"></div>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl relative p-6 sm:p-12 border border-slate-200/50 dark:border-neutral-900/50 bg-white/50 dark:bg-neutral-950/20 rounded-3xl backdrop-blur-sm transition-colors duration-300">
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight leading-none text-slate-900 dark:text-white">
        Shaun Sekura
      </h1>
      <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-6 tracking-tight font-medium">{PROFILE.title}</p>
      <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
        {PROFILE.tagline} Specialize in CAD modeling, physical load testing, and finite element validation.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button onClick={() => setTab('projects')} className="group flex items-center justify-center px-8 py-3.5 bg-sky-600 hover:bg-sky-700 dark:bg-[#BB0000] dark:hover:bg-[#990000] text-white rounded-lg font-semibold transition-all shadow-lg shadow-sky-600/20 dark:shadow-[#BB0000]/20">
          View Projects <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
        <button onClick={openResume} className="flex items-center justify-center px-8 py-3.5 bg-white dark:bg-neutral-900 text-sky-700 dark:text-red-400 border border-slate-300 hover:border-sky-600 dark:border-neutral-800 dark:hover:border-[#BB0000] rounded-lg font-semibold transition-all">
          <FileText size={18} className="mr-2" /> View Resume
        </button>
      </div>
    </motion.div>
  </div>
);

const AboutView = ({ darkMode }) => (
  <div className="space-y-16 mt-8 max-w-5xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
      <div className="md:col-span-1">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-indigo-400 dark:from-[#BB0000] dark:to-red-900 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <SmartAboutHeadshot darkMode={darkMode} />
        </div>
      </div>
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">About Me</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {PROFILE.bio}
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Calendar className="text-sky-600 dark:text-[#BB0000]" size={20} />
            <span className="font-medium">Graduation: {PROFILE.graduation}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Award className="text-sky-600 dark:text-[#BB0000]" size={20} />
            <span className="font-medium">{PROFILE.degree}</span>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-3">
        <Terminal className="text-sky-600 dark:text-[#BB0000]" /> Technical Skills & Coursework
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(PROFILE.skills).map(([category, skillsList]) => (
          <div key={category} className="bg-slate-50 dark:bg-neutral-900 rounded-2xl p-6 border border-slate-200 dark:border-neutral-800 transition-colors duration-300">
            <h4 className="text-lg font-bold mb-4 text-slate-900 dark:text-white border-b border-slate-200 dark:border-neutral-800 pb-2">{category}</h4>
            <ul className="space-y-3">
              {skillsList.map((skill, index) => (
                <li key={index} className="flex items-center text-slate-600 dark:text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-[#BB0000] mr-3 shrink-0"></div>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ExperienceView = () => (
  <div className="mt-8 max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white flex items-center gap-3">
      <Briefcase className="text-sky-600 dark:text-[#BB0000]" /> Work & Research Experience
    </h2>
    <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-neutral-800 before:to-transparent">
      {PROFILE.experience.map((exp, index) => (
        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-neutral-950 bg-sky-100 dark:bg-red-900/30 text-sky-600 dark:text-[#BB0000] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10 transition-colors duration-300">
            <ShieldCheck size={18} />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:border-sky-300 dark:hover:border-red-900/50 transition-colors duration-300">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">{exp.role}</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-red-900/30 dark:text-red-300 whitespace-nowrap">
                {exp.date}
              </span>
            </div>
            <div className="text-sky-700 dark:text-red-400 font-medium mb-1">{exp.company}</div>
            <div className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex items-center gap-1">
              <MapPin size={14} /> {exp.location}
            </div>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
              {exp.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-sky-500 dark:text-[#BB0000] mr-2 mt-1">▹</span>
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProjectCard = ({ project, selectProject, darkMode }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    whileHover={{ y: -5 }}
    className="group flex flex-col bg-slate-50 dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 overflow-hidden cursor-pointer transition-colors duration-300 h-full shadow-sm hover:shadow-md"
    onClick={() => selectProject(project)}
  >
    <div className="h-48 relative overflow-hidden bg-slate-200 dark:bg-neutral-800 shrink-0">
      <SmartProjectImage 
        title={project.title} 
        filename={project.thumbnail} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        darkMode={darkMode} 
      />
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-[#BB0000] transition-colors">{project.title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1 line-clamp-3">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto shrink-0">
        {project.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-xs text-sky-700 dark:text-red-400 bg-sky-50 dark:bg-[#BB0000]/10 px-2 py-1 rounded-md border border-sky-100 dark:border-[#BB0000]/20">
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="text-xs text-slate-500 bg-slate-100 dark:bg-neutral-800 px-2 py-1 rounded-md">
            +{project.tags.length - 3}
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

const ProjectsView = ({ selectProject, darkMode, viewMode, setViewMode, filter, setFilter }) => {
  if (viewMode === 'dashboard') {
    const featuredSlugs = ['general-motors-wheel', 'sustainable-rocket-redesign'];
    const featuredProjects = featuredSlugs.map(slug => PROJECTS.find(p => p.slug === slug)).filter(Boolean);
    
    const recentSlugs = ['hankook-virtual-testing', 'reverse-engineering-motor-mount', 'sustainable-rocket-redesign'];
    const recentProjects = recentSlugs.map(slug => PROJECTS.find(p => p.slug === slug)).filter(Boolean);

    return (
      <div className="mt-8 max-w-6xl mx-auto animate-fade-in">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-8">
          <Award className="text-sky-600 dark:text-[#BB0000]" /> Featured Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} selectProject={selectProject} darkMode={darkMode} />
          ))}
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
          <Calendar className="text-sky-600 dark:text-[#BB0000]" /> Recent Work
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {recentProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} selectProject={selectProject} darkMode={darkMode} />
          ))}
        </div>

        <div className="flex justify-center mb-10 border-t border-slate-200 dark:border-neutral-800 pt-10">
          <button 
            onClick={() => {
              setViewMode('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-sky-600 dark:bg-white dark:hover:bg-[#BB0000] text-white dark:text-slate-900 hover:text-white rounded-xl font-bold shadow-lg transition-all"
          >
            <Grid size={18} className="mr-3" /> View All Projects
          </button>
        </div>
      </div>
    );
  }

  const filteredProjects = PROJECTS.filter(p => {
    if (filter === 'all') return true;
    return p.filters && p.filters.includes(filter);
  });

  return (
    <div className="mt-8 max-w-6xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <button 
            onClick={() => setViewMode('dashboard')}
            className="flex items-center text-sm font-semibold text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-[#BB0000] mb-4 transition-colors group"
          >
            <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Overview
          </button>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Grid className="text-sky-600 dark:text-[#BB0000]" /> All Projects
          </h2>
        </div>
        
        <div className="flex bg-slate-100 dark:bg-neutral-900 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-neutral-800 overflow-x-auto max-w-full">
          {['all', 'design', 'simulation', 'prototyping', 'testing'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize whitespace-nowrap transition-all ${
                filter === f 
                  ? 'bg-white dark:bg-neutral-800 text-sky-600 dark:text-[#BB0000] shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {f === 'all' ? 'All Areas' : f}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard project={project} selectProject={selectProject} darkMode={darkMode} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          No projects found under this technical category.
        </div>
      )}
    </div>
  );
};

const ProjectDetailView = ({ project, onBack, darkMode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-4xl mx-auto mt-8"
  >
    <button 
      onClick={onBack}
      className="flex items-center text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-[#BB0000] mb-8 transition-colors group font-medium"
    >
      <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Projects
    </button>

    <div className="bg-slate-50 dark:bg-neutral-900 rounded-3xl border border-slate-200 dark:border-neutral-800 overflow-hidden transition-colors duration-300">
      <div className="h-64 sm:h-80 md:h-96 w-full relative bg-slate-200 dark:bg-neutral-800">
        <SmartProjectImage 
          title={`${project.title} - Main View`} 
          filename={project.thumbnail} 
          className="w-full h-full object-cover" 
          darkMode={darkMode} 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="flex gap-2 mb-3">
            {project.categories.map(cat => (
              <span key={cat} className="px-3 py-1 text-xs font-bold bg-sky-600 dark:bg-[#BB0000] text-white rounded-full">
                {cat}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">{project.title}</h1>
        </div>
      </div>

      <div className="p-8 sm:p-12 space-y-12">
        <div>
          <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Technologies & Tools</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1.5 text-sm bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 rounded-lg shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The Challenge</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {project.what}
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Approach</h3>
              <ul className="space-y-4">
                {project.how.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="flex items-center justify-center min-w-6 h-6 rounded-full bg-sky-100 dark:bg-red-900/30 text-sky-600 dark:text-[#BB0000] text-xs font-bold mr-3 mt-0.5">{i + 1}</span>
                    <span className="text-slate-600 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-sky-50 dark:bg-red-900/10 rounded-2xl p-6 border border-sky-100 dark:border-red-900/30">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="text-sky-600 dark:text-[#BB0000]" /> Outcomes & Results
              </h3>
              <ul className="space-y-3">
                {project.results.map((result, i) => (
                  <li key={i} className="flex items-start">
                    <ShieldCheck className="text-sky-500 dark:text-[#BB0000] mr-2 shrink-0 mt-1" size={16} />
                    <span className="text-slate-700 dark:text-slate-200 font-medium">{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {Object.keys(project.links).length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Project Links</h3>
                <div className="flex flex-col gap-3">
                  {project.links.report && (
                    <a 
                      href={typeof project.links.report === 'string' ? project.links.report : '#'}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full px-4 py-3 bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 rounded-xl hover:border-sky-500 dark:hover:border-[#BB0000] hover:text-sky-600 dark:hover:text-[#BB0000] transition-all"
                    >
                      <FileText size={18} className="mr-2" /> View Technical Report <ExternalLink size={14} className="ml-2 opacity-50" />
                    </a>
                  )}
                  {project.links.portfolio && (
                    <a 
                      href={typeof project.links.portfolio === 'string' ? project.links.portfolio : '#'}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full px-4 py-3 bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 rounded-xl hover:border-sky-500 dark:hover:border-[#BB0000] hover:text-sky-600 dark:hover:text-[#BB0000] transition-all"
                    >
                      <ExternalLink size={18} className="mr-2" /> View in Portfolio <ExternalLink size={14} className="ml-2 opacity-50" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const ContactView = () => (
  <div className="max-w-2xl mx-auto mt-16 text-center">
    <div className="w-20 h-20 bg-sky-100 dark:bg-red-900/20 text-sky-600 dark:text-[#BB0000] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
      <Mail size={32} />
    </div>
    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Let's Connect</h2>
    <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
      I'm currently seeking internship opportunities for Spring 2027 and Summer 2027. If you're looking for a driven mechanical engineering student with hands-on CAD and FEA experience, I'd love to chat.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <EmailButton email={PROFILE.email} className="px-8 py-4 bg-sky-600 hover:bg-sky-700 dark:bg-[#BB0000] dark:hover:bg-[#990000] text-white rounded-xl font-bold shadow-lg shadow-sky-600/20 dark:shadow-[#BB0000]/20 transition-all">
        <Mail size={18} className="mr-2" /> Email Me
      </EmailButton>
      <a 
        href={`https://${PROFILE.linkedin}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center px-8 py-4 bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-neutral-700 hover:border-slate-400 dark:hover:border-neutral-500 rounded-xl font-bold transition-all"
      >
        LinkedIn Profile <ExternalLink size={18} className="ml-2" />
      </a>
    </div>
  </div>
);

const ResumeView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="max-w-5xl mx-auto mt-8">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Resume</h2>
      
      <div className="flex gap-4">
        <button
          onClick={() => window.open('resume.pdf', '_blank')}
          className="px-4 py-2 bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-neutral-800 transition-colors font-medium cursor-pointer"
        >
          Print
        </button>
        
        <a
          href="resume.pdf"
          download="Shaun_Sekura_Resume.pdf"
          className="px-4 py-2 bg-sky-600 dark:bg-[#BB0000] text-white rounded hover:bg-sky-700 dark:hover:bg-red-700 transition-colors font-medium cursor-pointer"
        >
          Download PDF
        </a>
      </div>
    </div>

    <div className="w-full h-[800px] border border-slate-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-slate-100 dark:bg-neutral-900 relative">
      <iframe 
        src="resume.pdf" 
        className="w-full h-full" 
        title="Shaun Sekura Resume"
        onError={(e) => {
          e.target.style.display = 'none';
          document.getElementById('pdf-fallback').style.display = 'flex';
        }}
      />
      <div id="pdf-fallback" className="hidden absolute inset-0 flex-col items-center justify-center p-8 text-center bg-slate-50 dark:bg-neutral-900">
        <FileText size={48} className="text-slate-400 dark:text-slate-600 mb-4" />
        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Resume PDF Preview Unavailable</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          The file `resume.pdf` could not be loaded in this preview. Please ensure the file is placed in your public directory.
        </p>
        <a
          href="resume.pdf"
          download="Shaun_Sekura_Resume.pdf"
          className="px-6 py-2 bg-sky-600 dark:bg-[#BB0000] text-white rounded-lg hover:bg-sky-700 dark:hover:bg-red-700 transition-colors font-medium"
        >
          Download File Directly
        </a>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [projectsViewMode, setProjectsViewMode] = useState('dashboard');
  const [projectsFilter, setProjectsFilter] = useState('all');

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  const TABS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedProject(null);
    setMobileMenuOpen(false);
    
    if (tabId === 'projects' && activeTab !== 'projects') {
      setProjectsViewMode('dashboard');
      setProjectsFilter('all');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-neutral-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border-b border-slate-200 dark:border-neutral-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center cursor-pointer" onClick={() => handleTabChange('home')}>
              <SmartLogoImage darkMode={darkMode} />
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    (activeTab === tab.id && !selectedProject)
                      ? 'bg-sky-100 text-sky-700 dark:bg-red-900/30 dark:text-[#BB0000]'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              
              <div className="w-px h-6 bg-slate-300 dark:bg-neutral-800 mx-2"></div>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-neutral-900 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            <div className="flex items-center md:hidden gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-neutral-900 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-neutral-900 transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-200 dark:border-neutral-900 overflow-hidden bg-white dark:bg-neutral-950"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      (activeTab === tab.id && !selectedProject)
                        ? 'bg-sky-50 text-sky-700 dark:bg-neutral-900 dark:text-[#BB0000]'
                        : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-neutral-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-160px)]">
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <ProjectDetailView 
              key="project-detail" 
              project={selectedProject} 
              onBack={() => setSelectedProject(null)} 
              darkMode={darkMode}
            />
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'home' && <HomeView setTab={handleTabChange} openResume={() => handleTabChange('resume')} />}
              {activeTab === 'about' && <AboutView darkMode={darkMode} />}
              {activeTab === 'experience' && <ExperienceView />}
              {activeTab === 'projects' && (
                <ProjectsView 
                  selectProject={setSelectedProject} 
                  darkMode={darkMode} 
                  viewMode={projectsViewMode}
                  setViewMode={setProjectsViewMode}
                  filter={projectsFilter}
                  setFilter={setProjectsFilter}
                />
              )}
              {activeTab === 'resume' && <ResumeView />}
              {activeTab === 'contact' && <ContactView />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-slate-200 dark:border-neutral-900 py-8 text-center text-slate-500 dark:text-slate-500 text-sm mt-auto bg-white dark:bg-neutral-950 transition-colors duration-300">
        <p>© {new Date().getFullYear()} Shaun Sekura. All rights reserved.</p>
      </footer>
    </div>
  );
}