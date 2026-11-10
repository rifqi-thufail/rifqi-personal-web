import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Cpu, Database, Loader2, Play, QrCode, RotateCcw, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

const STEPS = [
  { label: 'Metadata Validation', desc: 'Analyzing license metadata for SSW Alfa integration', Icon: ShieldCheck },
  { label: 'IPFS Storage Pinning', desc: 'Securing structural logs off-chain on decentralized storage', Icon: Database },
  { label: 'ERC-721 Base Minting', desc: 'Deploying non-fungible certificate on Base Network L2', Icon: Cpu },
  { label: 'QR Code Generated', desc: 'Secure verification signature compiled in under 1 hour', Icon: QrCode },
];

const MOCK_IPFS = 'QmXoypizjW3WknFixtnd47F68B6E32f9Zuf2yVpA8Yt92a';
const MOCK_TX = '0xfa39bdc8c2273b7e77a28e83344d5c192f15598177df83ee10d0263f31fb40f4';
const EMPTY_TX = { hash: '', ipfsHash: '', tokenId: '' };

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function GovChainSimulator() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'running' | 'verified'
  const [currentStep, setCurrentStep] = useState(-1);
  const [txDetails, setTxDetails] = useState(EMPTY_TX);

  const startSimulation = async () => {
    setStatus('running');

    // Step 0: validate metadata
    setCurrentStep(0);
    await wait(1200);

    // Step 1: upload to IPFS
    setCurrentStep(1);
    setTxDetails((prev) => ({ ...prev, ipfsHash: MOCK_IPFS }));
    await wait(1400);

    // Step 2: mint ERC-721
    setCurrentStep(2);
    const tokenId = Math.floor(Math.random() * 89999) + 10000;
    setTxDetails((prev) => ({ ...prev, hash: MOCK_TX, tokenId: String(tokenId) }));
    await wait(1800);

    // Step 3: QR code verification
    setCurrentStep(3);
    setStatus('verified');
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#2a63f6', '#7aa2ff', '#e0213a', '#ffffff'],
      disableForReducedMotion: true,
    });
  };

  const resetSimulation = () => {
    setStatus('idle');
    setCurrentStep(-1);
    setTxDetails(EMPTY_TX);
  };

  return (
    <div className="card sim">
      <div className="sim__header">
        <div>
          <h4 className="sim__title">Decentralized Permit Issuance</h4>
          <p className="sim__subtitle">GovChain Permit MVP • Base Network Integration</p>
        </div>
        <div aria-live="polite">
          {status === 'idle' && (
            <button type="button" className="btn btn-primary btn-sm" onClick={startSimulation}>
              <Play size={13} fill="currentColor" aria-hidden="true" />
              Issue License Permit
            </button>
          )}
          {status === 'running' && (
            <span className="sim__status">
              <Loader2 size={14} className="spin" aria-hidden="true" />
              Minting Node Active...
            </span>
          )}
          {status === 'verified' && (
            <button type="button" className="btn btn-secondary btn-sm" onClick={resetSimulation}>
              <RotateCcw size={14} aria-hidden="true" />
              Reset Flow
            </button>
          )}
        </div>
      </div>

      <ol>
        {STEPS.map(({ label, desc, Icon }, idx) => {
          const isDone = currentStep > idx || status === 'verified';
          const isActive = currentStep === idx && status !== 'verified';

          return (
            <li key={label} className={`sim__step${isDone ? ' is-done' : isActive ? ' is-active' : ''}`}>
              <div className="sim__rail" aria-hidden="true">
                <div className="sim__node">{isDone ? <Check size={15} strokeWidth={3} /> : <Icon size={16} />}</div>
                {idx < STEPS.length - 1 && <div className="sim__line" />}
              </div>

              <div className="sim__body">
                <p className="sim__label">{label}</p>
                <p className="sim__desc">{desc}</p>

                <AnimatePresence>
                  {isActive && idx === 0 && (
                    <motion.div
                      className="sim__log"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <code>[INFO] Connection verified with SSW Alfa API... OK</code>
                    </motion.div>
                  )}
                  {isDone && idx === 1 && txDetails.ipfsHash && (
                    <motion.div className="sim__log" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <code>
                        CID: <span>{txDetails.ipfsHash.slice(0, 16)}...</span>
                      </code>
                    </motion.div>
                  )}
                  {isDone && idx === 2 && txDetails.hash && (
                    <motion.div className="sim__log" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <code>
                        Tx: <span>{txDetails.hash.slice(0, 16)}...</span>
                      </code>
                      <code>
                        Token ID: <span>{txDetails.tokenId}</span>
                      </code>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ol>

      <AnimatePresence>
        {status === 'verified' && (
          <motion.div
            className="sim__verified"
            role="status"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
          >
            <div>
              <strong>Verification Speeds Improved by 95%</strong>
              <p>Permits are fully auditable &amp; cryptographically secure in real-time.</p>
            </div>
            <div className="sim__qr" aria-hidden="true">
              <QrCode size={40} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
