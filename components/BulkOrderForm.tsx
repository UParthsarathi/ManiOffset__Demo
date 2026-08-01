'use client';
import { useState } from 'react';

export default function BulkOrderForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    try {
      const response = await fetch('/api/orders/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        if (onSuccess) onSuccess();
      } else {
        console.error('Failed to submit bulk order');
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
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
        </div>
        <h4 className="text-xl font-bold text-[#20283c] mb-2">Request Submitted</h4>
        <p className="text-slate-500">Our sales team will contact you shortly to discuss your bulk printing needs.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 text-left">
          <label className="text-sm font-medium text-slate-700">First Name</label>
          <input type="text" name="first_name" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005fb3]/50 focus:border-[#005fb3]" />
        </div>
        <div className="space-y-1.5 text-left">
          <label className="text-sm font-medium text-slate-700">Last Name</label>
          <input type="text" name="last_name" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005fb3]/50 focus:border-[#005fb3]" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 text-left">
          <label className="text-sm font-medium text-slate-700">Email Address</label>
          <input type="email" name="email" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005fb3]/50 focus:border-[#005fb3]" />
        </div>
        <div className="space-y-1.5 text-left">
          <label className="text-sm font-medium text-slate-700">Phone Number <span className="text-red-500">*</span></label>
          <input required type="tel" name="phone" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005fb3]/50 focus:border-[#005fb3]" />
        </div>
      </div>
      
      <div className="space-y-1.5 text-left">
        <label className="text-sm font-medium text-slate-700">Company / Organization</label>
        <input type="text" name="company" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005fb3]/50 focus:border-[#005fb3]" />
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1.5 text-left">
          <label className="text-sm font-medium text-slate-700">Estimated Quantity <span className="text-red-500">*</span></label>
          <select required name="quantity" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005fb3]/50 focus:border-[#005fb3] bg-white text-slate-900">
            <option value="">Select...</option>
            <option value="500-1000">500 - 1,000</option>
            <option value="1000-5000">1,000 - 5,000</option>
            <option value="5000-10000">5,000 - 10,000</option>
            <option value="10000+">10,000+</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-1.5 text-left">
        <label className="text-sm font-medium text-slate-700">Additional Details</label>
        <textarea name="details" rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005fb3]/50 focus:border-[#005fb3] resize-none" placeholder="Tell us about your project requirements..."></textarea>
      </div>
      
      <div className="pt-2">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#005fb3] text-white py-3 rounded-md font-medium hover:bg-[#004a8c] transition-colors disabled:opacity-70 flex justify-center items-center"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Submitting...
            </span>
          ) : 'Submit Bulk Order Request'}
        </button>
      </div>
    </form>
  );
}
