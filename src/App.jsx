import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Sun, Moon,
  ExternalLink, FileText, Wrench, ArrowLeft, Search
} from 'lucide-react';

/* ==============================================================================
   DATA: PROFILE & PROJECTS
============================================================================== */
const PROFILE = {
  name: "Shaun Sekura",
  title: "Mechanical Engineering @ The Ohio State University",
  tagline: "Driven by a passion for mechanical design, finite element analysis, and sustainable engineering solutions.",
  school: "The Ohio State University",
  degree: "B.S. Mechanical Engineering, Robotics and Autonomous Systems Minor",
  graduation: "Expected December 2027",
  gpa: "3.4",
  email: "ssekura08@gmail.com",
  linkedin: "linkedin.com/in/shaun-sekura",
  bio: "I am a Mechanical Engineering student at The Ohio State University. I spent Summer 2026 as an engineering intern at Hankook Tire, working on virtual validation — building material models, meshing and simulating parts in Abaqus, and correlating those results against physical test data. At Ohio State I am a teaching assistant for Intro to Mechanical Design and design components for the EcoCAR team at the Center for Automotive Research. My focus is CAD, FEA simulation, and physical testing.",
  skills: {
    Software: ["SolidWorks", "Onshape", "CATIA", "Abaqus", "Ansys", "Hypermesh", "Siemens Test Lab", "Python", "MATLAB", "Excel"],
    "Analysis & Testing": ["FEA", "Modal Testing", "Design of Experiments", "Physical-to-Virtual Correlation", "GD&T"],
    Fabrication: ["CNC Machining", "Vertical Mill", "Lathe", "3D Printing", "Soldering/Wiring (Arduino)", "Drafting"],
    Coursework: ["Machine Design", "Machine Elements", "Kinematics", "System/Vibrational Dynamics", "Circuits", "Fluid Mechanics", "Control Systems", "Sensors & Measurements", "Thermodynamics", "Mechanics of Materials"]
  },
  experience: [
    {
      role: "Mechanical Engineering Intern",
      company: "Hankook Tire",
      date: "Summer 2026",
      location: "Akron, OH",
      bullets: [
        "Validated a revised cord material model in Abaqus finite element analysis against physically scanned tire profiles, cutting virtual-to-physical deviation 50.4% at tread grooves and to 0.86 mm at the crown.",
        "Developed a Python GUI to process 4,096-row tire scanner profiles with outlier filtering, windowing, and interpolated lookup, replacing a manual Excel workflow with a 71-second automated run.",
        "Screened 600+ cord test records to 10 qualifying datasets and differentiated least-squares curve fits (R² ≈ 0.99) into strain-dependent moduli, exposing ~15% error in the legacy linear assumption.",
        "Took multiple OE wheels from CAD through Hypermesh meshing to Abaqus frequency extraction, characterizing mode shapes under bolt-hole constraints."
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

/* Project tags are restricted to the Software, Analysis & Testing, and Fabrication
   skill lists above, so the vocabulary on a project card always matches the resume.
   Coursework is deliberately excluded. Anything outside this set is dropped at render
   time and flagged in the dev console. */
const PROJECT_SKILLS = new Set([
  ...PROFILE.skills.Software,
  ...PROFILE.skills["Analysis & Testing"],
  ...PROFILE.skills.Fabrication
]);

const projectTags = (project) => project.tags.filter(tag => PROJECT_SKILLS.has(tag));

const PROJECTS = [
  {
    slug: "cord-material-model-validation",
    title: "Tire Cord Material Model Validation",
    categories: ["Simulation", "Testing"],
    filters: ["simulation", "testing"],
    tags: ["Abaqus", "Python", "Excel", "FEA", "Physical-to-Virtual Correlation"],
    thumbnail: "cord-material-thumb.jpg",
    description: "Rebuilt the cord material model from quasi-static test data and validated it in Abaqus against physically scanned tire profiles.",
    what: "The legacy cord material model assumed linear behavior, which carried error into every tire simulation that used it. The work was to characterize cord stiffness properly from quasi-static test data, then prove the revised model against physical tire scans.",
    how: [
      "Screened 600+ cord test records down to 10 qualifying datasets.",
      "Fit least-squares curves (R² ≈ 0.99) and differentiated them into strain-dependent moduli.",
      "Rebuilt the cord material model in Abaqus using the strain-dependent properties.",
      "Compared simulated tire geometry against physically scanned profiles to measure deviation."
    ],
    results: [
      "Exposed roughly 15% error in the legacy linear stiffness assumption.",
      "Cut virtual-to-physical deviation by 50.4% at the tread grooves.",
      "Brought crown deviation down to 0.86 mm."
    ],
    links: { report: "hankook-intern-report.pdf" },
    featured: true,
    recent: true
  },
  {
    slug: "tire-profile-processor",
    title: "Tire Profile Processor",
    categories: ["Simulation"],
    filters: ["simulation"],
    tags: ["Python", "Excel", "Physical-to-Virtual Correlation"],
    thumbnail: "tire-profile-thumb.jpg",
    description: "Python GUI that turns 4,096-row tire scanner profiles into usable data in 71 seconds, replacing a manual Excel workflow.",
    what: "Tire scanner output arrived as 4,096-row profile datasets that were cleaned and queried by hand in Excel. The tool automates that workflow so scan data can be turned around quickly and consistently.",
    how: [
      "Built a Python GUI to load raw tire scanner profile data.",
      "Implemented outlier filtering and windowing to clean noisy scan points.",
      "Added interpolated lookup so profile values could be queried at any position."
    ],
    results: [
      "Cut a manual Excel workflow down to a 71-second automated run.",
      "Handled full 4,096-row profiles without hand formatting or transcription errors.",
      "Produced the cleaned scan profiles used for virtual-to-physical comparison."
    ],
    links: { report: "hankook-intern-report.pdf" },
    featured: false,
    recent: true
  },
  {
    slug: "oe-wheel-modal-analysis",
    title: "OE Wheel Modal Analysis",
    categories: ["Simulation"],
    filters: ["simulation"],
    tags: ["Hypermesh", "Abaqus", "FEA", "Modal Testing"],
    thumbnail: "wheel-modal-thumb.jpg",
    description: "Took multiple OE wheels from CAD through Hypermesh meshing to Abaqus frequency extraction, characterizing mode shapes under bolt-hole constraints.",
    what: "OE wheel designs needed their dynamic behavior characterized before physical validation. Each wheel had to be carried from supplied CAD geometry to a clean finite element mesh, then run through frequency extraction to identify its mode shapes.",
    how: [
      "Prepared and cleaned supplied OE wheel CAD geometry for meshing.",
      "Built finite element meshes for each wheel in Hypermesh.",
      "Applied bolt-hole constraints to represent the mounted condition.",
      "Ran frequency extraction in Abaqus to pull natural frequencies and mode shapes."
    ],
    results: [
      "Characterized mode shapes for multiple OE wheels under mounted bolt-hole constraints.",
      "Produced meshed wheel models ready for downstream structural and dynamic analysis.",
      "Established a repeatable CAD-to-mesh-to-modal workflow across wheel programs."
    ],
    links: { report: "hankook-intern-report.pdf" },
    featured: true,
    recent: true
  },
  {
    slug: "footprint-doe-study",
    title: "Tire Footprint DOE Study",
    categories: ["Simulation", "Testing"],
    filters: ["simulation", "testing"],
    tags: ["Design of Experiments", "Excel"],
    thumbnail: "footprint-doe-thumb.jpg",
    description: "32-case design-of-experiments footprint study on an OE commercial EV van tire across load, pressure, and camber.",
    what: "Footprint behavior needed to be characterized across the operating envelope of an OE commercial EV van tire, with a test matrix broad enough to cover it but small enough to run.",
    how: [
      "Built a 32-case design-of-experiments matrix spanning 4 loads, 4 pressures, and ±3° camber.",
      "Executed the full case set and extracted footprint results for each condition.",
      "Compared symmetric positive and negative camber cases to test for equivalence."
    ],
    results: [
      "Validated symmetric camber cases as interchangeable at 1.95% maximum difference.",
      "Characterized footprint response across the tire's load and pressure envelope.",
      "Showed camber cases can be mirrored rather than run twice, trimming future matrices."
    ],
    links: { report: "hankook-intern-report.pdf" },
    featured: false,
    recent: true
  },
  {
    slug: "reverse-engineering-motor-mount",
    title: "Reverse Engineering of Motor Mount",
    categories: ["Design", "Simulation"],
    filters: ["design", "simulation"],
    tags: ["CATIA", "FEA"],
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
    tags: ["Python", "SolidWorks"],
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
    tags: ["Onshape"],
    thumbnail: "slide-grip-thumb.jpg",
    description: "Low-cost, lightweight system designed to alleviate wrist pain for performing trombone players.",
    what: "Designed a low cost, lightweight system to alleviate wrist pain for musicians. Tested and approved by international performing trombone players.",
    how: [
      "Used Onshape to design the ergonomic system.",
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
    tags: ["SolidWorks"],
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
    tags: ["Onshape", "3D Printing"],
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
    tags: ["Onshape", "Soldering/Wiring (Arduino)"],
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
    tags: ["CNC Machining", "Vertical Mill", "Lathe", "GD&T"],
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

// Surface tags that fall outside PROJECT_SKILLS instead of letting them vanish silently
if (import.meta.env && import.meta.env.DEV) {
  PROJECTS.forEach(p => {
    const stray = p.tags.filter(tag => !PROJECT_SKILLS.has(tag));
    if (stray.length) {
      console.warn(`[projects] "${p.slug}" has tags outside the skills list: ${stray.join(', ')}`);
    }
  });
}

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
    <a href={`mailto:${email}`} onClick={handleEmailClick} className={`relative inline-flex items-center cursor-pointer ${className}`}>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium"
          >
            Copied to clipboard
          </motion.span>
        )}
      </AnimatePresence>
      <span className={copied ? 'hidden' : 'inline-flex items-center'}>
        {children}
      </span>
    </a>
  );
};

// Trainer logo (Top Left) - bobs idly, plays the alert animation once when clicked.
// Same logo in light and dark mode.
const ALERT_DURATION_MS = 1480; // one full cycle of trainer-alert.gif
// Two URLs for the same gif: alternating between them guarantees the src value
// changes on every click (so the gif restarts at frame 0, even mid-playback)
// while keeping both copies in the browser cache instead of refetching each time.
const ALERT_SRCS = ['trainer-alert.gif', 'trainer-alert.gif?a=1'];

const SmartLogoImage = () => {
  const [alertIndex, setAlertIndex] = useState(null); // null while idle-bobbing
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef(null);
  const playCount = useRef(0);
  const timerRef = useRef(null);

  // Preload both alert urls so the first click swaps with no network wait
  useEffect(() => {
    ALERT_SRCS.forEach(src => { new Image().src = src; });
    return () => clearTimeout(timerRef.current);
  }, []);

  const playAlert = () => {
    setAlertIndex(playCount.current++ % ALERT_SRCS.length);

    // Surprised hop. Driven imperatively so it can restart on every click without
    // remounting the <img> — remounting is what made the logo blink out.
    imgRef.current?.animate(
      [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-8px)', offset: 0.25 },
        { transform: 'translateY(-3px)', offset: 0.6 },
        { transform: 'translateY(0)' }
      ],
      { duration: 500, easing: 'ease-out' }
    );

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAlertIndex(null), ALERT_DURATION_MS);
  };

  if (imageError) {
    // Text fallback if the trainer gifs are missing from the public folder
    return (
      <span className="font-semibold text-lg tracking-tight text-slate-900 dark:text-white">Shaun Sekura</span>
    );
  }

  return (
    <div className="flex items-center gap-3" onClick={playAlert}>
      {/* Both gifs share the same width (275px); the alert gif is taller because of the
          "!" above the trainer. Sizing by width and anchoring to the bottom keeps the
          sprite the same size — the "!" just appears above his head. */}
      <div className="relative -top-[3px] w-10 h-14 shrink-0">
        <img
          ref={imgRef}
          src={alertIndex === null ? 'trainer-bob.gif' : ALERT_SRCS[alertIndex]}
          alt="Shaun Sekura Logo"
          className="absolute bottom-0 left-0 w-full h-auto"
          style={{ imageRendering: 'pixelated' }}
          onError={() => setImageError(true)}
        />
      </div>
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
      className="w-full aspect-square rounded-lg object-cover border border-slate-200 dark:border-neutral-800"
      onError={() => setExtIndex(prev => prev + 1)}
    />
  );
};

const CustomThemedProfilePicture = ({ fallbackName, darkMode }) => {
  return (
    <div className="relative w-full aspect-square bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg overflow-hidden flex items-center justify-center">
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

const SmartProjectImage = ({ filename, title, className, darkMode, small = false }) => {
  const [imageError, setImageError] = useState(false);
  const srcPath = `${filename}`;

  if (imageError) {
    return <PlaceholderImage title={title} filename={filename} className={className} darkMode={darkMode} small={small} />;
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
  <div className="max-w-2xl min-h-[68vh] flex flex-col justify-center">
    <p className="text-sm font-medium text-slate-400 dark:text-neutral-500 mb-5">
      Mechanical Engineering · The Ohio State University
    </p>
    <h1 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white">
      Shaun Sekura
    </h1>
    <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
      {PROFILE.tagline} I focus on CAD modeling, physical load testing, and finite element validation.
    </p>
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={() => setTab('projects')}
        className="px-6 py-3 bg-sky-600 hover:bg-sky-700 dark:bg-[#BB0000] dark:hover:bg-[#990000] text-white rounded-lg text-sm font-semibold transition-colors"
      >
        View Projects
      </button>
      <button
        onClick={openResume}
        className="px-6 py-3 bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-neutral-700 hover:border-sky-500 dark:hover:border-[#BB0000] rounded-lg text-sm font-semibold transition-colors"
      >
        View Resume
      </button>
    </div>
  </div>
);

const AboutView = ({ darkMode }) => (
  <div className="space-y-16 mt-8 max-w-3xl mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 items-start">
      <div className="sm:col-span-1">
        <SmartAboutHeadshot darkMode={darkMode} />
      </div>
      <div className="sm:col-span-2 space-y-5">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">About</h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {PROFILE.bio}
        </p>
        <div className="text-sm font-medium text-sky-600 dark:text-[#BB0000] space-y-1 pt-2">
          <p>{PROFILE.degree}</p>
          <p>{PROFILE.school} · {PROFILE.graduation}</p>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-8 text-slate-900 dark:text-white">Skills &amp; Coursework</h3>
      <div className="space-y-6">
        {Object.entries(PROFILE.skills).map(([category, skillsList]) => (
          <div key={category} className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-1 sm:gap-6 py-4 border-t border-slate-200 dark:border-neutral-800">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{category}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {skillsList.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ExperienceView = () => (
  <div className="mt-8 max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Experience</h2>
    <p className="text-slate-500 dark:text-slate-400 mb-10">Work, research, and leadership roles.</p>
    <div>
      {PROFILE.experience.map((exp, index) => (
        <div key={index} className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-1 sm:gap-8 py-8 border-t border-slate-200 dark:border-neutral-800">
          <div className="text-sm sm:pt-0.5">
            <div className="font-semibold text-sky-600 dark:text-[#BB0000]">{exp.date}</div>
            <div className="mt-1 font-medium text-sky-600 dark:text-[#BB0000]">{exp.location}</div>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{exp.role}</h3>
            <div className="text-slate-600 dark:text-slate-400 text-sm mb-4">{exp.company}</div>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
              {exp.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-slate-300 dark:text-neutral-600 mr-3 mt-px">—</span>
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

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Wraps every occurrence of `query` in the text with a highlight mark
const highlightText = (text, query) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-sky-100 text-sky-900 dark:bg-[#BB0000]/40 dark:text-red-100 rounded-[2px]">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

// Fields shown on the card get highlighted in place; these hidden detail fields
// produce a labeled snippet preview when they're the only place the term appears.
const CARD_FIELDS = (p) => [p.title, p.description, p.categories.join(' '), projectTags(p).join(' ')];
const DETAIL_FIELDS = (p) => [
  ['Overview', p.what],
  ['Approach', p.how.join(' ')],
  ['Results', p.results.join(' ')],
];

const projectMatch = (p, query) => {
  const q = query.toLowerCase();
  const onCard = CARD_FIELDS(p).some(t => t.toLowerCase().includes(q));
  let snippet = null;
  for (const [label, text] of DETAIL_FIELDS(p)) {
    const idx = text.toLowerCase().indexOf(q);
    if (idx !== -1) {
      const start = Math.max(0, idx - 45);
      const end = Math.min(text.length, idx + q.length + 90);
      snippet = {
        label,
        text: (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : ''),
      };
      break;
    }
  }
  if (!onCard && !snippet) return null;
  // Only show the snippet when the card itself wouldn't reveal the match
  return { snippet: onCard ? null : snippet };
};

const ProjectCard = ({ project, selectProject, darkMode, query = '', snippet = null }) => (
  <div
    className="group grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-4 sm:gap-6 py-7 border-b border-slate-200 dark:border-neutral-800 cursor-pointer"
    onClick={() => selectProject(project)}
  >
    <div className="h-40 sm:h-24 overflow-hidden rounded bg-slate-100 dark:bg-neutral-900">
      <SmartProjectImage
        title={project.title}
        filename={project.thumbnail}
        className="w-full h-full object-cover"
        darkMode={darkMode}
        small
      />
    </div>
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:underline underline-offset-4">
          {highlightText(project.title, query)}
        </h3>
        <span className="hidden sm:block text-xs text-slate-400 dark:text-neutral-500 whitespace-nowrap">
          {highlightText(project.categories.join(' / '), query)}
        </span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
        {highlightText(project.description, query)}
      </p>
      <p className="text-xs text-slate-400 dark:text-neutral-500 mt-2">
        {highlightText(projectTags(project).join(' · '), query)}
      </p>
      {snippet && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 pl-3 border-l-2 border-sky-200 dark:border-[#BB0000]/40 leading-relaxed">
          <span className="font-semibold text-slate-400 dark:text-neutral-500">{snippet.label}: </span>
          {highlightText(snippet.text, query)}
        </p>
      )}
    </div>
  </div>
);

const ProjectsView = ({ selectProject, darkMode, filter, setFilter }) => {
  const [query, setQuery] = useState('');
  const q = query.trim();

  const visibleProjects = PROJECTS
    .filter(p => filter === 'all' || (p.filters && p.filters.includes(filter)))
    .map(p => {
      if (!q) return { project: p, snippet: null };
      const match = projectMatch(p, q);
      return match ? { project: p, snippet: match.snippet } : null;
    })
    .filter(Boolean);

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Projects</h2>
      <p className="text-slate-500 dark:text-slate-400 mt-2">
        Work from internships, competition teams, and coursework.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 pb-4 border-b border-slate-200 dark:border-neutral-800">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {['all', 'design', 'simulation', 'prototyping', 'testing'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`capitalize transition-colors ${
                filter === f
                  ? 'text-sky-600 dark:text-[#BB0000] font-semibold'
                  : 'text-slate-400 dark:text-neutral-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>

        <div className="relative sm:w-56">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-neutral-500 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-sky-500 dark:focus:border-[#BB0000] transition-colors"
          />
        </div>
      </div>

      <div>
        {visibleProjects.map(({ project, snippet }) => (
          <ProjectCard
            key={project.slug}
            project={project}
            selectProject={selectProject}
            darkMode={darkMode}
            query={q}
            snippet={snippet}
          />
        ))}
      </div>

      {visibleProjects.length === 0 && (
        <div className="py-12 text-slate-500 dark:text-slate-400">
          {q ? <>No projects match &ldquo;{q}&rdquo;.</> : 'No projects in this category yet.'}
        </div>
      )}
    </div>
  );
};

const ProjectDetailView = ({ project, onBack, darkMode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="max-w-2xl mx-auto mt-8"
  >
    <button
      onClick={onBack}
      className="flex items-center text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-10 transition-colors"
    >
      <ArrowLeft size={16} className="mr-2" /> Back to projects
    </button>

    <p className="text-xs text-slate-400 dark:text-neutral-500 mb-3">{project.categories.join(' / ')}</p>
    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">{project.title}</h1>
    <p className="text-sm text-slate-400 dark:text-neutral-500 mb-8">{projectTags(project).join(' · ')}</p>

    <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-900 mb-12">
      <SmartProjectImage
        title={project.title}
        filename={project.thumbnail}
        className="w-full h-auto object-cover"
        darkMode={darkMode}
      />
    </div>

    <div className="space-y-12">
      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500 mb-3">Overview</h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{project.what}</p>
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500 mb-3">Approach</h3>
        <ul className="space-y-3">
          {project.how.map((item, i) => (
            <li key={i} className="flex items-start text-slate-600 dark:text-slate-300 leading-relaxed">
              <span className="text-slate-300 dark:text-neutral-600 mr-3 mt-px">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500 mb-3">Results</h3>
        <ul className="space-y-3">
          {project.results.map((result, i) => (
            <li key={i} className="flex items-start text-slate-600 dark:text-slate-300 leading-relaxed">
              <span className="text-slate-300 dark:text-neutral-600 mr-3 mt-px">—</span>
              <span>{result}</span>
            </li>
          ))}
        </ul>
      </section>

      {Object.keys(project.links).length > 0 && (
        <section className="flex flex-wrap gap-6 pt-2 text-sm">
          {project.links.report && (
            <a
              href={typeof project.links.report === 'string' ? project.links.report : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-medium text-slate-900 dark:text-white border-b border-slate-300 dark:border-neutral-600 hover:border-sky-500 dark:hover:border-[#BB0000] pb-0.5 transition-colors"
            >
              <FileText size={15} className="mr-2" /> Technical report
            </a>
          )}
          {project.links.portfolio && (
            <a
              href={typeof project.links.portfolio === 'string' ? project.links.portfolio : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-medium text-slate-900 dark:text-white border-b border-slate-300 dark:border-neutral-600 hover:border-sky-500 dark:hover:border-[#BB0000] pb-0.5 transition-colors"
            >
              <ExternalLink size={15} className="mr-2" /> View in portfolio
            </a>
          )}
        </section>
      )}
    </div>
  </motion.div>
);

const ContactView = () => (
  <div className="max-w-2xl mx-auto mt-16">
    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-5">Get in touch</h2>
    <p className="text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
      I'm currently seeking internship opportunities for Spring 2027 and Summer 2027. If you're looking for a mechanical engineering student with hands-on CAD and FEA experience, I'd love to chat.
    </p>

    <div className="border-t border-slate-200 dark:border-neutral-800">
      <div className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-1 sm:gap-6 py-5 border-b border-slate-200 dark:border-neutral-800">
        <span className="text-sm text-slate-400 dark:text-neutral-500">Email</span>
        <EmailButton email={PROFILE.email} className="text-sm font-medium text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-[#BB0000] transition-colors justify-start">
          {PROFILE.email}
        </EmailButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-1 sm:gap-6 py-5 border-b border-slate-200 dark:border-neutral-800">
        <span className="text-sm text-slate-400 dark:text-neutral-500">LinkedIn</span>
        <a
          href={`https://${PROFILE.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-[#BB0000] transition-colors"
        >
          {PROFILE.linkedin} <ExternalLink size={14} className="ml-2 opacity-50" />
        </a>
      </div>
    </div>
  </div>
);

const ResumeView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="max-w-5xl mx-auto mt-8">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Resume</h2>

      <div className="flex items-center gap-3">
        <button
          onClick={() => window.open('resume.pdf', '_blank')}
          className="px-4 py-2 bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-neutral-700 hover:border-sky-500 dark:hover:border-[#BB0000] rounded-lg text-sm font-semibold transition-colors cursor-pointer"
        >
          Open in New Tab
        </button>

        <a
          href="resume.pdf"
          download="Shaun_Sekura_Resume.pdf"
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 dark:bg-[#BB0000] dark:hover:bg-[#990000] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
        >
          Download PDF
        </a>
      </div>
    </div>

    <div className="w-full h-[800px] border border-slate-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-slate-100 dark:bg-neutral-900 relative">
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
          className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 dark:bg-[#BB0000] dark:hover:bg-[#990000] text-white rounded-lg text-sm font-semibold transition-colors"
        >
          Download File Directly
        </a>
      </div>
    </div>
  </motion.div>
);

/* Hash-based routing, so the browser back/forward buttons move between pages and
   individual projects are linkable. A hash needs no server rewrite rules, so it
   behaves identically on the dev server and on static hosting. */
const TAB_IDS = ['home', 'about', 'experience', 'projects', 'resume', 'contact'];

const readLocation = () => {
  const [tab, slug] = window.location.hash.replace(/^#\/?/, '').split('/');
  return {
    tab: TAB_IDS.includes(tab) ? tab : 'home',
    project: slug ? PROJECTS.find(p => p.slug === slug) || null : null
  };
};

export default function App() {
  const [route, setRoute] = useState(readLocation);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsFilter, setProjectsFilter] = useState('all');

  const { tab: activeTab, project: selectedProject } = route;
  const activeTabRef = useRef(activeTab);

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  // Sync app state to the URL — this is what makes Back and Forward work
  useEffect(() => {
    const onHashChange = () => {
      const next = readLocation();
      if (next.tab === 'projects' && activeTabRef.current !== 'projects') {
        setProjectsFilter('all');
      }
      setRoute(next);
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Writing the hash pushes a history entry; the listener above applies it
  const navigate = (tab, slug = null) => {
    const target = `#/${tab}${slug ? `/${slug}` : ''}`;
    setMobileMenuOpen(false);
    if (window.location.hash === target) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = target;
  };

  const openProject = (project) => navigate('projects', project.slug);

  const TABS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleTabChange = (tabId) => navigate(tabId);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-neutral-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border-b border-slate-200 dark:border-neutral-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => handleTabChange('home')}>
              <SmartLogoImage />
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-3 py-2 text-sm transition-colors ${
                    (activeTab === tab.id && !selectedProject)
                      ? 'text-sky-600 dark:text-[#BB0000] font-semibold'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
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
                    className={`block w-full text-left px-4 py-3 rounded-lg text-base transition-colors ${
                      (activeTab === tab.id && !selectedProject)
                        ? 'text-sky-600 dark:text-[#BB0000] font-semibold bg-slate-100 dark:bg-neutral-900'
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
              onBack={() => navigate('projects')}
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
                  selectProject={openProject}
                  darkMode={darkMode}
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