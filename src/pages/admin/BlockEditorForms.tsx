import {
  Type, Video, AlertCircle, Link2, Code2, Table2, HelpCircle,
  Heading, List, ChevronDown, Plus, Trash2, GripVertical,
} from 'lucide-react';

export interface BlockData {
  [key: string]: unknown;
}

export const BLOCK_TYPES = [
  { type: 'heading', label: 'Heading', icon: Heading, description: 'Section heading (H2 or H3)' },
  { type: 'text', label: 'Text', icon: Type, description: 'Rich text paragraph' },
  { type: 'list', label: 'List', icon: List, description: 'Bullet or numbered list' },
  { type: 'info_box', label: 'Info Box', icon: AlertCircle, description: 'Callout box (info, warning, tip, success)' },
  { type: 'video', label: 'Video', icon: Video, description: 'YouTube or external video embed' },
  { type: 'resource', label: 'Resource Link', icon: Link2, description: 'External resource card' },
  { type: 'code_block', label: 'Code Block', icon: Code2, description: 'Code snippet with syntax label' },
  { type: 'data_table', label: 'Data Table', icon: Table2, description: 'Table with columns and rows' },
  { type: 'collapsible', label: 'Collapsible', icon: ChevronDown, description: 'Expandable section with content' },
  { type: 'quiz', label: 'Quiz', icon: HelpCircle, description: 'Multiple choice quiz questions' },
] as const;

export type BlockType = typeof BLOCK_TYPES[number]['type'];

export function getDefaultData(type: BlockType): BlockData {
  switch (type) {
    case 'heading': return { text: '', level: 2 };
    case 'text': return { content: '' };
    case 'list': return { items: [''], ordered: false };
    case 'info_box': return { variant: 'info', title: '', content: '' };
    case 'video': return { title: '', url: '', embedUrl: '', description: '', duration: '' };
    case 'resource': return { title: '', url: '', type: 'link', description: '' };
    case 'code_block': return { code: '', language: '' };
    case 'data_table': return { columns: [{ key: 'col1', header: 'Column 1' }], rows: [{ col1: '' }], caption: '' };
    case 'collapsible': return { title: '', content: '', defaultOpen: false };
    case 'quiz': return { questions: [{ question: '', options: ['', ''], correctIndex: 0, explanation: '' }] };
    default: return {};
  }
}

interface FormProps {
  data: BlockData;
  onChange: (data: BlockData) => void;
}

const fc = "w-full px-3 py-2 border border-steel-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all outline-none";
const lc = "block text-xs font-semibold text-steel-600 mb-1";

export function HeadingForm({ data, onChange }: FormProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className={lc}>Heading Text</label>
        <input type="text" value={(data.text as string) || ''} onChange={e => onChange({ ...data, text: e.target.value })} className={fc} placeholder="Section heading..." />
      </div>
      <div>
        <label className={lc}>Level</label>
        <div className="flex gap-2">
          {[2, 3].map(level => (
            <button key={level} type="button" onClick={() => onChange({ ...data, level })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${data.level === level ? 'bg-brand-50 text-brand-700 ring-2 ring-brand-500/30' : 'bg-steel-50 text-steel-600 hover:bg-steel-100'}`}>
              H{level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TextForm({ data, onChange }: FormProps) {
  return (
    <div>
      <label className={lc}>Content</label>
      <textarea value={(data.content as string) || ''} onChange={e => onChange({ ...data, content: e.target.value })} className={fc} rows={5} placeholder="Write your content here. Use blank lines for paragraph breaks." />
      <p className="text-[10px] text-steel-400 mt-1">Separate paragraphs with blank lines.</p>
    </div>
  );
}

export function ListForm({ data, onChange }: FormProps) {
  const items = (data.items as string[]) || [''];
  const updateItem = (index: number, value: string) => { const u = [...items]; u[index] = value; onChange({ ...data, items: u }); };
  const addItem = () => onChange({ ...data, items: [...items, ''] });
  const removeItem = (index: number) => { if (items.length <= 1) return; onChange({ ...data, items: items.filter((_, i) => i !== index) }); };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <label className={lc + ' mb-0'}>List Items</label>
        <label className="flex items-center gap-1.5 cursor-pointer ml-auto">
          <input type="checkbox" checked={!!data.ordered} onChange={e => onChange({ ...data, ordered: e.target.checked })} className="w-3.5 h-3.5 rounded border-steel-300 text-brand-600" />
          <span className="text-[11px] text-steel-500">Numbered</span>
        </label>
      </div>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <GripVertical className="w-3.5 h-3.5 text-steel-300 flex-shrink-0" />
            <span className="text-xs text-steel-400 w-5 text-right flex-shrink-0">{i + 1}.</span>
            <input type="text" value={item} onChange={e => updateItem(i, e.target.value)} className={fc + ' flex-1'} placeholder="List item..." />
            <button type="button" onClick={() => removeItem(i)} className="p-1 text-steel-300 hover:text-danger-500 transition-colors" disabled={items.length <= 1}><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        ))}
      </div>
      <button type="button" onClick={addItem} className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add Item</button>
    </div>
  );
}

export function InfoBoxForm({ data, onChange }: FormProps) {
  const variants = ['info', 'warning', 'success', 'tip'] as const;
  return (
    <div className="space-y-3">
      <div>
        <label className={lc}>Variant</label>
        <div className="flex gap-2">
          {variants.map(v => (
            <button key={v} type="button" onClick={() => onChange({ ...data, variant: v })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${data.variant === v ? 'bg-brand-50 text-brand-700 ring-2 ring-brand-500/30' : 'bg-steel-50 text-steel-600 hover:bg-steel-100'}`}>
              {v}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className={lc}>Title (optional)</label>
        <input type="text" value={(data.title as string) || ''} onChange={e => onChange({ ...data, title: e.target.value })} className={fc} placeholder="Box title..." />
      </div>
      <div>
        <label className={lc}>Content</label>
        <textarea value={(data.content as string) || ''} onChange={e => onChange({ ...data, content: e.target.value })} className={fc} rows={3} placeholder="Box content..." />
      </div>
    </div>
  );
}

export function VideoForm({ data, onChange }: FormProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className={lc}>Video Title</label>
        <input type="text" value={(data.title as string) || ''} onChange={e => onChange({ ...data, title: e.target.value })} className={fc} placeholder="e.g. Getting Started with FRC" />
      </div>
      <div>
        <label className={lc}>Video URL</label>
        <input type="url" value={(data.url as string) || ''} onChange={e => onChange({ ...data, url: e.target.value })} className={fc} placeholder="https://youtube.com/watch?v=..." />
      </div>
      <div>
        <label className={lc}>Embed URL (for YouTube iframes)</label>
        <input type="url" value={(data.embedUrl as string) || ''} onChange={e => onChange({ ...data, embedUrl: e.target.value })} className={fc} placeholder="https://www.youtube.com/embed/..." />
        <p className="text-[10px] text-steel-400 mt-1">Paste the YouTube embed URL. If left blank, system will try to generate from video URL.</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lc}>Duration (optional)</label>
          <input type="text" value={(data.duration as string) || ''} onChange={e => onChange({ ...data, duration: e.target.value })} className={fc} placeholder="e.g. 12:30" />
        </div>
        <div>
          <label className={lc}>Description (optional)</label>
          <input type="text" value={(data.description as string) || ''} onChange={e => onChange({ ...data, description: e.target.value })} className={fc} placeholder="Brief description" />
        </div>
      </div>
    </div>
  );
}

export function ResourceForm({ data, onChange }: FormProps) {
  const types = ['link', 'video', 'pdf', 'tool'] as const;
  return (
    <div className="space-y-3">
      <div>
        <label className={lc}>Title</label>
        <input type="text" value={(data.title as string) || ''} onChange={e => onChange({ ...data, title: e.target.value })} className={fc} placeholder="Resource name..." />
      </div>
      <div>
        <label className={lc}>URL</label>
        <input type="url" value={(data.url as string) || ''} onChange={e => onChange({ ...data, url: e.target.value })} className={fc} placeholder="https://..." />
      </div>
      <div>
        <label className={lc}>Type</label>
        <div className="flex gap-2">
          {types.map(t => (
            <button key={t} type="button" onClick={() => onChange({ ...data, type: t })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${data.type === t ? 'bg-brand-50 text-brand-700 ring-2 ring-brand-500/30' : 'bg-steel-50 text-steel-600 hover:bg-steel-100'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className={lc}>Description (optional)</label>
        <input type="text" value={(data.description as string) || ''} onChange={e => onChange({ ...data, description: e.target.value })} className={fc} placeholder="Brief description of this resource" />
      </div>
    </div>
  );
}

export function CodeBlockForm({ data, onChange }: FormProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className={lc}>Language / Label</label>
        <input type="text" value={(data.language as string) || ''} onChange={e => onChange({ ...data, language: e.target.value })} className={fc} placeholder="e.g. Java, Python, Meeting Agenda Template" />
      </div>
      <div>
        <label className={lc}>Code</label>
        <textarea value={(data.code as string) || ''} onChange={e => onChange({ ...data, code: e.target.value })} className={fc + ' font-mono text-xs'} rows={10} placeholder="Paste code here..." />
      </div>
    </div>
  );
}

interface TableColumn { key: string; header: string; width?: string; }

export function DataTableForm({ data, onChange }: FormProps) {
  const columns = (data.columns as TableColumn[]) || [{ key: 'col1', header: 'Column 1' }];
  const rows = (data.rows as Record<string, string>[]) || [{ col1: '' }];

  const addColumn = () => {
    const key = `col${columns.length + 1}`;
    onChange({ ...data, columns: [...columns, { key, header: `Column ${columns.length + 1}` }], rows: rows.map(r => ({ ...r, [key]: '' })) });
  };
  const removeColumn = (index: number) => {
    if (columns.length <= 1) return;
    const removedKey = columns[index].key;
    onChange({ ...data, columns: columns.filter((_, i) => i !== index), rows: rows.map(r => { const u = { ...r }; delete u[removedKey]; return u; }) });
  };
  const updateColumnHeader = (index: number, header: string) => {
    const c = [...columns]; c[index] = { ...c[index], header }; onChange({ ...data, columns: c });
  };
  const addRow = () => {
    const r: Record<string, string> = {}; columns.forEach(c => { r[c.key] = ''; }); onChange({ ...data, rows: [...rows, r] });
  };
  const removeRow = (index: number) => { if (rows.length <= 1) return; onChange({ ...data, rows: rows.filter((_, i) => i !== index) }); };
  const updateCell = (ri: number, ck: string, val: string) => {
    const r = [...rows]; r[ri] = { ...r[ri], [ck]: val }; onChange({ ...data, rows: r });
  };

  return (
    <div className="space-y-3">
      <div>
        <label className={lc}>Caption (optional)</label>
        <input type="text" value={(data.caption as string) || ''} onChange={e => onChange({ ...data, caption: e.target.value })} className={fc} placeholder="Table caption..." />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={lc + ' mb-0'}>Columns</label>
          <button type="button" onClick={addColumn} className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"><Plus className="w-3 h-3" /> Column</button>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {columns.map((col, i) => (
            <div key={col.key} className="flex items-center gap-1 bg-steel-50 rounded-lg px-2 py-1">
              <input type="text" value={col.header} onChange={e => updateColumnHeader(i, e.target.value)} className="bg-transparent text-xs font-medium text-steel-700 outline-none w-24" />
              <button type="button" onClick={() => removeColumn(i)} className="text-steel-300 hover:text-danger-500" disabled={columns.length <= 1}><Trash2 className="w-3 h-3" /></button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={lc + ' mb-0'}>Rows ({rows.length})</label>
          <button type="button" onClick={addRow} className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"><Plus className="w-3 h-3" /> Row</button>
        </div>
        <div className="overflow-x-auto border border-steel-200 rounded-lg">
          <table className="w-full text-xs">
            <thead><tr className="bg-steel-50">
              {columns.map(col => (<th key={col.key} className="px-2 py-1.5 text-left font-semibold text-steel-600 border-b border-steel-200">{col.header}</th>))}
              <th className="w-8 border-b border-steel-200" />
            </tr></thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-steel-100 last:border-0">
                  {columns.map(col => (<td key={col.key} className="px-1 py-1"><input type="text" value={row[col.key] || ''} onChange={e => updateCell(ri, col.key, e.target.value)} className="w-full px-1.5 py-1 rounded text-xs outline-none focus:ring-1 focus:ring-brand-400" /></td>))}
                  <td className="px-1"><button type="button" onClick={() => removeRow(ri)} className="p-0.5 text-steel-300 hover:text-danger-500" disabled={rows.length <= 1}><Trash2 className="w-3 h-3" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function CollapsibleForm({ data, onChange }: FormProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className={lc}>Section Title</label>
        <input type="text" value={(data.title as string) || ''} onChange={e => onChange({ ...data, title: e.target.value })} className={fc} placeholder="Expandable section title..." />
      </div>
      <div>
        <label className={lc}>Content</label>
        <textarea value={(data.content as string) || ''} onChange={e => onChange({ ...data, content: e.target.value })} className={fc} rows={4} placeholder="Content shown when expanded. Use blank lines for paragraph breaks." />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={!!data.defaultOpen} onChange={e => onChange({ ...data, defaultOpen: e.target.checked })} className="w-3.5 h-3.5 rounded border-steel-300 text-brand-600" />
        <span className="text-xs text-steel-600">Open by default</span>
      </label>
    </div>
  );
}

interface QuizQ { question: string; options: string[]; correctIndex: number; explanation: string; }

export function QuizForm({ data, onChange }: FormProps) {
  const questions = (data.questions as QuizQ[]) || [];
  const updateQ = (i: number, f: string, v: unknown) => { const u = [...questions]; u[i] = { ...u[i], [f]: v }; onChange({ ...data, questions: u }); };
  const addQ = () => onChange({ ...data, questions: [...questions, { question: '', options: ['', ''], correctIndex: 0, explanation: '' }] });
  const removeQ = (i: number) => onChange({ ...data, questions: questions.filter((_, j) => j !== i) });
  const addOpt = (qi: number) => { const u = [...questions]; u[qi] = { ...u[qi], options: [...u[qi].options, ''] }; onChange({ ...data, questions: u }); };
  const removeOpt = (qi: number, oi: number) => {
    const q = questions[qi]; if (q.options.length <= 2) return;
    const opts = q.options.filter((_, i) => i !== oi);
    const u = [...questions]; u[qi] = { ...u[qi], options: opts, correctIndex: q.correctIndex >= opts.length ? 0 : q.correctIndex };
    onChange({ ...data, questions: u });
  };
  const updateOpt = (qi: number, oi: number, val: string) => {
    const u = [...questions]; const opts = [...u[qi].options]; opts[oi] = val; u[qi] = { ...u[qi], options: opts }; onChange({ ...data, questions: u });
  };

  return (
    <div className="space-y-4">
      {questions.map((q, qi) => (
        <div key={qi} className="bg-steel-50/50 rounded-xl p-3 space-y-2.5 border border-steel-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-steel-500">Question {qi + 1}</span>
            <button type="button" onClick={() => removeQ(qi)} className="text-steel-300 hover:text-danger-500"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
          <input type="text" value={q.question} onChange={e => updateQ(qi, 'question', e.target.value)} className={fc} placeholder="Question text..." />
          <div className="space-y-1.5">
            <label className={lc}>Options (select correct answer)</label>
            {q.options.map((opt, oi) => (
              <div key={oi} className="flex items-center gap-2">
                <button type="button" onClick={() => updateQ(qi, 'correctIndex', oi)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${q.correctIndex === oi ? 'border-success-500 bg-success-500' : 'border-steel-300 hover:border-steel-400'}`}>
                  {q.correctIndex === oi && <div className="w-2 h-2 bg-white rounded-full" />}
                </button>
                <input type="text" value={opt} onChange={e => updateOpt(qi, oi, e.target.value)} className={fc + ' flex-1'} placeholder={`Option ${oi + 1}`} />
                <button type="button" onClick={() => removeOpt(qi, oi)} className="p-0.5 text-steel-300 hover:text-danger-500" disabled={q.options.length <= 2}><Trash2 className="w-3 h-3" /></button>
              </div>
            ))}
            <button type="button" onClick={() => addOpt(qi)} className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1 mt-1"><Plus className="w-3 h-3" /> Add Option</button>
          </div>
          <div>
            <label className={lc}>Explanation (shown after answer)</label>
            <textarea value={q.explanation} onChange={e => updateQ(qi, 'explanation', e.target.value)} className={fc} rows={2} placeholder="Explain why the correct answer is correct..." />
          </div>
        </div>
      ))}
      <button type="button" onClick={addQ} className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add Question</button>
    </div>
  );
}

export function getFormComponent(blockType: string) {
  switch (blockType) {
    case 'heading': return HeadingForm;
    case 'text': return TextForm;
    case 'list': return ListForm;
    case 'info_box': return InfoBoxForm;
    case 'video': return VideoForm;
    case 'resource': return ResourceForm;
    case 'code_block': return CodeBlockForm;
    case 'data_table': return DataTableForm;
    case 'collapsible': return CollapsibleForm;
    case 'quiz': return QuizForm;
    default: return null;
  }
}
