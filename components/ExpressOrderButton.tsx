'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ExpressOrderForm from './ExpressOrderForm';
import { Zap, ArrowLeft } from "lucide-react";

export default function ExpressOrderButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const modalContent = isOpen ? (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
       <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-md sticky top-0 z-10">
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:bg-slate-200 hover:text-slate-900 px-3 py-1.5 rounded-md transition-colors flex items-center gap-2 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <h3 className="font-bold text-xl text-[#20283c] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#f29a1b] fill-[#f29a1b]" />
              Express Delivery
            </h3>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
          
          <div className="p-6 overflow-y-auto text-left">
            <ExpressOrderForm onSuccess={() => setTimeout(() => setIsOpen(false), 3000)} />
          </div>
       </div>
    </div>
  ) : null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 bg-[#f29a1b] hover:bg-[#de8710] text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-lg transition-all shadow-sm active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
        id="fast-delivery-btn"
      >
        <Zap className="w-4 h-4 text-amber-200 fill-amber-200" />
        <span>Need Express Delivery?</span>
      </button>
      
      {mounted && modalContent ? createPortal(modalContent, document.body) : null}
    </>
  );
}
