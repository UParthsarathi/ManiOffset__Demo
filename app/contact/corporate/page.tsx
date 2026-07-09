"use client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import BulkOrderForm from "@/components/BulkOrderForm";
import { BackButton } from "@/components/BackButton";

export default function CorporateContact() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-slate-50 relative">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-5xl mx-auto py-12 px-4 relative z-10">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
          <div className="bg-slate-50 border-b border-slate-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 font-serif">Corporate & Bulk Sales Inquiry</h1>
              <p className="text-sm text-slate-500 mt-1">Please fill the form below to contact our corporate team.</p>
            </div>
            <BackButton />
          </div>
          
          <div className="w-full p-8 bg-white">
            <BulkOrderForm />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
