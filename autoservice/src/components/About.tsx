import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface StatItemData {
  number: string
  suffix: string
  label: string
  description: string
}

const STATS: StatItemData[] = [
  { number: '10', suffix: '+', label: 'лет опыта', description: 'На рынке автосервиса' },
  { number: '5000', suffix: '+', label: 'клиентов', description: 'Довольных автовладельцев' },
  { number: '20', suffix: '', label: 'мастеров', description: 'Сертифицированных специалистов' },
  { number: '98', suffix: '%', label: 'довольны', description: 'Рейтинг удовлетворённости' },
]

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

const BgNumber = styled.div`
  position: absolute;
  right: -2rem;
  bottom: -4rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 20rem;
  font-weight: 900;
  color: rgba(255,255,255,0.015);
  line-height: 1;
  pointer-events: none;
  user-select: none;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const ContentSide = styled.div``

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
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-bottom: 1.5rem;
`

const AboutText = styled.p`
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1.5rem;
`

const Features = styled.ul`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;

  &::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 0.45rem;
  }
`

const ImageSide = styled.div`
  position: relative;
`

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
  }

  &:hover img {
    transform: scale(1.03);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid ${({ theme }) => theme.colors.border};
    pointer-events: none;
  }
`

const ImageAccent = styled.div`
  position: absolute;
  bottom: -1.5rem;
  left: -1.5rem;
  width: 120px;
  height: 120px;
  border: 3px solid ${({ theme }) => theme.colors.accent};
  z-index: -1;
`

const ImageAccent2 = styled.div`
  position: absolute;
  top: -1rem;
  right: -1rem;
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.colors.accent};
  opacity: 0.15;
  z-index: -1;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  margin-top: 5rem;
  background: ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const StatCard = styled.div<{ $visible: boolean }>`
  background: ${({ theme }) => theme.colors.bgCard};
  padding: 2rem 1.5rem;
  text-align: center;
  transition: background ${({ theme }) => theme.transitions.base};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.5s ease, transform 0.5s ease, background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.bgSecondary};
  }
`

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
`

const StatDesc = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const About: React.FC = () => {
  const [visibleStats, setVisibleStats] = useState<boolean>(false)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ref = statsRef.current
    if (!ref) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleStats(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(ref)
    return () => observer.disconnect()
  }, [])

  return (
    <Section id="about">
      <BgNumber>10</BgNumber>
      <Container>
        <Grid>
          <ContentSide>
            <SectionLabel><span>О компании</span></SectionLabel>
            <SectionTitle>10 лет безупречного сервиса</SectionTitle>
            <AboutText>
              AutoPro — это не просто автосервис, это команда профессионалов, влюблённых
              в своё дело. Мы основали компанию в 2014 году с одной целью: сделать качественный
              автосервис доступным и прозрачным.
            </AboutText>
            <AboutText>
              Каждый мастер прошёл сертификацию у официальных дилеров и регулярно проходит
              обучение. Мы работаем только с оригинальными запчастями и расходниками от
              проверенных поставщиков.
            </AboutText>
            <Features>
              <FeatureItem>Гарантия на все виды работ от 6 месяцев до 2 лет</FeatureItem>
              <FeatureItem>Прозрачное ценообразование — цена согласовывается до начала работ</FeatureItem>
              <FeatureItem>Работаем с автомобилями любых марок и моделей</FeatureItem>
              <FeatureItem>Профессиональное оборудование немецкого производства</FeatureItem>
            </Features>
          </ContentSide>

          <ImageSide>
            <ImageWrapper>
              <img src="/images/about-team.jpg" alt="Команда AutoPro" />
            </ImageWrapper>
            <ImageAccent />
            <ImageAccent2 />
          </ImageSide>
        </Grid>

        <StatsGrid ref={statsRef}>
          {STATS.map((stat, index) => (
            <StatCard
              key={stat.label}
              $visible={visibleStats}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <StatNumber>{stat.number}{stat.suffix}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
              <StatDesc>{stat.description}</StatDesc>
            </StatCard>
          ))}
        </StatsGrid>
      </Container>
    </Section>
  )
}

export default About
