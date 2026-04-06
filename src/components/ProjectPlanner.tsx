import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, ArrowLeft, Send, Sparkles, Code, Layout, Search, Cpu, FileText, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

const steps = [
  {
    id: 'service',
    title: 'What are we building?',
    subtitle: 'Select the primary focus of your project.',
    options: [
      { id: 'web-app', label: 'Web Application', icon: <Code className="w-6 h-6" />, desc: 'Complex systems & SaaS' },
      { id: 'portfolio', label: 'Digital Portfolio', icon: <Layout className="w-6 h-6" />, desc: 'Brand storytelling' },
      { id: 'seo', label: 'SEO & Growth', icon: <Search className="w-6 h-6" />, desc: 'Visibility & authority' },
      { id: 'enterprise', label: 'Enterprise Tool', icon: <Cpu className="w-6 h-6" />, desc: 'Internal operations' },
    ]
  },
  {
    id: 'budget',
    title: 'Investment Range',
    subtitle: 'This helps us tailor the solution to your scale.',
    options: [] 
  },
  {
    id: 'timeline',
    title: 'Launch Timeline',
    subtitle: 'When do you need to go live?',
    options: [
      { id: 'fast', label: '1-2 Months', desc: 'Rapid deployment' },
      { id: 'standard', label: '3-5 Months', desc: 'Standard development' },
      { id: 'long', label: '6+ Months', desc: 'Long-term partnership' },
    ]
  }
];

export const ProjectPlanner = () => {
  const { budgetTiers, addInquiry } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentSteps = [...steps];
  currentSteps[1].options = budgetTiers;

  const handleSelect = (stepId: string, optionId: string) => {
    setSelections(prev => ({ ...prev, [stepId]: optionId }));
    if (currentStep < currentSteps.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    }
  };

  const handleSubmit = () => {
    addInquiry({
      service: selections['service'],
      budget: selections['budget'],
      timeline: selections['timeline']
    });
    setIsSubmitted(true);
  };

  const progress = ((currentStep + 1) / currentSteps.length) * 100;

  const getSelectedLabel = (stepId: string, optionId: string) => {
    const step = currentSteps.find(s => s.id === stepId);
    return step?.options.find(o => o.id === optionId)?.label || optionId;
  };

  return (
    <section className="py-32 bg-onyx border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Interactive Planner</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Plan Your <span className="italic text-gradient">Vision</span></h2>
          <p className="text-platinum/40 font-light">Answer a few questions to get a tailored project blueprint.</p>
        </div>

        <div className="glass rounded-[2rem] p-8 md:p-12 min-h-[500px] flex flex-col">
          {!isSubmitted ? (
            <>
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/5 rounded-full mb-12 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex-grow"
                >
                  <div className="mb-10">
                    <h3 className="text-3xl font-serif mb-2">{currentSteps[currentStep].title}</h3>
                    <p className="text-platinum/40 font-light">{currentSteps[currentStep].subtitle}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSteps[currentStep].options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleSelect(currentSteps[currentStep].id, option.id)}
                        className={`p-6 rounded-2xl text-left transition-all duration-300 border ${
                          selections[currentSteps[currentStep].id] === option.id
                          ? 'border-gold bg-gold/10'
                          : 'border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center gap-4 mb-3">
                          {'icon' in option && <div className="text-gold">{option.icon}</div>}
                          <span className="font-bold text-platinum tracking-wide">{option.label}</span>
                        </div>
                        <p className="text-xs text-platinum/40 font-light leading-relaxed">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 text-xs uppercase tracking-widest font-bold transition-opacity ${currentStep === 0 ? 'opacity-0' : 'opacity-40 hover:opacity-100'}`}
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                {currentStep === currentSteps.length - 1 && selections[currentSteps[currentStep].id] ? (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="px-8 py-4 bg-gold text-onyx font-bold uppercase tracking-widest text-xs gold-glow flex items-center gap-2"
                  >
                    Generate Blueprint <Sparkles className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <span className="text-[10px] uppercase tracking-widest text-platinum/20 font-bold">
                    Step {currentStep + 1} of {currentSteps.length}
                  </span>
                )}
              </div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-grow flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif">Project Blueprint</h3>
                    <p className="text-[10px] text-gold uppercase tracking-widest font-bold">Generated Successfully</p>
                  </div>
                </div>
                <button className="p-3 glass rounded-full text-platinum/40 hover:text-gold transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="glass p-6 rounded-2xl">
                  <span className="text-[10px] uppercase tracking-widest text-platinum/40 block mb-2">Service Type</span>
                  <p className="font-bold text-platinum">{getSelectedLabel('service', selections['service'])}</p>
                </div>
                <div className="glass p-6 rounded-2xl">
                  <span className="text-[10px] uppercase tracking-widest text-platinum/40 block mb-2">Budget Range</span>
                  <p className="font-bold text-platinum">{getSelectedLabel('budget', selections['budget'])}</p>
                </div>
                <div className="glass p-6 rounded-2xl">
                  <span className="text-[10px] uppercase tracking-widest text-platinum/40 block mb-2">Timeline</span>
                  <p className="font-bold text-platinum">{getSelectedLabel('timeline', selections['timeline'])}</p>
                </div>
              </div>

              <div className="glass p-8 rounded-2xl mb-10 border-l-4 border-gold">
                <h4 className="text-sm uppercase tracking-widest font-bold mb-4">Strategic Summary</h4>
                <p className="text-platinum/60 font-light leading-relaxed mb-6">
                  Based on your selection for a <span className="text-platinum font-medium">{getSelectedLabel('service', selections['service'])}</span> with a 
                  budget of <span className="text-platinum font-medium">{getSelectedLabel('budget', selections['budget'])}</span>, we recommend a 
                  <span className="text-platinum font-medium"> {selections['timeline'] === 'fast' ? 'Rapid-Response' : 'Comprehensive'}</span> development cycle. 
                  Our team will prioritize core features to ensure a successful launch within your {getSelectedLabel('timeline', selections['timeline'])} window.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Architecture Design', 'UI/UX Prototyping', 'Core Development', 'QA Testing'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-widest text-platinum/40 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex-grow py-5 bg-gold text-onyx font-bold uppercase tracking-widest text-sm gold-glow flex items-center justify-center gap-3"
                >
                  Finalize Details <Send className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(0);
                    setSelections({});
                  }}
                  className="px-8 py-5 border border-white/10 hover:border-gold transition-all uppercase tracking-widest text-sm font-bold"
                >
                  New Planner
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
