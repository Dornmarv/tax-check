'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Calculator, FileText, ShieldCheck } from 'lucide-react';
import TaxSimulator from '@/components/tax-simulator';
import SmeChecker from '@/components/sme-checker';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'sme'>('simulator');

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <Link
            href="https://tat.gov.ng/Nigeria-Tax-Act-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold mb-4 hover:bg-green-200 transition-colors"
          >
            <BookOpen size={14} />
            Updated with Nigeria Tax Act 2025
            <FileText size={14} />
          </Link>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-2">
            TaxCheck NG
          </h1>
          <p className="text-slate-600">
            Navigate the <Link href="https://tat.gov.ng/Nigeria-Tax-Act-2025.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600 text-blue-900">new 2026 tax laws</Link>. See exactly how the <span className="font-bold text-slate-800">Section 30 Rent Relief</span> and <span className="font-bold text-slate-800">new tax bands</span> affect you.
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${activeTab === 'simulator'
              ? 'bg-slate-900 text-white shadow-lg'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
          >
            <Calculator size={20} className="hidden sm:block" />
            PAYE Simulator
          </button>
          <button
            onClick={() => setActiveTab('sme')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${activeTab === 'sme'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
          >
            <ShieldCheck size={20} className="hidden sm:block" />
            SME Check
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-slate-100">
          {activeTab === 'simulator' ? <TaxSimulator /> : <SmeChecker />}
        </div>

        <footer className="mt-12 text-center text-sm text-slate-400 space-y-2">
          <p>Disclaimer: Calculations are based on the <Link href="https://tat.gov.ng/Nigeria-Tax-Act-2025.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600 text-blue-900">Nigeria Tax Act 2025</Link> (Section 58 & Fourth Schedule).</p>
          <p>This is for educational purposes only. Consult a tax professional for official filing.</p>
        </footer>
      </div>
    </main>
  );
}
