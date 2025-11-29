'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiArrowRight } from 'react-icons/hi';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const t = useTranslations('contactForm');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Закрытие по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Блокировка скролла при открытии
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Отправка в Telegram через API
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.details || 'Failed to send message');
      }
      
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-card border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] pointer-events-auto max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-card border-b border-white/10 p-4 sm:p-6 flex items-start sm:items-center justify-between backdrop-blur-sm z-10 gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-text tracking-[-0.02em] mb-1">
                    {t('title')}
                  </h2>
                  <p className="text-xs sm:text-sm text-text/70">
                    {t('subtitle')}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-text/70 hover:text-text focus:outline-none focus:ring-2 focus:ring-brand/60 min-w-[44px] min-h-[44px]"
                  aria-label={t('close')}
                >
                  <HiX size={24} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8">
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                      {t('fields.name.label')} <span className="text-brand">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand/60 transition-all min-h-[44px]"
                      placeholder={t('fields.name.placeholder')}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                      {t('fields.email.label')} <span className="text-brand">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand/60 transition-all min-h-[44px]"
                      placeholder={t('fields.email.placeholder')}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                      {t('fields.phone.label')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand/60 transition-all min-h-[44px]"
                      placeholder={t('fields.phone.placeholder')}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-text mb-2">
                      {t('fields.company.label')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand/60 transition-all min-h-[44px]"
                      placeholder={t('fields.company.placeholder')}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                      {t('fields.message.label')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand/60 transition-all resize-none"
                      placeholder={t('fields.message.placeholder')}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-black font-semibold rounded-xl hover:opacity-90 transition-all shadow-[0_10px_30px_-12px_rgba(124,92,252,0.5)] focus:outline-none focus:ring-2 focus:ring-brand/60 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <span>{t('submitting')}</span>
                    ) : submitStatus === 'success' ? (
                      <span>{t('success')}</span>
                    ) : (
                      <>
                        <span>{t('submit')}</span>
                        <HiArrowRight size={20} />
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === 'error' && (
                    <p className="text-sm text-red-400 text-center">
                      {t('error')}
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

