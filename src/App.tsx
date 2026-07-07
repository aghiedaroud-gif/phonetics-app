import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AnatomyOfSpeech from './pages/AnatomyOfSpeech';
import ConsonantMatrix from './pages/ConsonantMatrix';
import SyllableConstructor from './pages/SyllableConstructor';
import VowelQuadrilateral from './pages/VowelQuadrilateral';
import StressSandbox from './pages/StressSandbox';

const modules = [
  { path: '/', label: 'Anatomy' },
  { path: '/consonants', label: 'Consonants' },
  { path: '/vowels', label: 'Vowels' },
  { path: '/syllables', label: 'Syllables' },
  { path: '/stress', label: 'Stress' },
];

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-transparent p-3 text-slate-100 sm:p-4 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:gap-6">
        <aside className="w-full rounded-[28px] border border-white/10 bg-slate-900/80 p-3 shadow-[0_20px_80px_rgba(2,6,23,0.45)] backdrop-blur sm:p-4 lg:w-72">
          <div className="mb-4 rounded-2xl border border-white/10 bg-slate-950/70 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/95 p-1 shadow-inner">
                <img src="/logo.png" alt="Phonetics Lab logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-300">Designed by:</p>
                <h2 className="text-base font-semibold text-white">Phonetics Lab</h2>
              </div>
            </div>
          </div>
          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            {modules.map((module) => (
              <Link
                key={module.path}
                to={module.path}
                className={`rounded-2xl px-3 py-3 text-left text-sm font-medium transition ${location.pathname === module.path ? 'bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/40' : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700'}`}
              >
                {module.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 rounded-[28px] border border-white/10 bg-slate-950/70 p-3 shadow-[0_20px_80px_rgba(2,6,23,0.45)] sm:p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <Routes>
                <Route path="/" element={<AnatomyOfSpeech />} />
                <Route path="/consonants" element={<ConsonantMatrix />} />
                <Route path="/vowels" element={<VowelQuadrilateral />} />
                <Route path="/syllables" element={<SyllableConstructor />} />
                <Route path="/stress" element={<StressSandbox />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
