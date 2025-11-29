'use client';

import { useContactForm } from '@/contexts/ContactFormContext';
import { HiArrowRight } from 'react-icons/hi';

interface CTALinkProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  size?: 'sm' | 'md';
}

export default function CTALink({ 
  children, 
  className = '',
  ariaLabel,
  size = 'sm'
}: CTALinkProps) {
  const { openForm } = useContactForm();

  const sizeClasses = size === 'sm' 
    ? 'text-xs' 
    : 'text-sm';

  return (
    <button
      onClick={openForm}
      className={`text-brand hover:text-brand/80 transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand/60 rounded min-h-[44px] min-w-[44px] ${sizeClasses} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
      <HiArrowRight size={size === 'sm' ? 12 : 16} />
    </button>
  );
}

