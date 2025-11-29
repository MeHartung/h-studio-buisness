'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionLink = motion(Link);

const menuVariants = {
  closed: {
    width: 60,
    height: 60,
    bottom: 21,
    right: 22,
    transition: {
      duration: 0.3,
      when: 'afterChildren',
    },
  },
  open: {
    width: 'calc(100vw - 24px)',
    height: '621px',
    bottom: 13,
    right: 12,
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
    },
  },
};

const menuItemsContainerVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

const menuItemVariants = {
  closed: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2 },
  },
  //@ts-ignore
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
};

export default function Header() {
  const tNav = useTranslations('navigation');
  const tFooter = useTranslations('footer');
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobile]);

  // Блокировать скролл когда меню открыто
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  return (
    <>
      {/* Десктопное меню */}
      <header className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-white.svg"
                alt="H-Studio - Автоматизация расчётов и КП"
                width={120}
                height={20}
                className="h-5 w-auto"
                style={{ width: 'auto', height: '1.25rem' }}
                priority
              />
            </Link>
          </div>
          <nav className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1">
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-text font-semibold rounded-lg hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand/60"
              aria-label={tNav('about')}
            >
              {tNav('about')}
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-text font-semibold rounded-lg hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand/60"
              aria-label={tNav('services')}
            >
              {tNav('services')}
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-text font-semibold rounded-lg hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand/60"
              aria-label={tFooter('blog')}
            >
              {tFooter('blog')}
            </Link>
          </nav>
        </div>
      </header>

      {/* Мобильное меню */}
      {isMobile && (
        <>
          <div className="lg:hidden w-full flex justify-center top-[26.4px] absolute z-50">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-white.svg"
                alt="H-Studio - Автоматизация расчётов и КП"
                width={120}
                height={20}
                className="h-5 w-auto"
                style={{ width: 'auto', height: '1.25rem' }}
                priority
              />
            </Link>
          </div>

          <motion.div
            className="fixed bottom-[0px] right-[0px] w-screen flex flex-col z-40 min-w-screen lg:hidden"
            animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.4, ease: 'circOut' }}
          >
            <div className="absolute bottom-[21px] right-[22px]">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-[60px] h-[60px] bg-white/5 backdrop-blur-sm border border-white/10 text-text rounded-[16px] flex items-center justify-center shrink-0 relative z-50"
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                >
                  <motion.g style={{ transformOrigin: '30px 30px' }}>
                    <rect width="60" height="60" rx="16" fill="transparent" />
                    <motion.path
                      d="M16 22L44 22"
                      stroke="currentColor"
                      strokeWidth="4"
                      animate={{
                        d: isOpen ? 'M19.5 19.5L40.5 40.5' : 'M16 22L44 22',
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />
                    <motion.path
                      d="M16 30L44 30"
                      stroke="currentColor"
                      strokeWidth="4"
                      animate={{
                        opacity: isOpen ? 0 : 1,
                        pathLength: isOpen ? 0 : 1,
                      }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    />
                    <motion.path
                      d="M16 38L44 38"
                      stroke="currentColor"
                      strokeWidth="4"
                      animate={{
                        d: isOpen ? 'M19.5 40.5L40.5 19.5' : 'M16 38L44 38',
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />
                  </motion.g>
                </svg>
              </motion.button>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute bg-white/5 backdrop-blur-[40px] border border-white/10 text-text rounded-[20px] z-40"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVariants}
                >
                  <motion.div className="h-full w-full" variants={menuItemsContainerVariants}>
                    <div className="h-full w-full flex flex-col pt-[31px] pl-[27px] gap-y-[40px]">
                      {[
                        { title: tNav('about'), href: '/about' },
                        { title: tNav('services'), href: '/services' },
                        { title: tFooter('blog'), href: '/blog' },
                      ].map((item, i) => (
                        <MotionLink
                          key={item.href}
                          href={item.href}
                          custom={i}
                          variants={menuItemVariants}
                          className="text-[58px] leading-none font-medium transition-colors hover:opacity-80"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </MotionLink>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </>
  );
}

