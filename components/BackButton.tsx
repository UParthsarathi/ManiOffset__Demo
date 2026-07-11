'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  /** When set, Back navigates to this URL; otherwise falls back to browser history. */
  href?: string;
  className?: string;
}

export function BackButton({ href, className }: BackButtonProps) {
  const router = useRouter();
  const classes = `flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group w-fit ${className ?? 'mb-6'}`;

  const inner = (
    <>
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      Back
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button onClick={() => router.back()} className={classes}>
      {inner}
    </button>
  );
}
