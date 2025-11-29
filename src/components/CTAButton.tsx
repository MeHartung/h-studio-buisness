'use client';

import { useContactForm } from '@/contexts/ContactFormContext';
import { HiArrowRight } from 'react-icons/hi';

interface CTAButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function CTAButton({ 
  variant = 'primary', 
  children, 
  className = '',
  ariaLabel 
}: CTAButtonProps) {
  const { openForm } = useContactForm();

  const baseClasses = 'inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-brand/60 min-h-[44px]';
  
  const variantClasses = variant === 'primary'
    ? 'bg-brand text-black hover:opacity-90 shadow-[0_10px_30px_-12px_rgba(124,92,252,0.5)]'
    : 'bg-white/5 backdrop-blur-sm border border-white/10 text-text hover:bg-white/10';

  return (
    <button
      onClick={openForm}
      className={`${baseClasses} ${variantClasses} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
      {variant === 'primary' && <HiArrowRight size={20} />}
    </button>
  );
}

