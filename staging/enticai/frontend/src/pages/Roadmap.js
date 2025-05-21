// frontend/src/pages/Services.js

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const RoadmapCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-25% 0px -25% 0px",
    once: true
  });

  return (
    <motion.div
      ref={ref}
      className="mb-12 relative"
    >
      {/* Connector line */}
      {index !== 3 && (
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: "3rem" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute left-[49.5%] top-[100%] w-1 bg-gradient-to-b from-blue-500 to-transparent -z-10"
        />
      )}

      <div className="bg-gray-800 rounded-xl p-6 border border-blue-500/20 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl font-bold text-blue-400">{item.phase}</span>
          <span className="text-purple-400 font-semibold">{item.timeline}</span>
        </div>
        
        <p className="text-gray-300 mb-4 text-sm">{item.description}</p>
        
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={isInView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden"
        >
          <ul className="space-y-2">
            {item.items.map((subItem, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ 
                  duration: 3.2,  // Slow fade over 3.2 seconds
                  delay: 0.5 + (idx * 0.1)  // Stagger the start of each item's fade
                }}
                className="flex items-center text-gray-300 text-base"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                {subItem}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Roadmap = () => {
  const roadmapItems = [
    {
      phase: "Phase 1: Foundation",
      timeline: "Q1 2025",
      description: "Establishing the core team and infrastructure",
      items: [
        "Secure technical co-founder with AI/ML and full-stack expertise",
        "Develop proof of concept for backend architecture generation",
        "Set up cloud infrastructure and development environment",
        "Initial seed funding round"
      ]
    },
    {
      phase: "Phase 2: Core Product Development",
      timeline: "Q2 2025",
      description: "Building the product's fundamental capabilities",
      items: [
        "Tune AI models for code generation and architecture understanding",
        "Build backend generation system for common architectures",
        "Implement basic state management templates"
      ]
    },
    {
      phase: "Phase 3: Beta Release",
      timeline: "Q3 2025",
      description: "Testing and refining with early adopters",
      items: [
        "Launch closed beta with selected developers",
        "Implement deployment pipeline automation",
        "Add support for multiple frontend frameworks",
        "Develop advanced state management solutions",
        "Launch documentation and learning resources"
      ]
    },
    {
      phase: "Phase 4: Public Launch",
      timeline: "Q4 2025",
      description: "Opening the product to all developers",
      items: [
        "Public launch of the product",
        "Release marketplace for custom templates and architectures",
        "Implement team collaboration features",
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 1,
              ease: "easeOut"
            }
          }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
            animate={{ 
              backgroundPosition: ["0%", "100%"],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            Development Roadmap
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Building the future of full-stack development
          </motion.p>
        </motion.div>

        {/* Roadmap Timeline */}
        <div className="max-w-5xl mx-auto">
          {roadmapItems.map((item, index) => (
            <RoadmapCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-16 text-gray-400 text-sm"
        >
          This roadmap is indicative and subject to updates based on technological advancements and market conditions
        </motion.div>
      </div>
    </div>
  );
};

export default Roadmap; 