'use client';

import { useState, useEffect } from 'react';

export default function ComparisonTable(props) {
  var rows = props.rows;
  var planNames = props.planNames;
  var accent = props.accent;

  var [visible, setVisible] = useState(false);

  useEffect(function () {
    var timer = setTimeout(function () {
      setVisible(true);
    }, 100);
    return function () {
      clearTimeout(timer);
    };
  }, []);

  var accentMark =
    accent === 'emerald' ? 'text-emerald-400' : 'text-violet-400';

  function renderCell(val, colIdx) {
    if (val === '✓')
      return (
        <span className={colIdx === 0 ? 'text-emerald-400' : accentMark}>
          ✓
        </span>
      );
    if (val === '—') return <span className='text-zinc-700'>—</span>;
    return <span className='text-zinc-300'>{val}</span>;
  }

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
      className='overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950'
    >
      <div className='grid grid-cols-4 border-b border-white/10 px-6 py-3.5'>
        <span className='text-xs font-semibold uppercase tracking-widest text-zinc-600'>
          Feature
        </span>
        {planNames.map(function (n) {
          return (
            <span
              key={n}
              className='text-center text-xs font-semibold uppercase tracking-widest text-zinc-500'
            >
              {n}
            </span>
          );
        })}
      </div>
      {rows.map(function (row, i) {
        var feature = row[0];
        var vals = row.slice(1);
        return (
          <div
            key={feature}
            className={
              'grid grid-cols-4 px-6 py-3.5 text-sm ' +
              (i % 2 === 0 ? 'bg-white/1.5' : '')
            }
          >
            <span className='text-zinc-400'>{feature}</span>
            {vals.map(function (v, ci) {
              return (
                <span key={ci} className='text-center'>
                  {renderCell(v, ci)}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
