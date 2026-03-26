import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

interface Service {
  icon: string
  title: string
  description: string
  items: string[]
}

const services: Service[] = [
  {
    icon: '⚖️',
    title: 'Гражданские споры',
    description: 'Защита ваших интересов в судебных разбирательствах любой сложности.',
    items: ['Подача исков и жалоб', 'Возмещение ущерба', 'Защита прав потребителей'],
  },
  {
    icon: '🏢',
    title: 'Корпоративное право',
    description: 'Юридическое сопровождение бизнеса от регистрации до сделок M&A.',
    items: ['Регистрация компаний', 'Корпоративные договоры', 'Слияния и поглощения'],
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Семейное право',
    description: 'Деликатное и профессиональное ведение семейных дел.',
    items: ['Развод и раздел имущества', 'Алименты и опека', 'Наследственные споры'],
  },
  {
    icon: '🏠',
    title: 'Недвижимость',
    description: 'Безопасное сопровождение сделок с недвижимостью.',
    items: ['Купля-продажа, аренда', 'Регистрация прав', 'Споры с застройщиком'],
  },
  {
    icon: '⚡',
    title: 'Уголовная защита',
    description: 'Профессиональная защита ваших прав на всех стадиях уголовного процесса.',
    items: ['Представительство в суде', 'Апелляции и жалобы', 'Досудебное соглашение'],
  },
  {
    icon: '📋',
    title: 'Трудовые споры',
    description: 'Защита работников и работодателей в трудовых конфликтах.',
    items: ['Незаконное увольнение', 'Задержка заработной платы', 'Нарушения охраны труда'],
  },
]

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 2rem;
  background: ${({ theme }) => theme.colors.bgDeep};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 5rem 1.25rem;
  }
`

const SectionInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  margin-bottom: 4rem;
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
  max-width: 540px;
  line-height: 1.15;

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.accent};
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5px;
  background: ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.article`
  background: ${({ theme }) => theme.colors.bgCard};
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${({ theme }) => theme.colors.accent};
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.bgCardHover};
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.card};

    &::before { transform: scaleY(1); }
    &::after { opacity: 1; }
  }
`

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1.25rem;
  display: block;
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.75rem;
`

const CardDesc = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.65;
  margin-bottom: 1.25rem;
`

const CardItems = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const CardItem = styled.li`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textDim};
  padding-left: 1rem;
  position: relative;

  &::before {
    content: '—';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.accent};
  }
`

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const el = sectionRef.current
    if (el) {
      const items = el.querySelectorAll('.animate-on-scroll')
      items.forEach((item) => observer.observe(item))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Section id="services" ref={sectionRef}>
      <SectionInner>
        <SectionHeader>
          <SectionEyebrow className="animate-on-scroll">
            <GoldBar />
            <EyebrowText>Практические области</EyebrowText>
          </SectionEyebrow>
          <SectionTitle className="animate-on-scroll">
            Комплексная правовая <em>защита</em>
          </SectionTitle>
        </SectionHeader>

        <Grid>
          {services.map((service, i) => (
            <Card
              key={service.title}
              className="animate-on-scroll"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <CardIcon>{service.icon}</CardIcon>
              <CardTitle>{service.title}</CardTitle>
              <CardDesc>{service.description}</CardDesc>
              <CardItems>
                {service.items.map((item) => (
                  <CardItem key={item}>{item}</CardItem>
                ))}
              </CardItems>
            </Card>
          ))}
        </Grid>
      </SectionInner>
    </Section>
  )
}

export default Services
