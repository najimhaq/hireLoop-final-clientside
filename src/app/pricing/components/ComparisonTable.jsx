import useInView from '../hooks/useInView';

export default function ComparisonTable({ rows, planNames, accent }) {
  const [ref, inView] = useInView();
  const accentMark =
    accent === 'emerald' ? 'text-emerald-400' : 'text-violet-400';

  const renderCell = (val, colIdx) => {
    if (val === '✓')
      return (
        <span className={colIdx > 0 ? accentMark : 'text-emerald-400'}>✓</span>
      );
    if (val === '—') return <span className='text-zinc-700'>—</span>;
    return <span className='text-zinc-300'>{val}</span>;
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
      className='overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950'
    >
      {/* Header */}
      <div className='grid grid-cols-4 border-b border-white/10 px-6 py-3'>
        <span className='text-xs font-semibold uppercase tracking-widest text-zinc-600'>
          Feature
        </span>
        {planNames.map((n) => (
          <span
            key={n}
            className='text-center text-xs font-semibold uppercase tracking-widest text-zinc-500'
          >
            {n}
          </span>
        ))}
      </div>
      {rows.map(([feature, ...vals], i) => (
        <div
          key={feature}
          className={`grid grid-cols-4 px-6 py-3.5 text-sm ${i % 2 === 0 ? 'bg-white/1.5' : ''}`}
        >
          <span className='text-zinc-400'>{feature}</span>
          {vals.map((v, ci) => (
            <span key={ci} className='text-center'>
              {renderCell(v, ci)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
