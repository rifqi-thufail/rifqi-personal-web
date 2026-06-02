import { useState } from 'react';
import { ShieldCheck, Database, Cpu, QrCode, Play, RotateCcw, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function GovChainSimulator() {
  const [status, setStatus] = useState('idle'); // 'idle', 'validating', 'ipfs', 'minting', 'verified'
  const [currentStep, setCurrentStep] = useState(-1);
  const [txDetails, setTxDetails] = useState({ hash: '', ipfsHash: '', tokenId: '' });

  const steps = [
    { id: 0, label: 'Metadata Validation', desc: 'Analyzing license metadata for SSW Alfa integration', icon: <ShieldCheck size={18} /> },
    { id: 1, label: 'IPFS Storage Pinning', desc: 'Securing structural logs off-chain on decentralized storage', icon: <Database size={18} /> },
    { id: 2, label: 'ERC-721 Base Minting', desc: 'Deploying non-fungible certificate on Base Network L2', icon: <Cpu size={18} /> },
    { id: 3, label: 'QR Code Generated', desc: 'Secure verification signature compiled in under 1 hour', icon: <QrCode size={18} /> },
  ];

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#2dd4bf', '#ffffff'],
      disableForReducedMotion: true
    });
  };

  const startSimulation = async () => {
    setStatus('running');
    
    // Step 0: Validate Metadata
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Step 1: Upload to IPFS
    setCurrentStep(1);
    const mockIpfs = 'QmXoypizjW3WknFixtnd47F68B6E32f9Zuf2yVpA8Yt92a';
    setTxDetails(prev => ({ ...prev, ipfsHash: mockIpfs }));
    await new Promise(resolve => setTimeout(resolve, 1400));

    // Step 2: Mint ERC-721
    setCurrentStep(2);
    const mockTx = '0xfa39bdc8c2273b7e77a28e83344d5c192f15598177df83ee10d0263f31fb40f4';
    const mockTokenId = Math.floor(Math.random() * 89999) + 10000;
    setTxDetails(prev => ({ ...prev, hash: mockTx, tokenId: mockTokenId.toString() }));
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Step 3: QR Code Verification
    setCurrentStep(3);
    setStatus('verified');
    triggerConfetti();
  };

  const resetSimulation = () => {
    setStatus('idle');
    setCurrentStep(-1);
    setTxDetails({ hash: '', ipfsHash: '', tokenId: '' });
  };

  return (
    <div className="glass-card" style={styles.container}>
      {/* Header Info */}
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>Decentralized Permit Issuance</h3>
          <p style={styles.subtitle}>GovChain Permit MVP • Base Network Integration</p>
        </div>
        <div style={styles.actions}>
          {status === 'idle' && (
            <button onClick={startSimulation} style={styles.startBtn}>
              <Play size={14} fill="#030712" />
              Issue License Permit
            </button>
          )}
          {status === 'verified' && (
            <button onClick={resetSimulation} style={styles.resetBtn}>
              <RotateCcw size={14} />
              Reset Flow
            </button>
          )}
          {status === 'running' && (
            <div style={styles.runningBadge}>
              <Loader2 size={14} className="spin-loader" />
              Minting Node Active...
            </div>
          )}
        </div>
      </div>

      {/* Simulator Visual Pipeline */}
      <div style={styles.pipeline}>
        {steps.map((step, idx) => {
          const isCompleted = currentStep > idx || status === 'verified';
          const isActive = currentStep === idx && status !== 'verified';
          
          return (
            <div key={step.id} style={styles.stepRow}>
              {/* Progress Node */}
              <div style={styles.nodeColumn}>
                <div style={{
                  ...styles.nodeCircle,
                  borderColor: isCompleted ? 'var(--accent-teal)' : isActive ? 'var(--accent-cyan)' : 'var(--border-color)',
                  backgroundColor: isCompleted ? 'rgba(45, 212, 191, 0.1)' : isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                  color: isCompleted ? 'var(--accent-teal)' : isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                }}>
                  {isCompleted ? <Check size={14} strokeWidth={3} /> : step.icon}
                </div>
                {idx < steps.length - 1 && (
                  <div style={{
                    ...styles.nodeLine,
                    backgroundColor: isCompleted ? 'var(--accent-teal)' : 'var(--border-color)',
                  }} />
                )}
              </div>

              {/* Progress Details */}
              <div style={styles.detailsColumn}>
                <span style={{
                  ...styles.stepLabel,
                  color: isCompleted ? '#ffffff' : isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)'
                }}>
                  {step.label}
                </span>
                <p style={styles.stepDesc}>{step.desc}</p>
                
                {/* Embedded simulation outputs */}
                <AnimatePresence>
                  {isActive && idx === 0 && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={styles.logOutput}>
                      <code>[INFO] Connection verified with SSW Alfa API... OK</code>
                    </motion.div>
                  )}
                  {isCompleted && idx === 1 && txDetails.ipfsHash && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.logOutput}>
                      <code>CID: <span style={{ color: 'var(--accent-zinc)' }}>{txDetails.ipfsHash.slice(0, 16)}...</span></code>
                    </motion.div>
                  )}
                  {isCompleted && idx === 2 && txDetails.hash && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.logOutput}>
                      <code>Tx: <span style={{ color: 'var(--accent-cyan)' }}>{txDetails.hash.slice(0, 16)}...</span></code>
                      <br />
                      <code>Token ID: <span style={{ color: '#818cf8' }}>{txDetails.tokenId}</span></code>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verified Banner */}
      <AnimatePresence>
        {status === 'verified' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={styles.verifiedBanner}
          >
            <div style={styles.verifiedLeft}>
              <div style={styles.successDot} />
              <div>
                <span style={styles.verifiedTitle}>Verification Speeds Improved by 95%</span>
                <p style={styles.verifiedDesc}>Permits are fully auditable & cryptographically secure in real-time.</p>
              </div>
            </div>
            <div style={styles.qrCodeWrapper}>
              <QrCode size={40} style={{ color: '#030712' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spin-loader {
          animation: spin 1s linear infinite;
        }
      `}</style>
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
  title: {
    fontSize: '1.05rem',
    fontWeight: 600,
    color: '#ffffff',
  },
  subtitle: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  startBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#ffffff',
    color: '#030712',
    border: '1px solid #ffffff',
    borderRadius: '6px',
    padding: '6px 14px',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
    boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
  },
  resetBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    color: '#ffffff',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    padding: '6px 14px',
    fontSize: '0.8rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'var(--transition-snappy)',
  },
  runningBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    color: 'var(--accent-cyan)',
    border: '1px solid rgba(56, 189, 248, 0.2)',
    borderRadius: '6px',
    padding: '6px 14px',
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  pipeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  stepRow: {
    display: 'flex',
    gap: '16px',
  },
  nodeColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '32px',
  },
  nodeCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  nodeLine: {
    width: '1px',
    flexGrow: 1,
    minHeight: '28px',
    transition: 'background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  detailsColumn: {
    flex: 1,
    paddingTop: '4px',
    paddingBottom: '20px',
  },
  stepLabel: {
    fontSize: '0.85rem',
    fontWeight: 600,
    transition: 'color 0.4s ease',
  },
  stepDesc: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    marginTop: '2px',
  },
  logOutput: {
    backgroundColor: '#000000',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '6px',
    padding: '8px 12px',
    marginTop: '10px',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    overflowX: 'auto',
  },
  verifiedBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '16px 20px',
    color: '#030712',
    boxShadow: '0 10px 30px rgba(255,255,255,0.1)',
  },
  verifiedLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  successDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    animation: 'pulse-slow 1.5s infinite alternate',
  },
  verifiedTitle: {
    fontSize: '0.85rem',
    fontWeight: 700,
    display: 'block',
  },
  verifiedDesc: {
    fontSize: '0.75rem',
    opacity: 0.8,
  },
  qrCodeWrapper: {
    padding: '6px',
    backgroundColor: '#f3f4f6',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
