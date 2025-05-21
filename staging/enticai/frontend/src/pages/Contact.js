// frontend/src/pages/Contact.js

import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ status: 'idle', message: '' });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setSubmitStatus({ status: 'loading', message: '' });
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
          setSubmitStatus({ status: 'success', message: 'Message sent successfully!' });
        } else {
          const data = await response.json();
          setSubmitStatus({ status: 'error', message: data.message || 'Failed to send message' });
        }
      } catch (error) {
        setSubmitStatus({ status: 'error', message: 'Failed to send message. Please try again.' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300">
            Get in touch with us to learn more
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-xl p-6 border border-blue-500/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-slate-700 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white ${
                    errors.name ? 'border-red-500' : 'border-gray-600'
                  }`}
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-slate-700 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  }`}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-slate-700 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white ${
                    errors.phone ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-slate-700 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white ${
                    errors.subject ? 'border-red-500' : 'border-gray-600'
                  }`}
                  required
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-slate-700 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white min-h-[150px] ${
                    errors.message ? 'border-red-500' : 'border-gray-600'
                  }`}
                  required
                  placeholder="Tell us about your inquiry..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              {submitStatus.status === 'error' && (
                <div className="p-3 bg-red-900/50 text-red-400 rounded-md border border-red-500/50">
                  {submitStatus.message}
                </div>
              )}
              {submitStatus.status === 'success' && (
                <div className="p-3 bg-green-900/50 text-green-400 rounded-md border border-green-500/50">
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={submitStatus.status === 'loading'}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitStatus.status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 