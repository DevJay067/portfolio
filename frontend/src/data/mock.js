// Mock data for portfolio - will be replaced with backend API later

export const profileData = {
  name: "Jay Magar",
  title: "Computer Engineering Student",
  tagline: "Hello, myself Jay Magar",
  description: "Passionate about technology and innovation. Building cutting-edge web applications, exploring AI/ML systems, and creating solutions that make a difference. Always learning, always building.",
  email: "jaymagar310@gmail.com",
  phone: "",
  location: "",
  profileImage: "https://customer-assets.emergentagent.com/job_76521610-dcc5-45d9-8a05-3d388a49daac/artifacts/hpzt4615_WhatsApp%20Image%202026-02-06%20at%209.18.51%20PM.jpeg"
};

export const stats = [
  { label: "Projects", value: "6+" },
  { label: "Technologies", value: "9" },
  { label: "In Progress", value: "2" },
  { label: "Achievements", value: "3" }
];

export const aboutHighlights = [
  {
    title: "Multiple Academic Projects",
    year: "2025",
    description: "Successfully built and deployed multiple web applications showcasing modern development practices"
  },
  {
    title: "Technical Recognition",
    year: "2025",
    description: "Recognized for consistent project delivery and innovative technical solutions"
  },
  {
    title: "Full-Stack Development",
    year: "2025 - Present",
    description: "Actively mastering full-stack development, databases, and modern web frameworks"
  }
];

export const skills = [
  { name: "React", category: "Frontend", level: 85, icon: "Code2" },
  { name: "HTML/CSS", category: "Frontend", level: 90, icon: "Layout" },
  { name: "Vite", category: "Tools", level: 80, icon: "Zap" },
  { name: "Python", category: "Backend", level: 85, icon: "FileCode" },
  { name: "C", category: "Programming", level: 75, icon: "Terminal" },
  { name: "SQL/DBMS", category: "Database", level: 80, icon: "Database" },
  { name: "GEN AI", category: "AI/ML", level: 70, icon: "Brain" },
  { name: "RAG System", category: "AI/ML", level: 65, icon: "Network" },
  { name: "Git", category: "Tools", level: 85, icon: "GitBranch" },
  { name: "Project Management", category: "Soft Skills", level: 80, icon: "Briefcase" }
];

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "Hindi", level: "Native" },
  { name: "Marathi", level: "Native" }
];

export const projects = [
  {
    id: 1,
    title: "HealthChain AI",
    description: "Healthcare web application leveraging AI to provide intelligent health insights and recommendations",
    image: "https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHw0fHxoZWFsdGhjYXJlJTIwZGFzaGJvYXJkfGVufDB8fHx8MTc2OTM2Nzc0OXww&ixlib=rb-4.1.0&q=85",
    technologies: ["React", "Python", "AI/ML", "SQL"],
    status: "Completed",
    year: "2025",
    highlights: [
      "Implemented AI-powered health analysis",
      "Built responsive frontend with React",
      "Integrated secure database connectivity"
    ],
    liveDemo: "https://healthchainfinal.netlify.app/",
    github: "https://github.com/DevJay067"
  },
  {
    id: 2,
    title: "EOD Rover",
    description: "Advanced robotics project for explosive ordnance disposal with autonomous navigation and real-time control systems",
    image: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?crop=entropy&cs=srgb&fm=jpg&q=85",
    technologies: ["Robotics", "IoT", "Python", "Hardware"],
    status: "Completed",
    year: "2025",
    highlights: [
      "Developed autonomous navigation system",
      "Built real-time control interface",
      "Implemented safety mechanisms and sensors"
    ],
    liveDemo: "https://jaymagar067.wixstudio.com/my-site",
    github: "https://github.com/DevJay067"
  }
];

export const experience = [
  {
    type: "experience",
    title: "Software Development",
    organization: "Academic Projects",
    period: "2025 - Present",
    description: "Building modern web applications and exploring cutting-edge technologies",
    points: [
      "Developing responsive frontends using React, HTML, CSS, and Vite",
      "Implementing version control and collaborative workflows with Git",
      "Creating backend solutions with Python and database connectivity using SQL",
      "Following industry-standard coding practices and security principles"
    ]
  }
];

export const education = [
  {
    type: "education",
    degree: "B-Tech in Computer Engineering",
    institution: "NMIET",
    period: "2025 - 2029",
    status: "Pursuing"
  },
  {
    type: "education",
    degree: "Schooling",
    institution: "BIS Jr & Sr College",
    period: "2012 - 2025",
    status: "Completed"
  }
];

export const references = [
  {
    name: "Pariksheet Jadhav",
    initials: "PJ",
    phone: "123-456-7890",
    email: "hello@reallygreatsite.com"
  },
  {
    name: "Atharv Kadam",
    initials: "AK",
    phone: "123-456-7890",
    email: "hello@reallygreatsite.com"
  }
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" }
];
