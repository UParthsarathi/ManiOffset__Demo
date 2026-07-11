"use client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import ExpressOrderForm from "@/components/ExpressOrderForm";
import { BackButton } from "@/components/BackButton";

export default function ExpressContact() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-white relative">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-5xl mx-auto py-12 px-4 relative z-10">
        <div className="w-full max-w-2xl bg-white shadow-sm rounded-2xl overflow-hidden border border-slate-200">
          <div className="bg-slate-50 border-b border-slate-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 font-serif">Express Delivery Request</h1>
              <p className="text-sm text-slate-500 mt-1">Please fill the form below to request express delivery.</p>
            </div>
            <BackButton />
          </div>
          
          <div className="w-full p-8 bg-white">
            <ExpressOrderForm />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
