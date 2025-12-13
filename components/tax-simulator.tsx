import { calculateOldTax, calculateNewTax } from "@/utils/tax-calculator";
import { ChevronDown, Info } from "lucide-react";
import { useState } from "react";

export default function TaxSimulator() {
    const [salary, setSalary] = useState<string>('');
    const [rent, setRent] = useState<string>('');
    const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');

    // Helper: Format number with commas
    const formatNumber = (num: string) => {
        if (!num) return '';
        const clean = num.replace(/\D/g, '');
        return Number(clean).toLocaleString('en-NG');
    };

    const getRawValue = (val: string) => Number(val.replace(/,/g, '')) || 0;

    const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSalary(formatNumber(e.target.value));
    };

    const handleRentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRent(formatNumber(e.target.value));
    };

    // Logic
    const rawSalary = getRawValue(salary);
    const rawRent = getRawValue(rent);

    const grossAnnual = period === 'monthly' ? rawSalary * 12 : rawSalary;
    const annualRent = rawRent;
    const pension = grossAnnual * 0.08; // 8% Pension

    const oldTax = calculateOldTax(grossAnnual, pension);
    const newTax = calculateNewTax(grossAnnual, annualRent, pension);

    const difference = oldTax - newTax;
    const isSaving = difference >= 0;

    // Section 163(1)(t) / Fourth Schedule exemption check
    const isExempt = grossAnnual > 0 && (newTax === 0 || grossAnnual <= 800000);

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-5">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        1. Your Income
                    </h2>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Gross Income</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                inputMode="numeric"
                                placeholder="e.g. 500,000"
                                value={salary}
                                onChange={handleSalaryChange}
                                className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-mono text-lg bg-slate-50"
                            />
                            <div className="relative">
                                <select
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value as any)}
                                    className="appearance-none bg-white border border-slate-300 rounded-xl pl-3 pr-8 py-6 text-sm font-medium cursor-pointer"
                                >
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                        <label className="block text-sm font-bold text-green-900 mb-1">
                            Annual Rent Paid
                        </label>
                        <p className="text-xs text-green-700 mb-2">
                            Under <strong>Section 30</strong>, you now get tax relief on rent (20% of rent, max ₦500k).
                        </p>
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="e.g. 1,200,000"
                            value={rent}
                            onChange={handleRentChange}
                            className="w-full p-4 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-mono text-lg"
                        />
                    </div>
                </div>

                <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 flex flex-col justify-center">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">2. Tax Comparison</h2>

                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Old Tax Law (2024)</p>
                                <p className="text-xs text-slate-400">Based on CRA (200k + 20%)</p>
                            </div>
                            <span className="font-mono font-semibold text-slate-600 text-lg">
                                ₦{(oldTax / 12).toLocaleString('en-NG', { maximumFractionDigits: 0 })}
                                <span className="text-sm">/mo</span>
                            </span>
                        </div>

                        <div className="flex justify-between items-center pb-3">
                            <div>
                                <p className="text-green-800 text-sm font-bold">New Tax Act (2026)</p>
                                <p className="text-xs text-green-600">Based on Rent Relief + New Bands</p>
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
                                    <p className="text-sm mt-1 opacity-90">Your income is under the ₦800k threshold.</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-xs font-bold uppercase mb-1">Impact on Pocket</p>
                                    <p className="text-3xl font-extrabold">
                                        {isSaving ? '+' : '-'}₦{Math.abs(difference / 12).toLocaleString('en-NG', { maximumFractionDigits: 0 })}
                                    </p>
                                    <p className="text-sm font-medium mt-1">
                                        {isSaving ? 'More take-home pay per month' : 'Less take-home pay per month'}
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