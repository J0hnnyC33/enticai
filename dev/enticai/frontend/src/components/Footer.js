import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info Section */}
          <div className="flex justify-center">
            <div className="space-y-4 max-w-sm">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">ENTICAI</h3>
              <p className="text-gray-300 leading-relaxed">
                Building the future of artificial intelligence. We're a pre-seed AI lab focused on developing cutting-edge AI solutions, currently in team-building phase.
              </p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="flex justify-center">
            <div className="space-y-4 max-w-sm">
              <h3 className="text-xl font-semibold text-blue-400">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link></li>
                <li><Link to="/roadmap" className="hover:text-blue-400 transition duration-300">Roadmap</Link></li>
                <li><Link to="/about" className="hover:text-blue-400 transition duration-300">About</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition duration-300">Contact</Link></li>
                <li><Link to="/hiring" className="hover:text-blue-400 transition duration-300">Hiring</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-blue-400 transition duration-300">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Connect Section */}
          <div className="flex justify-center">
            <div className="space-y-4 max-w-sm">
              <h3 className="text-xl font-semibold text-blue-400">Connect With Us</h3>
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  <a href="https://linkedin.com/company/enticai" target="_blank" rel="noopener noreferrer" 
                     className="bg-slate-800 hover:bg-blue-600 transition duration-300 p-2 rounded-full">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="https://x.com/enticai" target="_blank" rel="noopener noreferrer" 
                     className="bg-slate-800 hover:bg-blue-400 transition duration-300 p-2 rounded-full">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
                <p className="text-gray-300">
                  We're building our team! Interested in joining or investing? <Link to="/contact" className="text-blue-400 hover:text-blue-300">Contact us</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-300">
              Join us in shaping the future of AI. <Link to="/contact" className="text-blue-400 hover:text-blue-300 transition duration-300">Get in touch</Link>
            </p>
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} ENTICAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 