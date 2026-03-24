import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import hathaImg from '../images/direction-hatha.jpg'
import vinyasaImg from '../images/direction-vinyasa.jpg'
import ashtangaImg from '../images/direction-ashtanga.jpg'
import beginnersImg from '../images/direction-beginners.jpg'
import meditationImg from '../images/direction-meditation.jpg'
import stretchImg from '../images/direction-stretch.jpg'

interface Direction {
  title: string
  subtitle: string
  description: string
  img: string
  tag: string
}

const directions: Direction[] = [
  {
    title: 'Хатха-йога',
    subtitle: 'Классическая практика',
    description: 'Классическая практика для баланса тела и ума. Подходит для всех уровней подготовки.',
    img: hathaImg,
    tag: 'Все уровни',
  },
  {
    title: 'Виньяса',
    subtitle: 'Динамичный поток',
    description: 'Динамичная практика, где движение синхронизировано с дыханием. Льющийся поток асан.',
    img: vinyasaImg,
    tag: 'Средний+',
  },
  {
    title: 'Аштанга',
    subtitle: 'Силовая интенсив',
    description: 'Интенсивная силовая практика по фиксированной последовательности для продвинутых.',
    img: ashtangaImg,
    tag: 'Продвинутый',
  },
  {
    title: 'Для начинающих',
    subtitle: 'Мягкое введение',
    description: 'Мягкое введение в практику: базовые асаны, пранаяма, работа с телом и дыханием.',
    img: beginnersImg,
    tag: 'Начинающим',
  },
  {
    title: 'Медитация',
    subtitle: 'Работа с умом',
    description: 'Практики осознанности, дыхательные техники, развитие внимания и внутренней тишины.',
    img: meditationImg,
    tag: 'Все уровни',
  },
  {
    title: 'Растяжка',
    subtitle: 'Восстановление',
    description: 'Глубокая работа с гибкостью, мягкое расслабление мышц и восстановление тела.',
    img: stretchImg,
    tag: 'Все уровни',
  },
]

const Section = styled.section`
  background: ${({ theme }) => theme.colors.bg};
  padding: 120px 48px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 80px 24px;
  }
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`

const Eyebrow = styled.div`
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    opacity: 0.6;
  }
`

const SectionTitle = styled.h2`
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.04em;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  max-width: 1280px;
  margin: 0 auto;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.article`
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: default;

  &:hover img {
    transform: scale(1.08);
  }

  &:hover .card-overlay {
    opacity: 1;
  }

  &:hover .card-content {
    transform: translateY(0);
    opacity: 1;
  }
`

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  display: block;
`

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(13, 26, 13, 0.96) 0%,
    rgba(13, 26, 13, 0.5) 50%,
    rgba(13, 26, 13, 0.1) 100%
  );
  opacity: 0.7;
  transition: opacity 0.4s ease;
`

const CardAlwaysVisible = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 28px 28px 24px;
`

const CardTag = styled.span`
  display: inline-block;
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.accent}60;
  padding: 4px 10px;
  margin-bottom: 10px;
`

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.02em;
  margin-bottom: 4px;
`

const CardSubtitle = styled.p`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.06em;
`

const CardContent = styled.div`
  padding: 0 28px 28px;
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
  transform: translateY(10px);
  opacity: 0;
  transition: all 0.4s ease;
`

const CardDescription = styled.p`
  font-size: 0.88rem;
  color: rgba(248, 243, 236, 0.8);
  line-height: 1.65;
`

const BgMotif = styled.div`
  position: absolute;
  top: -100px;
  right: -100px;
  width: 400px;
  height: 400px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  opacity: 0.3;
  pointer-events: none;
`

export const Directions: React.FC = () => {
  return (
    <Section id="directions">
      <BgMotif />
      <SectionHeader>
        <Eyebrow>Практики</Eyebrow>
        <SectionTitle>Направления</SectionTitle>
      </SectionHeader>
      <Grid>
        {directions.map((dir) => (
          <Card key={dir.title}>
            <CardImage src={dir.img} alt={dir.title} />
            <CardOverlay className="card-overlay" />
            <CardContent className="card-content">
              <CardDescription>{dir.description}</CardDescription>
            </CardContent>
            <CardAlwaysVisible>
              <CardTag>{dir.tag}</CardTag>
              <CardTitle>{dir.title}</CardTitle>
              <CardSubtitle>{dir.subtitle}</CardSubtitle>
            </CardAlwaysVisible>
          </Card>
        ))}
      </Grid>
    </Section>
  )
}
