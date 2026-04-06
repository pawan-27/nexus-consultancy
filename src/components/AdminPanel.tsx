import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Eye, EyeOff, Database, Users, FileText, X, ShieldCheck, Settings, Trash2, ExternalLink, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { useApp, Inquiry } from '../context/AppContext';

export const AdminPanel = () => {
  const { inquiries, budgetTiers, updateBudgetTier, updateInquiryStatus } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState<'stats' | 'inquiries' | 'settings'>('stats');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === 'nexus2026') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid Access Key');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-500';
      case 'reviewed': return 'text-blue-500';
      case 'contacted': return 'text-green-500';
      default: return 'text-platinum/40';
    }
  };

  return (
    <>
      <div 
        className="fixed bottom-0 right-0 w-4 h-4 z-[9999] cursor-default opacity-0 hover:opacity-10 transition-opacity bg-gold"
        onClick={() => setIsOpen(true)}
        title="Admin Access"
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 bg-onyx/95 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-4xl glass rounded-3xl overflow-hidden relative flex flex-col max-h-[90vh]"
            >
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsLoggedIn(false);
                  setPassword('');
                  setActiveView('stats');
                }}
                className="absolute top-6 right-6 z-20 text-platinum/40 hover:text-gold transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {!isLoggedIn ? (
                <div className="p-12 text-center max-w-md mx-auto w-full">
                  <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gold">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-serif mb-2">Nexus Command</h2>
                  <p className="text-platinum/40 text-sm mb-8 uppercase tracking-widest font-bold">Restricted Access Only</p>
                  
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Access Key"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-gold outline-none transition-all text-center tracking-widest"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-platinum/40 hover:text-platinum transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{error}</p>}
                    <button 
                      type="submit"
                      className="w-full py-4 bg-gold text-onyx font-bold uppercase tracking-widest text-sm gold-glow"
                    >
                      Authenticate
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row h-full">
                  {/* Sidebar */}
                  <div className="w-full md:w-64 border-r border-white/5 p-8 flex flex-col gap-2">
                    <div className="flex items-center gap-3 mb-10">
                      <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-onyx">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <span className="font-serif font-bold tracking-tight">COMMAND</span>
                    </div>
                    
                    <button 
                      onClick={() => setActiveView('stats')}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-all ${activeView === 'stats' ? 'bg-gold text-onyx font-bold' : 'text-platinum/40 hover:bg-white/5'}`}
                    >
                      <Database className="w-5 h-5" /> Stats
                    </button>
                    <button 
                      onClick={() => setActiveView('inquiries')}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-all ${activeView === 'inquiries' ? 'bg-gold text-onyx font-bold' : 'text-platinum/40 hover:bg-white/5'}`}
                    >
                      <Users className="w-5 h-5" /> Inquiries
                    </button>
                    <button 
                      onClick={() => setActiveView('settings')}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-all ${activeView === 'settings' ? 'bg-gold text-onyx font-bold' : 'text-platinum/40 hover:bg-white/5'}`}
                    >
                      <Settings className="w-5 h-5" /> Settings
                    </button>
                    
                    <div className="mt-auto pt-8">
                      <button 
                        onClick={() => setIsLoggedIn(false)}
                        className="w-full py-4 text-platinum/40 hover:text-red-500 transition-all text-xs uppercase tracking-widest font-bold border-t border-white/5"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow p-8 md:p-12 overflow-y-auto">
                    {activeView === 'stats' && (
                      <div className="space-y-10">
                        <h2 className="text-4xl font-serif">System Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="glass p-8 rounded-3xl">
                            <Users className="text-gold w-8 h-8 mb-4" />
                            <span className="text-[10px] uppercase tracking-widest text-platinum/40 block mb-1">Total Inquiries</span>
                            <p className="text-5xl font-serif">{inquiries.length}</p>
                          </div>
                          <div className="glass p-8 rounded-3xl">
                            <FileText className="text-gold w-8 h-8 mb-4" />
                            <span className="text-[10px] uppercase tracking-widest text-platinum/40 block mb-1">Active Blueprints</span>
                            <p className="text-5xl font-serif">{inquiries.filter(i => i.status === 'reviewed').length}</p>
                          </div>
                          <div className="glass p-8 rounded-3xl">
                            <Clock className="text-gold w-8 h-8 mb-4" />
                            <span className="text-[10px] uppercase tracking-widest text-platinum/40 block mb-1">Pending Review</span>
                            <p className="text-5xl font-serif">{inquiries.filter(i => i.status === 'pending').length}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeView === 'inquiries' && (
                      <div className="space-y-8">
                        <h2 className="text-4xl font-serif">Client Inquiries</h2>
                        <div className="space-y-4">
                          {inquiries.length === 0 ? (
                            <div className="text-center py-20 glass rounded-3xl">
                              <p className="text-platinum/40 italic">No inquiries received yet.</p>
                            </div>
                          ) : (
                            inquiries.map((inquiry) => (
                              <div 
                                key={inquiry.id} 
                                className="glass p-6 rounded-2xl flex items-center justify-between hover:border-gold/30 transition-all cursor-pointer group"
                                onClick={() => setSelectedInquiry(inquiry)}
                              >
                                <div className="flex items-center gap-6">
                                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gold">
                                    <FileText className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-platinum">{inquiry.service}</h4>
                                    <span className="text-[10px] text-platinum/40 uppercase tracking-widest">{new Date(inquiry.timestamp).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-8">
                                  <span className={`text-[10px] uppercase tracking-widest font-bold ${getStatusColor(inquiry.status)}`}>
                                    {inquiry.status}
                                  </span>
                                  <ArrowRight className="w-5 h-5 text-platinum/20 group-hover:text-gold transition-colors" />
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {activeView === 'settings' && (
                      <div className="space-y-10">
                        <h2 className="text-4xl font-serif">System Settings</h2>
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-xs uppercase tracking-widest font-bold text-gold mb-6">Budget Tiers Configuration</h3>
                            <div className="grid grid-cols-1 gap-6">
                              {budgetTiers.map((tier) => (
                                <div key={tier.id} className="glass p-8 rounded-3xl space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                      <label className="text-[10px] uppercase tracking-widest text-platinum/40 font-bold">Label</label>
                                      <input 
                                        type="text" 
                                        value={tier.label}
                                        onChange={(e) => updateBudgetTier(tier.id, e.target.value, tier.desc)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-all"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-[10px] uppercase tracking-widest text-platinum/40 font-bold">Description</label>
                                      <input 
                                        type="text" 
                                        value={tier.desc}
                                        onChange={(e) => updateBudgetTier(tier.id, tier.label, e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-all"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Inquiry Detail Modal */}
            <AnimatePresence>
              {selectedInquiry && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-[10001] flex items-center justify-center p-8"
                >
                  <div className="absolute inset-0 bg-onyx/80 backdrop-blur-sm" onClick={() => setSelectedInquiry(null)} />
                  <div className="relative w-full max-w-2xl glass rounded-[2rem] p-12 overflow-hidden">
                    <button 
                      onClick={() => setSelectedInquiry(null)}
                      className="absolute top-8 right-8 text-platinum/40 hover:text-gold transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-6 mb-10">
                      <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center text-onyx">
                        <FileText className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-serif">Inquiry Details</h3>
                        <p className="text-[10px] text-gold uppercase tracking-widest font-bold">ID: {selectedInquiry.id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-10">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-platinum/40 block mb-1">Service</span>
                        <p className="text-xl font-bold">{selectedInquiry.service}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-platinum/40 block mb-1">Budget</span>
                        <p className="text-xl font-bold">{selectedInquiry.budget}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-platinum/40 block mb-1">Timeline</span>
                        <p className="text-xl font-bold">{selectedInquiry.timeline}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-platinum/40 block mb-1">Date</span>
                        <p className="text-xl font-bold">{new Date(selectedInquiry.timestamp).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs uppercase tracking-widest font-bold text-platinum/40">Update Status</h4>
                      <div className="flex gap-4">
                        {['pending', 'reviewed', 'contacted'].map((status) => (
                          <button
                            key={status}
                            onClick={() => {
                              updateInquiryStatus(selectedInquiry.id, status as any);
                              setSelectedInquiry(prev => prev ? { ...prev, status: status as any } : null);
                            }}
                            className={`flex-grow py-3 rounded-xl border text-[10px] uppercase tracking-widest font-bold transition-all ${
                              selectedInquiry.status === status 
                              ? 'bg-gold border-gold text-onyx' 
                              : 'border-white/10 text-platinum/40 hover:border-white/30'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 flex justify-end">
                      <button 
                        onClick={() => setSelectedInquiry(null)}
                        className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-xl text-xs uppercase tracking-widest font-bold transition-all"
                      >
                        Close View
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
