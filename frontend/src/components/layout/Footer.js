import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTwitter, FiGithub, FiLinkedin, FiMail, FiRss } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FiTwitter />, url: 'https://twitter.com/lucadeangelis', label: 'Twitter' },
    { icon: <FiGithub />, url: 'https://github.com/lucadeangelis', label: 'GitHub' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com/in/lucadeangelis', label: 'LinkedIn' },
    { icon: <FiMail />, url: 'mailto:contact@lucadeangelis.com', label: 'Email' },
    { icon: <FiRss />, url: '/rss.xml', label: 'RSS Feed' },
  ];

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Use Cases', path: '/usecases' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy', path: '/privacy' },
    { name: 'Terms', path: '/terms' },
  ];

  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      <div className="container-section">
        {/* Footer Top Section with CTA */}
        <div className="glass rounded-xl p-8 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-neo/20 opacity-30" />
          
          <div className="relative z-10 text-center">
            <motion.h2 
              className="text-title mb-4 text-gradient"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Let's Connect
            </motion.h2>
            <motion.p 
              className="text-light-200 text-body-lg max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Interested in collaborating on GenAI projects or discussing the future of artificial intelligence?
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link to="/contact" className="btn btn-neo">
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Footer Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-xl font-mono tracking-wider font-bold inline-block mb-4">
              <span className="text-neo">Luca</span>
              <span className="text-accent">.</span>
              <span className="text-primary">De</span>
              <span className="text-light">Angelis</span>
            </Link>
            <p className="text-light-300 mb-6">
              Exploring the intersection of artificial intelligence, creativity, and human experience. Sharing insights, experiments, and practical applications in the GenAI space.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-300 hover:text-neo transition-colors duration-300"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-subheading font-mono text-light-100 mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.slice(0, 5).map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-light-300 hover:text-neo transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-subheading font-mono text-light-100 mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.slice(5).map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-light-300 hover:text-neo transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h3 className="text-subheading font-mono text-light-100 mb-4">Newsletter</h3>
              <p className="text-light-300 mb-3">Get the latest updates</p>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const email = e.target.email.value;
                if (!email) return;
                
                try {
                  // Import the API service only when needed
                  const apiService = (await import('../../services/api')).default;
                  await apiService.subscribeToNewsletter(email);
                  alert('Successfully subscribed to newsletter!');
                  e.target.email.value = '';
                } catch (err) {
                  console.error('Error subscribing:', err);
                  alert('Failed to subscribe. Please try again later.');
                }
              }}>
                <div className="flex">
                  <input 
                    name="email"
                    type="email" 
                    placeholder="your@email.com" 
                    className="input rounded-r-none"
                    required
                  />
                  <button type="submit" className="btn btn-primary rounded-l-none">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-dark-700 text-center text-light-400 text-sm">
          <p>
            © {currentYear} Luca De Angelis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;