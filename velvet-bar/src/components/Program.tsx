import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.colors.bg};

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
`

const Tag = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
`

const Title = styled.h2`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.75rem;
`

const Subtitle = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.gray600};
  max-width: 500px;
  margin: 0 auto;
`

const Timeline = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const EventCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.75rem;
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  transition: border-color 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const EventDay = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.75rem 1rem;
  font-weight: 700;
  font-size: 0.85rem;
  text-align: center;
  white-space: nowrap;
  flex-shrink: 0;
`

const EventInfo = styled.div``

const EventTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.35rem;
`

const EventDesc = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`

const EventTime = styled.span`
  display: block;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
`

interface EventData {
  day: string
  title: string
  desc: string
  time: string
}

const events: EventData[] = [
  { day: 'ЧТ', title: 'Jazz & Chill', desc: 'Живой джаз-квартет, приглушённый свет и специальное коктейльное меню', time: '20:00 — 00:00' },
  { day: 'ПТ', title: 'Velvet Vibes', desc: 'DJ-сеты deep house и disco — лучший старт выходных', time: '21:00 — 03:00' },
  { day: 'СБ', title: 'Neon Nights', desc: 'Главная вечеринка недели: приглашённые диджеи и неоновый свет', time: '22:00 — 04:00' },
  { day: 'ВС', title: 'Sunday Brunch', desc: 'Бранч с авторскими коктейлями, мимозами и расслабленной музыкой', time: '12:00 — 17:00' },
]

const Program: React.FC = () => (
  <Section id="program">
    <Container>
      <Header>
        <Tag>Вечерняя программа</Tag>
        <Title>Каждый день — новый вайб</Title>
        <Subtitle>
          От расслабленного джаза до зажигательных DJ-сетов
        </Subtitle>
      </Header>
      <Timeline>
        {events.map((ev) => (
          <EventCard key={ev.day}>
            <EventDay>{ev.day}</EventDay>
            <EventInfo>
              <EventTitle>{ev.title}</EventTitle>
              <EventDesc>{ev.desc}</EventDesc>
              <EventTime>{ev.time}</EventTime>
            </EventInfo>
          </EventCard>
        ))}
      </Timeline>
    </Container>
  </Section>
)

export default Program
