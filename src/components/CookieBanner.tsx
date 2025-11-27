'use client';

import { useState, useEffect } from 'react';
import { HiX, HiCog } from 'react-icons/hi';
import { useTranslations } from 'next-intl';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const t = useTranslations('footer.cookieBanner');
  const [showBanner, setShowBanner] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    } else {
      const saved = JSON.parse(cookieConsent);
      setPreferences(saved);
    }

    // Listen for openCookieManager event
    const handleOpenManager = () => {
      setShowManager(true);
    };
    window.addEventListener('openCookieManager', handleOpenManager);
    return () => window.removeEventListener('openCookieManager', handleOpenManager);
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowManager(false);
    if (showBanner) {
      setShowBanner(false);
    }
  };

  if (!showBanner && !showManager) {
    return null;
  }

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50">
          <div className="bg-card border border-white/10 rounded-xl shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] p-4 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-text mb-1">{t('title')}</h3>
                <p className="text-sm text-text/70">
                  {t('description')}
                </p>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-text/40 hover:text-text transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <HiX size={20} />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm font-medium text-text bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
              >
                {t('rejectAll')}
              </button>
              <button
                onClick={() => setShowManager(true)}
                className="px-4 py-2 text-sm font-medium text-text bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-1"
              >
                <HiCog size={16} />
                {t('customize')}
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium text-black bg-brand rounded-lg hover:opacity-90 transition-colors"
              >
                {t('acceptAll')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Manager Modal */}
      {showManager && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-card border border-white/10 rounded-xl shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-text">{t('cookieSettings')}</h2>
              <button
                onClick={() => setShowManager(false)}
                className="text-text/40 hover:text-text transition-colors"
                aria-label="Close"
              >
                <HiX size={24} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-text">{t('strictlyNecessary')}</h3>
                    <p className="text-sm text-text/70">{t('strictlyNecessaryDesc')}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="w-5 h-5 text-brand rounded border-white/20 bg-white/5"
                  />
                </div>
                <p className="text-xs text-text/50 mt-1">
                  {t('strictlyNecessaryNote')}
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-text">{t('analytics')}</h3>
                    <p className="text-sm text-text/70">{t('analyticsDesc')}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="w-5 h-5 text-brand rounded border-white/20 bg-white/5"
                  />
                </div>
                <p className="text-xs text-text/50 mt-1">
                  {t('analyticsNote')}
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-text">{t('marketing')}</h3>
                    <p className="text-sm text-text/70">{t('marketingDesc')}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({ ...preferences, marketing: e.target.checked })
                    }
                    className="w-5 h-5 text-brand rounded border-white/20 bg-white/5"
                  />
                </div>
                <p className="text-xs text-text/50 mt-1">
                  {t('marketingNote')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowManager(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-text bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-4 py-2 text-sm font-medium text-black bg-brand rounded-lg hover:opacity-90 transition-colors"
              >
                {t('savePreferences')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

