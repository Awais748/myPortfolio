"use client";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

const MotionH2 = motion.h2;
const MotionP = motion.p;
const MotionDiv = motion.div;
const MotionImg = motion.img;
const MotionA = motion.a;

const projects = [
  {
    id: 1,
    title: "Fullstack E-Commerce Website",
    description:
      "A full-featured MERN stack e-commerce platform with secure authentication, advanced product filtering, seamless order placement, and real-time admin management for products and orders",
    image: "/projects/velwear.png",
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JavaScript",
      "TailwindCSS",
      "Admin Panel",
    ],
    demoUrl: "https://velwear-clothing.vercel.app/",
    githubUrl: "https://github.com/Awais748/E-Commerce_Web",
  },

  {
    id: 2,
    title: "Netflix Clone",
    description:
      "A fully responsive Netflix-inspired streaming platform built with React and Firebase, featuring secure authentication, protected routes, and video playback for a production-grade experience.",
    image: "/projects/netflix.png",
    tags: ["React", "Firebase", "JavaScript", "CSS"],
    demoUrl: "https://netflix-clone-six-lake.vercel.app/",
    githubUrl: "https://github.com/Awais748/netflix-clone",
  },
  {
    id: 4,
    title: "Tic Tac Toe in React",
    description:
      "A modern, interactive Tic Tac Toe game built with React featuring dynamic gameplay and a clean dark UI.",
    image: "/projects/tic-tac.png",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "https://tictactoe-game-ruddy.vercel.app/",
    githubUrl: "https://github.com/Awais748/Tic-Tac-Toe",
  },

  {
    id: 3,
    title: "PayPal Landing Page",
    description: "Responsive PayPal-inspired landing page (practice project)",
    image: "/projects/paypal.png",
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    demoUrl: "https://paypal-landing-page-eight.vercel.app/",
    githubUrl: "https://github.com/Awais748/paypal-landing-page-.git",
  },
  {
    id: 5,
    title: "Monarachy Landing Page",
    description:
      "Modern, fully responsive landing page with a clean, seamless design",
    image: "/projects/project-1.png",
    tags: ["HTML", "CSS", "Bootstrap"],
    demoUrl: "https://monarchy-nine.vercel.app/",
    githubUrl: "https://github.com/Awais748/MONARCHY.git",
  },
  {
    id: 6,
    title: "Digital Clock",
    description:
      "A real-time digital clock built with React and CSS, featuring live updates, a sleek dark theme, and smooth transitions for a modern UI experience.",
    image: "/projects/digitalclock.png",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "https://digital-clock-amber-tau.vercel.app/",
    githubUrl: "https://github.com/Awais748/Digital-clock",
  },
  {
    id: 7,
    title: "To-Do List App",
    description:
      "A responsive To-Do List app built with React and Tailwind CSS, featuring easy task add, complete, and delete options.",
    image: "/projects/todolist.png",
    tags: ["React", "JavaScript", "Tailwind CSS"],
    demoUrl: "https://todo-list-five-xi-85.vercel.app/",
    githubUrl: "https://github.com/Awais748/Todo-list.git",
  },
  {
    id: 8,
    title: "Portfolio Website",
    description:
      "Fully responsive portfolio with a clean design, built as a frontend practice project.",
    image: "/projects/project-2.png",
    tags: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://portfolioweb-coral-five.vercel.app/",
    githubUrl: "https://github.com/Awais748/Portfolio-.git",
  },
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-16 sm:py-20 md:py-24 relative bg-background"
    >
      <div className="container mx-auto max-w-6xl">
        <MotionH2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center tracking-tight"
        >
          Featured <span className="text-primary">Projects</span>
        </MotionH2>
        <MotionP
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto text-base sm:text-lg px-4 sm:px-0"
        >
          I started my web development journey and have worked on several
          practice projects focusing on responsive design, clean code, and
          improving my skills step by step.
        </MotionP>

        <MotionDiv
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.06, delayChildren: 0.1 },
            },
          }}
        >
          {projects.map((project) => (
            <MotionDiv
              key={project.id}
              className="group bg-card/70 backdrop-blur rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
                },
              }}
              style={{ willChange: "transform" }}
              whileHover={{
                y: -6,
                scale: 1.01,
                transition: { type: "spring", stiffness: 180, damping: 20 },
              }}
              whileTap={{ scale: 0.995 }}
            >
              <div className="h-48 sm:h-56 overflow-hidden">
                <MotionImg
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform group-hover:scale-105"
                />
              </div>

              <div className="p-5 sm:p-6 text-left">
                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 sm:px-3 py-1 text-xs font-medium border border-border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>

                <div className="flex justify-start items-center mt-4">
                  <div className="flex space-x-3">
                    <MotionA
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`View ${project.title} demo`}
                    >
                      <ExternalLink size={20} />
                    </MotionA>
                    <MotionA
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github size={20} />
                    </MotionA>
                  </div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>

        <div className="flex justify-center mt-16">
          <MotionA
            href="https://github.com/Awais748"
            target="_blank"
            rel="noopener noreferrer"
            className="cosmic-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Check My Github <ArrowRight size={16} />
          </MotionA>
        </div>
      </div>
    </section>
  );
}
