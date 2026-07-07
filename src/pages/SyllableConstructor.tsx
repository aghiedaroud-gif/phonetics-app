import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type Slot = 'onset' | 'peak' | 'coda';

type Tile = {
  id: string;
  label: string;
  type: 'consonant' | 'vowel' | 'syllabic';
  ipa: string;
  description: string;
};

type SyllableState = {
  onset: Tile[];
  peak: Tile[];
  coda: Tile[];
};

const initialTiles: Tile[] = [
  { id: 'p', label: 'p', type: 'consonant', ipa: '/p/', description: 'Voiceless bilabial plosive' },
  { id: 'b', label: 'b', type: 'consonant', ipa: '/b/', description: 'Voiced bilabial plosive' },
  { id: 't', label: 't', type: 'consonant', ipa: '/t/', description: 'Voiceless alveolar plosive' },
  { id: 'd', label: 'd', type: 'consonant', ipa: '/d/', description: 'Voiced alveolar plosive' },
  { id: 'k', label: 'k', type: 'consonant', ipa: '/k/', description: 'Voiceless velar plosive' },
  { id: 's', label: 's', type: 'consonant', ipa: '/s/', description: 'Voiceless alveolar fricative' },
  { id: 'm', label: 'm', type: 'consonant', ipa: '/m/', description: 'Bilabial nasal' },
  { id: 'n', label: 'n', type: 'consonant', ipa: '/n/', description: 'Alveolar nasal' },
  { id: 'l', label: 'l', type: 'syllabic', ipa: '/l/', description: 'Lateral approximant' },
  { id: 'ɪ', label: 'ɪ', type: 'vowel', ipa: '/ɪ/', description: 'Short front close vowel' },
  { id: 'æ', label: 'æ', type: 'vowel', ipa: '/æ/', description: 'Short front open vowel' },
  { id: 'u', label: 'u', type: 'vowel', ipa: '/u/', description: 'Close back rounded vowel' },
  { id: 'i', label: 'i', type: 'vowel', ipa: '/i/', description: 'Close front unrounded vowel' },
  { id: 'ɒ', label: 'ɒ', type: 'vowel', ipa: '/ɒ/', description: 'Open back rounded vowel' },
  { id: 'ə', label: 'ə', type: 'vowel', ipa: '/ə/', description: 'Schwa' },
];

const validOnset = ['p', 'b', 't', 'd', 'k', 's', 'm', 'n', 'l', 'pl', 'pr', 'sp', 'st', 'sk', 'kl', 'kr', 'tr', 'tw'];
const validCoda = ['p', 'b', 't', 'd', 'k', 's', 'm', 'n', 'l', 'ts', 'tʃ', 'pt', 'kt', 'nd', 'nt', 'ns', 'st', 'sk', 'ps'];

function isValidPlacement(slot: Slot, tiles: Tile[], newTile: Tile) {
  if (slot === 'peak') {
    return newTile.type === 'vowel' || newTile.type === 'syllabic';
  }

  if (slot === 'onset') {
    if (tiles.length >= 3) {
      return false;
    }

    if (newTile.ipa === '/ŋ/' || newTile.id === 'ŋ') {
      return false;
    }

    const cluster = tiles.map((tile) => tile.id).concat(newTile.id).join('');
    return validOnset.includes(cluster);
  }

  if (slot === 'coda') {
    if (tiles.length >= 4) {
      return false;
    }

    const cluster = tiles.map((tile) => tile.id).concat(newTile.id).join('');
    return validCoda.includes(cluster);
  }

  return true;
}

function SyllableConstructor() {
  const [syllable, setSyllable] = useState<SyllableState>({ onset: [], peak: [], coda: [] });
  const [feedback, setFeedback] = useState('Drag a segment into the onset, peak, or coda zone to build a syllable.');
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);

  const selectedPhoneme = useMemo(() => {
    const ipa = [
      ...syllable.onset.map((tile) => tile.ipa),
      ...syllable.peak.map((tile) => tile.ipa),
      ...syllable.coda.map((tile) => tile.ipa),
    ].join('');

    return ipa || '∅';
  }, [syllable]);

  const handleDrop = (slot: Slot, tile: Tile) => {
    const current = syllable[slot];

    if (!isValidPlacement(slot, current, tile)) {
      setFeedback(`That segment does not fit the ${slot} position in standard RP phonotactics.`);
      return;
    }

    setSyllable((prev) => ({ ...prev, [slot]: [...prev[slot], tile] }));
    setFeedback(`${tile.ipa} added to the ${slot}.`);
  };

  const clearSlot = (slot: Slot) => {
    setSyllable((prev) => ({ ...prev, [slot]: [] }));
    setFeedback(`${slot} cleared.`);
  };

  const renderSlot = (slot: Slot, title: string) => (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <button onClick={() => clearSlot(slot)} className="text-sm text-slate-400 hover:text-white">
          Clear
        </button>
      </div>
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const tileId = event.dataTransfer.getData('text/plain');
          const tile = initialTiles.find((item) => item.id === tileId);
          if (tile) {
            handleDrop(slot, tile);
          }
        }}
        className="min-h-24 rounded-2xl border border-dashed border-slate-700 bg-slate-950/70 p-3"
      >
        {syllable[slot].length ? (
          <div className="flex flex-wrap gap-2">
            {syllable[slot].map((tile, index) => (
              <motion.button
                key={`${slot}-${tile.id}-${index}`}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedTile(tile)}
                className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100"
              >
                {tile.ipa}
              </motion.button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">Drop a segment here.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/50">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Module 4</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Syllable Constructor</h2>
        <p className="mt-3 max-w-3xl text-slate-300">
          Build an English syllable by placing segments into onset, peak, and coda positions. The rules engine checks for basic RP phonotactic constraints.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Syllable skeleton</h3>
              <span className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">{selectedPhoneme}</span>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {renderSlot('onset', 'Onset')}
              {renderSlot('peak', 'Peak')}
              {renderSlot('coda', 'Coda')}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
            <h3 className="text-lg font-semibold text-white">Available segments</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {initialTiles.map((tile) => (
                <motion.button
                  key={tile.id}
                  whileHover={{ scale: 1.03 }}
                  draggable
                  onDragStart={(event: any) => {
                    event.dataTransfer?.setData('text/plain', tile.id);
                    setSelectedTile(tile);
                  }}
                  onClick={() => setSelectedTile(tile)}
                  className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-200"
                >
                  {tile.ipa}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-lg font-semibold text-white">Rules</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>• Onset max: 3 consonants.</li>
              <li>• Coda max: 4 consonants.</li>
              <li>• Peak must contain a vowel or syllabic consonant.</li>
              <li>• /ŋ/ cannot appear in the onset.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-lg font-semibold text-white">Feedback</h3>
            <p className="mt-3 text-sm text-slate-300">{feedback}</p>
            {selectedTile && (
              <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3">
                <p className="text-sm font-semibold text-emerald-200">Selected: {selectedTile.ipa}</p>
                <p className="mt-1 text-sm text-slate-300">{selectedTile.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SyllableConstructor;
