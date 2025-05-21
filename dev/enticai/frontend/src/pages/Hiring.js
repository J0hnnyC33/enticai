// frontend/src/pages/Hiring.js

import React from 'react';
import { Link } from 'react-router-dom';

const Hiring = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Join Enticai
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Help Shape the Future of Developer Tools
          </p>
        </div>

        <section className="max-w-4xl mx-auto space-y-8">
          <div className="bg-gray-800 rounded-xl p-6 md:p-8 border border-blue-500/20">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">Co-Founder & Lead AI/ML Engineer</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-400">Remote</span>
              <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-400">Part-Time → Full-Time</span>
              <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-400">Equity Available</span>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-blue-400 mb-3">About the Role</h3>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  Enticai is on a mission to revolutionize how developers build and deploy applications. We're creating a powerful platform that enables developers to rapidly spin up full-stack applications with sophisticated backends and state management systems. Think Replit or Bolt.new, but with a crucial difference: we're focusing on generating production-ready backend architectures, not just frontends.
                </p>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed mt-4">
                  Initially, this role will be part-time, allowing you to maintain other commitments while we collaborate to build and validate our core technology. Upon securing seed funding, the position will transition to full-time, with competitive compensation reflecting your co-founder status. This approach lets us develop our working relationship and build a strong foundation before making a full-time commitment.
                </p>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed mt-4">
                  As co-founders, we'll work closely together to build a platform that transforms how developers create applications. Your deep understanding of backend architectures and system design will be crucial as we develop AI systems that can generate sophisticated, scalable backend solutions. We'll be pushing the boundaries of what's possible in automated system architecture and code generation.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-blue-400 mb-3">What We'll Build Together</h3>
                <ul className="text-base md:text-lg text-gray-300 leading-relaxed space-y-2">
                  {[
                    "Design and implement AI systems that can understand and generate production-ready backend architectures",
                    "Create sophisticated state management solutions for complex distributed systems",
                    "Develop intelligent code generation for scalable microservices and serverless architectures",
                    "Build systems that understand and implement database schemas, API designs, and authentication flows",
                    "Create tools for automated deployment pipelines and infrastructure management",
                    "Design systems that can generate both monolithic and microservice architectures based on project requirements",
                    "Shape the future of how backend systems are designed and implemented"
                  ].map((item, index) => (
                    <li key={index} className="pl-6 relative">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-blue-400 mb-3">What We're Looking For</h3>
                <ul className="text-base md:text-lg text-gray-300 leading-relaxed space-y-2">
                  {[
                    "Deep expertise in backend development and system architecture design",
                    "Strong experience with cloud services (AWS/GCP/Azure) and distributed systems",
                    "Solid understanding of database design, API architectures, and system scaling",
                    "Background in AI/ML, particularly in code generation and understanding",
                    "Experience with various backend frameworks and state management approaches",
                    "Knowledge of deployment strategies and infrastructure automation",
                    "Passion for solving complex architectural challenges",
                    "Show us your work! Share your GitHub, portfolio, or any systems you've designed"
                  ].map((item, index) => (
                    <li key={index} className="pl-6 relative">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-blue-400 mb-3">What You'll Get</h3>
                <ul className="text-base md:text-lg text-gray-300 leading-relaxed space-y-2">
                  {[
                    "True partnership: A voice in technical and strategic decisions",
                    "2-10% equity stake as a co-founder",
                    "Opportunity to shape the future of backend development and system architecture",
                    "Freedom to experiment with cutting-edge technologies and approaches",
                    "Chance to solve complex technical challenges at scale",
                    "Build tools that will transform how developers create applications"
                  ].map((item, index) => (
                    <li key={index} className="pl-6 relative">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 text-center">
                <Link 
                  to="/contact" 
                  className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-xl text-white font-semibold text-base md:text-lg"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hiring; 