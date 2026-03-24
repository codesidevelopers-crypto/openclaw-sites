import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import type { Service, ServiceCategory } from '../types'

const SERVICES: Service[] = [
  {
    id: 'diagnostics',
    category: 'diagnostics',
    title: 'Компьютерная диагностика',
    description: 'Полная диагностика всех систем автомобиля на профессиональном оборудовании. Выявляем скрытые неисправности.',
    price: 'от 1 500 ₽',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>`,
  },
  {
    id: 'maintenance',
    category: 'maintenance',
    title: 'Техническое обслуживание',
    description: 'Плановое ТО по регламенту производителя. Замена масла, фильтров, свечей. Гарантия качества запчастей.',
    price: 'от 3 500 ₽',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  },
  {
    id: 'body',
    category: 'body',
    title: 'Кузовной ремонт',
    description: 'Устранение вмятин, замена элементов кузова, рихтовка. Восстановление геометрии кузова на стапеле.',
    price: 'от 5 000 ₽',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><path d="m16 8 5 3-3 2-2-1"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  },
  {
    id: 'paint',
    category: 'paint',
    title: 'Покраска автомобиля',
    description: 'Профессиональная покраска в покрасочной камере. Подбор цвета, нанесение лака, полировка до зеркального блеска.',
    price: 'от 8 000 ₽',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 21.5v-1a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v1"/><path d="M14 11.5a4 4 0 1 0-4 0V21h4v-9.5z"/><path d="M18 8.5h-1"/><path d="M7 8.5H6"/></svg>`,
  },
  {
    id: 'tires',
    category: 'tires',
    title: 'Шиномонтаж',
    description: 'Сезонная смена шин, балансировка колёс. Хранение шин. Ремонт проколов и порезов.',
    price: 'от 800 ₽',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/></svg>`,
  },
  {
    id: 'electrical',
    category: 'electrical',
    title: 'Электрика',
    description: 'Ремонт электропроводки, замена аккумуляторов, установка дополнительного оборудования. Диагностика ЭБУ.',
    price: 'от 2 000 ₽',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  },
]

const Section = styled.section`
  padding: 8rem 2rem;
  background: ${({ theme }) => theme.colors.bg};
  position: relative;
  overflow: hidden;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  margin-bottom: 4rem;
`

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  &::before {
    content: '';
    display: block;
    width: 40px;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
  }

  span {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.accent};
  }
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.05;

  span {
    -webkit-text-stroke: 1px ${({ theme }) => theme.colors.textDim};
    color: transparent;
  }
`

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const ServiceCard = styled.div<{ $visible: boolean }>`
  background: ${({ theme }) => theme.colors.bgCard};
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.base};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(30px)')};
  transition: opacity 0.6s ease, transform 0.6s ease, background 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.accent};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${({ theme }) => theme.transitions.base};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.bgSecondary};
    z-index: 1;

    &::before {
      transform: scaleX(1);
    }
  }
`

const ServiceNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 4rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.border};
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  line-height: 1;
  transition: color ${({ theme }) => theme.transitions.base};
  user-select: none;

  ${ServiceCard}:hover & {
    color: ${({ theme }) => theme.colors.accent};
    opacity: 0.15;
  }
`

const ServiceIcon = styled.div`
  width: 48px;
  height: 48px;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 1.5rem;

  svg {
    width: 100%;
    height: 100%;
  }
`

const ServiceTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 0.75rem;
`

const ServiceDescription = styled.p`
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1.5rem;
`

const ServicePrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;

  span.price {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.accent};
  }

  span.divider {
    width: 24px;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
    display: block;
  }

  span.cta {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.colors.textDim};
    text-transform: uppercase;
    transition: color ${({ theme }) => theme.transitions.fast};

    ${ServiceCard}:hover & {
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }
`

const BookingCTA = styled.div`
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2.5rem 3rem;
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2rem;
  }
`

const BookingCTAText = styled.div`
  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const BookingCTAButton = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  white-space: nowrap;
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.glow};
    transform: translateY(-2px);
  }
`

const Services: React.FC = () => {
  const [visibleCards, setVisibleCards] = React.useState<Set<number>>(new Set())
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    cardRefs.current.forEach((card, index) => {
      if (!card) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleCards((prev) => new Set([...prev, index]))
              }, index * 80)
              observer.disconnect()
            }
          })
        },
        { threshold: 0.1 }
      )
      observer.observe(card)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()
    const target = document.querySelector('#booking')
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Section id="services">
      <Container>
        <SectionHeader>
          <SectionLabel><span>Что мы делаем</span></SectionLabel>
          <SectionTitle>
            Полный спектр <span>услуг</span>
          </SectionTitle>
        </SectionHeader>

        <ServicesGrid>
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              $visible={visibleCards.has(index)}
              ref={(el) => { cardRefs.current[index] = el }}
            >
              <ServiceNumber>0{index + 1}</ServiceNumber>
              <ServiceIcon dangerouslySetInnerHTML={{ __html: service.icon }} />
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServicePrice>
                <span className="price">{service.price}</span>
                <span className="divider" />
                <span className="cta">Подробнее</span>
              </ServicePrice>
            </ServiceCard>
          ))}
        </ServicesGrid>

        <BookingCTA>
          <BookingCTAText>
            <h3>Не знаете, какая услуга нужна?</h3>
            <p>Запишитесь на бесплатную диагностику — определим проблему и составим план работ</p>
          </BookingCTAText>
          <BookingCTAButton href="#booking" onClick={handleNavClick}>
            Записаться бесплатно
          </BookingCTAButton>
        </BookingCTA>
      </Container>
    </Section>
  )
}

export default Services
