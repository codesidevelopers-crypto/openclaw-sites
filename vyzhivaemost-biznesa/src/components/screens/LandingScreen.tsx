import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useApp } from '../../context/AppContext'
import { CaptchaModal } from '../CaptchaModal'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50%       { opacity: 0.7; transform: scale(1.05); }
`

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Hero = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 120px 24px 80px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/hero.jpg') center/cover no-repeat;
    opacity: 0.12;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 80% 60% at 50% 40%,
      rgba(232, 160, 32, 0.08) 0%,
      transparent 70%
    );
    z-index: 0;
  }
`

const Orb = styled.div<{ $delay: number; $x: number; $y: number; $size: number }>`
  position: absolute;
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
  border-radius: 50%;
  top: ${p => p.$y}%;
  left: ${p => p.$x}%;
  background: radial-gradient(circle, ${p => p.theme.colors.accent}22 0%, transparent 70%);
  animation: ${pulse} ${p => 4 + p.$delay}s ease-in-out infinite;
  animation-delay: ${p => p.$delay}s;
  pointer-events: none;
  z-index: 0;
`

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
`

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${p => p.theme.colors.accent}60;
  background: ${p => p.theme.colors.accentDim};
  color: ${p => p.theme.colors.accent};
  font-family: ${p => p.theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 2px;
  margin-bottom: 32px;
  animation: ${fadeUp} 0.6s ease both;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: ${p => p.theme.colors.accent};
    border-radius: 50%;
  }
`

const Title = styled.h1`
  font-family: ${p => p.theme.fonts.display};
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
  animation: ${fadeUp} 0.6s 0.1s ease both;

  span {
    background: linear-gradient(135deg, ${p => p.theme.colors.accent}, ${p => p.theme.colors.accentHover}, #FFF4D0);
    background-size: 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 3s linear infinite;
  }
`

const Subtitle = styled.ul`
  list-style: none;
  margin-bottom: 48px;
  animation: ${fadeUp} 0.6s 0.2s ease both;
`

const SubItem = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${p => p.theme.fonts.body};
  font-size: 1.05rem;
  color: ${p => p.theme.colors.textSub};
  margin: 6px 16px;

  &::before {
    content: '—';
    color: ${p => p.theme.colors.accent};
    font-family: ${p => p.theme.fonts.mono};
  }
`

const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: ${p => p.theme.colors.accent};
  color: #0a0a0a;
  font-family: ${p => p.theme.fonts.display};
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 18px 40px;
  border-radius: ${p => p.theme.radius.sm};
  cursor: pointer;
  border: none;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  animation: ${fadeUp} 0.6s 0.3s ease both;

  &:hover {
    background: ${p => p.theme.colors.accentHover};
    transform: translateY(-2px);
    box-shadow: ${p => p.theme.shadow.accent};
  }
  &:active {
    transform: translateY(0);
  }

  svg { transition: transform 0.2s; }
  &:hover svg { transform: translateX(4px); }
`

const CardsSection = styled.section`
  padding: 80px 24px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
`

const SectionLabel = styled.div`
  font-family: ${p => p.theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 16px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${p => p.theme.colors.border};
  }
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1px;
  border: 1px solid ${p => p.theme.colors.border};
  background: ${p => p.theme.colors.border};
`

const FeatureCard = styled.div<{ $delay: number }>`
  background: ${p => p.theme.colors.surface};
  padding: 32px 28px;
  position: relative;
  overflow: hidden;
  transition: background 0.2s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${p => p.theme.colors.accent};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s;
  }

  &:hover {
    background: ${p => p.theme.colors.surface2};
    &::before { transform: scaleX(1); }
  }
`

const CardIcon = styled.div`
  width: 44px;
  height: 44px;
  border: 1px solid ${p => p.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 1.3rem;
  color: ${p => p.theme.colors.accent};
`

const CardTitle = styled.h3`
  font-family: ${p => p.theme.fonts.display};
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.02em;
  margin-bottom: 10px;
  color: ${p => p.theme.colors.text};
`

const CardDesc = styled.p`
  font-size: 0.875rem;
  color: ${p => p.theme.colors.textSub};
  line-height: 1.6;
`

const BottomBanner = styled.div`
  margin-top: 80px;
  padding: 40px;
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-left: 3px solid ${p => p.theme.colors.accent};
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 80px;
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`

const BannerText = styled.div`
  flex: 1;

  h3 {
    font-family: ${p => p.theme.fonts.display};
    font-weight: 700;
    font-size: 1.15rem;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.9rem;
    color: ${p => p.theme.colors.textSub};
    line-height: 1.6;
  }
`

const features = [
  {
    icon: '⚡',
    title: 'Hard & Stress Survival',
    desc: 'Сколько месяцев проживёт бизнес в обычных условиях и при стрессовом сценарии с минимальными поступлениями.',
  },
  {
    icon: '🗺',
    title: 'Карта кассовых ям',
    desc: 'Анализ по неделям месяца: когда деньги кончаются быстрее всего и где создаётся кассовый разрыв.',
  },
  {
    icon: '📊',
    title: 'Индекс устойчивости',
    desc: 'Интегральная оценка от 0 до 100 по пяти факторам: буфер, стабильность, концентрация, разрывы, ритм.',
  },
  {
    icon: '📋',
    title: 'Рекомендации',
    desc: 'Конкретные шаги под ваш тип бизнеса, структуру выручки и выявленные риски. Не шаблонные советы.',
  },
]

export const LandingScreen: React.FC = () => {
  const { goTo, captchaSolved, setCaptchaSolved } = useApp()
  const heroRef = useRef<HTMLElement>(null)
  const [showCaptcha, setShowCaptcha] = useState<boolean>(false)

  const handleCTA = (): void => {
    if (captchaSolved) {
      goTo('upload')
    } else {
      setShowCaptcha(true)
    }
  }

  const handleCaptchaSuccess = (): void => {
    setCaptchaSolved(true)
    setShowCaptcha(false)
    goTo('upload')
  }

  return (
    <Wrap>
      {showCaptcha && (
        <CaptchaModal
          onSuccess={handleCaptchaSuccess}
          onClose={() => setShowCaptcha(false)}
        />
      )}

      <Hero ref={heroRef}>
        <Orb $delay={0} $x={15} $y={20} $size={300} />
        <Orb $delay={2} $x={75} $y={60} $size={400} />
        <Orb $delay={1} $x={50} $y={80} $size={200} />

        <HeroContent>
          <Tag>Финансовая диагностика</Tag>

          <Title>
            Диагностика{' '}
            <span>денежной устойчивости</span>
            {' '}бизнеса
          </Title>

          <Subtitle>
            {[
              'На сколько хватит денег',
              'Где риск кассовых разрывов',
              'Какие платежи давят на бизнес',
              'Какой резерв стоит держать',
            ].map(item => (
              <SubItem key={item}>{item}</SubItem>
            ))}
          </Subtitle>

          <CTAButton onClick={handleCTA}>
            Начать диагностику
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </CTAButton>
        </HeroContent>
      </Hero>

      <CardsSection>
        <SectionLabel>Что вы получите</SectionLabel>
        <CardsGrid>
          {features.map((f, i) => (
            <FeatureCard key={f.title} $delay={i * 0.1}>
              <CardIcon>{f.icon}</CardIcon>
              <CardTitle>{f.title}</CardTitle>
              <CardDesc>{f.desc}</CardDesc>
            </FeatureCard>
          ))}
        </CardsGrid>

        <BottomBanner>
          <BannerText>
            <h3>Всё считается в браузере</h3>
            <p>
              Ваши финансовые данные не покидают устройство. Загрузите выписки любого банка — парсинг, анализ и визуализация происходят прямо в браузере без передачи данных на сервер.
            </p>
          </BannerText>
          <CTAButton onClick={handleCTA} style={{ whiteSpace: 'nowrap' }}>
            Загрузить выписки
          </CTAButton>
        </BottomBanner>
      </CardsSection>
    </Wrap>
  )
}
