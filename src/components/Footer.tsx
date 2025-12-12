import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { HiLocationMarker, HiMail } from 'react-icons/hi';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';
import CookieSettingsButton from '@/components/CookieSettingsButton';

export default async function Footer() {
  const tFooter = await getTranslations('footer');

  return (
    <footer className="border-t border-white/10 bg-panel mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo-white.svg"
                  alt="H-Studio - Автоматизация расчётов и КП"
                  width={120}
                  height={20}
                  className="h-5 w-auto"
                />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-text mb-4">{tFooter('addressTitle')}</h3>
            <div className="space-y-2 text-sm text-muted">
              <div className="flex items-start gap-2">
                <span className="text-brand mt-0.5 flex-shrink-0">
                  <HiLocationMarker size={20} />
                </span>
                <span className="whitespace-pre-line">{tFooter('legalDetails.legalAddress')}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-text mb-4">{tFooter('contactTitle')}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <a 
                  href="https://wa.me/79826666680" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand hover:opacity-80 transition-opacity"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={24} />
                </a>
                <a 
                  href="https://t.me/+79826666680" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand hover:opacity-80 transition-opacity"
                  aria-label="Telegram"
                >
                  <FaTelegram size={24} />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand">
                  <HiMail size={20} />
                </span>
                <a href={`mailto:${tFooter('legalDetails.email')}`} className="text-muted hover:text-brand transition-colors">
                  {tFooter('legalDetails.email')}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <Link href="/blog" className="hover:text-text transition-colors min-h-[44px] min-w-[44px] inline-flex items-center" aria-label={tFooter('blog')}>{tFooter('blog')}</Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-text transition-colors min-h-[44px] min-w-[44px] inline-flex items-center" aria-label={tFooter('contactTitle')}>{tFooter('contactTitle')}</Link>
              <span>•</span>
              <a href={`mailto:${tFooter('legalDetails.email')}?subject=Privacy Policy Request`} className="hover:text-text transition-colors min-h-[44px] min-w-[44px] inline-flex items-center" aria-label={tFooter('privacy')}>{tFooter('privacy')}</a>
              <span>•</span>
              <Link href="/legal-notice" className="hover:text-text transition-colors min-h-[44px] min-w-[44px] inline-flex items-center" aria-label={tFooter('legalNotice')}>{tFooter('legalNotice')}</Link>
              <span>•</span>
              <a href={`mailto:${tFooter('legalDetails.email')}?subject=Terms Request`} className="hover:text-text transition-colors min-h-[44px] min-w-[44px] inline-flex items-center" aria-label={tFooter('terms')}>{tFooter('terms')}</a>
              <span>•</span>
              <CookieSettingsButton label={tFooter('cookieSettings')} />
            </div>
          </div>
          <p className="text-sm text-muted mt-4 text-center md:text-left">
            {tFooter('copyright')}
          </p>
          <p className="text-xs text-muted/70 mt-4 text-center md:text-left">
            Автоматизация расчётов, КП, себестоимости, спецификаций, интеграции с 1С/ERP/CRM, документооборот и AI-аналитика для производственных и инженерных компаний.
          </p>
        </div>
      </div>
    </footer>
  );
}

