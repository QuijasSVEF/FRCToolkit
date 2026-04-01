import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Trash2, ChevronUp, ChevronDown, Save, Loader2,
  Check, GripVertical, ChevronRight, Copy, Eye, EyeOff,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import {
  BLOCK_TYPES, BlockType, BlockData, getDefaultData, getFormComponent,
} from './BlockEditorForms';
import ContentRenderer from '../../components/ContentRenderer';

interface ContentBlock {
  id: string;
  block_type: string;
  block_order: number;
  data: BlockData;
  isNew?: boolean;
  tempId?: string;
}

function getBlockPreview(block: ContentBlock): string {
  const d = block.data;
  switch (block.block_type) {
    case 'heading': return (d.text as string) || '';
    case 'text': return ((d.content as string) || '').slice(0, 60);
    case 'list': return `${((d.items as string[]) || []).length} items`;
    case 'info_box': return (d.title as string) || (d.variant as string) || '';
    case 'video': return (d.title as string) || '';
    case 'resource': return (d.title as string) || '';
    case 'code_block': return (d.language as string) || '';
    case 'data_table': return (d.caption as string) || `${((d.columns as unknown[]) || []).length} cols`;
    case 'collapsible': return (d.title as string) || '';
    case 'quiz': return `${((d.questions as unknown[]) || []).length} questions`;
    default: return '';
  }
}

export default function TopicContentEditor({ sectionId, subsectionId, onBlockCountChange }: {
  sectionId: string;
  subsectionId: string;
  onBlockCountChange?: (count: number) => void;
}) {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  const fetchBlocks = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('content_blocks')
      .select('*')
      .eq('section_id', sectionId)
      .eq('subsection_id', subsectionId)
      .order('block_order', { ascending: true });

    if (err) {
      setError(err.message);
    } else {
      const fetched = (data || []).map(b => ({
        id: b.id,
        block_type: b.block_type,
        block_order: b.block_order,
        data: b.data as BlockData,
      }));
      setBlocks(fetched);
      onBlockCountChange?.(fetched.length);
    }
    setLoading(false);
  }, [sectionId, subsectionId, onBlockCountChange]);

  useEffect(() => { fetchBlocks(); }, [fetchBlocks]);

  const addBlock = (type: BlockType) => {
    const tempId = `new-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newBlock: ContentBlock = {
      id: tempId, block_type: type, block_order: blocks.length,
      data: getDefaultData(type), isNew: true, tempId,
    };
    setBlocks(prev => [...prev, newBlock]);
    setExpandedBlockId(tempId);
    setShowAddMenu(false);
    setDirty(true);
  };

  const duplicateBlock = (block: ContentBlock) => {
    const tempId = `new-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const idx = blocks.findIndex(b => (b.tempId || b.id) === (block.tempId || block.id));
    const clone: ContentBlock = {
      id: tempId, block_type: block.block_type, block_order: idx + 1,
      data: JSON.parse(JSON.stringify(block.data)), isNew: true, tempId,
    };
    const updated = [...blocks];
    updated.splice(idx + 1, 0, clone);
    setBlocks(updated.map((b, i) => ({ ...b, block_order: i })));
    setExpandedBlockId(tempId);
    setDirty(true);
  };

  const updateBlockData = (blockId: string, newData: BlockData) => {
    setBlocks(prev => prev.map(b => (b.tempId || b.id) === blockId ? { ...b, data: newData } : b));
    setDirty(true);
  };

  const removeBlock = (blockId: string) => {
    setBlocks(prev => prev.filter(b => (b.tempId || b.id) !== blockId));
    if (expandedBlockId === blockId) setExpandedBlockId(null);
    setDirty(true);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const ni = direction === 'up' ? index - 1 : index + 1;
    if (ni < 0 || ni >= blocks.length) return;
    const updated = [...blocks];
    const [moved] = updated.splice(index, 1);
    updated.splice(ni, 0, moved);
    setBlocks(updated.map((b, i) => ({ ...b, block_order: i })));
    setDirty(true);
  };

  const saveAll = async () => {
    setSaving(true);
    setError('');

    const { error: delErr } = await supabase
      .from('content_blocks')
      .delete()
      .eq('section_id', sectionId)
      .eq('subsection_id', subsectionId);

    if (delErr) { setError(delErr.message); setSaving(false); return; }

    if (blocks.length > 0) {
      const rows = blocks.map((b, i) => ({
        section_id: sectionId, subsection_id: subsectionId,
        block_type: b.block_type, block_order: i, data: b.data,
      }));
      const { error: insertErr } = await supabase.from('content_blocks').insert(rows);
      if (insertErr) { setError(insertErr.message); setSaving(false); return; }
    }

    setSaving(false);
    setDirty(false);
    setSaved(true);
    onBlockCountChange?.(blocks.length);
    setTimeout(() => setSaved(false), 2000);
    setPreviewKey(k => k + 1);
    await fetchBlocks();
  };

  const blockTypeMeta = (type: string) => BLOCK_TYPES.find(bt => bt.type === type);

  if (loading) {
    return <div className="flex items-center justify-center py-6"><Loader2 className="w-5 h-5 text-steel-400 animate-spin" /></div>;
  }

  if (previewMode) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-steel-500 uppercase tracking-wider">Content Preview</p>
          <button onClick={() => setPreviewMode(false)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-steel-600 bg-steel-100 rounded-lg hover:bg-steel-200 transition-colors">
            <EyeOff className="w-3.5 h-3.5" /> Back to Editor
          </button>
        </div>
        <div className="border border-steel-200 rounded-xl p-5 bg-white min-h-[100px]">
          {blocks.length === 0 ? (
            <p className="text-sm text-steel-400 text-center py-4">No content to preview.</p>
          ) : dirty ? (
            <p className="text-sm text-amber-600 text-center py-4">Save your changes first to see the preview.</p>
          ) : (
            <ContentRenderer key={previewKey} sectionId={sectionId} subsectionId={subsectionId} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-steel-500 uppercase tracking-wider">
          Content Blocks ({blocks.length})
        </p>
        <div className="flex items-center gap-2">
          {blocks.length > 0 && (
            <button onClick={() => setPreviewMode(true)} className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-steel-500 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-all">
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
          )}
          {saved && (
            <span className="text-xs text-success-600 font-medium flex items-center gap-1 animate-fade-in"><Check className="w-3.5 h-3.5" /> Saved</span>
          )}
          {dirty && (
            <button onClick={saveAll} disabled={saving}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-50">
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save Blocks
            </button>
          )}
        </div>
      </div>

      {error && <div className="text-xs text-danger-600 bg-danger-50 rounded-lg px-3 py-2">{error}</div>}

      {blocks.length === 0 && !showAddMenu && (
        <div className="py-6 text-center border-2 border-dashed border-steel-200 rounded-xl">
          <p className="text-sm text-steel-400 mb-2">No content blocks yet</p>
          <p className="text-xs text-steel-400 mb-3">Add headings, text, videos, quizzes, and more</p>
          <button onClick={() => setShowAddMenu(true)}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 mx-auto">
            <Plus className="w-3.5 h-3.5" /> Add First Block
          </button>
        </div>
      )}

      <div className="space-y-1.5">
        {blocks.map((block, index) => {
          const meta = blockTypeMeta(block.block_type);
          const Icon = meta?.icon || Plus;
          const isExpanded = expandedBlockId === (block.tempId || block.id);
          const FormComponent = getFormComponent(block.block_type);

          return (
            <div key={block.tempId || block.id}
              className={`border rounded-xl overflow-hidden transition-all ${isExpanded ? 'border-brand-300 bg-white shadow-sm' : 'border-steel-200 bg-white hover:border-steel-300'}`}>
              <div className="flex items-center gap-2 px-3 py-2">
                <GripVertical className="w-3.5 h-3.5 text-steel-300 flex-shrink-0" />
                <div className="flex flex-col gap-px flex-shrink-0">
                  <button onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="p-px rounded text-steel-300 hover:text-steel-600 disabled:opacity-20"><ChevronUp className="w-3 h-3" /></button>
                  <button onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1} className="p-px rounded text-steel-300 hover:text-steel-600 disabled:opacity-20"><ChevronDown className="w-3 h-3" /></button>
                </div>
                <button onClick={() => setExpandedBlockId(isExpanded ? null : (block.tempId || block.id))} className="flex-1 flex items-center gap-2 text-left min-w-0">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${isExpanded ? 'bg-brand-50 text-brand-600' : 'bg-steel-100 text-steel-500'}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-steel-700">{meta?.label || block.block_type}</span>
                    <span className="text-[10px] text-steel-400 ml-2 truncate">{getBlockPreview(block)}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 text-steel-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
                <button onClick={() => duplicateBlock(block)} className="p-1 rounded-lg text-steel-300 hover:text-brand-600 hover:bg-brand-50 transition-all" title="Duplicate">
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => removeBlock(block.tempId || block.id)} className="p-1 rounded-lg text-steel-300 hover:text-danger-600 hover:bg-danger-50 transition-all" title="Delete">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              {isExpanded && FormComponent && (
                <div className="px-3 pb-3 pt-1 border-t border-steel-100">
                  <FormComponent data={block.data} onChange={(newData) => updateBlockData(block.tempId || block.id, newData)} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative">
        <button onClick={() => setShowAddMenu(!showAddMenu)}
          className="w-full py-2 border-2 border-dashed border-steel-200 rounded-xl text-xs font-semibold text-steel-400 hover:text-brand-600 hover:border-brand-300 transition-all flex items-center justify-center gap-1.5">
          <Plus className="w-3.5 h-3.5" /> Add Block
        </button>
        {showAddMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowAddMenu(false)} />
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-steel-200 rounded-xl shadow-xl z-50 p-2 grid grid-cols-2 gap-1 max-h-72 overflow-y-auto">
              {BLOCK_TYPES.map(bt => {
                const BtIcon = bt.icon;
                return (
                  <button key={bt.type} onClick={() => addBlock(bt.type as BlockType)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-brand-50 transition-colors text-left">
                    <div className="w-7 h-7 rounded-lg bg-steel-100 flex items-center justify-center flex-shrink-0"><BtIcon className="w-3.5 h-3.5 text-steel-600" /></div>
                    <div>
                      <span className="text-xs font-semibold text-steel-800 block">{bt.label}</span>
                      <span className="text-[9px] text-steel-400 leading-tight">{bt.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
