import { calculateOldTax, calculateNewTax } from "@/utils/tax-calculator";
import { AlertCircle, ChevronDown, ChevronUp, Info } from "lucide-react";
import { useState } from "react";

export default function TaxSimulator() {
    // Inputs
    const [salary, setSalary] = useState<string>('');
    const [rent, setRent] = useState<string>('');
    const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');

    // Deductions (Manual Inputs for accuracy)
    const [pension, setPension] = useState<string>('');
    const [nhf, setNhf] = useState<string>('');
    const [nhis, setNhis] = useState<string>('');

    const [showDeductions, setShowDeductions] = useState(false);

    // Helper: Format number
    const formatNumber = (num: string) => {
        if (!num) return '';
        const clean = num.replace(/\D/g, '');
        return Number(clean).toLocaleString('en-NG');
    };

    const getRawValue = (val: string) => Number(val.replace(/,/g, '')) || 0;

    // Handlers
    const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => setSalary(formatNumber(e.target.value));
    const handleRentChange = (e: React.ChangeEvent<HTMLInputElement>) => setRent(formatNumber(e.target.value));
    const handlePensionChange = (e: React.ChangeEvent<HTMLInputElement>) => setPension(formatNumber(e.target.value));
    const handleNhfChange = (e: React.ChangeEvent<HTMLInputElement>) => setNhf(formatNumber(e.target.value));
    const handleNhisChange = (e: React.ChangeEvent<HTMLInputElement>) => setNhis(formatNumber(e.target.value));

    // Logic
    const rawSalary = getRawValue(salary);
    const grossAnnual = period === 'monthly' ? rawSalary * 12 : rawSalary;

    // Deductions are usually entered as Monthly values by users, so we convert if needed
    // However, for simplicity/flexibility, let's assume users enter the ANNUAL amount if they selected Yearly,
    // or MONTHLY amount if they selected Monthly.
    const multiplier = period === 'monthly' ? 12 : 1;

    const rawPension = getRawValue(pension) * multiplier;
    const rawNhf = getRawValue(nhf) * multiplier;
    const rawNhis = getRawValue(nhis) * multiplier;
    const totalStatutoryDeductions = rawPension + rawNhf + rawNhis;

    const annualRent = getRawValue(rent);

    // If user hasn't opened "Advanced Deductions", we can optionally estimate Pension (8%) for quick check
    // But to match FIRS, we should default to 0 unless entered.
    const finalPensionDeduction = totalStatutoryDeductions;

    const oldTax = calculateOldTax(grossAnnual, finalPensionDeduction);
    const newTax = calculateNewTax(grossAnnual, annualRent, finalPensionDeduction);

    const difference = oldTax - newTax;
    const isSaving = difference >= 0;
    const isExempt = grossAnnual > 0 && (newTax === 0 || grossAnnual <= 800000);

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-5">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800">1. Income & Reliefs</h2>
                        <select
                            value={period}
                            onChange={(e) => setPeriod(e.target.value as any)}
                            className="bg-slate-100 border border-slate-300 rounded-lg px-3 py-1 text-sm font-medium"
                        >
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>

                    {/* Gross Income */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Gross Income ({period})</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="e.g. 500,000"
                            value={salary}
                            onChange={handleSalaryChange}
                            className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-mono text-lg bg-slate-50"
                        />
                    </div>



                    {/* Annual Rent */}
                    <div >
                        <label className="block text-sm font-bold text-green-900 mb-1">
                            Annual Rent Paid
                        </label>
                        <p className="text-xs text-green-700 mb-2">
                            <strong>Section 30 Relief:</strong> 20% of rent (Max ₦500k) is now tax-free.
                        </p>
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="e.g. 1,200,000"
                            value={rent}
                            onChange={handleRentChange}
                            className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-mono text-lg bg-slate-50"
                        />
                    </div>

                    {/* Deductions Toggle */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                        <button
                            onClick={() => setShowDeductions(!showDeductions)}
                            className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                            <span className="text-sm font-bold text-slate-700">Tax Deductible Contributions (Optional)</span>
                            {showDeductions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>

                        {showDeductions && (
                            <div className="p-4 space-y-4 bg-white border-t border-slate-100 animate-in slide-in-from-top-2">
                                <p className="text-xs text-slate-500">Enter amounts per <strong>{period}</strong>. Leave empty if 0.</p>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Pension (8%)</label>
                                    <input
                                        type="text"
                                        value={pension}
                                        onChange={handlePensionChange}
                                        placeholder="0"
                                        className="w-full p-2 border border-slate-300 rounded-lg outline-none font-mono text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1">NHF</label>
                                        <input
                                            type="text"
                                            value={nhf}
                                            onChange={handleNhfChange}
                                            placeholder="0"
                                            className="w-full p-2 border border-slate-300 rounded-lg outline-none font-mono text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1">NHIS</label>
                                        <input
                                            type="text"
                                            value={nhis}
                                            onChange={handleNhisChange}
                                            placeholder="0"
                                            className="w-full p-2 border border-slate-300 rounded-lg outline-none font-mono text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* Results Column */}
                <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 flex flex-col justify-center">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">2. Tax Breakdown</h2>

                    <div className="space-y-6">
                        {/* Old Law */}
                        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Old Tax (2024)</p>
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider">With CRA Relief</p>
                            </div>
                            <span className="font-mono font-semibold text-slate-600 text-lg">
                                ₦{(oldTax / 12).toLocaleString('en-NG', { maximumFractionDigits: 0 })}
                                <span className="text-sm">/mo</span>
                            </span>
                        </div>

                        {/* New Law */}
                        <div className="flex justify-between items-center pb-3">
                            <div>
                                <p className="text-green-800 text-sm font-bold">New Tax (2026)</p>
                                <p className="text-[10px] text-green-600 uppercase tracking-wider">With Rent Relief</p>
                            </div>
                            {isExempt ? (
                                <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    EXEMPT
                                </span>
                            ) : (
                                <span className="font-mono font-bold text-green-700 text-2xl">
                                    ₦{(newTax / 12).toLocaleString('en-NG', { maximumFractionDigits: 0 })}
                                    <span className="text-sm">/mo</span>
                                </span>
                            )}
                        </div>

                        {/* Verdict */}
                        <div className={`p-5 rounded-xl text-center border-2 transition-all ${isExempt
                            ? 'bg-green-100 border-green-200 text-green-800'
                            : isSaving
                                ? 'bg-green-100 border-green-200 text-green-800'
                                : 'bg-red-50 border-red-100 text-red-800'
                            }`}>
                            {isExempt ? (
                                <div>
                                    <span className="text-3xl block mb-2">🎉</span>
                                    <p className="font-bold">Tax Exempt Status</p>
                                    <p className="text-sm mt-1 opacity-90">Income under ₦800k threshold.</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-xs font-bold uppercase mb-1">Monthly Difference</p>
                                    <p className="text-3xl font-extrabold">
                                        {isSaving ? '+' : '-'}₦{Math.abs(difference / 12).toLocaleString('en-NG', { maximumFractionDigits: 0 })}
                                    </p>
                                    <p className="text-sm font-medium mt-1">
                                        {isSaving ? 'Savings in your pocket' : 'Additional tax liability'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-sm text-blue-900 border border-blue-100">
                <Info className="hidden sm:block shrink-0 mt-0.5" size={18} />
                <div>
                    <p className="font-bold mb-1">Key Changes in the 2025 Act:</p>
                    <ul className="list-disc pl-4 space-y-1 text-blue-800">
                        <li><strong>Fourth Schedule:</strong> New tax bands. First ₦800k is tax-free.</li>
                        <li><strong>Section 30:</strong> Rent relief introduced (20% of rent). Old Consolidated Relief Allowance (CRA) removed.</li>
                        <li><strong>Section 163:</strong> Minimum wage earners are explicitly exempt.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}