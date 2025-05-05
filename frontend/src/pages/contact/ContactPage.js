import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../components/animations/ScrollReveal';
import SectionTitle from '../../components/ui/SectionTitle';
import { FiMail, FiTwitter, FiLinkedin, FiGithub, FiMapPin } from 'react-icons/fi';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };
  
  const contactMethods = [
    {
      icon: <FiMail />,
      title: 'Email',
      value: 'contact@lucadeangelis.com',
      link: 'mailto:contact@lucadeangelis.com',
    },
    {
      icon: <FiTwitter />,
      title: 'Twitter',
      value: '@lucadeangelis',
      link: 'https://twitter.com/lucadeangelis',
    },
    {
      icon: <FiLinkedin />,
      title: 'LinkedIn',
      value: 'Luca De Angelis',
      link: 'https://linkedin.com/in/lucadeangelis',
    },
    {
      icon: <FiGithub />,
      title: 'GitHub',
      value: 'lucadeangelis',
      link: 'https://github.com/lucadeangelis',
    }
  ];
  
  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <section className="pt-36 pb-20 bg-dark-900 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-accent blur-[150px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary blur-[150px]"></div>
        </div>
        
        <div className="container-section relative z-10">
          <SectionTitle
            title="Get in Touch"
            subtitle="Contact"
            showGlitch={true}
          />
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-light-200 text-body-lg">
              Have a question, project idea, or just want to say hello? I'd love to hear from you. Fill out the form below or reach out through any of the contact methods.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Info */}
      <section className="py-20 bg-dark-950 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <ScrollReveal direction="left">
                <div className="glass p-8 rounded-lg border border-light-300/10">
                  <h3 className="text-heading text-light-100 mb-6">Send a Message</h3>
                  
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-light-200 mb-2">
                            Name <span className="text-primary">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-light-200 mb-2">
                            Email <span className="text-primary">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="subject" className="block text-light-200 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="input"
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-light-200 mb-2">
                          Message <span className="text-primary">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="6"
                          className="input"
                          required
                        ></textarea>
                      </div>
                      
                      {error && (
                        <div className="mb-6 p-4 bg-primary/20 text-primary rounded-md">
                          {error}
                        </div>
                      )}
                      
                      <motion.button
                        type="submit"
                        className="btn btn-primary w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </motion.button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', duration: 0.5 }}
                      className="bg-neo/20 p-6 rounded-lg text-center py-12"
                    >
                      <svg
                        className="w-16 h-16 text-neo mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <h3 className="text-heading text-light-100 mb-2">Message Sent!</h3>
                      <p className="text-light-200">
                        Thank you for reaching out. I'll get back to you as soon as possible.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-6 btn btn-outline"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  )}
                </div>
              </ScrollReveal>
              
              {/* Contact Info */}
              <ScrollReveal direction="right">
                <div className="space-y-8">
                  <div className="glass p-8 rounded-lg border border-light-300/10 mb-8">
                    <h3 className="text-heading text-light-100 mb-6">Contact Information</h3>
                    <div className="space-y-6">
                      {contactMethods.map((method, index) => (
                        <a
                          key={index}
                          href={method.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-4 group"
                        >
                          <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-neo group-hover:bg-neo group-hover:text-dark-900 transition-colors duration-300">
                            {method.icon}
                          </div>
                          <div>
                            <h4 className="text-light-100 font-medium">{method.title}</h4>
                            <p className="text-light-300 group-hover:text-neo transition-colors duration-300">
                              {method.value}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="glass p-8 rounded-lg border border-light-300/10">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-primary">
                        <FiMapPin />
                      </div>
                      <div>
                        <h4 className="text-light-100 font-medium">Location</h4>
                        <p className="text-light-300">
                          Based in Milan, Italy
                          <br />
                          Available for remote work and collaborations worldwide
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass p-8 rounded-lg border border-light-300/10">
                    <h3 className="text-subheading text-light-100 mb-4">Office Hours</h3>
                    <ul className="space-y-2 text-light-300">
                      <li className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span className="text-light-100">9AM - 6PM CET</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Saturday:</span>
                        <span className="text-light-100">By appointment</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sunday:</span>
                        <span className="text-light-100">Closed</span>
                      </li>
                    </ul>
                    <p className="mt-4 text-light-300">
                      Response time: Usually within 24-48 business hours
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-dark-900">
        <div className="container-section">
          <h2 className="text-title text-center text-light-100 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="space-y-6">
                <div className="glass p-6 rounded-lg border border-light-300/10">
                  <h3 className="text-subheading text-light-100 mb-2">What services do you offer?</h3>
                  <p className="text-light-300">
                    I offer consulting services related to generative AI implementation, custom AI solution development, technical writing, speaking engagements, and educational workshops on AI topics.
                  </p>
                </div>
                
                <div className="glass p-6 rounded-lg border border-light-300/10">
                  <h3 className="text-subheading text-light-100 mb-2">Are you available for speaking engagements?</h3>
                  <p className="text-light-300">
                    Yes, I regularly speak at conferences, workshops, and private events on topics related to generative AI, ethical considerations in AI development, and the future of human-AI collaboration.
                  </p>
                </div>
                
                <div className="glass p-6 rounded-lg border border-light-300/10">
                  <h3 className="text-subheading text-light-100 mb-2">Do you provide training for teams or organizations?</h3>
                  <p className="text-light-300">
                    Absolutely. I offer customized training programs for teams looking to incorporate generative AI into their workflows, covering everything from basic concepts to advanced implementation strategies.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;