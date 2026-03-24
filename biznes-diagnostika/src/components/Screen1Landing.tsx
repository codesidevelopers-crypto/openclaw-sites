import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useApp } from '../context/AppContext'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Hero = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 60px;
  text-align: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/hero-bg.jpg') center/cover no-repeat;
    opacity: 0.18;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,130,246,0.12) 0%, transparent 70%),
                linear-gradient(180deg, transparent 50%, ${({ theme }) => theme.colors.bg} 100%);
    z-index: 1;
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 780px;
`

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(59,130,246,0.12);
  border: 1px solid rgba(59,130,246,0.3);
  border-radius: 100px;
  padding: 6px 16px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.blueLight};
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 32px;
  animation: ${fadeUp} 0.6s ease both;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.green};
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.4); }
  }
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.1;
  margin-bottom: 32px;
  animation: ${fadeUp} 0.6s 0.1s ease both;

  span {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.blue}, ${({ theme }) => theme.colors.green});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const BenefitList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 48px;
  animation: ${fadeUp} 0.6s 0.2s ease both;
`

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.muted};
  text-align: left;
  max-width: 520px;
  margin: 0 auto;

  &::before {
    content: '';
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    border-radius: 50%;
    background: rgba(59,130,246,0.15);
    border: 1.5px solid ${({ theme }) => theme.colors.blue};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath d='M2 5l2 2 4-4' stroke='%233B82F6' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
`

const CTAButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.blue}, #1D4ED8);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 18px 48px;
  border-radius: ${({ theme }) => theme.radius.lg};
  transition: all 0.2s;
  box-shadow: 0 8px 32px rgba(59,130,246,0.35);
  animation: ${fadeUp} 0.6s 0.3s ease both;
  letter-spacing: 0.01em;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(59,130,246,0.5);
  }
  &:active { transform: translateY(0); }
`

const FeaturesSection = styled.section`
  padding: 80px 24px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
`

const SectionLabel = styled.p`
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.blue};
  margin-bottom: 16px;
`

const SectionTitle = styled.h2`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 48px;
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
`

interface FeatureCardProps {
  delay: number
}

const FeatureCard = styled.div<FeatureCardProps>`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 28px 24px;
  transition: all 0.25s;
  animation: ${fadeUp} 0.6s ${({ delay }) => delay}s ease both;

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue}44;
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow.glow};
  }
`

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: rgba(59,130,246,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
`

const FeatureTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 8px;
`

const FeatureDesc = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`

const FEATURES = [
  {
    icon: '⏳',
    title: 'Hard Survival',
    desc: 'Сколько месяцев выдержит бизнес без новых поступлений на текущем остатке',
  },
  {
    icon: '🌩',
    title: 'Stress Survival',
    desc: 'Выживаемость в слабом сценарии — когда поступления на уровне худших 25%',
  },
  {
    icon: '📊',
    title: 'Карта кассовых разрывов',
    desc: 'По неделям месяца: когда бизнес уходит в минус чаще всего',
  },
  {
    icon: '💡',
    title: 'Рекомендации',
    desc: 'Конкретные шаги: размер подушки, инструменты контроля, риски концентрации',
  },
]

const BENEFITS = [
  'На сколько хватит денег',
  'Где риск кассовых разрывов',
  'Какие платежи сильнее всего давят на бизнес',
  'Какой запас денег стоит держать',
]

export function Screen1Landing(): JSX.Element {
  const { setScreen } = useApp()

  return (
    <Wrapper>
      <Hero>
        <HeroContent>
          <Badge>Бесплатная диагностика</Badge>
          <Title>
            <span>Диагностика</span>{' '}
            денежной устойчивости бизнеса
          </Title>
          <BenefitList>
            {BENEFITS.map((b) => (
              <BenefitItem key={b}>{b}</BenefitItem>
            ))}
          </BenefitList>
          <CTAButton onClick={() => setScreen('upload')}>
            Начать диагностику →
          </CTAButton>
        </HeroContent>
      </Hero>

      <FeaturesSection>
        <SectionLabel>Что вы узнаете</SectionLabel>
        <SectionTitle>4 ключевых блока отчёта</SectionTitle>
        <FeatureGrid>
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} delay={0.1 * i}>
              <FeatureIcon>{f.icon}</FeatureIcon>
              <FeatureTitle>{f.title}</FeatureTitle>
              <FeatureDesc>{f.desc}</FeatureDesc>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </FeaturesSection>
    </Wrapper>
  )
}
