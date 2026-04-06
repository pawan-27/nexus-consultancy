import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Cpu, Layout, Briefcase, Mail, Quote, ExternalLink, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
            <Cpu className="text-onyx w-6 h-6" />
          </div>
          <span className="text-2xl font-serif font-bold tracking-tighter">NEXUS</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium"
            >
              {link.name}
            </motion.button>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#contact')}
            className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-onyx transition-all duration-300 text-sm uppercase tracking-widest font-bold"
          >
            Start Project
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-platinum" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full glass p-6 flex flex-col gap-6 md:hidden overflow-hidden"
          >
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollToSection(link.href)}
                className="text-lg font-serif text-left"
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-gold uppercase tracking-[0.4em] text-sm font-bold mb-6 block"
          >
            Bespoke Digital Excellence
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.9] mb-8 tracking-tighter"
          >
            Architecting <br />
            <span className="italic text-gradient">Future</span> Systems
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-platinum/60 font-light leading-relaxed mb-12"
          >
            Nexus is a premier IT consultancy crafting high-performance web ecosystems and 
            bespoke digital experiences for visionary brands worldwide.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-gold text-onyx font-bold uppercase tracking-widest text-sm gold-glow transition-all"
            >
              View Our Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="px-10 py-5 border border-white/20 hover:border-gold transition-all uppercase tracking-widest text-sm font-bold"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 cursor-pointer"
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="w-[1px] h-12 bg-platinum" />
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Ecosystems",
      desc: "High-performance, scalable web applications built with cutting-edge architectures."
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: "Digital Portfolios",
      desc: "Bespoke, immersive portfolios that capture the essence of high-end brands."
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Enterprise Solutions",
      desc: "Custom software tailored to streamline complex business processes and operations."
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Strategic Consulting",
      desc: "Expert guidance on digital transformation and technology stack optimization."
    }
  ];

  return (
    <section id="services" className="py-32 bg-onyx relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-serif mb-6">Our Expertise</h2>
            <p className="text-platinum/50 text-lg font-light">
              We combine technical precision with creative vision to deliver 
              digital products that define industries.
            </p>
          </div>
          <div className="text-right">
            <span className="text-8xl font-serif font-bold opacity-5 block leading-none">01</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.05)' }}
              className="bg-onyx p-12 transition-all group"
            >
              <div className="text-gold mb-8 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl font-serif mb-4">{service.title}</h3>
              <p className="text-platinum/40 font-light leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null);

  const projects = [
    {
      title: "Aetheria Real Estate",
      category: "Web Application",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
      description: "A high-end real estate platform featuring immersive 3D property tours and real-time market data integration.",
      challenge: "The client needed a way to showcase luxury properties to international buyers without physical visits.",
      solution: "We implemented a custom WebGL-based tour engine and a robust backend for high-resolution asset management.",
      results: ["45% increase in international inquiries", "Reduced sales cycle by 20 days", "Awarded 'Best Real Estate UI' 2025"]
    },
    {
      title: "Lumina Watch Co.",
      category: "E-Commerce",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000",
      description: "A luxury e-commerce experience for a heritage watchmaker, focusing on craftsmanship and detail.",
      challenge: "Translating the tactile feel of a luxury watch to a digital screen.",
      solution: "High-definition macro photography integration and a custom configurator for bespoke watch builds.",
      results: ["300% ROI in first 6 months", "Average order value increased by 15%", "Seamless integration with global logistics"]
    },
    {
      title: "Vanguard Logistics",
      category: "Enterprise Dashboard",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
      description: "A mission-critical dashboard for global logistics monitoring and predictive maintenance.",
      challenge: "Visualizing complex, real-time data streams for a fleet of 500+ vehicles.",
      solution: "A custom data visualization engine using D3.js and real-time WebSocket updates.",
      results: ["Reduced operational downtime by 25%", "Improved route efficiency by 12%", "Real-time tracking accuracy of 99.9%"]
    }
  ];

  return (
    <section id="portfolio" className="py-32 bg-onyx">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-serif mb-6">Selected Works</h2>
            <p className="text-platinum/50 text-lg font-light">
              A curated collection of digital experiences we've brought to life.
            </p>
          </div>
          <div className="text-right">
            <span className="text-8xl font-serif font-bold opacity-5 block leading-none">02</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-onyx/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="px-6 py-3 bg-white text-onyx font-bold uppercase tracking-widest text-xs">View Case Study</span>
                </div>
              </div>
              <span className="text-gold uppercase tracking-widest text-[10px] font-bold mb-2 block">
                {project.category}
              </span>
              <h3 className="text-3xl font-serif group-hover:text-gold transition-colors">{project.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <div className="absolute inset-0 bg-onyx/90 backdrop-blur-sm" onClick={() => setSelectedProject(null)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] glass rounded-3xl overflow-hidden flex flex-col md:flex-row"
            >
              <button 
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-platinum hover:text-gold transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <span className="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">{selectedProject.category}</span>
                <h3 className="text-4xl md:text-5xl font-serif mb-6">{selectedProject.title}</h3>
                <p className="text-platinum/60 text-lg font-light mb-8 leading-relaxed">{selectedProject.description}</p>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-platinum/40 mb-3">The Challenge</h4>
                    <p className="text-platinum/80 font-light">{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-platinum/40 mb-3">Our Solution</h4>
                    <p className="text-platinum/80 font-light">{selectedProject.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-platinum/40 mb-3">Key Results</h4>
                    <ul className="space-y-2">
                      {selectedProject.results.map((result, i) => (
                        <li key={i} className="flex items-center gap-3 text-platinum/80 font-light">
                          <CheckCircle2 className="w-4 h-4 text-gold" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <button className="flex items-center gap-2 text-gold hover:text-platinum transition-colors group uppercase tracking-widest text-xs font-bold">
                    Launch Project <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Nexus transformed our digital presence from a simple website to a high-performance ecosystem. Their attention to detail is unmatched.",
      author: "Sarah Jenkins",
      role: "CEO, Aetheria Group",
      logo: "https://picsum.photos/seed/company1/200/100"
    },
    {
      quote: "The team's ability to translate complex business needs into elegant software solutions is what sets them apart in the consultancy space.",
      author: "Michael Chen",
      role: "CTO, Vanguard Logistics",
      logo: "https://picsum.photos/seed/company2/200/100"
    },
    {
      quote: "Working with Nexus was a seamless experience. They didn't just build a portfolio; they built a brand identity that resonates.",
      author: "Elena Rossi",
      role: "Creative Director, Lumina",
      logo: "https://picsum.photos/seed/company3/200/100"
    }
  ];

  return (
    <section id="testimonials" className="py-32 bg-onyx relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Client Trust</span>
          <h2 className="text-5xl md:text-7xl font-serif">Voices of <span className="italic text-gradient">Success</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass p-10 rounded-3xl flex flex-col"
            >
              <Quote className="w-10 h-10 text-gold/20 mb-8" />
              <p className="text-xl font-light italic text-platinum/80 mb-8 leading-relaxed flex-grow">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-gold font-bold">
                  {t.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-platinum">{t.author}</h4>
                  <span className="text-xs text-platinum/40 uppercase tracking-widest">{t.role}</span>
                </div>
              </div>
              <div className="pt-6 border-t border-white/5 flex justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <img src={t.logo} alt="Company Logo" className="h-8 object-contain" referrerPolicy="no-referrer" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-32 bg-onyx">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative glass rounded-[3rem] p-12 md:p-24 overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold/10 via-transparent to-blue-500/10 -z-10" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-8xl font-serif mb-8 leading-tight">
              Ready to <span className="italic text-gradient">Elevate</span> <br /> Your Digital Future?
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-platinum/60 font-light mb-12">
              Join the ranks of visionary brands that have transformed their operations 
              with Nexus. Let's start a conversation today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-6 bg-gold text-onyx font-bold uppercase tracking-widest text-sm gold-glow"
              >
                Start Your Journey
              </motion.button>
              <div className="flex items-center gap-4 text-platinum/40">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-onyx bg-white/10 flex items-center justify-center text-[10px] font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-xs uppercase tracking-widest font-bold">Trusted by 50+ Global Brands</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-onyx border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-serif mb-8">Let's Build <br /> Something <span className="italic text-gold">Great</span></h2>
            <p className="text-platinum/50 text-xl font-light mb-12 leading-relaxed">
              Ready to elevate your digital presence? Reach out to our team of 
              experts for a confidential consultation.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-platinum/40 block mb-1">Email Us</span>
                  <a href="mailto:hello@nexus.digital" className="text-xl hover:text-gold transition-colors">hello@nexus.digital</a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-platinum/40 block mb-1">Global Office</span>
                  <p className="text-xl">London • New York • Dubai</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-12 rounded-2xl">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-platinum/60">Full Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/10 py-3 focus:border-gold outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-platinum/60">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b border-white/10 py-3 focus:border-gold outline-none transition-colors" placeholder="john@company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-platinum/60">Service Interest</label>
                <select className="w-full bg-transparent border-b border-white/10 py-3 focus:border-gold outline-none transition-colors appearance-none cursor-pointer">
                  <option className="bg-onyx">Web Application</option>
                  <option className="bg-onyx">Digital Portfolio</option>
                  <option className="bg-onyx">Enterprise Solution</option>
                  <option className="bg-onyx">Consulting</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-platinum/60">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-white/10 py-3 focus:border-gold outline-none transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-gold text-onyx font-bold uppercase tracking-widest text-sm gold-glow"
              >
                Send Inquiry
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-onyx border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
              <Cpu className="text-onyx w-5 h-5" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tighter">NEXUS</span>
          </div>
          
          <div className="flex gap-12">
            {['Twitter', 'LinkedIn', 'Instagram', 'Behance'].map(social => (
              <a key={social} href="#" className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium">
                {social}
              </a>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 text-[10px] uppercase tracking-[0.2em] text-platinum/30 font-bold">
          <span>© 2026 Nexus Digital Consultancy. All Rights Reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-platinum transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-platinum transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Navbar, Hero, Portfolio, Testimonials, CTASection, Contact, Footer };
