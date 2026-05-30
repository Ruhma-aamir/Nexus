import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronRight, CheckCircle2, X } from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  routeHint: string;
}

const GuidedTour: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps: TourStep[] = [
    {
      title: "🗓️ Venture Meeting Coordinator",
      description: "Schedule pitch slots, manage calendar availability windows, and view verified investor itineraries instantly.",
      routeHint: "Accessible via 'Meetings' tab."
    },
    {
      title: "🎥 Live WebRTC Video Room",
      description: "Launch direct, encrypted multi-track streams to pitch live to investor circles with built-in hardware controls.",
      routeHint: "Accessible via green button in Dashboard Calendar."
    },
    {
      title: "✍️ Secure Document Chamber",
      description: "Review structural funding term sheets and apply hand-drawn digital signatures on an interactive HTML5 vector canvas.",
      routeHint: "Accessible via 'Document Chamber' tab."
    },
    {
      title: "💰 Capital Escrow Wallet",
      description: "Audit liquid equity capital balances, simulate deposits, and track deal asset flows in an immutable sandbox ledger.",
      routeHint: "Accessible via 'Capital Ledger' tab."
    }
  ];

  // Auto-prompt tour on first entry of the session
  useEffect(() => {
    const activeSession = sessionStorage.getItem('nexus-tour-done');
    if (!activeSession) {
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('nexus-tour-done', 'true');
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleDismiss();
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => { setCurrentStep(0); setIsOpen(true); }}
        style={{ position: 'fixed', bottom: '24px', right: '24px', backgroundColor: '#0D6EFD', color: '#fff', border: 'none', borderRadius: '50px', padding: '12px 20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(13,110,253,0.4)', zIndex: 9999 }}
      >
        <HelpCircle size={16} /> Platform System Walkthrough
      </button>
    );
  }

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', width: '350px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '12px', boxShadow: '0 12px 32px rgba(15,23,42,0.15)', padding: '20px', zIndex: 10000, fontFamily: 'Arial, sans-serif', animation: 'slideUp 0.3s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', fontWeight: 'bold', background: '#0D6EFD15', color: '#0D6EFD', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Feature Blueprint Integration ({currentStep + 1} of {steps.length})
        </span>
        <button onClick={handleDismiss} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
          <X size={16} />
        </button>
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#0F172A' }}>
        {steps[currentStep].title}
      </h3>
      
      <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5', margin: '0 0 12px 0' }}>
        {steps[currentStep].description}
      </p>

      <div style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A', backgroundColor: '#F8FAFC', padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', marginBottom: '16px' }}>
        📍 Location: <span style={{ color: '#0D6EFD' }}>{steps[currentStep].routeHint}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          onClick={handleDismiss}
          style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '12px', cursor: 'pointer' }}
        >
          Skip Introduction
        </button>
        <button 
          onClick={handleNext}
          style={{ padding: '8px 14px', backgroundColor: '#0D6EFD', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          {currentStep === steps.length - 1 ? "Finish Walkthrough" : "Next Module"} 
          {currentStep === steps.length - 1 ? <CheckCircle2 size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>
    </div>
  );
};

export default GuidedTour;