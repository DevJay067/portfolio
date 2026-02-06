import React, { useState, useEffect, useRef } from 'react';
import { Send, Mail, User, MessageSquare, Github, Linkedin } from 'lucide-react';
import { Parallax } from 'react-scroll-parallax';
import { profileData } from '../data/mock';
import { useSoundContext } from '../context/SoundContext';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const { playClick, playHover, playSuccess, playTap } = useSoundContext();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    playTap();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playClick();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      playSuccess();
      alert('Thank you for your message! I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Multi-layer parallax backgrounds */}
      <Parallax speed={-35} className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/10 rounded-full filter blur-3xl" />
      </Parallax>
      
      <Parallax speed={-25} translateX={[80, -80]} className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-56 h-56 bg-amber-500/8 rounded-full filter blur-2xl" />
      </Parallax>
      
      <Parallax speed={-15} translateX={[-50, 50]} className="absolute inset-0">
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-orange-400/10 rounded-full filter blur-xl" />
      </Parallax>

      {/* Floating decorative elements */}
      <Parallax speed={25} rotate={[0, 90]} className="absolute top-20 left-16">
        <div className="w-12 h-12 border-2 border-orange-500/25 rounded-lg" />
      </Parallax>
      <Parallax speed={-25} rotate={[90, 0]} className="absolute bottom-20 right-16">
        <div className="w-16 h-16 border-2 border-red-500/25 rounded-full" />
      </Parallax>
      <Parallax speed={20} translateY={[-25, 25]} className="absolute top-1/2 right-8">
        <div className="w-10 h-10 border border-amber-500/30 rounded-lg rotate-45" />
      </Parallax>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <Parallax speed={12} scale={[0.9, 1.05]}>
          <div
            className={`text-center mb-16 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-400">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mb-4" />
            <p className="text-gray-400 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>
        </Parallax>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <Parallax speed={-12} translateX={[-25, 0]}>
            <div
              className={`space-y-8 transform transition-all duration-700 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <Parallax speed={5} translateY={[10, -10]}>
                <div className="space-y-4">
                  <div className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors duration-300">
                        <Mail className="text-orange-400" size={24} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Email</h3>
                        <a href={`mailto:${profileData.email}`} className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                          {profileData.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Parallax>

              <Parallax speed={3} translateY={[8, -8]}>
                <div className="space-y-4 mt-8">
                  <h3 className="text-xl font-bold text-white">Connect With Me</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/DevJay067"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-orange-500/20 rounded-xl hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-110 flex-1"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Github className="text-orange-400 group-hover:text-orange-300" size={28} />
                        <span className="text-gray-400 text-sm group-hover:text-white transition-colors duration-300">Github</span>
                      </div>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/jay-magar-5ba92b369/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-orange-500/20 rounded-xl hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-110 flex-1"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Linkedin className="text-orange-400 group-hover:text-orange-300" size={28} />
                        <span className="text-gray-400 text-sm group-hover:text-white transition-colors duration-300">LinkedIn</span>
                      </div>
                    </a>
                  </div>
                </div>
              </Parallax>

              <Parallax speed={1} translateY={[5, -5]}>
                <div className="relative mt-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border border-orange-500/30 rounded-xl p-6">
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse" />
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    Quick Response
                  </h4>
                  <p className="text-gray-300 text-sm">
                    I typically respond to messages within 24 hours. Let's build something amazing together!
                  </p>
                </div>
              </Parallax>
            </div>
          </Parallax>

          {/* Contact form */}
          <Parallax speed={12} translateX={[25, 0]} rotate={[-1, 1]}>
            <div
              className={`transform transition-all duration-700 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-400 text-sm mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                        className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-400 text-sm mb-2">
                      Your Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-400 text-sm mb-2">
                      Subject
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Enter subject"
                        className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-400 text-sm mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Enter your message"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
