export function groupBy(rows, key) {
  return rows.reduce((acc, row) => {
    const group = row[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(row);
    return acc;
  }, {});
}

export function sumBy(rows, key) {
  return rows.reduce((sum, row) => sum + (Number(row[key]) || 0), 0);
}

export function avgBy(rows, key) {
  if (!rows.length) return 0;
  return sumBy(rows, key) / rows.length;
}

export function groupByMonth(rows) {
  const grouped = groupBy(rows, 'month');
  return Object.entries(grouped).map(([month, entries]) => ({
    month,
    revenue: sumBy(entries, 'revenue'),
    enrollments: sumBy(entries, 'enrollments'),
    forecast: entries[0].forecast,
    actual: sumBy(entries, 'actual'),
  })).sort((a, b) => a.month.localeCompare(b.month));
}

export function sumByRegion(rows) {
  const grouped = groupBy(rows, 'region');
  return Object.entries(grouped).map(([region, entries]) => ({
    region,
    revenue: sumBy(entries, 'revenue'),
    coverage_pct: avgBy(entries, 'coverage_pct'),
  }));
}

export function avgCoverageByIndication(rows) {
  const grouped = groupBy(rows, 'indication');
  return Object.entries(grouped).map(([indication, entries]) => ({
    indication,
    coverage_pct: avgBy(entries, 'coverage_pct'),
  }));
}

export function enrollmentsByIndication(rows) {
  const grouped = groupBy(rows, 'indication');
  return Object.entries(grouped).map(([indication, entries]) => ({
    indication,
    enrolled_patients: sumBy(entries, 'enrolled_patients'),
  }));
}

export function avgCoverageByTherapeuticArea(rows) {
  const grouped = groupBy(rows, 'therapeutic_area');
  return Object.entries(grouped).map(([area, entries]) => ({
    therapeutic_area: area,
    coverage_pct: avgBy(entries, 'coverage_pct'),
  }));
}

export function coverageByDeliveryChannel(rows) {
  const grouped = groupBy(rows, 'delivery_channel');
  return Object.entries(grouped).map(([channel, entries]) => ({
    channel,
    coverage_pct: avgBy(entries, 'coverage_pct'),
  }));
}

export function coverageByInsuranceType(rows) {
  const grouped = groupBy(rows, 'insurance_type');
  return Object.entries(grouped).map(([type, entries]) => ({
    insurance_type: type,
    coverage_pct: avgBy(entries, 'coverage_pct'),
    count: entries.length,
  }));
}

export function coverageByProviderType(rows) {
  const grouped = groupBy(rows, 'provider_type');
  return Object.entries(grouped).map(([type, entries]) => ({
    provider_type: type,
    coverage_pct: avgBy(entries, 'coverage_pct'),
    patient_pop_pct: avgBy(entries, 'patient_pop_pct'),
  }));
}

export function coverageByRegion(rows) {
  const grouped = groupBy(rows, 'region');
  return Object.entries(grouped).map(([region, entries]) => ({
    region,
    coverage_pct: avgBy(entries, 'coverage_pct'),
  }));
}

export function computeAggregations(rows) {
  return {
    monthly: groupByMonth(rows),
    byRegion: sumByRegion(rows),
    byIndicationCoverage: avgCoverageByIndication(rows),
    byIndicationEnrollment: enrollmentsByIndication(rows),
    byTherapeuticArea: avgCoverageByTherapeuticArea(rows),
    byDeliveryChannel: coverageByDeliveryChannel(rows),
    byInsuranceType: coverageByInsuranceType(rows),
    byProviderType: coverageByProviderType(rows),
    byRegionCoverage: coverageByRegion(rows),
  };
}
