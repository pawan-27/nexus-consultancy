import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BudgetTier {
  id: string;
  label: string;
  desc: string;
}

export interface ServiceOption {
  id: string;
  label: string;
  desc: string;
  icon?: string;
}

export interface Inquiry {
  id: string;
  timestamp: string;
  service: string;
  budget: string;
  timeline: string;
  status: 'pending' | 'reviewed' | 'contacted';
}

interface AppState {
  budgetTiers: BudgetTier[];
  services: ServiceOption[];
  inquiries: Inquiry[];
  updateBudgetTier: (id: string, label: string, desc: string) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'timestamp' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [budgetTiers, setBudgetTiers] = useState<BudgetTier[]>([
    { id: 'tier-1', label: '$10k - $25k', desc: 'Startup / MVP focus' },
    { id: 'tier-2', label: '$25k - $75k', desc: 'Growth / Scaling focus' },
    { id: 'tier-3', label: '$75k - $150k', desc: 'Enterprise / Complex focus' },
    { id: 'tier-4', label: 'Custom / $150k+', desc: 'Bespoke high-end systems' },
  ]);

  const [services] = useState<ServiceOption[]>([
    { id: 'web-app', label: 'Web Application', desc: 'Complex systems & SaaS' },
    { id: 'portfolio', label: 'Digital Portfolio', desc: 'Brand storytelling' },
    { id: 'seo', label: 'SEO & Growth', desc: 'Visibility & authority' },
    { id: 'enterprise', label: 'Enterprise Tool', desc: 'Internal operations' },
  ]);

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Load from localStorage for "functional" feel
  useEffect(() => {
    const savedInquiries = localStorage.getItem('nexus_inquiries');
    const savedBudgets = localStorage.getItem('nexus_budgets');
    if (savedInquiries) setInquiries(JSON.parse(savedInquiries));
    if (savedBudgets) setBudgetTiers(JSON.parse(savedBudgets));
  }, []);

  useEffect(() => {
    localStorage.setItem('nexus_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('nexus_budgets', JSON.stringify(budgetTiers));
  }, [budgetTiers]);

  const updateBudgetTier = (id: string, label: string, desc: string) => {
    setBudgetTiers(prev => prev.map(t => t.id === id ? { ...t, label, desc } : t));
  };

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'timestamp' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  return (
    <AppContext.Provider value={{ budgetTiers, services, inquiries, updateBudgetTier, addInquiry, updateInquiryStatus }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
