'use client';
import { useState } from 'react';

export default function ExpressOrderForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    try {
      const response = await fetch('/api/orders/express', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        if (onSuccess) onSuccess();
      } else {
        console.error('Failed to submit express order');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-amber-100 text-[#f29a1b] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
        </div>
        <h4 className="text-xl font-bold text-[#20283c] mb-2">Express Request Submitted</h4>
        <p className="text-slate-500">Our priority team will contact you immediately to coordinate your urgent timeline.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 text-left">
          <label className="text-sm font-medium text-slate-700">First Name <span className="text-red-500">*</span></label>
          <input required type="text" name="first_name" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f29a1b]/50 focus:border-[#f29a1b]" />
        </div>
        <div className="space-y-1.5 text-left">
          <label className="text-sm font-medium text-slate-700">Last Name</label>
          <input type="text" name="last_name" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f29a1b]/50 focus:border-[#f29a1b]" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 text-left">
          <label className="text-sm font-medium text-slate-700">Email Address <span className="text-red-500">*</span></label>
          <input required type="email" name="email" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f29a1b]/50 focus:border-[#f29a1b]" />
        </div>
        <div className="space-y-1.5 text-left">
          <label className="text-sm font-medium text-slate-700">Phone Number <span className="text-red-500">*</span></label>
          <input required type="tel" name="phone" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f29a1b]/50 focus:border-[#f29a1b]" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 text-left">
          <label className="text-sm font-medium text-slate-700">Product Type <span className="text-red-500">*</span></label>
          <select required name="product_type" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f29a1b]/50 focus:border-[#f29a1b] bg-white text-slate-900">
            <option value="">Select...</option>
            <option value="Books">Books</option>
            <option value="Magazines">Magazines</option>
            <option value="Catalogs">Catalogs</option>
            <option value="Packaging">Packaging</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="space-y-1.5 text-left">
          <label className="text-sm font-medium text-slate-700">Required Deadline <span className="text-red-500">*</span></label>
          <select required name="deadline" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f29a1b]/50 focus:border-[#f29a1b] bg-white text-slate-900">
            <option value="">Select...</option>
            <option value="24-48-hours">24 - 48 Hours</option>
            <option value="3-5-days">3 - 5 Days</option>
            <option value="1-week">1 Week</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-1.5 text-left">
        <label className="text-sm font-medium text-slate-700">Order Details</label>
        <textarea name="details" rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f29a1b]/50 focus:border-[#f29a1b] resize-none" placeholder="Tell us about your project requirements and why it's urgent..."></textarea>
      </div>
      
      <div className="pt-2">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#f29a1b] text-white py-3 rounded-md font-medium hover:bg-[#de8710] transition-colors disabled:opacity-70 flex justify-center items-center"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Submitting...
            </span>
          ) : 'Submit Express Request'}
        </button>
      </div>
    </form>
  );
}
