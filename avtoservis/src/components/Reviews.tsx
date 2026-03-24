import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

const Section = styled.section`
  padding: 8rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: end;
  margin-bottom: 4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }
`

const HeaderLeft = styled.div``

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
  margin-bottom: 1rem;

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
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.textPrimary};
`

const RatingBig = styled.div`
  text-align: right;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: left;
  }
`

const RatingNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.gold};
  line-height: 1;
`

const RatingStars = styled.div`
  display: flex;
  gap: 4px;
  justify-content: flex-end;
  margin: 0.5rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-start;
  }
`

const StarIcon = styled.svg<{ $filled: boolean }>`
  width: 20px;
  height: 20px;
  fill: ${({ $filled, theme }) => ($filled ? theme.colors.gold : theme.colors.border)};
`

const RatingCount = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.05em;
`

const ReviewsGrid = styled.div`
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

const ReviewCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.card};
  }
`

const ReviewStars = styled.div`
  display: flex;
  gap: 3px;
`

const SmallStar = styled.svg<{ $filled: boolean }>`
  width: 16px;
  height: 16px;
  fill: ${({ $filled, theme }) => ($filled ? theme.colors.gold : theme.colors.border)};
`

const ReviewText = styled.blockquote`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  flex: 1;
  font-style: normal;

  &::before {
    content: '"';
    font-family: Georgia, serif;
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.gold};
    line-height: 0;
    vertical-align: -0.8rem;
    margin-right: 0.2rem;
    opacity: 0.6;
  }
`

const ReviewAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.goldDim};
  border: 1px solid rgba(201, 162, 39, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gold};
  flex-shrink: 0;
`

const AuthorInfo = styled.div``

const AuthorName = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`

const AuthorDate = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 0.1rem;
`

interface ReviewData {
  author: string
  initials: string
  text: string
  stars: number
  date: string
}

const reviewsData: ReviewData[] = [
  {
    author: 'Алексей М.',
    initials: 'АМ',
    text: 'Менял АКПП масло — сделали за 2 часа, всё чётко, цена адекватная. Мастера знают своё дело.',
    stars: 5,
    date: 'Март 2026',
  },
  {
    author: 'Виктория С.',
    initials: 'ВС',
    text: 'После ДТП восстановили бампер и крыло. Как новая машина — подбор краски идеальный.',
    stars: 5,
    date: 'Февраль 2026',
  },
  {
    author: 'Денис К.',
    initials: 'ДК',
    text: 'Хожу только сюда на ТО. За 3 года ни одной проблемы. Честные цены и никакого навязывания.',
    stars: 5,
    date: 'Январь 2026',
  },
  {
    author: 'Ирина Л.',
    initials: 'ИЛ',
    text: 'Нашли проблему с электрикой, которую два других сервиса не могли найти неделями.',
    stars: 4,
    date: 'Декабрь 2025',
  },
  {
    author: 'Павел Р.',
    initials: 'ПР',
    text: 'Шиномонтаж без очереди по записи — это кайф. Храню шины у них уже второй сезон.',
    stars: 5,
    date: 'Ноябрь 2025',
  },
]

const StarComponent: React.FC<{ filled: boolean; small?: boolean }> = ({ filled, small }) => {
  if (small) {
    return (
      <SmallStar $filled={filled} viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </SmallStar>
    )
  }
  return (
    <StarIcon $filled={filled} viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </StarIcon>
  )
}

const Reviews: React.FC = () => {
  return (
    <section id="reviews">
      <Section>
        <Header className="reveal">
          <HeaderLeft>
            <SectionNumber>04</SectionNumber>
            <SectionLabel><span>Что говорят клиенты</span></SectionLabel>
            <Title>
              ОТЗЫВЫ
              <br />КЛИЕНТОВ
            </Title>
          </HeaderLeft>
          <RatingBig>
            <RatingNumber>4.9</RatingNumber>
            <RatingStars>
              {[1, 2, 3, 4, 5].map((i) => (
                <StarComponent key={i} filled={true} />
              ))}
            </RatingStars>
            <RatingCount>На основе 847 отзывов</RatingCount>
          </RatingBig>
        </Header>

        <ReviewsGrid>
          {reviewsData.map((review, index) => (
            <ReviewCard
              key={review.author}
              className="reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <ReviewStars>
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarComponent key={i} filled={i <= review.stars} small />
                ))}
              </ReviewStars>
              <ReviewText>{review.text}</ReviewText>
              <ReviewAuthor>
                <AuthorAvatar>{review.initials}</AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>{review.author}</AuthorName>
                  <AuthorDate>{review.date}</AuthorDate>
                </AuthorInfo>
              </ReviewAuthor>
            </ReviewCard>
          ))}
        </ReviewsGrid>
      </Section>
    </section>
  )
}

export default Reviews
