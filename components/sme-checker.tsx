import { AlertCircle, BookOpen, ChevronDown, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function SmeChecker() {
    const [turnover, setTurnover] = useState<string>('');
    const [assets, setAssets] = useState<string>('');
    const [sector, setSector] = useState<string>('general');

    // Format inputs
    const formatNumber = (num: string) => {
        if (!num) return '';
        const clean = num.replace(/\D/g, '');
        return Number(clean).toLocaleString('en-NG');
    };
    const getRawValue = (val: string) => Number(val.replace(/,/g, '')) || 0;

    const annualTurnover = getRawValue(turnover);
    const totalAssets = getRawValue(assets);

    // Logic based on Section 202 (Interpretation)
    // "small company" means a company that earns gross turnover of N50,000,000 or less
    // with total fixed assets not exceeding N250,000,000
    // PROVIDED that any business providing professional services shall not be classified as a small company.

    const isTurnoverExempt = annualTurnover <= 50000000;
    const isAssetExempt = totalAssets <= 250000000;
    const isSectorExempt = sector !== 'professional';

    const isSmallCompany = isTurnoverExempt && isAssetExempt && isSectorExempt && (annualTurnover > 0);

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">Check Company Status</h2>
                        <p className="text-sm text-slate-500">Based on <strong>Section 202</strong> of the Nigeria Tax Act 2025.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Gross Annual Turnover</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={turnover}
                            onChange={(e) => setTurnover(formatNumber(e.target.value))}
                            placeholder="₦"
                            className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Total Fixed Assets</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={assets}
                            onChange={(e) => setAssets(formatNumber(e.target.value))}
                            placeholder="₦"
                            className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Business Sector</label>
                        <div className="relative">
                            <select
                                value={sector}
                                onChange={(e) => setSector(e.target.value)}
                                className="appearance-none w-full p-4 pr-10 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
                            >
                                <option value="general">General Trading / Manufacturing / Agriculture</option>
                                <option value="professional">Professional Services (Law, IT, Consulting)</option>
                                <option value="oil">Oil & Gas (Upstream)</option>
                            </select>
                            <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                        </div>
                        <div className="flex items-start gap-2 mt-2 text-xs text-amber-700 bg-amber-50 p-2 rounded">
                            <AlertCircle size={14} className="mt-0.5" />
                            <p>Section 202 explicitly excludes <strong>Professional Services</strong> from the "Small Company" definition.</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    {annualTurnover === 0 ? (
                        <div className="text-center text-slate-400 py-10">
                            <ShieldCheck size={80} className="mx-auto mb-4 opacity-10" />
                            <p>Enter details to check your status</p>
                        </div>
                    ) : (
                        <div className={`p-8 rounded-3xl border-2 text-center transition-all ${isSmallCompany ? 'border-green-500 bg-green-50' : 'border-slate-300 bg-white'}`}>
                            {isSmallCompany ? (
                                <>
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <ShieldCheck size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-green-900 mb-2">You are a Small Company</h3>
                                    <p className="text-green-700 mb-6">
                                        You qualify for exemptions under <strong>Section 56</strong>.
                                    </p>
                                    <ul className="text-left bg-white p-5 rounded-xl shadow-sm space-y-3 text-sm text-slate-700">
                                        <li className="flex gap-2">
                                            <span>✅</span>
                                            <span><strong>0% Company Income Tax</strong> (Section 56)</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span>✅</span>
                                            <span><strong>Exempt from 4% Development Levy</strong> (Section 59)</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span>⚠️</span>
                                            <span>You must still file returns with the NRS.</span>
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                <>
                                    <div className="w-20 h-20 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <BookOpen size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Standard Company</h3>
                                    <p className="text-slate-600 mb-6">You are liable for standard taxation.</p>

                                    <div className="text-left bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3 text-sm">
                                        {!isTurnoverExempt && <p className="text-red-600 flex gap-2">❌ Turnover exceeds ₦50M.</p>}
                                        {!isAssetExempt && <p className="text-red-600 flex gap-2">❌ Fixed Assets exceed ₦250M.</p>}
                                        {!isSectorExempt && <p className="text-red-600 flex gap-2">❌ Professional Services excluded.</p>}

                                        <div className="pt-4 border-t border-slate-200 mt-4">
                                            <p className="font-bold text-slate-800 mb-2">Your Likely Liabilities:</p>
                                            <ul className="space-y-1 text-slate-600">
                                                <li>• <strong>30%</strong> Company Income Tax</li>
                                                <li>• <strong>4%</strong> Development Levy (Section 59)</li>
                                                <li>• <strong>7.5%</strong> VAT Collection</li>
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}