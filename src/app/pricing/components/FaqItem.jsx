import { useEffect, useRef, useState } from "react";

export default function FaqItem({ faq, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(isOpen ? (contentRef.current?.scrollHeight ?? 0) : 0);
  }, [isOpen]);

  return (
    <div className='overflow-hidden rounded-2xl border border-white/10 bg-zinc-950'>
      <button
        onClick={onToggle}
        className='flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-white transition hover:bg-white/3'
        aria-expanded={isOpen}
      >
        <span className='pr-4'>{faq.q}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>
      <div
        style={{ height, transition: 'height 0.3s cubic-bezier(0.16,1,0.3,1)' }}
        className='overflow-hidden'
      >
        <div
          ref={contentRef}
          className='border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-zinc-400'
        >
          {faq.a}
        </div>
      </div>
    </div>
  );
}
