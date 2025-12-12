'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { HiArrowRight } from 'react-icons/hi';

const ContactForm = () => {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      return;
    }

    if (!validateEmail(formData.email)) {
      setSubmitStatus('error');
      return;
    }

    if (!agree) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim(),
          message: formData.message.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.details || 'Failed to send message');
      }
      
      setSubmitStatus('success');
      // Очищаем форму
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
      setAgree(false);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col relative w-full">
      <div className="flex flex-col gap-y-[80px] mb-[80px] md:flex-row md:items-start md:mb-[80px] md:pl-[60px] lg:pl-[80px] pl-[25px] md:pr-[60px] lg:pr-[80px] pr-[25px] pt-[60px] md:pt-[80px]">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col px-[20px] md:px-[65px] md:py-[20px] py-[40px] bg-card border border-white/10 rounded-[20px] lg:rounded-[60px] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] md:w-1/2 w-full"
        >
          <h2 className="text-[42px] lg:text-[64px] font-semibold leading-none mb-[40px] text-text tracking-[-0.02em]">
            {t('formTitle').split('\n').map((line, index) => (
              <span key={index}>
                {line.split(' ').map((word, wordIndex, array) => {
                  const highlightWords = t('formTitleHighlight').split(' ');
                  if (highlightWords.includes(word.toLowerCase())) {
                    return <span key={wordIndex} className="text-brand">{word}{wordIndex < array.length - 1 ? ' ' : ''}</span>;
                  }
                  return <span key={wordIndex}>{word}{wordIndex < array.length - 1 ? ' ' : ''}</span>;
                })}
                {index < t('formTitle').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>

          <div className="flex flex-col gap-y-[20px] mb-[40px]">
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              placeholder={t('namePlaceholder')}
              required
              className="placeholder:text-text/40 text-text text-[16px] lg:text-[24px] rounded-[58px] p-[20px] bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand/60 transition-all min-h-[44px]"
            />
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder={t('emailPlaceholder')}
              required
              className="placeholder:text-text/40 text-text text-[16px] lg:text-[24px] rounded-[58px] p-[20px] bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand/60 transition-all min-h-[44px]"
            />
            <input
              type="tel"
              id="phone"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              placeholder={t('phonePlaceholder')}
              className="placeholder:text-text/40 text-text text-[16px] lg:text-[24px] rounded-[58px] p-[20px] bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand/60 transition-all min-h-[44px]"
            />
            <textarea
              id="message"
              name="message"
              onChange={handleChange}
              value={formData.message}
              placeholder={t('messagePlaceholder')}
              required
              rows={4}
              className="placeholder:text-text/40 text-text text-[16px] lg:text-[24px] rounded-[20px] p-[20px] bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand/60 transition-all resize-none"
            />
          </div>

          <div className="ml-[20px] mb-[40px] flex items-start gap-5">
            <div>
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="h-5 w-5 text-brand focus:ring-brand border-white/20 rounded bg-white/5 checked:bg-brand checked:border-brand mt-1"
              />
            </div>
            <p className="font-medium text-base text-text/80">
              {t('privacyText')}{' '}
              <Link
                href="/legal-notice"
                className="text-brand hover:opacity-70 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('privacyLink')}
              </Link>
            </p>
          </div>

          {/* Сообщения о статусе */}
          {submitStatus === 'success' && (
            <div className="mb-4 p-4 bg-brand/20 border border-brand/40 text-brand rounded-lg">
              {t('successMessage')}
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg">
              <div className="font-medium mb-1">{t('errorTitle')}</div>
              <div className="text-sm">{t('errorMessage')}</div>
            </div>
          )}

          <button
            disabled={!agree || isSubmitting}
            type="submit"
            className={`py-[21px] px-[117.5px] text-[20px] font-semibold leading-none rounded-full text-black w-full lg:w-max whitespace-nowrap transition-all duration-200 text-center inline-flex items-center justify-center gap-2 min-h-[44px] ${
              !agree || isSubmitting 
                ? 'bg-brand/50 cursor-not-allowed' 
                : 'bg-brand hover:opacity-90 shadow-[0_10px_30px_-12px_rgba(124,92,252,0.5)]'
            }`}
          >
            {isSubmitting ? t('sendingButton') : t('sendButton')}
            {!isSubmitting && <HiArrowRight size={20} />}
          </button>
        </form>

        {/* Address */}
        <div className="md:w-1/2 md:flex md:items-start md:justify-center">
          <div className="flex flex-col gap-y-[40px] md:max-w-[400px] lg:max-w-[460px] w-full" data-testid="contact-section">
            {/* Address */}
            <div className="flex flex-col gap-y-[12px]">
              <h3 className="font-semibold text-[18px] leading-none text-text">{t('correspondenceTitle')}</h3>
              <p className="font-normal text-[24px] leading-none text-text/80">
                {t('address')}<br />
                {t('city')}
              </p>
            </div>
            
            <div className="flex flex-col gap-y-[12px]">
              <h3 className="font-semibold text-[18px] leading-none text-text">{t('callUsTitle')}</h3>
              <Link
                className="font-normal text-[24px] leading-none text-text/80 hover:text-brand transition-colors"
                href={'tel:+79826666680'}
              >
                WA {t('phone')}
              </Link>
            </div>
            
            <div className="flex flex-col gap-y-[12px]">
              <h3 className="font-semibold text-[18px] leading-none text-text">{t('sayHelloTitle')}</h3>
              <Link
                className="font-normal text-[24px] leading-none text-text/80 hover:text-brand transition-colors"
                href={'mailto:hello@h-studio.io'}
              >
                {t('email')}
              </Link>
            </div>
            
            {/* Telegram and WhatsApp icons */}
            <div className="flex gap-x-[12px]">
              <Link
                href="https://wa.me/79826666680"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand rounded-[13.333px] w-[48px] h-[48px] p-[10.67px] cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
              >
                <svg className="w-[26.667px] h-[26.667px]" fill="white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </Link>
              <Link
                href="https://t.me/+79826666680"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand rounded-[13.333px] w-[48px] h-[48px] p-[10.67px] cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
              >
                <svg className="w-[26.667px] h-[26.667px]" fill="white" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

