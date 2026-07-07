import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type VowelPoint = {
  name: string;
  ipa: string;
  x: number;
  y: number;
  kind: 'short' | 'long' | 'diphthong';
  description: string;
  glideTo?: { x: number; y: number };
};

const vowelPoints: VowelPoint[] = [
  { name: 'Kit', ipa: '/ɪ/', x: 24, y: 30, kind: 'short', description: 'Short front close vowel' },
  { name: 'Dress', ipa: '/e/', x: 34, y: 42, kind: 'short', description: 'Short front half-close vowel' },
  { name: 'Trap', ipa: '/æ/', x: 38, y: 60, kind: 'short', description: 'Short front open vowel' },
  { name: 'Strut', ipa: '/ʌ/', x: 54, y: 60, kind: 'short', description: 'Short central open vowel' },
  { name: 'Foot', ipa: '/ʊ/', x: 72, y: 34, kind: 'short', description: 'Short back close vowel' },
  { name: 'Lot', ipa: '/ɒ/', x: 74, y: 68, kind: 'short', description: 'Short back open rounded vowel' },
  { name: 'Fleece', ipa: '/iː/', x: 24, y: 16, kind: 'long', description: 'Long close front vowel' },
  { name: 'Face', ipa: '/eɪ/', x: 34, y: 32, kind: 'diphthong', description: 'Diphthong gliding from mid front to close front', glideTo: { x: 24, y: 18 } },
  { name: 'Goose', ipa: '/uː/', x: 76, y: 16, kind: 'long', description: 'Long close back rounded vowel' },
  { name: 'Thought', ipa: '/ɔː/', x: 74, y: 52, kind: 'long', description: 'Long mid back rounded vowel' },
  { name: 'Nurse', ipa: '/ɜː/', x: 53, y: 28, kind: 'long', description: 'Long central vowel' },
  { name: 'Start', ipa: '/ɑː/', x: 78, y: 72, kind: 'long', description: 'Long back open vowel' },
  { name: 'Price', ipa: '/aɪ/', x: 42, y: 72, kind: 'diphthong', description: 'Diphthong gliding toward /ɪ/', glideTo: { x: 24, y: 30 } },
  { name: 'Choice', ipa: '/ɔɪ/', x: 68, y: 44, kind: 'diphthong', description: 'Diphthong gliding toward /ɪ/', glideTo: { x: 24, y: 30 } },
  { name: 'Mouth', ipa: '/aʊ/', x: 70, y: 64, kind: 'diphthong', description: 'Diphthong gliding toward /ʊ/', glideTo: { x: 72, y: 34 } },
  { name: 'Near', ipa: '/ɪə/', x: 28, y: 24, kind: 'diphthong', description: 'Diphthong gliding toward a central vowel' },
  { name: 'Square', ipa: '/eə/', x: 40, y: 40, kind: 'diphthong', description: 'Diphthong gliding toward /ə/' },
  { name: 'Cure', ipa: '/ʊə/', x: 70, y: 24, kind: 'diphthong', description: 'Diphthong gliding toward /ə/' },
  { name: 'Happy', ipa: '/i/', x: 24, y: 24, kind: 'short', description: 'Front close short vowel in unstressed syllables' },
  { name: 'Comma', ipa: '/ə/', x: 53, y: 44, kind: 'short', description: 'Central unstressed vowel' },
];

const heightLabels = ['Open', 'Half-open', 'Half-close', 'Close'];
const positionLabels = ['Back', 'Central', 'Front'];
const lipLabels = ['Rounded', 'Neutral', 'Spread'];

function VowelQuadrilateral() {
  const [height, setHeight] = useState(2);
  const [position, setPosition] = useState(2);
  const [lipShape, setLipShape] = useState(2);

  const focusSummary = useMemo(() => {
    const heightLabel = heightLabels[height];
    const positionLabel = positionLabels[position];
    const lipLabel = lipLabels[lipShape];
    return `You are exploring a ${heightLabel.toLowerCase()} ${positionLabel.toLowerCase()} vowel with ${lipLabel.toLowerCase()} lips.`;
  }, [height, position, lipShape]);

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-4 shadow-2xl shadow-slate-950/50 sm:p-6">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Module 3</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Vowel quadrilateral</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
          Move the controls to explore RP vowel space and see how diphthongs glide across the chart.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-800 bg-slate-950/70 p-3 sm:p-4">
          <svg viewBox="0 0 100 100" className="w-full rounded-[24px] border border-slate-800 bg-slate-900/80">
            <line x1="10" y1="90" x2="90" y2="90" stroke="#e2e8f0" strokeWidth="0.7" />
            <line x1="10" y1="90" x2="10" y2="10" stroke="#e2e8f0" strokeWidth="0.7" />
            <line x1="10" y1="90" x2="90" y2="10" stroke="#e2e8f0" strokeWidth="0.7" />
            <line x1="10" y1="90" x2="90" y2="50" stroke="#e2e8f0" strokeWidth="0.7" />
            <line x1="10" y1="50" x2="90" y2="10" stroke="#e2e8f0" strokeWidth="0.7" />

            {[20, 40, 60, 80].map((y) => (
              <line key={y} x1="10" y1={y} x2="90" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" />
            ))}

            {vowelPoints.map((point) => {
              if (point.kind === 'diphthong' && point.glideTo) {
                return (
                  <motion.g key={`${point.ipa}-arrow`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <line x1={point.x} y1={point.y} x2={point.glideTo.x} y2={point.glideTo.y} stroke="#34d399" strokeWidth="0.8" strokeDasharray="1.5 1.2" />
                    <circle cx={point.x} cy={point.y} r="1.7" fill="#f59e0b" />
                    <circle cx={point.glideTo.x} cy={point.glideTo.y} r="1.3" fill="#34d399" />
                  </motion.g>
                );
              }
              return (
                <g key={point.ipa}>
                  <circle cx={point.x} cy={point.y} r="1.4" fill="#f8fafc" />
                  <circle cx={point.x} cy={point.y} r="0.9" fill="#38bdf8" />
                </g>
              );
            })}

            <circle cx={20 + position * 25} cy={20 + height * 16} r="2.2" fill="#f43f5e" />
          </svg>
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-lg font-semibold text-white">Explore vowel space</h3>
            <div className="mt-4 space-y-4">
              <label className="block">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Tongue Height</span>
                  <span className="text-emerald-300">{heightLabels[height]}</span>
                </div>
                <input type="range" min="0" max="3" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full accent-emerald-400" />
              </label>
              <label className="block">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Tongue Position</span>
                  <span className="text-emerald-300">{positionLabels[position]}</span>
                </div>
                <input type="range" min="0" max="2" value={position} onChange={(e) => setPosition(Number(e.target.value))} className="w-full accent-emerald-400" />
              </label>
              <label className="block">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Lip Shape</span>
                  <span className="text-emerald-300">{lipLabels[lipShape]}</span>
                </div>
                <input type="range" min="0" max="2" value={lipShape} onChange={(e) => setLipShape(Number(e.target.value))} className="w-full accent-emerald-400" />
              </label>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-lg font-semibold text-white">Current focus</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{focusSummary}</p>
            <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-sm text-emerald-100">
              Example vowels nearby include /ɪ/, /e/, /uː/, and the diphthongs /eɪ/ and /aɪ/.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VowelQuadrilateral;
