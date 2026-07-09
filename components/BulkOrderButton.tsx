'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import BulkOrderForm from './BulkOrderForm';
import { Mail, ArrowLeft } from "lucide-react";

export default function BulkOrderButton() {
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
            <h3 className="font-bold text-xl text-[#20283c]">Bulk Order Request</h3>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
          
          <div className="p-6 overflow-y-auto text-left">
            <BulkOrderForm onSuccess={() => setTimeout(() => setIsOpen(false), 3000)} />
          </div>
       </div>
    </div>
  ) : null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 bg-white hover:bg-slate-50 text-[#1e2363] font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-lg transition-all shadow-sm active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
        id="bulk-contact-sales-btn"
      >
        <Mail className="w-4 h-4 text-[#1e2363]" />
        <span>Contact Corporate Sales</span>
      </button>
      
      {mounted && modalContent ? createPortal(modalContent, document.body) : null}
    </>
  );
}
