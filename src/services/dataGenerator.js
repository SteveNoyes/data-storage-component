const MONTHS = [
  '2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06',
  '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12',
];

const THERAPEUTIC_AREAS = {
  Payments: ['Wire Transfers', 'ACH Processing', 'Card Payments', 'Mobile Payments', 'P2P Transfers'],
  Lending: ['Personal Loans', 'Mortgages', 'Auto Loans', 'Credit Lines'],
  'Wealth Management': ['Portfolio Management', 'Retirement Planning', 'Tax Advisory', 'Estate Planning'],
  Insurance: ['Life Insurance', 'Health Plans', 'Property Coverage', 'Liability'],
  Trading: ['Stock Trading', 'Options', 'Futures', 'ETF Management'],
  Compliance: ['KYC/AML', 'Fraud Detection', 'Regulatory Filing'],
};

const REGIONS = ['Northeast', 'Southeast', 'Midwest', 'Southwest'];
const INSURANCE_TYPES = ['Basic Tier', 'Standard Tier', 'Premium Tier'];
const PROVIDER_TYPES = ['In-Network', 'Preferred Partner', 'Out-of-Network'];
const DELIVERY_CHANNELS = ['Online Banking', 'Mobile App', 'Branch Network', 'API Integration', 'Partner Portal'];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateData() {
  const seed = Date.now();
  const rows = [];

  MONTHS.forEach((month, mi) => {
    const baseRevenue = 18000 + mi * 1000 + Math.floor(seededRandom(seed + mi * 7) * 4000);
    const revenue = baseRevenue + randBetween(-500, 500);
    const forecast = 79100;
    const actual = revenue + randBetween(-200, 800);
    const enrollments = 300 + mi * 20 + randBetween(-20, 40);

    const areaEntries = Object.entries(THERAPEUTIC_AREAS);
    const usedAreas = new Set();

    const numEntries = mi < 6 ? 2 : 2;

    for (let e = 0; e < numEntries; e++) {
      let area;
      do {
        area = pick(areaEntries);
      } while (usedAreas.has(area[0]));
      usedAreas.add(area[0]);

      const indication = pick(area[1]);
      const region = pick(REGIONS);
      const insuranceType = pick(INSURANCE_TYPES);
      const providerType = pick(PROVIDER_TYPES);
      const deliveryChannel = pick(DELIVERY_CHANNELS);
      const coveragePct = randBetween(55, 98);
      const enrolledPatients = randBetween(600, 1800);
      const patientPopPct = randBetween(35, 82);

      rows.push({
        month,
        revenue,
        forecast,
        actual,
        enrollments,
        therapeutic_area: area[0],
        indication,
        region,
        insurance_type: insuranceType,
        provider_type: providerType,
        delivery_channel: deliveryChannel,
        coverage_pct: coveragePct,
        enrolled_patients: enrolledPatients,
        patient_pop_pct: patientPopPct,
      });
    }
  });

  return rows;
}
