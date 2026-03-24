import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import atmosphereImg from '../images/atmosphere.jpg'

interface Review {
  author: string
  text: string
  stars: number
  direction: string
}

const reviews: Review[] = [
  {
    author: 'Ольга К.',
    text: 'Занимаюсь в Пране полгода. Хатха с Анной — это лучшее, что случилось с моей спиной. Перестала болеть через месяц регулярных занятий.',
    stars: 5,
    direction: 'Хатха-йога',
  },
  {
    author: 'Игорь М.',
    text: 'Пришёл скептиком, остался фанатом. Аштанга с Дмитрием — серьёзная нагрузка. Каждое занятие — это вызов и удовольствие одновременно.',
    stars: 5,
    direction: 'Аштанга',
  },
  {
    author: 'Алиса Д.',
    text: 'Медитации с Марией помогли мне справиться с тревожностью. Практика осознанности изменила качество моей жизни. Очень благодарна.',
    stars: 5,
    direction: 'Медитация',
  },
  {
    author: 'Сергей В.',
    text: 'Удобное расписание, чистый зал, приятная атмосфера. Хожу на виньясу по утрам — прекрасный старт дня.',
    stars: 4,
    direction: 'Виньяса',
  },
  {
    author: 'Наталья П.',
    text: 'Растяжка с Еленой — отдельный кайф. За три месяца занятий я наконец-то села на шпагат. Мечта детства сбылась!',
    stars: 5,
    direction: 'Растяжка',
  },
]

const Section = styled.section`
  background: ${({ theme }) => theme.colors.bgLight};
  padding: 120px 48px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 80px 24px;
  }
`

const BgAccent = styled.div`
  position: absolute;
  right: -200px;
  top: -200px;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(184, 149, 90, 0.04) 0%, transparent 70%);
  pointer-events: none;
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`

const LeftCol = styled.div``

const Eyebrow = styled.div`
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 20px;
`

const SectionTitle = styled.h2`
  font-size: clamp(2.4rem, 4vw, 3.4rem);
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 0.04em;
  margin-bottom: 32px;
  line-height: 1.1;
`

const AtmosphereImage = styled.img`
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  display: block;

  @media (max-width: 900px) {
    aspect-ratio: 16/9;
    max-height: 300px;
  }
`

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

const ReviewCard = styled.div`
  padding: 32px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`

const ReviewMeta = styled.div``

const ReviewAuthor = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 2px;
`

const ReviewDirection = styled.div`
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`

const Stars = styled.div`
  display: flex;
  gap: 3px;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.85rem;
`

const ReviewText = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textDarkMuted};
  line-height: 1.7;
  font-style: italic;
`

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1">
    <polygon points="7,1 8.8,5.2 13.3,5.6 10,8.6 11,13 7,10.6 3,13 4,8.6 0.7,5.6 5.2,5.2" />
  </svg>
)

export const Reviews: React.FC = () => {
  return (
    <Section id="reviews">
      <BgAccent />
      <Inner>
        <LeftCol>
          <Eyebrow>Опыт практикующих</Eyebrow>
          <SectionTitle>Отзывы</SectionTitle>
          <AtmosphereImage src={atmosphereImg} alt="Студия Прана" />
        </LeftCol>
        <RightCol>
          {reviews.map((review) => (
            <ReviewCard key={review.author}>
              <ReviewHeader>
                <ReviewMeta>
                  <ReviewAuthor>{review.author}</ReviewAuthor>
                  <ReviewDirection>{review.direction}</ReviewDirection>
                </ReviewMeta>
                <Stars>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} filled={i < review.stars} />
                  ))}
                </Stars>
              </ReviewHeader>
              <ReviewText>«{review.text}»</ReviewText>
            </ReviewCard>
          ))}
        </RightCol>
      </Inner>
    </Section>
  )
}
