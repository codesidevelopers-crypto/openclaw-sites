import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

interface Step {
  number: string
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Консультация',
    description:
      'Первичная встреча или звонок для изучения вашей ситуации. Мы внимательно выслушаем и зададим уточняющие вопросы. Консультация бесплатна.',
  },
  {
    number: '02',
    title: 'Анализ дела',
    description:
      'Тщательное изучение всех документов, обстоятельств и правовых аспектов. Оцениваем риски и перспективы, выявляем сильные и слабые стороны.',
  },
  {
    number: '03',
    title: 'Стратегия',
    description:
      'Разрабатываем индивидуальный план действий с чёткими шагами и ожидаемыми результатами. Согласовываем стратегию с вами и объясняем каждый этап.',
  },
  {
    number: '04',
    title: 'Результат',
    description:
      'Реализуем стратегию в суде или переговорах, добиваясь максимального результата. Держим вас в курсе каждого шага и финально отчитываемся.',
  },
]

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 2rem;
  background: ${({ theme }) => theme.colors.bg};
  position: relative;
  overflow: hidden;

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
  background-image: radial-gradient(circle at 70% 60%, rgba(212, 175, 55, 0.04) 0%, transparent 55%);
  pointer-events: none;
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 5rem;
  align-items: end;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
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

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.accent};
  }
`

const SectionDesc = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
`

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const ConnectorLine = styled.div`
  position: absolute;
  top: 2.75rem;
  left: calc(12.5% + 1px);
  right: calc(12.5% + 1px);
  height: 1px;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.accent}, transparent);
  z-index: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

const StepCard = styled.div`
  padding: 0 2rem 2.5rem;
  position: relative;
  z-index: 1;

  &:first-child {
    padding-left: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    border-right: 1px solid ${({ theme }) => theme.colors.border};

    &:nth-child(even) {
      border-right: none;
    }

    &:nth-last-child(-n+2) {
      border-bottom: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    &:last-child {
      border-bottom: none;
    }
  }
`

const StepNumberWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
`

const StepNumber = styled.div`
  width: 52px;
  height: 52px;
  border: 1px solid ${({ theme }) => theme.colors.borderGold};
  background: ${({ theme }) => theme.colors.bgCard};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  flex-shrink: 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border: 1px solid rgba(212, 175, 55, 0.15);
  }
`

const StepTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.15rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.75rem;
`

const StepDesc = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`

const BottomCTA = styled.div`
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.25rem;
  text-align: center;
`

const CTALabel = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.1rem 2.5rem;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.bgDeep};
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accentLight};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.goldStrong};
  }
`

const HowWeWork: React.FC = () => {
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
    <Section id="process" ref={sectionRef}>
      <BgPattern />
      <Inner>
        <Header>
          <div>
            <SectionEyebrow className="animate-on-scroll">
              <GoldBar />
              <EyebrowText>Как мы работаем</EyebrowText>
            </SectionEyebrow>
            <SectionTitle className="animate-on-scroll">
              От обращения{' '}
              <em>до победы</em>
            </SectionTitle>
          </div>
          <SectionDesc className="animate-on-scroll">
            Прозрачный и понятный процесс работы. Вы всегда знаете, на каком этапе
            находится ваше дело и что происходит дальше.
          </SectionDesc>
        </Header>

        <StepsContainer>
          <ConnectorLine />
          {steps.map((step, i) => (
            <StepCard
              key={step.number}
              className="animate-on-scroll"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <StepNumberWrap>
                <StepNumber>{step.number}</StepNumber>
              </StepNumberWrap>
              <StepTitle>{step.title}</StepTitle>
              <StepDesc>{step.description}</StepDesc>
            </StepCard>
          ))}
        </StepsContainer>

        <BottomCTA className="animate-on-scroll">
          <CTALabel>Готовы начать? Первая консультация — бесплатно.</CTALabel>
          <CTAButton href="#contact">
            Записаться на консультацию
          </CTAButton>
        </BottomCTA>
      </Inner>
    </Section>
  )
}

export default HowWeWork
