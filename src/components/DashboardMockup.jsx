import { useState } from 'react';
import { BarChart3, TrendingUp, Layers, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardMockup() {
  const [view, setView] = useState('hq'); // 'hq' or 'branch'

  // Mock dashboard datasets for rendering
  const hqData = {
    metrics: [
      { label: 'Financial Performance', value: '$84.2M', target: '$80.0M', status: 'above', change: '+5.25%' },
      { label: 'Customer Satisfaction', value: '92.4%', target: '90.0%', status: 'above', change: '+2.40%' },
      { label: 'Internal Business Process', value: '94.8%', target: '95.0%', status: 'below', change: '-0.20%' },
      { label: 'Learning & Growth', value: '98.1%', target: '96.0%', status: 'above', change: '+2.10%' },
    ],
    chartData: [
      { label: 'Q1', value: 70 },
      { label: 'Q2', value: 85 },
      { label: 'Q3', value: 92 },
      { label: 'Q4', value: 98 },
    ]
  };

  const branchData = {
    metrics: [
      { label: 'Branch Revenue', value: '$12.4M', target: '$12.0M', status: 'above', change: '+3.33%' },
      { label: 'Equipment Uptime', value: '97.2%', target: '98.0%', status: 'below', change: '-0.80%' },
      { label: 'Operator Response Time', value: '14.2m', target: '15.0m', status: 'above', change: '-5.33%' }, // lower is better
      { label: 'Safety Compliance', value: '100%', target: '100%', status: 'above', change: '0.00%' },
    ],
    chartData: [
      { label: 'Jan', value: 60 },
      { label: 'Feb', value: 75 },
      { label: 'Mar', value: 80 },
      { label: 'Apr', value: 72 },
      { label: 'May', value: 88 },
      { label: 'Jun', value: 95 },
    ]
  };

  const currentData = view === 'hq' ? hqData : branchData;

  return (
    <div className="glass-card" style={styles.container}>
      {/* Dashboard Top Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.iconCircle}>
            <BarChart3 size={18} style={{ color: '#ffffff' }} />
          </div>
          <div>
            <h3 style={styles.title}>Balanced Scorecard KPI Dashboard</h3>
            <p style={styles.subtitle}>PT. United Tractors Indonesia (UNTR) • PowerBI Simulation</p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div style={styles.tabContainer}>
          <button
            onClick={() => setView('hq')}
            style={{
              ...styles.tabBtn,
              backgroundColor: view === 'hq' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              color: view === 'hq' ? '#ffffff' : 'var(--text-secondary)',
              borderColor: view === 'hq' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
            }}
          >
            Strategic HQ View
          </button>
          <button
            onClick={() => setView('branch')}
            style={{
              ...styles.tabBtn,
              backgroundColor: view === 'branch' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              color: view === 'branch' ? '#ffffff' : 'var(--text-secondary)',
              borderColor: view === 'branch' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
            }}
          >
            Operational Branch View
          </button>
        </div>
      </div>

      {/* Grid of Key Scorecard Perspectives */}
      <div style={styles.grid}>
        {currentData.metrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            style={styles.metricCard}
          >
            <span style={styles.metricLabel}>{metric.label}</span>
            <div style={styles.metricValueRow}>
              <span style={styles.metricValue}>{metric.value}</span>
              <span style={{
                ...styles.metricChange,
                color: metric.status === 'above' ? 'var(--accent-teal)' : '#f87171'
              }}>
                {metric.change}
              </span>
            </div>
            <div style={styles.metricFooter}>
              <span>Target: {metric.target}</span>
              <span style={{
                ...styles.statusIndicator,
                backgroundColor: metric.status === 'above' ? 'rgba(45, 212, 191, 0.15)' : 'rgba(248, 113, 113, 0.15)',
                color: metric.status === 'above' ? 'var(--accent-teal)' : '#f87171'
              }}>
                {metric.status === 'above' ? 'Achieved' : 'Review'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Chart Panel */}
      <div style={styles.chartPanel}>
        <div style={styles.chartHeader}>
          <div style={styles.chartHeaderLeft}>
            <TrendingUp size={16} style={{ color: 'var(--accent-cyan)' }} />
            <span style={styles.chartTitle}>{view === 'hq' ? 'HQ Core Strategic Indexes' : 'Branch Productivity Index'}</span>
          </div>
          <span style={styles.chartSub}>Jan - Jun 2026 Target Tracker</span>
        </div>

        <div style={styles.chartArea}>
          <div style={styles.yAxis}>
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          <div style={styles.barsContainer}>
            {/* Background Grid Lines in Chart */}
            <div style={styles.chartGridLines}>
              <div style={styles.gridLine} />
              <div style={styles.gridLine} />
              <div style={styles.gridLine} />
              <div style={styles.gridLine} />
            </div>

            {currentData.chartData.map((dataPoint) => (
              <div key={dataPoint.label} style={styles.barColumn}>
                <div style={styles.barTrack}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${dataPoint.value}%` }}
                    transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                    style={styles.barFill}
                  />
                </div>
                <span style={styles.barLabel}>{dataPoint.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meta/Description Footer */}
      <div style={styles.footer}>
        <div style={styles.footerItem}>
          <Layers size={14} style={{ color: 'var(--text-muted)' }} />
          <span>Merged 4 perspectives into a single unified dashboard view</span>
        </div>
        <div style={styles.footerItem}>
          <CheckCircle size={14} style={{ color: 'var(--accent-teal)' }} />
          <span>Real-time KPI calculations aligned with PT. United Tractors framework</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '20px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  iconCircle: {
    width: '38px',
    height: '38px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '1.05rem',
    fontWeight: 600,
    color: '#ffffff',
  },
  subtitle: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
  },
  tabContainer: {
    display: 'flex',
    background: 'rgba(0, 0, 0, 0.25)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '4px',
  },
  tabBtn: {
    border: '1px solid transparent',
    borderRadius: '6px',
    padding: '6px 14px',
    fontSize: '0.8rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'var(--transition-snappy)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  metricCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  metricLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    fontWeight: 500,
  },
  metricValueRow: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  metricValue: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#ffffff',
    fontFamily: 'var(--font-display)',
  },
  metricChange: {
    fontSize: '0.8rem',
    fontWeight: 600,
  },
  metricFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    borderTop: '1px solid rgba(255, 255, 255, 0.04)',
    paddingTop: '8px',
    marginTop: '4px',
  },
  statusIndicator: {
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.65rem',
    fontWeight: 600,
  },
  chartPanel: {
    background: 'rgba(0, 0, 0, 0.15)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '20px',
  },
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  chartHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  chartTitle: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#ffffff',
  },
  chartSub: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  chartArea: {
    display: 'flex',
    height: '180px',
    gap: '16px',
    position: 'relative',
  },
  yAxis: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '32px',
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    paddingRight: '8px',
  },
  barsContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    position: 'relative',
    height: '100%',
  },
  chartGridLines: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    pointerEvents: 'none',
  },
  gridLine: {
    height: '1px',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  barColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    width: '40px',
    zIndex: 2,
  },
  barTrack: {
    height: '140px',
    width: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    background: 'linear-gradient(to top, var(--accent-cyan) 30%, #ffffff 100%)',
    boxShadow: '0 0 10px rgba(56, 189, 248, 0.3)',
    borderRadius: '4px',
  },
  barLabel: {
    marginTop: '8px',
    fontSize: '0.7rem',
    color: 'var(--text-secondary)',
    fontWeight: 500,
  },
  footer: {
    display: 'flex',
    gap: '24px',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '16px',
    flexWrap: 'wrap',
  },
  footerItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
  },
};
