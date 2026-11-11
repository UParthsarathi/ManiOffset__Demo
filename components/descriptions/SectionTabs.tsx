'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type Tab = { key: string; label: string };

/**
 * Sticky in-page tabs for a product description. Sections are looked up inside
 * the bar's own parent (by data-tab) rather than by id, because the product page
 * renders separate desktop and mobile copies and ids would clash.
 */
export function SectionTabs({ tabs, quoteHref, quoteLabel }: { tabs: Tab[]; quoteHref: string; quoteLabel: string }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(tabs[0]?.key);
  const [top, setTop] = useState(0);

  // Stick just under the site navbar, whatever its height at this breakpoint.
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('[data-site-nav]');
    if (!nav) return;
    const update = () => setTop(nav.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  // Highlight whichever section is crossing the upper part of the screen.
  useEffect(() => {
    const sections = ref.current?.parentElement?.querySelectorAll<HTMLElement>('[data-tab]');
    if (!sections?.length) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const key = e.target.getAttribute('data-tab');
          if (e.isIntersecting && key) setActive(key);
        }),
      { rootMargin: '-35% 0px -60% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (key: string) => {
    const bar = ref.current;
    const section = bar?.parentElement?.querySelector<HTMLElement>(`[data-tab="${key}"]`);
    if (!bar || !section) return;
    setActive(key);
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY - top - bar.offsetHeight - 24,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  return (
    <nav
      ref={ref}
      aria-label="Product sections"
      style={{ top }}
      className="sticky z-40 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-10 lg:mb-14 bg-white border-y border-slate-200"
    >
      <div className="flex items-center gap-6">
        <ul className="flex gap-6 overflow-x-auto [scrollbar-width:none]">
          {tabs.map((t) => (
            <li key={t.key}>
              <button
                type="button"
                onClick={() => scrollTo(t.key)}
                aria-current={active === t.key ? 'true' : undefined}
                className={`whitespace-nowrap border-b-2 py-4 text-[15px] font-medium transition-colors ${
                  active === t.key ? 'border-[#f29a1b] text-[#20283c]' : 'border-transparent text-slate-500 hover:text-[#20283c]'
                }`}
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>
        <Link
          href={quoteHref}
          className="ml-auto hidden sm:inline-flex shrink-0 items-center rounded-lg bg-[#005fb3] px-4 py-2 text-[14px] font-bold text-white hover:bg-[#004c8f]"
        >
          {quoteLabel}
        </Link>
      </div>
    </nav>
  );
}
