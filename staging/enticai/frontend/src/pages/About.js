// frontend/src/pages/About.js

import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            About Enticai
          </h1>
          <p className="text-xl text-gray-300">
            Building the Future of Full-Stack Development
          </p>
        </div>

        <section className="max-w-4xl mx-auto space-y-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-blue-500/20">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">Who We Are</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Enticai is revolutionizing how developers build and deploy applications. We're creating a powerful product that enables developers to rapidly spin up full-stack applications with sophisticated backends and state management systems. Think Replit or Bolt.new, but with the ability to generate complex backend architectures, not just frontends.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-8 border border-blue-500/20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 flex-shrink-0">
                <img 
                  src="/images/services/john_smith.png"
                  alt="John Smith" 
                  className="w-full h-full object-cover rounded-full border-4 border-blue-500/20"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-blue-400 mb-2">John Smith</h2>
                <p className="text-xl text-gray-300 mb-4">Founder & CEO</p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  With over a decade of experience in executive leadership and entrepreneurship, 
                  John founded Enticai with a mission to transform how developers create and deploy 
                  applications. His focus on developer experience and efficient automation has led 
                  to innovative solutions that make complex development tasks simpler and more accessible.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-blue-500/20">
            <div>
              <h2 className="text-3xl font-bold text-blue-400 mb-4">The Journey</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                The foundation of Enticai was laid through John's intensive journey into software development and AI/ML. This journey encompassed mastering full-stack development, cloud architectures, and numerous AI/ML frameworks. His expertise spans across transformer architectures, sophisticated development pipelines, and various approaches to building scalable applications. Through this experience, he identified a crucial gap in the developer tools landscape: the need for a product that could generate not just frontend code, but complete, production-ready backend architectures and state management systems.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-blue-500/20">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">Current Focus</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We're building a powerful development product that enables rapid application deployment through sophisticated AI-powered code generation. Our system emphasizes complete full-stack solutions, generating not just frontend code but also complex backend architectures and state management systems. This approach dramatically reduces development time while giving developers the flexibility and control they need.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-blue-500/20">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">Vision for the Future</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We envision a future where developers can focus on building great products instead of wrestling with boilerplate code and complex architectures. Our goal is to make sophisticated full-stack development accessible to more developers, enabling them to build and deploy complex applications in a fraction of the time it takes today. By automating the repetitive aspects of development while maintaining flexibility and control, we're working to transform how applications are built.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 