"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utlis";

const MotionH2 = motion.h2;
const MotionButton = motion.button;
const MotionDiv = motion.div;

const skills = [
  // Frontend
  { name: "HTML", level: 95, category: "frontend" },
  { name: "CSS", level: 95, category: "frontend" },
  { name: "Bootstrap", level: 85, category: "frontend" },
  { name: "JavaScript", level: 80, category: "frontend" },
  { name: "Tailwind CSS", level: 75, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  // Tools
  { name: "Git/GitHub", level: 80, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  // Backend / MERN
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Express.js", level: 80, category: "backend" },
  { name: "MongoDB", level: 70, category: "backend" },
];

const categories = ["all", "frontend", "tools", "backend"];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 md:py-24 relative bg-secondary/30"
    >
      <div className="container mx-auto max-w-5xl">
        <MotionH2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight"
        >
          My <span className="text-primary">Skills</span>
        </MotionH2>

        {/* Category Buttons */}
        <div className="w-full mb-12">
          <div className="flex flex-nowrap justify-center gap-2 sm:gap-3 overflow-x-auto px-4 sm:px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category, index) => (
              <MotionButton
                key={index}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-4 sm:px-5 py-2 rounded-full transition-colors duration-300 capitalize font-medium whitespace-nowrap flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary/70 text-foreground hover:bg-secondary/90"
                )}
              >
                {category}
              </MotionButton>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-card p-6 rounded-lg border border-border shadow-sm card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <MotionDiv
                  className="bg-primary h-2 rounded-full origin-left"
                  initial={{ width: 0 }}
                  animate={{ width: skill.level + "%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                ></MotionDiv>
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
