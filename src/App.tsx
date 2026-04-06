/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { Navbar, Hero, Portfolio, Testimonials, CTASection, Contact, Footer } from './components/NexusUI';
import { ServiceExplorer } from './components/ServiceExplorer';
import { ProjectPlanner } from './components/ProjectPlanner';
import { AdminPanel } from './components/AdminPanel';
import { AppProvider } from './context/AppContext';

export default function App() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const targetId = anchor.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <AppProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <ServiceExplorer />
          <Portfolio />
          <ProjectPlanner />
          <Testimonials />
          <CTASection />
          <Contact />
        </main>
        <Footer />
        <AdminPanel />
      </div>
    </AppProvider>
  );
}
