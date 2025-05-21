// frontend/src/pages/Home.js

import React from 'react';

const Home = () => {
  return (
    <div className="h-screen w-full bg-slate-900 snap-y snap-mandatory overflow-y-scroll overflow-x-hidden">
      <section className="w-full min-h-screen flex items-center justify-center snap-start snap-always relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              ENTICAI
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8">
              A Pre-seed AI Startup in Stealthy Mode
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 