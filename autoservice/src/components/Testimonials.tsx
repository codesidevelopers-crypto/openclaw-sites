import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import type { Testimonial } from '../types'

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Александр Петров',
    rating: 5,
    date: 'Ноябрь 2024',
    car: 'BMW 5 Series',
    text: 'Обращался с серьёзной проблемой по кузову после ДТП. Ребята сделали всё качественно, быстро и по разумной цене. Кузов как новый — даже следа не осталось. Отдельное спасибо мастеру Дмитрию за профессионализм.',
  },
  {
    id: '2',
    name: 'Мария Соколова',
    rating: 5,
    date: 'Октябрь 2024',
    car: 'Toyota Camry',
    text: 'Уже второй год обслуживаю свою Toyota только здесь. ТО делают строго по регламенту, всегда объясняют что и зачем меняют. Цены честные, без навязывания лишнего. Рекомендую всем знакомым!',
  },
  {
    id: '3',
    name: 'Дмитрий Иванов',
    rating: 5,
    date: 'Сентябрь 2024',
    car: 'Mercedes-Benz E-Class',
    text: 'Сделали полную диагностику и устранили несколько скрытых неисправностей, которые другой сервис не нашёл. Особенно впечатлил подход к работе — всё фиксируют, показывают фото до и после. Доверяю им полностью.',
  },
  {
    id: '4',
    name: 'Елена Козлова',
    rating: 5,
    date: 'Август 2024',
    car: 'Hyundai Tucson',
    text: 'Приезжала на покраску крыла. Цвет подобрали идеально, разницы не видно совсем. Срок выполнили раньше обещанного. Сервис на высоком уровне, буду возвращаться.',
  },
  {
    id: '5',
    name: 'Сергей Новиков',
    rating: 5,
    date: 'Июль 2024',
    car: 'Audi A6',
    text: 'Шиномонтаж и балансировка — сделали за 40 минут без очереди. Обязательно приеду на ТО. Сервис современный, чисто, культурные мастера. Очень приятно было обслуживаться.',
  },
]

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`

const Section = styled.section`
  padding: 8rem 2rem;
  background: ${({ theme }) => theme.colors.bgSecondary};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      ${({ theme }) => theme.colors.accent},
      transparent
    );
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  margin-bottom: 4rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
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
`

const RatingOverall = styled.div`
  text-align: right;

  .stars {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.accent};
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .score {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 2.5rem;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.accent};
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .label {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const TestimonialCard = styled.div<{ $visible: boolean }>`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
  position: relative;
  transition: all ${({ theme }) => theme.transitions.base};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(30px)')};
  transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  &:first-child {
    grid-column: span 2;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      grid-column: span 1;
    }
  }
`

const QuoteIcon = styled.div`
  font-size: 3rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.accent};
  font-family: Georgia, serif;
  margin-bottom: 1rem;
  opacity: 0.6;
`

const TestimonialText = styled.p`
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1.5rem;
`

const TestimonialFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const AuthorInfo = styled.div``

const AuthorName = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
`

const AuthorMeta = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};

  span.car {
    color: ${({ theme }) => theme.colors.accent};
  }
`

const StarRating = styled.div`
  display: flex;
  gap: 2px;
`

const Star = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.9rem;
`

const MarqueeWrapper = styled.div`
  margin-top: 4rem;
  overflow: hidden;
  padding: 1.5rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const MarqueeTrack = styled.div`
  display: flex;
  gap: 3rem;
  animation: ${marquee} 20s linear infinite;
  width: max-content;
`

const MarqueeItem = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDim};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 3rem;

  span.dot {
    display: block;
    width: 4px;
    height: 4px;
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 50%;
    flex-shrink: 0;
  }
`

const MARQUEE_ITEMS = [
  'BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Honda', 'Hyundai', 'Kia', 'Volkswagen',
  'Lexus', 'Porsche', 'Volvo', 'Mazda', 'Subaru', 'Ford', 'Renault',
]

const Testimonials: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    cardRefs.current.forEach((card, index) => {
      if (!card) return
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => new Set([...prev, index]))
            }, index * 100)
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(card)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <Section id="testimonials">
      <Container>
        <SectionHeader>
          <div>
            <SectionLabel><span>Клиенты о нас</span></SectionLabel>
            <SectionTitle>Доверие в каждом отзыве</SectionTitle>
          </div>
          <RatingOverall>
            <div className="stars">★★★★★</div>
            <div className="score">5.0</div>
            <div className="label">Средний рейтинг</div>
          </RatingOverall>
        </SectionHeader>

        <TestimonialsGrid>
          {TESTIMONIALS.map((t, index) => (
            <TestimonialCard
              key={t.id}
              $visible={visibleCards.has(index)}
              ref={(el) => { cardRefs.current[index] = el }}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <QuoteIcon>"</QuoteIcon>
              <TestimonialText>{t.text}</TestimonialText>
              <TestimonialFooter>
                <AuthorInfo>
                  <AuthorName>{t.name}</AuthorName>
                  <AuthorMeta>
                    <span className="car">{t.car}</span> · {t.date}
                  </AuthorMeta>
                </AuthorInfo>
                <StarRating>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i}>★</Star>
                  ))}
                </StarRating>
              </TestimonialFooter>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </Container>

      <MarqueeWrapper>
        <MarqueeTrack>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <MarqueeItem key={i}>
              {item}<span className="dot" />
            </MarqueeItem>
          ))}
        </MarqueeTrack>
      </MarqueeWrapper>
    </Section>
  )
}

export default Testimonials
