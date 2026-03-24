import React from 'react'
import styled, { keyframes } from 'styled-components'
import annaImg from '../images/teacher-anna.jpg'
import dmitryImg from '../images/teacher-dmitry.jpg'
import mariaImg from '../images/teacher-maria.jpg'
import elenaImg from '../images/teacher-elena.jpg'

interface Teacher {
  name: string
  specialties: string
  experience: string
  img: string
  quote: string
}

const teachers: Teacher[] = [
  {
    name: 'Анна Светлова',
    specialties: 'Хатха-йога · Виньяса',
    experience: '12 лет практики',
    img: annaImg,
    quote: 'Йога — это не гибкость тела, это гибкость ума.',
  },
  {
    name: 'Дмитрий Волков',
    specialties: 'Аштанга · Силовая йога',
    experience: '8 лет практики',
    img: dmitryImg,
    quote: 'Каждое занятие — шаг к лучшей версии себя.',
  },
  {
    name: 'Мария Тихонова',
    specialties: 'Медитация · Для начинающих',
    experience: '10 лет практики',
    img: mariaImg,
    quote: 'Тишина внутри — самый ценный навык.',
  },
  {
    name: 'Елена Ким',
    specialties: 'Растяжка · Виньяса',
    experience: '6 лет практики',
    img: elenaImg,
    quote: 'Тело знает путь. Нужно лишь прислушаться.',
  },
]

const Section = styled.section`
  background: ${({ theme }) => theme.colors.bgSection};
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
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    max-width: 360px;
  }
`

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;

  &:hover .teacher-img {
    transform: scale(1.04);
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  margin-bottom: 28px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(to top, ${({ theme }) => theme.colors.bgSection}40, transparent);
  }
`

const TeacherImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.5s ease;
`

const ExperienceBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${({ theme }) => theme.colors.bg}CC;
  backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 6px 12px;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`

const TeacherName = styled.h3`
  font-size: 1.35rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.03em;
  margin-bottom: 8px;
`

const Specialties = styled.p`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.08em;
  margin-bottom: 20px;
`

const Divider = styled.div`
  width: 24px;
  height: 1px;
  background: ${({ theme }) => theme.colors.accent};
  opacity: 0.5;
  margin: 0 auto 16px;
`

const Quote = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`

export const Teachers: React.FC = () => {
  return (
    <Section id="teachers">
      <SectionHeader>
        <Eyebrow>Команда</Eyebrow>
        <SectionTitle>Преподаватели</SectionTitle>
      </SectionHeader>
      <Grid>
        {teachers.map((teacher) => (
          <Card key={teacher.name}>
            <ImageWrapper>
              <TeacherImage
                className="teacher-img"
                src={teacher.img}
                alt={teacher.name}
              />
              <ExperienceBadge>{teacher.experience}</ExperienceBadge>
            </ImageWrapper>
            <TeacherName>{teacher.name}</TeacherName>
            <Specialties>{teacher.specialties}</Specialties>
            <Divider />
            <Quote>«{teacher.quote}»</Quote>
          </Card>
        ))}
      </Grid>
    </Section>
  )
}
