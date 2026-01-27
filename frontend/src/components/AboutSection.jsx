import { Briefcase, Code, User } from "lucide-react";
import { motion } from "framer-motion";

const MotionH2 = motion.h2;
const MotionDiv = motion.div;

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 relative">
      <div className="container mx-auto max-w-6xl">
        <MotionH2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 md:mb-16 text-center tracking-tight"
        >
          About <span className="text-primary">Me</span>
        </MotionH2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* LEFT SECTION */}
          <MotionDiv
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-7"
          >
            <h3 className="text-4xl sm:text-5xl font-bold tracking-tight">
              MERN Stack Developer
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              I’m a passionate MERN Stack developer who loves building fast,
              responsive and meaningful web applications. I enjoy turning ideas
              into clean, functional, and user-focused digital experiences.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              I work with
              <span className="font-semibold text-primary">
                {" "}
                React, Node.js, Express.js, MongoDB
              </span>
              , and modern styling frameworks like Tailwind CSS & Bootstrap. I
              enjoy combining smooth UI with powerful backend logic to create
              full-stack apps that actually solve problems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center md:justify-start">
              <a
                href="#contact"
                className="cosmic-button"
              >
                Get in Touch
              </a>

              <a
                href="/cv/Awais.cv.pdf"
                download
                className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 font-medium text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Download CV
              </a>
            </div>
          </MotionDiv>

          {/* RIGHT CARDS */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {/* CARD 1 */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="gradient-border p-6 sm:p-7 rounded-2xl bg-card/60 backdrop-blur shadow-lg card-hover animate-float"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="p-3 sm:p-4 rounded-full bg-primary/10 flex-shrink-0">
                  <Code className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg sm:text-xl mb-2">Full-Stack Skills</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Building modern UIs with React and strong backend systems
                    using Node.js, Express & MongoDB.
                  </p>
                </div>
              </div>
            </MotionDiv>

            {/* CARD 2 */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
              className="gradient-border p-6 sm:p-7 rounded-2xl bg-card/60 backdrop-blur shadow-lg card-hover animate-float"
              style={{ animationDelay: "0.25s" }}
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="p-3 sm:p-4 rounded-full bg-primary/10 flex-shrink-0">
                  <User className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg sm:text-xl mb-2">Learning Mindset</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Always improving, experimenting, and exploring new tools to
                    stay ahead in modern web development.
                  </p>
                </div>
              </div>
            </MotionDiv>

            {/* CARD 3 */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
              className="gradient-border p-6 sm:p-7 rounded-2xl bg-card/60 backdrop-blur shadow-lg card-hover animate-float"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="p-3 sm:p-4 rounded-full bg-primary/10 flex-shrink-0">
                  <Briefcase className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg sm:text-xl mb-2">Projects</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Worked on full-stack projects including authentication,
                    APIs, dashboards, and interactive UI designs.
                  </p>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
