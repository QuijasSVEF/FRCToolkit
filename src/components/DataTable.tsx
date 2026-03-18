interface Column {
  key: string;
  header: string;
  width?: string;
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, string>[];
  caption?: string;
}

export default function DataTable({ columns, rows, caption }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-steel-200/80 shadow-sm">
      <table className="w-full text-sm">
        {caption && (
          <caption className="px-5 py-2.5 text-left text-xs font-bold text-steel-600 bg-steel-50/80 border-b border-steel-200/60 tracking-wide uppercase">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-steel-50/60 border-b border-steel-200/60">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-5 py-3 text-left font-bold text-[11px] text-steel-500 uppercase tracking-wider"
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-steel-100/60 last:border-0 hover:bg-brand-50/30 transition-colors duration-150">
              {columns.map((col, j) => (
                <td key={col.key} className={`px-5 py-3.5 ${j === 0 ? 'font-semibold text-steel-800' : 'text-steel-600'}`}>
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
