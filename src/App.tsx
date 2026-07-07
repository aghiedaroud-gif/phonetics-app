import { useState } from 'react';

// Audio streaming source dictionary
const AUDIO_SOURCES: Record<string, string> = {
  sv1: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Near-close_near-front_unrounded_vowel.ogg",
  sv2: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Open-mid_front_unrounded_vowel.ogg",
  sv3: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Near-open_front_unrounded_vowel.ogg",
  sv4: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Open-mid_back_unrounded_vowel.ogg",
  sv5: "https://upload.wikimedia.org/wikipedia/commons/1/12/Open_back_rounded_vowel.ogg",
  sv6: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Near-close_near-back_rounded_vowel.ogg",
  schwa: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Mid-central_vowel.ogg",
  p: "https://upload.wikimedia.org/wikipedia/commons/5/51/Voiceless_bilabial_plosive.ogg",
  b: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Voiced_bilabial_plosive.ogg",
  f: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Voiceless_labiodental_fricative.ogg",
  v: "https://upload.wikimedia.org/wikipedia/commons/8/85/Voiced_labiodental_fricative.ogg"
};

export default function App() {
  const [activeTab, setActiveTab] = useState('tract');
  const [playingKey, setPlayingKey] = useState<string | null>(null);

  const playSound = (key: string) => {
    if (!AUDIO_SOURCES[key]) return;
    setPlayingKey(key);
    const audio = new Audio(AUDIO_SOURCES[key]);
    audio.play().catch(err => console.log("Audio playback error:", err));
    audio.onended = () => setPlayingKey(null);
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans">
      {/* SIDEBAR NAVIGATION */}
      <div className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="h-8 w-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-lg">Ω</div>
            <h1 className="text-lg font-bold tracking-tight">Phonetics Lab</h1>
          </div>
          
          <nav className="space-y-1">
            {[
              { id: 'tract', label: '1. Vocal Tract Anatomy' },
              { id: 'sounds', label: '2. Consonants & Vowels' },
              { id: 'syllables', label: '3. Syllable Practice' },
              { id: 'stress', label: '4. Word Stress Rules' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          Course Reference Dashboard
        </div>
      </div>

      {/* MAIN CONTENT WINDOW */}
      <div className="flex-1 overflow-y-auto bg-slate-900 p-8">
        <div className="max-w-4xl mx-auto">

          {/* PAGE 1: VOCAL TRACT ANATOMY */}
          {activeTab === 'tract' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Module 1</span>
                <h2 className="text-3xl font-bold tracking-tight text-slate-100 mt-1">The Production of Speech Sounds</h2>
                <p className="text-slate-400 mt-2">Study the structural equipment used above the larynx to shape airflow into phonemes.</p>
              </div>

              <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2 bg-slate-900 rounded-lg p-4 flex items-center justify-center border border-slate-800">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/36/VocalTract.svg" 
                    alt="Anatomy of the Human Vocal Tract" 
                    className="h-64 object-contain invert opacity-85"
                  />
                </div>
                <div className="w-full md:w-1/2 space-y-3">
                  <h3 className="text-lg font-semibold text-slate-200">The 7 Main Articulators</h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li><strong className="text-indigo-400">1. Pharynx:</strong> The tube immediately above the larynx.</li>
                    <li><strong className="text-indigo-400">2. Velum (Soft Palate):</strong> Allows air to pass through the nose or mouth.</li>
                    <li><strong className="text-indigo-400">3. Hard Palate:</strong> The smooth, bony roof shield of the mouth.</li>
                    <li><strong className="text-indigo-400">4. Alveolar Ridge:</strong> The tooth socket architecture directly behind the upper teeth.</li>
                    <li><strong className="text-indigo-400">5. Tongue:</strong> Divided into Tip, Blade, Front, Back, and Root fields.</li>
                    <li><strong className="text-indigo-400">6. Teeth:</strong> Upper and lower barriers that establish contact points.</li>
                    <li><strong className="text-indigo-400">7. Lips:</strong> Can be spread, neutral, or rounded to dictate resonance.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 2: CONSONANTS & VOWELS */}
          {activeTab === 'sounds' && (
            <div className="space-y-8">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Module 2</span>
                <h2 className="text-3xl font-bold tracking-tight text-slate-100 mt-1">Phoneme Inventory & Audio Playback</h2>
                <p className="text-slate-400 mt-2">Click any row code with a speaker icon to hear standard RP audio streaming representations directly.</p>
              </div>

              {/* VOWELS REFERENCE */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 space-y-4">
                <h3 className="text-xl font-bold text-slate-200">Short Vowel Reference Codes (SV)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'sv1', code: 'SV1', sym: '/ɪ/', ex: 'bit, bid, him, miss, hit, with' },
                    { id: 'sv2', code: 'SV2', sym: '/e/', ex: 'bet, bed, hen, mess, red, met' },
                    { id: 'sv3', code: 'SV3', sym: '/æ/', ex: 'bat, bad, ham, mass, cat, hat' },
                    { id: 'sv4', code: 'SV4', sym: '/ʌ/', ex: 'cut, bud, bun, bus, but, some' },
                    { id: 'sv5', code: 'SV5', sym: '/ɒ/', ex: 'pot, cod, Tom, loss, cross, gone' },
                    { id: 'sv6', code: 'SV6', sym: '/ʊ/', ex: 'put, wood, pull, push, foot, look' },
                    { id: 'schwa', code: 'Schwa', sym: '/ə/', ex: 'about, upper, oppose, perhaps, better' },
                  ].map((v) => (
                    <div key={v.id} className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold px-2 py-0.5 bg-slate-800 text-slate-400 rounded">{v.code}</span>
                          <span className="text-lg font-mono font-bold text-emerald-400">{v.sym}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 font-medium">{v.ex}</p>
                      </div>
                      <button 
                        onClick={() => playSound(v.id)}
                        className={`p-2 rounded-full border text-sm transition-colors ${
                          playingKey === v.id 
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        🔊
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* CONSONANT THREE-NUMBER SYSTEM */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-6">
                <h3 className="text-xl font-bold text-slate-200 mb-4">Consonant Taxonomy Codes (Voicing, Place, Manner)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-medium">
                        <th className="pb-3">Phoneme</th>
                        <th className="pb-3">Taxonomy Label</th>
                        <th className="pb-3 text-center">Code Matrix</th>
                        <th className="pb-3">Textbook Examples</th>
                        <th className="pb-3 text-right">Stream</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {[
                        { id: 'p', sym: '/p/', label: 'Voiceless, Bilabial, Plosive', code: '(1, 1, 1)', ex: 'pea, pin, pen' },
                        { id: 'b', sym: '/b/', label: 'Voiced, Bilabial, Plosive', code: '(2, 1, 1)', ex: 'bee, bed, rub' },
                        { id: 't', sym: '/t/', label: 'Voiceless, Alveolar, Plosive', code: '(1, 4, 1)', ex: 'toe, tea, hit' },
                        { id: 'f', sym: '/f/', label: 'Voiceless, Labiodental, Fricative', code: '(1, 2, 2)', ex: 'fat, fish, safe' },
                        { id: 'v', sym: '/v/', label: 'Voiced, Labiodental, Fricative', code: '(2, 2, 2)', ex: 'vat, van, save' },
                      ].map((c) => (
                        <tr key={c.id} className="hover:bg-slate-800/30">
                          <td className="py-3 font-mono text-emerald-400 font-bold text-lg">{c.sym}</td>
                          <td className="py-3 text-slate-300">{c.label}</td>
                          <td className="py-3 text-center font-mono text-slate-400">{c.code}</td>
                          <td className="py-3 text-slate-400 italic">{c.ex}</td>
                          <td className="py-3 text-right">
                            <button 
                              onClick={() => playSound(c.id)}
                              className={`p-1.5 rounded text-sm transition-colors ${
                                playingKey === c.id 
                                  ? 'bg-emerald-500/20 text-emerald-400' 
                                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              🔊
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 3: PRACTICE EXERCISES & SYLLABLES */}
          {activeTab === 'syllables' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Module 3</span>
                <h2 className="text-3xl font-bold tracking-tight text-slate-100 mt-1">Syllable Structural Analysis</h2>
                <p className="text-slate-400 mt-2">Review how consonant clustering works under the max limits of English phonotactics (Max 3 Onset, Max 4 Coda).</p>
              </div>

              {/* MODEL CASE */}
              <div className="bg-slate-950 p-6 rounded-xl border border-indigo-500/20 bg-gradient-to-br from-slate-950 to-indigo-950/20">
                <h3 className="text-sm font-bold text-indigo-400 tracking-wider uppercase mb-3">Model Analysis Case: 'cramped'</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <span className="block text-xs font-semibold text-slate-500 uppercase">Onset</span>
                    <span className="text-lg font-mono font-bold text-slate-200">k, r</span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">(Initial + Post-Initial)</span>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <span className="block text-xs font-semibold text-slate-500 uppercase">Peak</span>
                    <span className="text-lg font-mono font-bold text-emerald-400">æ</span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">(Vowel Center)</span>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <span className="block text-xs font-semibold text-slate-500 uppercase">Coda</span>
                    <span className="text-lg font-mono font-bold text-slate-200">m, p, t</span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">(Pre-Final + Final + Post-Final)</span>
                  </div>
                </div>
              </div>

              {/* STUDY TASKS SHEET */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-200">Textbook Exercise Solutions</h3>
                <div className="divide-y divide-slate-800 text-sm">
                  {[
                    { w: "squealed /skwi:ld/", o: "s (Pre-initial) + k (Initial) + w (Post-initial)", p: "i: (Long Vowel)", c: "l (Pre-final) + d (Final)" },
                    { w: "eighths /eɪtθs/", o: "Zero Onset", p: "eɪ (Diphthong)", c: "t (Final) + θ (Post-final 1) + s (Post-final 2)" },
                    { w: "splash /splæʃ/", o: "s (Pre-initial) + p (Initial) + l (Post-initial)", p: "æ (Short Vowel)", c: "ʃ (Final)" },
                    { w: "texts /teksts/", o: "t (Initial)", p: "e (Short Vowel)", c: "k (Final) + s (Post-final 1) + t (Post-final 2) + s (Post-final 3)" }
                  ].map((ex, idx) => (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-2">
                      <h4 className="font-mono font-bold text-base text-indigo-400">{ex.w}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                        <p className="text-slate-400"><strong className="text-slate-500">Onset:</strong> {ex.o}</p>
                        <p className="text-slate-400"><strong className="text-slate-500">Peak:</strong> {ex.p}</p>
                        <p className="text-slate-400"><strong className="text-slate-500">Coda:</strong> {ex.c}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PAGE 4: WORD STRESS GUIDELINES */}
          {activeTab === 'stress' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Module 4</span>
                <h2 className="text-3xl font-bold tracking-tight text-slate-100 mt-1">Word Stress & Morphological Rules</h2>
                <p className="text-slate-400 mt-2">Review stress markers based on affix behavior, word compounds, and grammatical category pairings.</p>
              </div>

              {/* WORD-CLASS PAIRS RULES */}
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-xl font-bold text-slate-200">The Noun vs. Verb Stress Rule</h3>
                <p className="text-sm text-slate-400">
                  When a prefix-plus-stem pair has an identical spelling, the stress moves to the <strong className="text-indigo-400">first syllable for Nouns/Adjectives</strong>, and shifts to the <strong className="text-emerald-400">second syllable for Verbs</strong>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {[
                    { word: 'Import', noun: "/'ɪmpɔ:t/", verb: "/ɪm'pɔ:t/" },
                    { word: 'Conduct', noun: "/'kɒndʌkt/", verb: "/kən'dʌkt/" },
                    { word: 'Contrast', noun: "/'kɒntrɑ:st/", verb: "/kən'trɑ:st/" },
                    { word: 'Rebel', noun: "/'rebl/", verb: "/rɪ'bel/" },
                    { word: 'Record', noun: "/'rekɔ:d/", verb: "/rɪ'kɔ:d/" },
                  ].map((p, idx) => (
                    <div key={idx} className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex justify-between items-center text-sm">
                      <span className="font-bold text-slate-200">{p.word}</span>
                      <div className="space-y-0.5 text-right font-mono">
                        <div className="text-xs text-slate-400">Noun: <span className="text-indigo-400 font-bold">{p.noun}</span></div>
                        <div className="text-xs text-slate-400">Verb: <span className="text-emerald-400 font-bold">{p.verb}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STRUCTURAL NOTES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-sm space-y-2">
                  <h4 className="font-bold text-slate-200 border-b border-slate-800 pb-2">Compound Word Stress</h4>
                  <ul className="space-y-1.5 text-slate-400 list-disc list-inside">
                    <li><strong className="text-slate-300">Noun + Noun:</strong> Accent lands on the 1st element (e.g., <span className="underline font-medium">'typewriter</span>).</li>
                    <li><strong className="text-slate-300">Adjective + ed:</strong> Accent lands on the 2nd element (e.g., <span className="underline font-medium">heavy-'handed</span>).</li>
                    <li><strong className="text-slate-300">Adverbs:</strong> Accent lands on the final element (e.g., <span className="underline font-medium">head-'first</span>).</li>
                  </ul>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-sm space-y-2">
                  <h4 className="font-bold text-slate-200 border-b border-slate-800 pb-2">Affix Pull Changes</h4>
                  <ul className="space-y-1.5 text-slate-400 list-disc list-inside">
                    <li><strong className="text-slate-300">Suffix \'-ality\':</strong> Attracts main stress natively (e.g., person → <span className="underline font-medium">person\'ality</span>).</li>
                    <li><strong className="text-slate-300">Suffix \'-ic\':</strong> Shifts stress onto the stem syllable immediately preceding it (e.g., magnet → <span className="underline font-medium">mag\'netic</span>).</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}