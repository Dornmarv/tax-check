// --- OLD LAW (Finance Act 2023 / PITA) ---
export const calculateOldTax = (annualGross: number, pension: number) => {
    // 1. Consolidated Relief Allowance (CRA)
    // Higher of 200k or 1% of Gross + 20% of Gross
    const craFixed = 200000;
    const craPercent = 0.01 * annualGross;
    const higherBase = Math.max(craFixed, craPercent);
    const relief = higherBase + (0.2 * annualGross);

    // 2. Taxable Income
    let taxable = annualGross - relief - pension;
    if (taxable <= 0) return 0;

    // 3. Old Tax Bands
    let tax = 0;

    const bands = [
        { limit: 300000, rate: 0.07 },
        { limit: 300000, rate: 0.11 },
        { limit: 500000, rate: 0.15 },
        { limit: 500000, rate: 0.19 },
        { limit: 1600000, rate: 0.21 },
        { limit: Infinity, rate: 0.24 }, // Anything above 3.2M cumulative
    ];

    for (const band of bands) {
        if (taxable <= 0) break;
        const taxableAmount = Math.min(taxable, band.limit);
        tax += taxableAmount * band.rate;
        taxable -= taxableAmount;
    }

    return tax;
};

// --- NEW LAW (Nigeria Tax Act 2025) ---
export const calculateNewTax = (annualGross: number, annualRent: number, pension: number) => {

    // Section 163(1)(t): Income of National Minimum wage or less is exempt
    // Assuming National Minimum Wage is approx 840k/year (70k/month), but let's stick to the tax band exemption 
    // Section 58 & Fourth Schedule: First 800k is 0%

    // 1. DEDUCTIONS (Section 30)
    // The old CRA (200k + 20%) is REPEALED.
    // We now have specific reliefs.

    // Rent Relief (Section 30(2)(a)(vi)): 
    // 20% of rent paid, capped at N500,000.
    const rentRelief = Math.min(annualRent * 0.20, 500000);

    // Allowable deductions: Pension, NHF, Health Insurance, Rent Relief.
    // For this calculator, we focus on Pension + Rent Relief.
    let taxable = annualGross - pension - rentRelief;

    if (taxable <= 0) return 0;

    // 2. NEW TAX BANDS (Fourth Schedule)
    let tax = 0;

    // Band 1: First 800,000 @ 0%
    let taxableChunk = Math.min(taxable, 800000);
    tax += taxableChunk * 0;
    taxable -= taxableChunk;

    // Band 2: Next 2,200,000 @ 15%
    if (taxable > 0) {
        taxableChunk = Math.min(taxable, 2200000);
        tax += taxableChunk * 0.15;
        taxable -= taxableChunk;
    }

    // Band 3: Next 9,000,000 @ 18%
    if (taxable > 0) {
        taxableChunk = Math.min(taxable, 9000000);
        tax += taxableChunk * 0.18;
        taxable -= taxableChunk;
    }

    // Band 4: Next 13,000,000 @ 21%
    if (taxable > 0) {
        taxableChunk = Math.min(taxable, 13000000);
        tax += taxableChunk * 0.21;
        taxable -= taxableChunk;
    }

    // Band 5: Next 25,000,000 @ 23%
    if (taxable > 0) {
        taxableChunk = Math.min(taxable, 25000000);
        tax += taxableChunk * 0.23;
        taxable -= taxableChunk;
    }

    // Band 6: Above 50,000,000 (Remainder) @ 25%
    if (taxable > 0) {
        tax += taxable * 0.25;
    }

    return tax;
};