# TaxCheck NG

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

**TaxCheck NG** is an open-source educational tool designed to help Nigerians understand the upcoming **2025/2026 Tax Administration Bill**.

This project bridges the information gap by providing simple, interactive calculators to show citizens exactly how these changes affect their pockets and businesses.

## Key Features

### 1. PAYE "Take-Home" Simulator

A side-by-side comparison of your tax liability under the **Old Finance Act (2023)** vs. the **New Proposed Bill (2026)**.

- **Key Logic:** Replaces the old "Consolidated Relief Allowance" (CRA) with the new **Rent Relief** and expanded tax bands.
- **Visuals:** Shows users instantly if they "Save" or "Pay More" per month.

### 2. SME Exemption Shield

A wizard for small business owners to check their tax status.

- Checks against the **₦50 Million Turnover** threshold.
- Checks against sector exclusions (e.g., Professional Services).
- Clarifies new rules regarding VAT collection and Fixed Assets.

### 3. Upcoming Features (Roadmap)

- **Input VAT Recovery Calc:** For medium businesses to estimate claimable credits on services.
- **Pidgin & Local Language Toggle:** Making tax info accessible to all.
- **Whistleblower Guide:** How to safely use the new NRS reporting channels.

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Vercel (Recommended)

## Getting Started

First, clone the repository:

```bash
git clone [https://github.com/your-username/taxcheck-ng.git](https://github.com/your-username/taxcheck-ng.git)
cd taxcheck-ng

npm install
# or
yarn install

npm run dev
```
