import { useState } from 'react';

type Consonant = {
  ipa: string;
  orth: string;
  place: string;
  manner: string;
  voiced: boolean;
  description: string;
};

const consonants: Consonant[] = [
  { ipa: '/p/', orth: 'p', place: 'Bilabial', manner: 'Plosive', voiced: false, description: 'Voiceless bilabial plosive' },
  { ipa: '/b/', orth: 'b', place: 'Bilabial', manner: 'Plosive', voiced: true, description: 'Voiced bilabial plosive' },
  { ipa: '/t/', orth: 't', place: 'Alveolar', manner: 'Plosive', voiced: false, description: 'Voiceless alveolar plosive' },
  { ipa: '/d/', orth: 'd', place: 'Alveolar', manner: 'Plosive', voiced: true, description: 'Voiced alveolar plosive' },
  { ipa: '/k/', orth: 'k', place: 'Velar', manner: 'Plosive', voiced: false, description: 'Voiceless velar plosive' },
  { ipa: '/g/', orth: 'g', place: 'Velar', manner: 'Plosive', voiced: true, description: 'Voiced velar plosive' },
  { ipa: '/f/', orth: 'f', place: 'Labiodental', manner: 'Fricative', voiced: false, description: 'Voiceless labiodental fricative' },
  { ipa: '/v/', orth: 'v', place: 'Labiodental', manner: 'Fricative', voiced: true, description: 'Voiced labiodental fricative' },
  { ipa: '/θ/', orth: 'th', place: 'Dental', manner: 'Fricative', voiced: false, description: 'Voiceless dental fricative' },
  { ipa: '/ð/', orth: 'th', place: 'Dental', manner: 'Fricative', voiced: true, description: 'Voiced dental fricative' },
  { ipa: '/s/', orth: 's', place: 'Alveolar', manner: 'Fricative', voiced: false, description: 'Voiceless alveolar fricative' },
  { ipa: '/z/', orth: 'z', place: 'Alveolar', manner: 'Fricative', voiced: true, description: 'Voiced alveolar fricative' },
  { ipa: '/ʃ/', orth: 'sh', place: 'Palato-alveolar', manner: 'Fricative', voiced: false, description: 'Voiceless palato-alveolar fricative' },
  { ipa: '/ʒ/', orth: 'zh', place: 'Palato-alveolar', manner: 'Fricative', voiced: true, description: 'Voiced palato-alveolar fricative' },
  { ipa: '/h/', orth: 'h', place: 'Glottal', manner: 'Fricative', voiced: false, description: 'Voiceless glottal fricative' },
  { ipa: '/tʃ/', orth: 'ch', place: 'Palato-alveolar', manner: 'Affricate', voiced: false, description: 'Voiceless affricate' },
  { ipa: '/dʒ/', orth: 'j', place: 'Palato-alveolar', manner: 'Affricate', voiced: true, description: 'Voiced affricate' },
  { ipa: '/m/', orth: 'm', place: 'Bilabial', manner: 'Nasal', voiced: true, description: 'Bilabial nasal' },
  { ipa: '/n/', orth: 'n', place: 'Alveolar', manner: 'Nasal', voiced: true, description: 'Alveolar nasal' },
  { ipa: '/ŋ/', orth: 'ng', place: 'Velar', manner: 'Nasal', voiced: true, description: 'Velar nasal' },
  { ipa: '/l/', orth: 'l', place: 'Alveolar', manner: 'Lateral', voiced: true, description: 'Alveolar lateral approximant' },
  { ipa: '/r/', orth: 'r', place: 'Alveolar', manner: 'Approximant', voiced: true, description: 'Alveolar approximant' },
  { ipa: '/j/', orth: 'y', place: 'Palatal', manner: 'Approximant', voiced: true, description: 'Palatal approximant' },
  { ipa: '/w/', orth: 'w', place: 'Bilabial', manner: 'Approximant', voiced: true, description: 'Bilabial approximant' },
];

const places = ['Bilabial', 'Labiodental', 'Dental', 'Alveolar', 'Palato-alveolar', 'Palatal', 'Velar', 'Glottal'];
const manners = ['Plosive', 'Fricative', 'Affricate', 'Nasal', 'Lateral', 'Approximant'];

function ConsonantMatrix() {
  const [voicingMode, setVoicingMode] = useState<'voiced' | 'voiceless'>('voiceless');

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-4 shadow-2xl shadow-slate-950/50 sm:p-6">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Module 2</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Consonant matrix</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
          Toggle between fortis and lenis sets to see how voicing changes the English consonant system.
        </p>
      </div>

      <div className="rounded-[28px] border border-slate-800 bg-slate-950/70 p-3 sm:p-4">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {(['voiceless', 'voiced'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setVoicingMode(mode)}
              className={`rounded-full px-3 py-2 text-sm transition ${voicingMode === mode ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              {mode === 'voiceless' ? 'Voiceless (Fortis)' : 'Voiced (Lenis)'}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[720px] rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
            <div className="grid grid-cols-[140px_repeat(8,minmax(70px,1fr))] gap-2">
              <div />
              {places.map((place) => (
                <div key={place} className="rounded-xl border border-slate-800 bg-slate-950/80 px-2 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                  {place}
                </div>
              ))}

              {manners.map((manner) => (
                <>
                  <div key={`${manner}-label`} className="flex items-center rounded-xl border border-slate-800 bg-slate-950/80 px-2 py-3 text-sm font-semibold text-slate-200">
                    {manner}
                  </div>
                  {places.map((place) => {
                    const consonant = consonants.find((item) => item.place === place && item.manner === manner);
                    if (!consonant) {
                      return <div key={`${manner}-${place}`} className="h-14 rounded-xl border border-dashed border-slate-800 bg-slate-950/50" />;
                    }
                    const matches = consonant.voiced ? voicingMode === 'voiced' : voicingMode === 'voiceless';
                    return (
                      <div
                        key={`${manner}-${place}`}
                        className={`flex h-14 flex-col items-center justify-center rounded-xl border px-1 py-2 text-center text-xs transition ${matches ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-100' : 'border-slate-800 bg-slate-950/70 text-slate-400'}`}
                      >
                        <span className="text-sm font-semibold">{consonant.ipa}</span>
                        <span className="mt-1 text-[10px] uppercase tracking-[0.2em]">{consonant.orth}</span>
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsonantMatrix;
