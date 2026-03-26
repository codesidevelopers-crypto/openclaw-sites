import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import useCountUp from '../hooks/useCountUp'

interface Advantage {
  icon: string
  title: string
  description: string
}

const advantages: Advantage[] = [
  {
    icon: '🏛',
    title: 'Опыт и репутация',
    description:
      'Более 15 лет в российской юриспруденции. Наша репутация строится на честности, профессионализме и реальных результатах для каждого клиента.',
  },
  {
    icon: '🔐',
    title: 'Полная конфиденциальность',
    description:
      'Адвокатская тайна гарантирует защиту всех ваших данных. Ни одна деталь вашего дела не покинет стен нашей фирмы без вашего согласия.',
  },
  {
    icon: '🎯',
    title: 'Индивидуальный подход',
    description:
      'Каждое дело уникально. Мы разрабатываем персональную стратегию защиты, основанную на глубоком анализе именно вашей ситуации.',
  },
  {
    icon: '📞',
    title: 'Доступность 24/7',
    description:
      'Критическая ситуация не знает расписания. Наши специалисты готовы проконсультировать вас в любое время суток — звоните когда угодно.',
  },
]

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 2rem;
  background: ${({ theme }) => theme.colors.bg};
  position: relative;
  overflow: hidden;

  /* Gold diagonal accent */
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.accent}, transparent);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 5rem 1.25rem;
  }
`

const BgPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.03) 0%, transparent 40%);
  pointer-events: none;
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  margin-bottom: 5rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const SectionEyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
`

const GoldBar = styled.span`
  display: block;
  width: 40px;
  height: 2px;
  background: ${({ theme }) => theme.colors.accent};
`

const EyebrowText = styled.span`
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.15;
  margin-bottom: 1.5rem;

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.accent};
  }
`

const SectionDesc = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
  max-width: 440px;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const StatBox = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  padding: 2.25rem 2rem;
  text-align: center;
`

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`

const AdvGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const AdvCard = styled.div`
  display: flex;
  gap: 1.25rem;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: border-color 0.3s ease, background 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderGold};
    background: rgba(212, 175, 55, 0.04);
  }
`

const AdvIcon = styled.div`
  font-size: 1.75rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
`

const AdvContent = styled.div``

const AdvTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.6rem;
`

const AdvDesc = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`

interface StatBlockProps {
  target: number
  suffix: string
  label: string
}

const StatBlock: React.FC<StatBlockProps> = ({ target, suffix, label }) => {
  const { value, ref } = useCountUp({ target, suffix, duration: 1800 })
  return (
    <StatBox>
      <StatNumber ref={ref}>{value}</StatNumber>
      <StatLabel>{label}</StatLabel>
    </StatBox>
  )
}

const WhyUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const el = sectionRef.current
    if (el) {
      el.querySelectorAll('.animate-on-scroll').forEach((item) => observer.observe(item))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Section id="why-us" ref={sectionRef}>
      <BgPattern />
      <Inner>
        <TopRow>
          <div>
            <SectionEyebrow className="animate-on-scroll">
              <GoldBar />
              <EyebrowText>Почему выбирают нас</EyebrowText>
            </SectionEyebrow>
            <SectionTitle className="animate-on-scroll">
              Надёжная защита,{' '}
              <em>доказанная результатами</em>
            </SectionTitle>
            <SectionDesc className="animate-on-scroll">
              За 15 лет работы мы выработали систему, которая позволяет достигать
              максимального результата для каждого клиента — от первой консультации до
              финального решения суда.
            </SectionDesc>
          </div>

          <StatsGrid>
            <StatBlock target={15} suffix="+" label="лет опыта" />
            <StatBlock target={1200} suffix="+" label="дел завершено" />
            <StatBlock target={94} suffix="%" label="успешных дел" />
          </StatsGrid>
        </TopRow>

        <AdvGrid>
          {advantages.map((adv, i) => (
            <AdvCard
              key={adv.title}
              className="animate-on-scroll"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <AdvIcon>{adv.icon}</AdvIcon>
              <AdvContent>
                <AdvTitle>{adv.title}</AdvTitle>
                <AdvDesc>{adv.description}</AdvDesc>
              </AdvContent>
            </AdvCard>
          ))}
        </AdvGrid>
      </Inner>
    </Section>
  )
}

export default WhyUs
