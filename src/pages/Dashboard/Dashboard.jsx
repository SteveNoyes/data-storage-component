import { useDashboardData } from '../../hooks/useDashboardData.js';
import { formatCurrency } from '../../utils/formatters.js';
import KpiCard from '../../components/KpiCard/KpiCard.jsx';
import ChartCard from '../../components/ChartCard/ChartCard.jsx';
import { SkeletonKpiCard, SkeletonChartCard } from '../../components/Skeleton/Skeleton.jsx';
import ErrorBanner from '../../components/ErrorBanner/ErrorBanner.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';
import EnrollmentTrendChart from '../../charts/EnrollmentTrendChart.jsx';
import TherapeuticCoverageChart from '../../charts/TherapeuticCoverageChart.jsx';
import EnrollmentByIndication from '../../charts/EnrollmentByIndication.jsx';
import CoverageIndicationChart from '../../charts/CoverageIndicationChart.jsx';
import ChannelCoverageChart from '../../charts/ChannelCoverageChart.jsx';
import GeographicCoverageChart from '../../charts/GeographicCoverageChart.jsx';
import InsuranceCoverageChart from '../../charts/InsuranceCoverageChart.jsx';
import ProviderCoverageChart from '../../charts/ProviderCoverageChart.jsx';
import GaugeChart from '../../charts/GaugeChart.jsx';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { loading, error, aggregatedData, refresh, monthsDisplay } = useDashboardData();

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.kpiRow}>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonKpiCard key={i} />
          ))}
        </div>
        <div className={styles.chartGrid}>
          <div className={styles.span2}>
            <SkeletonChartCard />
          </div>
          <SkeletonChartCard />
          <SkeletonChartCard />
          <SkeletonChartCard />
          <div className={styles.span2}>
            <SkeletonChartCard />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <ErrorBanner message={error} onRetry={refresh} />
      </div>
    );
  }

  const a = aggregatedData;
  const fullMonthly = a.monthly || [];
  const monthly = fullMonthly.slice(-monthsDisplay);

  const totalRevenue = monthly.reduce((s, m) => s + m.revenue, 0);
  const totalActual = monthly.reduce((s, m) => s + m.actual, 0);
  const forecast = fullMonthly.length > 0 ? fullMonthly[0].forecast : 0;
  const totalEnrollments = monthly.reduce((s, m) => s + m.enrollments, 0);

  const revenueTrend =
    monthly.length >= 2
      ? ((monthly[monthly.length - 1].revenue - monthly[monthly.length - 2].revenue) /
          monthly[monthly.length - 2].revenue) *
        100
      : 0;

  const enrollmentTrend =
    monthly.length >= 2
      ? ((monthly[monthly.length - 1].enrollments - monthly[monthly.length - 2].enrollments) /
          monthly[monthly.length - 2].enrollments) *
        100
      : 0;

  const enrollmentChartData = {
    labels: monthly.map((m) => m.month),
    values: monthly.map((m) => m.enrollments),
  };

  const therapeuticData = {
    labels: (a.byTherapeuticArea || []).map((d) => d.therapeutic_area),
    values: (a.byTherapeuticArea || []).map((d) => d.coverage_pct),
  };

  const indicationEnrollData = {
    labels: (a.byIndicationEnrollment || []).map((d) => d.indication),
    values: (a.byIndicationEnrollment || []).map((d) => d.enrolled_patients),
  };

  const indicationCoverageData = {
    labels: (a.byIndicationCoverage || []).map((d) => d.indication),
    values: (a.byIndicationCoverage || []).map((d) => d.coverage_pct),
  };

  const channelData = {
    labels: (a.byDeliveryChannel || []).map((d) => d.channel),
    values: (a.byDeliveryChannel || []).map((d) => d.coverage_pct),
  };

  const geoData = {
    labels: (a.byRegionCoverage || []).map((d) => d.region),
    values: (a.byRegionCoverage || []).map((d) => d.coverage_pct),
  };

  const insuranceData = {
    labels: (a.byInsuranceType || []).map((d) => d.insurance_type),
    values: (a.byInsuranceType || []).map((d) => d.coverage_pct),
  };

  const providerData = {
    labels: (a.byProviderType || []).map((d) => d.provider_type),
    coverage: (a.byProviderType || []).map((d) => d.coverage_pct),
    population: (a.byProviderType || []).map((d) => d.patient_pop_pct),
  };

  return (
    <div className={styles.page}>
      <div className={styles.kpiRow}>
        <KpiCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          trend={revenueTrend}
          trendLabel="vs last month"
        />
        <KpiCard
          title="Forecast"
          value={formatCurrency(forecast)}
          trend={0}
          trendLabel="annual target"
        />
        <KpiCard
          title="Actual vs Forecast"
          value={formatCurrency(totalActual)}
          trend={forecast > 0 ? ((totalActual / forecast - 1) * 100) : 0}
          trendLabel="of target"
        />
        <KpiCard
          title="Total Users"
          value={totalEnrollments.toLocaleString()}
          trend={enrollmentTrend}
          trendLabel="vs last month"
        />
      </div>

      <div className={styles.chartGrid}>
        <div className={styles.span2}>
          <ChartCard title="User Growth Trend" description="Monthly active users over 12 months" colorTheme="gold">
            {enrollmentChartData.labels.length > 0 ? (
              <div className={styles.chartContainer}>
                <EnrollmentTrendChart data={enrollmentChartData} />
              </div>
            ) : (
              <EmptyState message="No user growth data available" />
            )}
          </ChartCard>
        </div>

        <ChartCard title="Budget vs Actual" description="Progress toward annual target" colorTheme="info">
          {forecast > 0 ? (
            <GaugeChart forecast={forecast} actual={totalActual} />
          ) : (
            <EmptyState message="No budget data available" />
          )}
        </ChartCard>

        <ChartCard title="Service Adoption" description="Adoption rate by service category" colorTheme="success">
          {therapeuticData.labels.length > 0 ? (
            <div className={styles.chartContainer}>
              <TherapeuticCoverageChart data={therapeuticData} />
            </div>
          ) : (
              <EmptyState message="No service adoption data available" />
          )}
        </ChartCard>

        <ChartCard title="Users by Product" description="Active users per product line" colorTheme="warning">
          {indicationEnrollData.labels.length > 0 ? (
            <div className={styles.chartContainer}>
              <EnrollmentByIndication data={indicationEnrollData} />
            </div>
          ) : (
              <EmptyState message="No product enrollment data available" />
          )}
        </ChartCard>

        <ChartCard title="Revenue by Product" description="Revenue split by product line" colorTheme="danger">
          {indicationCoverageData.labels.length > 0 ? (
            <CoverageIndicationChart data={indicationCoverageData} />
          ) : (
            <EmptyState message="No product revenue data available" />
          )}
        </ChartCard>

        <ChartCard title="Channel Performance" description="Adoption rate by distribution channel" colorTheme="info">
          {channelData.labels.length > 0 ? (
            <div className={styles.chartContainer}>
              <ChannelCoverageChart data={channelData} />
            </div>
          ) : (
              <EmptyState message="No channel performance data available" />
          )}
        </ChartCard>

        <ChartCard title="Regional Performance" description="Adoption rate by region" colorTheme="gold">
          {geoData.labels.length > 0 ? (
            <div className={styles.chartContainer}>
              <GeographicCoverageChart data={geoData} />
            </div>
          ) : (
              <EmptyState message="No regional data available" />
          )}
        </ChartCard>

        <ChartCard title="Payment Methods" description="Payment tier distribution" colorTheme="success">
          {insuranceData.labels.length > 0 ? (
            <div className={styles.chartContainer}>
              <InsuranceCoverageChart data={insuranceData} />
            </div>
          ) : (
              <EmptyState message="No payment method data available" />
          )}
        </ChartCard>

        <div className={styles.span2}>
          <ChartCard title="Partner Adoption vs Market Share" description="Adoption rate compared to market share" colorTheme="warning">
            {providerData.labels.length > 0 ? (
              <div className={styles.chartContainer}>
                <ProviderCoverageChart data={providerData} />
              </div>
            ) : (
              <EmptyState message="No partner data available" />
            )}
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
