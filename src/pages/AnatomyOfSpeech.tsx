import { useState } from 'react';
import { motion } from 'framer-motion';

type Hotspot = {
  id: string;
  name: string;
  x: number;
  y: number;
  description: string;
  role: string;
};

const hotspots: Hotspot[] = [
  { id: 'pharynx', name: 'Pharynx', x: 50, y: 18, description: 'The pharyngeal cavity shapes airflow before it leaves the mouth or nose.', role: 'Resonator and passageway' },
  { id: 'velum', name: 'Velum (Soft Palate)', x: 61, y: 32, description: 'Raises to close the nasal passage for oral consonants such as /p/ and /t/.', role: 'Directs airflow through the mouth' },
  { id: 'hard-palate', name: 'Hard Palate', x: 61, y: 42, description: 'The roof of the mouth provides a firm surface for tongue contact.', role: 'Place of articulation for palatal sounds' },
  { id: 'alveolar', name: 'Alveolar Ridge', x: 68, y: 49, description: 'The ridge behind the upper teeth is crucial for alveolar consonants like /t/ and /n/.', role: 'Creates a narrow obstruction for alveolars' },
  { id: 'teeth', name: 'Teeth', x: 74, y: 56, description: 'The upper teeth help form labiodental and dental consonants.', role: 'Creates frictions and contacts' },
  { id: 'lips', name: 'Lips', x: 80, y: 64, description: 'The lips close or round to form bilabial consonants and rounded vowels.', role: 'Shapes oral closure and lip rounding' },
  { id: 'tongue', name: 'Tongue', x: 48, y: 56, description: 'The tongue tip, blade, front, back, and root contact different parts of the vocal tract to form consonants and vowels.', role: 'Primary articulator for most speech sounds' },
];

function AnatomyOfSpeech() {
  const [active, setActive] = useState<Hotspot>(hotspots[0]);

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-4 shadow-2xl shadow-slate-950/50 sm:p-6">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Module 1</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Anatomy of speech</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
          Tap each articulator to inspect how it shapes airflow and helps create consonants in British RP.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-slate-800 bg-slate-950/70 p-3 sm:p-4">
          <svg viewBox="0 0 600 420" className="w-full rounded-[24px] border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
            <rect x="40" y="40" width="520" height="340" rx="24" fill="rgba(15,23,42,0.95)" />
            <path d="M190 120c30-35 85-50 130-46 40 3 78 18 106 48 20 21 27 46 28 71-1 41-24 78-58 108-30 26-72 40-112 38-36-2-72-15-99-42-23-23-35-54-35-84 0-26 8-57 30-84z" fill="rgba(15,118,110,0.25)" stroke="rgba(16,185,129,0.4)" strokeWidth="2" />
            <path d="M210 180c24-20 53-27 84-25 40 3 73 20 93 43-7 27-25 45-48 58-25 14-56 17-83 10-26-7-46-24-58-48 7-14 13-23 12-38z" fill="rgba(15,118,110,0.15)" stroke="rgba(16,185,129,0.3)" strokeWidth="2" />
            <path d="M250 140c5-24 22-41 50-45 15-2 30 0 45 7" stroke="#f8fafc" strokeWidth="3" fill="none" strokeLinecap="round" />
            <rect x="200" y="90" width="80" height="100" rx="22" fill="rgba(248,250,252,0.06)" stroke="#e2e8f0" strokeWidth="2" />
            <path d="M225 190c15 37 15 73 0 111" stroke="#e2e8f0" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M285 190c-14 36-14 73 0 111" stroke="#e2e8f0" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M173 168c10-35 29-61 52-80" stroke="#f8fafc" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M337 164c-11-37-31-63-56-84" stroke="#f8fafc" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M215 224c16 14 40 22 65 22 23 0 47-8 67-23" stroke="#f8fafc" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M248 284c-6 29-17 50-39 73" stroke="#f8fafc" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M286 284c6 29 17 50 39 73" stroke="#f8fafc" strokeWidth="3" fill="none" strokeLinecap="round" />

            {hotspots.map((hotspot) => (
              <motion.button
                key={hotspot.id}
                whileHover={{ scale: 1.08 }}
                onClick={() => setActive(hotspot)}
                className={`absolute h-4 w-4 rounded-full border-2 ${active.id === hotspot.id ? 'border-emerald-300 bg-emerald-400' : 'border-slate-100 bg-slate-900'}`}
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: 'translate(-50%, -50%)' }}
              />
            ))}
          </svg>
        </div>

        <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-4 shadow-2xl shadow-slate-950/40 sm:p-6">
          <h3 className="text-xl font-semibold text-white">Selected articulator</h3>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-emerald-300">{active.name}</p>
          <p className="mt-4 text-base leading-7 text-slate-300">{active.description}</p>
          <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-sm text-emerald-100">
            <span className="font-semibold">Role:</span> {active.role}
          </div>
          <div className="mt-4 space-y-2">
            {hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                onClick={() => setActive(hotspot)}
                className={`block w-full rounded-2xl border px-3 py-2 text-left text-sm transition ${active.id === hotspot.id ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-100' : 'border-slate-800 bg-slate-950/80 text-slate-300 hover:border-slate-700'}`}
              >
                {hotspot.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnatomyOfSpeech;
