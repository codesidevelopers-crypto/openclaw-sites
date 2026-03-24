import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'

const Section = styled.section`
  padding: 8rem 2rem;
  background: ${({ theme }) => theme.colors.surface};
  position: relative;
  overflow: hidden;

  &::before {
    content: 'АВТОРИТЕТ';
    position: absolute;
    top: 50%;
    right: -5%;
    transform: translateY(-50%);
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(6rem, 14vw, 16rem);
    font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 1px rgba(201, 162, 39, 0.06);
    pointer-events: none;
    white-space: nowrap;
    z-index: 0;
  }
`

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const Left = styled.div``

const SectionNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.2em;
  margin-bottom: 0.25rem;
`

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  &::before {
    content: '';
    display: block;
    width: 32px;
    height: 2px;
    background: ${({ theme }) => theme.colors.gold};
  }

  span {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gold};
  }
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 2rem;
`

const Description = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 1.25rem;

  &:last-of-type {
    margin-bottom: 3rem;
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: ${({ theme }) => theme.colors.border};
`

const StatBox = styled.div`
  background: ${({ theme }) => theme.colors.card};
  padding: 1.75rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.gold};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }

  &.counted::before {
    transform: scaleX(1);
  }
`

const StatNum = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2.8rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1;
  margin-bottom: 0.4rem;

  span {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Right = styled.div`
  position: relative;
`

const ImgStack = styled.div`
  position: relative;
`

const MainImg = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;

  .gatsby-image-wrapper {
    display: block;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid rgba(201, 162, 39, 0.2);
    pointer-events: none;
  }
`

const AccentImg = styled.div`
  position: absolute;
  bottom: -3rem;
  left: -3rem;
  width: 55%;
  z-index: 2;
  overflow: hidden;
  border: 4px solid ${({ theme }) => theme.colors.surface};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }

  .gatsby-image-wrapper {
    display: block;
  }
`

const GoldBadge = styled.div`
  position: absolute;
  top: -1.5rem;
  right: -1.5rem;
  z-index: 3;
  width: 110px;
  height: 110px;
  background: ${({ theme }) => theme.colors.gold};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 90px;
    height: 90px;
    top: -1rem;
    right: -1rem;
  }
`

const BadgeNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.bg};
  line-height: 1;
`

const BadgeText = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.bg};
  margin-top: 0.2rem;
`

interface StatData {
  value: number
  suffix: string
  label: string
}

const stats: StatData[] = [
  { value: 12, suffix: ' лет', label: 'Опыта работы' },
  { value: 8000, suffix: '+', label: 'Довольных клиентов' },
  { value: 15, suffix: '', label: 'Мастеров в команде' },
  { value: 100, suffix: '%', label: 'Гарантия на работы' },
]

const countUp = (
  el: HTMLElement,
  target: number,
  suffix: string,
  duration: number
): void => {
  const start = Date.now()
  const tick = (): void => {
    const elapsed = Date.now() - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.round(eased * target)
    el.textContent = current.toLocaleString('ru-RU') + suffix
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

const About: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null)
  const [counted, setCounted] = useState(false)

  useEffect((): (() => void) => {
    const el = statsRef.current
    if (!el) return (): void => undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setCounted(true)
          const numEls = el.querySelectorAll<HTMLElement>('[data-count]')
          numEls.forEach((numEl) => {
            const target = parseInt(numEl.dataset.count ?? '0', 10)
            const suffix = numEl.dataset.suffix ?? ''
            countUp(numEl, target, suffix, 1800)
          })
          const boxes = el.querySelectorAll('.stat-box')
          boxes.forEach((box) => box.classList.add('counted'))
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return (): void => observer.disconnect()
  }, [counted])

  return (
    <section id="about">
      <Section>
        <Inner>
          <Left className="reveal-left">
            <SectionNumber>03</SectionNumber>
            <SectionLabel><span>Наша история</span></SectionLabel>
            <Title>
              О СЕРВИСЕ
              <br />АВТОРИТЕТ
            </Title>
            <Description>
              Мы начали в 2012 году с небольшого гаража и двух мастеров. Сегодня АВТОРИТЕТ — это
              современный сервисный центр площадью 1 200 м², оснащённый профессиональным
              оборудованием ведущих мировых производителей.
            </Description>
            <Description>
              Наш принцип прост: каждый автомобиль получает то же внимание, что и наш собственный.
              Прозрачные цены, реальные сроки, гарантия на все виды работ — это не маркетинг,
              это наш стандарт работы.
            </Description>

            <StatsGrid ref={statsRef}>
              {stats.map((stat) => (
                <StatBox key={stat.label} className="stat-box">
                  <StatNum>
                    <span
                      data-count={stat.value}
                      data-suffix={stat.suffix}
                    >
                      {stat.value.toLocaleString('ru-RU')}{stat.suffix}
                    </span>
                  </StatNum>
                  <StatLabel>{stat.label}</StatLabel>
                </StatBox>
              ))}
            </StatsGrid>
          </Left>

          <Right className="reveal-right">
            <ImgStack>
              <MainImg>
                <StaticImage
                  src="../images/workshop-interior.jpg"
                  alt="Мастерская АВТОРИТЕТ"
                  layout="fullWidth"
                  objectFit="cover"
                  placeholder="blurred"
                />
              </MainImg>
              <AccentImg>
                <StaticImage
                  src="../images/workshop-detail.jpg"
                  alt="Детали мастерской"
                  layout="fullWidth"
                  objectFit="cover"
                  placeholder="blurred"
                />
              </AccentImg>
              <GoldBadge>
                <BadgeNumber>12</BadgeNumber>
                <BadgeText>лет на рынке</BadgeText>
              </GoldBadge>
            </ImgStack>
          </Right>
        </Inner>
      </Section>
    </section>
  )
}

export default About
