"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';

const Team = () => {
  const t = useTranslations('about.team');
  
  const teamMembers = [
    {
      id: 1,
      name: t('members.anna.name'),
      position: t('members.anna.position'),
      description: t('members.anna.description'),
      image: "/images/about/team/anna.webp"
    },
    {
      id: 2,
      name: t('members.alex.name'),
      position: t('members.alex.position'),
      description: t('members.alex.description'),
      image: "/images/about/team/alex.webp"
    },
    {
      id: 3,
      name: t('members.alexander.name'),
      position: t('members.alexander.position'),
      description: t('members.alexander.description'),
      image: "/images/about/team/alexander.webp"
    },
    {
      id: 4,
      name: t('members.george.name'),
      position: t('members.george.position'),
      description: t('members.george.description'),
      image: "/images/about/team/george.webp"
    }
  ];

  return (
    <section className="relative bg-bg pt-12 pb-12 lg:py-32">
      {/* Надписи для десктопа */}
      <div className="hidden lg:block absolute top-0 left-0 right-0 px-2 py-4">
        <div className="flex justify-between items-center">
          <span className="text-text/70 text-lg font-bold">{t('mobileLabel1')}</span>
          <span className="text-text/70 text-lg font-bold">{t('mobileLabel2')}</span>
        </div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-fit mx-auto">
          {/* Бейдж "Team" */}
          <div className="mb-6 inline-block">
            <div className="bg-brand/20 text-brand px-4 py-2 rounded-xl text-sm font-medium border border-brand/30">
              {t('badge')}
            </div>
          </div>

          {/* Заголовок */}
          <h2 className="mb-8 text-4xl lg:text-6xl font-semibold text-text leading-tight tracking-[-0.02em]">
            {t('mainTitle').split('\n').map((line, index) => (
              <span key={index}>
                {index === 1 ? (
                  <span className="text-text/90">{line}</span>
                ) : (
                  line
                )}
                {index < t('mainTitle').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>

          {/* Описание команды */}
          <div className="mb-16 max-w-4xl mx-auto text-left">
            <p className="text-lg text-text/90 leading-relaxed mb-6">
              {t('description1')}
            </p>
            
            <p className="text-lg text-text/90 leading-relaxed">
              {t('description2')}
            </p>
          </div>
        </div>

        {/* Горизонтальный скролл для мобильных */}
        <div className="block md:hidden">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="relative group flex-shrink-0 w-[280px]"
                style={{
                  animation: `fadeInUp 0.6s ease-out forwards`,
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                <div className="relative overflow-hidden rounded-[32px] aspect-[380/540] mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 280px, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={index === 0}
                  />
                </div>
                
                {/* Информация о члене команды под фотографией */}
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm opacity-95 mb-2">{member.position}</p>
                  {member.description && (
                    <p className="text-xs opacity-85 leading-relaxed">{member.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Равномерное распределение для десктопа */}
        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="relative group"
              style={{
                animation: `fadeInUp 0.6s ease-out forwards`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              <div className="relative overflow-hidden rounded-[32px] aspect-[380/540] mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 280px, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index === 0}
                />
              </div>
              
              {/* Информация о члене команды под фотографией */}
              <div className="p-4 text-white">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-sm opacity-95 mb-2">{member.position}</p>
                {member.description && (
                  <p className="text-xs opacity-85 leading-relaxed">{member.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

