import { useMemo, useState } from 'react';

type RuleCard = {
  title: string;
  description: string;
  example: string;
  pattern: string;
};

const affixRules: RuleCard[] = [
  { title: 'Suffix -ality', description: 'The suffix -ality draws primary stress to itself.', example: 'person → personality', pattern: 'per-son-al-i-ty' },
  { title: 'Suffix -ic', description: 'The suffix -ic shifts stress to the preceding syllable.', example: 'magnet → magnetic', pattern: 'mag-net-ic' },
];

const compoundRules: RuleCard[] = [
  { title: 'Noun + noun', description: 'The first element carries the main stress.', example: 'typewriter', pattern: 'TYPE-writer' },
  { title: 'Adjective + -ed', description: 'The second element carries the main stress.', example: 'heavy-handed', pattern: 'heavy-HAND-ed' },
];

function StressSandbox() {
  const [word, setWord] = useState('personality');
  const [mode, setMode] = useState<'affix' | 'compound' | 'wordclass'>('affix');
  const [wordClass, setWordClass] = useState<'noun' | 'verb'>('noun');

  const analysis = useMemo(() => {
    const normalized = word.toLowerCase();
    if (normalized.endsWith('ality')) {
      return { title: 'Affix rule', detail: 'The -ality suffix pulls stress to the final syllable.', preview: normalized.replace(/ality$/, 'AL-i-ty') };
    }
    if (normalized.endsWith('ic')) {
      return { title: 'Affix rule', detail: 'The -ic suffix shifts stress to the preceding syllable.', preview: normalized.replace(/ic$/, 'ic') };
    }
    if (normalized.includes('typewriter')) {
      return { title: 'Compound rule', detail: 'This is a noun + noun compound, so the first element is stressed.', preview: 'TYPE-writer' };
    }
    if (normalized.includes('handed')) {
      return { title: 'Compound rule', detail: 'This is an adjective + -ed compound, so the second element is stressed.', preview: 'heavy-HAND-ed' };
    }
    if (normalized === 'import' || normalized === 'rebel') {
      return {
        title: 'Word-class rule',
        detail: wordClass === 'noun' ? 'As a noun, the stress falls on the first syllable.' : 'As a verb, the stress falls on the second syllable.',
        preview: wordClass === 'noun' ? `${normalized}`.replace('import', 'IM-port') : `${normalized}`.replace('import', 'im-PORT'),
      };
    }
    return { title: 'Pattern note', detail: 'Try one of the example patterns above to test the stress rules.', preview: normalized };
  }, [word, wordClass]);

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-4 shadow-2xl shadow-slate-950/50 sm:p-6">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Module 5</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Word stress sandbox</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
          Test how stress shifts in affixes, compounds, and word-class pairs such as import and rebel.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[28px] border border-slate-800 bg-slate-950/70 p-4">
          <label className="block text-sm font-semibold text-slate-200">
            Enter a word or compound
            <input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Try personality, typewriter, import..."
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-3 text-slate-100 outline-none ring-0"
            />
          </label>

          <div className="mt-4 flex flex-wrap gap-2">
            {(['affix', 'compound', 'wordclass'] as const).map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                className={`rounded-full px-3 py-2 text-sm transition ${mode === item ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300'}`}
              >
                {item === 'affix' ? 'Affixes' : item === 'compound' ? 'Compounds' : 'Word class'}
              </button>
            ))}
          </div>

          {mode === 'wordclass' && (
            <div className="mt-4 flex gap-2">
              {(['noun', 'verb'] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setWordClass(item)}
                  className={`rounded-full px-3 py-2 text-sm transition ${wordClass === item ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300'}`}
                >
                  {item === 'noun' ? 'Noun' : 'Verb'}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-lg font-semibold text-white">Current analysis</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{analysis.detail}</p>
            <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-sm text-emerald-100">
              <span className="font-semibold">Preview:</span> {analysis.preview}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-lg font-semibold text-white">Useful rules</h3>
            <div className="mt-3 space-y-3">
              {(mode === 'affix' ? affixRules : mode === 'compound' ? compoundRules : [
                { title: 'Word-class pair', description: 'Nouns usually stress the first syllable; verbs often stress the second.', example: 'import /ˈɪmpɔːt/ vs /ɪmˈpɔːt/', pattern: 'Noun first / Verb second' },
              ]).map((rule) => (
                <div key={rule.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                  <p className="text-sm font-semibold text-white">{rule.title}</p>
                  <p className="mt-1 text-sm text-slate-300">{rule.description}</p>
                  <p className="mt-2 text-sm text-emerald-200">Example: {rule.example}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-500">{rule.pattern}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StressSandbox;
