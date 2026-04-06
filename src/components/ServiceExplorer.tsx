import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Layout, Search, Cpu, CheckCircle2, ArrowRight, X, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface ServiceDetail {
  id: string;
  icon: ReactNode;
  title: string;
  tagline: string;
  description: string;
  valueProp: string[];
  process: { step: string; desc: string }[];
}

const services: ServiceDetail[] = [
  {
    id: 'web-apps',
    icon: <Globe className="w-6 h-6" />,
    title: "Web Ecosystems",
    tagline: "High-performance architectures for the modern web.",
    description: "We engineer robust, scalable, and secure web applications that serve as the backbone of your digital operations. Our approach prioritizes speed, security, and seamless user experiences.",
    valueProp: [
      "99.9% Uptime Architectures",
      "Next-Gen Tech Stack (React, Node, Cloud Native)",
      "Military-Grade Security Protocols",
      "Seamless API Integrations"
    ],
    process: [
      { step: "Discovery", desc: "Deep dive into your business logic and user requirements." },
      { step: "Architecture", desc: "Designing scalable system blueprints and data models." },
      { step: "Development", desc: "Agile sprints with continuous integration and testing." },
      { step: "Deployment", desc: "Cloud-optimized launch with 24/7 monitoring." }
    ]
  },
  {
    id: 'portfolios',
    icon: <Layout className="w-6 h-6" />,
    title: "Digital Portfolios",
    tagline: "Immersive storytelling for high-end brands.",
    description: "A portfolio is more than a gallery; it's a digital experience. We craft bespoke, visually stunning platforms that capture the essence of your brand and convert visitors into clients.",
    valueProp: [
      "Award-Winning Visual Design",
      "Immersive 3D & Motion Graphics",
      "Mobile-First Responsive Precision",
      "Conversion-Optimized UX"
    ],
    process: [
      { step: "Concept", desc: "Defining the visual narrative and brand identity." },
      { step: "Design", desc: "High-fidelity prototyping with interactive motion." },
      { step: "Build", desc: "Pixel-perfect implementation with smooth transitions." },
      { step: "Refine", desc: "Performance tuning and cross-device optimization." }
    ]
  },
  {
    id: 'seo',
    icon: <Search className="w-6 h-6" />,
    title: "SEO Optimization",
    tagline: "Visibility that translates to authority.",
    description: "We don't just chase rankings; we build authority. Our SEO strategies are data-driven and focused on high-intent traffic that drives actual business growth.",
    valueProp: [
      "Technical SEO Audits",
      "Content Authority Strategy",
      "High-Quality Backlink Profiles",
      "Real-Time Analytics & Reporting"
    ],
    process: [
      { step: "Audit", desc: "Comprehensive analysis of existing digital footprint." },
      { step: "Strategy", desc: "Keyword mapping and competitive landscape analysis." },
      { step: "Execution", desc: "On-page and technical optimizations." },
      { step: "Growth", desc: "Continuous monitoring and iterative improvements." }
    ]
  },
  {
    id: 'enterprise',
    icon: <Cpu className="w-6 h-6" />,
    title: "Enterprise Solutions",
    tagline: "Custom software for complex operations.",
    description: "Tailored software solutions designed to solve specific enterprise challenges. From ERP integrations to custom CRM systems, we build tools that empower your team.",
    valueProp: [
      "Custom Workflow Automation",
      "Legacy System Integration",
      "Scalable Microservices",
      "Data-Driven Decision Tools"
    ],
    process: [
      { step: "Analysis", desc: "Identifying bottlenecks in current operations." },
      { step: "Solutioning", desc: "Designing custom tools to bridge operational gaps." },
      { step: "Integration", desc: "Seamlessly connecting with existing infrastructure." },
      { step: "Training", desc: "Empowering your team with comprehensive onboarding." }
    ]
  }
];

export const ServiceExplorer = () => {
  const [activeTab, setActiveTab] = useState(services[0].id);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const activeService = services.find(s => s.id === activeTab)!;

  return (
    <section className="py-32 bg-onyx relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Interactive Explorer</span>
          <h2 className="text-5xl md:text-7xl font-serif">Our Digital <span className="italic text-gradient">Craft</span></h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`group relative p-8 text-left transition-all duration-500 border-l-2 ${
                  activeTab === service.id 
                  ? 'border-gold bg-white/5' 
                  : 'border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
                }`}
              >
                <div className={`flex items-center gap-4 mb-2 ${activeTab === service.id ? 'text-gold' : 'text-platinum/40 group-hover:text-platinum/60'}`}>
                  {service.icon}
                  <span className="text-xs uppercase tracking-widest font-bold">Service {services.indexOf(service) + 1}</span>
                </div>
                <h3 className={`text-2xl font-serif transition-colors ${activeTab === service.id ? 'text-platinum' : 'text-platinum/40 group-hover:text-platinum/60'}`}>
                  {service.title}
                </h3>
                {activeTab === service.id && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-gold"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:w-2/3 min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="glass p-12 rounded-2xl h-full flex flex-col"
              >
                <div className="mb-12">
                  <h3 className="text-4xl md:text-5xl font-serif mb-4">{activeService.title}</h3>
                  <p className="text-gold italic font-serif text-xl mb-6">{activeService.tagline}</p>
                  <p className="text-platinum/60 text-lg font-light leading-relaxed max-w-2xl">
                    {activeService.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                  {/* Value Proposition Preview */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-platinum/40 mb-6">Key Advantages</h4>
                    <ul className="space-y-4">
                      {activeService.valueProp.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                          <span className="text-platinum/80 font-light">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Process Roadmap Preview */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-platinum/40 mb-6">The Roadmap</h4>
                    <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                      {activeService.process.slice(0, 2).map((p, i) => (
                        <div key={i} className="relative pl-10">
                          <div className="absolute left-0 top-1 w-6 h-6 rounded-full glass border-gold/30 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-gold">{i + 1}</span>
                          </div>
                          <h5 className="text-sm font-bold uppercase tracking-wider mb-1">{p.step}</h5>
                          <p className="text-xs text-platinum/40 font-light leading-relaxed">{p.desc}</p>
                        </div>
                      ))}
                      <div className="pl-10 text-platinum/20 text-[10px] uppercase tracking-widest font-bold">
                        + {activeService.process.length - 2} more phases
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedService(activeService)}
                    className="flex items-center gap-3 px-8 py-4 bg-gold text-onyx font-bold uppercase tracking-widest text-xs gold-glow hover:scale-105 transition-transform"
                  >
                    View Detailed Blueprint <Sparkles className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 text-platinum/40 hover:text-gold transition-colors group"
                  >
                    <span className="text-xs uppercase tracking-widest font-bold">Inquire</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Detailed Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 bg-onyx/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-5xl glass rounded-[2.5rem] overflow-hidden relative flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 z-20 p-3 glass rounded-full text-platinum/40 hover:text-gold transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col lg:flex-row h-full">
                {/* Modal Sidebar - Visual Identity */}
                <div className="lg:w-1/3 p-12 bg-gold/5 border-r border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-8">
                      {selectedService.icon}
                    </div>
                    <h3 className="text-4xl font-serif mb-4">{selectedService.title}</h3>
                    <p className="text-gold italic font-serif text-xl mb-8">{selectedService.tagline}</p>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-platinum/60">
                        <ShieldCheck className="w-5 h-5 text-gold/60" />
                        <span className="text-xs uppercase tracking-widest font-bold">Enterprise Ready</span>
                      </div>
                      <div className="flex items-center gap-3 text-platinum/60">
                        <Zap className="w-5 h-5 text-gold/60" />
                        <span className="text-xs uppercase tracking-widest font-bold">High Performance</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12">
                    <button 
                      onClick={() => {
                        setSelectedService(null);
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-5 bg-gold text-onyx font-bold uppercase tracking-widest text-sm gold-glow"
                    >
                      Start Project
                    </button>
                  </div>
                </div>

                {/* Modal Content - Deep Dive */}
                <div className="lg:w-2/3 p-12 overflow-y-auto custom-scrollbar">
                  <div className="mb-16">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-platinum/40 mb-6">Executive Summary</h4>
                    <p className="text-platinum/80 text-xl font-light leading-relaxed">
                      {selectedService.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Full Value Proposition */}
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold text-platinum/40 mb-8">Value Proposition</h4>
                      <div className="space-y-6">
                        {selectedService.valueProp.map((item, i) => (
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={i} 
                            className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                          >
                            <CheckCircle2 className="w-6 h-6 text-gold shrink-0 mt-0.5" />
                            <span className="text-platinum font-light leading-relaxed">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Full Process Roadmap */}
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold text-platinum/40 mb-8">The Process</h4>
                      <div className="relative space-y-10 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                        {selectedService.process.map((p, i) => (
                          <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={i} 
                            className="relative pl-12"
                          >
                            <div className="absolute left-0 top-0 w-8 h-8 rounded-full glass border-gold/30 flex items-center justify-center z-10">
                              <span className="text-xs font-bold text-gold">{i + 1}</span>
                            </div>
                            <h5 className="text-lg font-serif mb-2">{p.step}</h5>
                            <p className="text-sm text-platinum/40 font-light leading-relaxed">{p.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
