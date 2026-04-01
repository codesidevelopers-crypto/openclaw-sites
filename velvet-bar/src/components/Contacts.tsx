import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.colors.bgLight};

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
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 2rem;
  text-align: center;
`

const Icon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.5rem;
`

const CardText = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`

const CardLink = styled.a`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`

const Contacts: React.FC = () => (
  <Section id="contacts">
    <Container>
      <Header>
        <Tag>Контакты</Tag>
        <Title>Как нас найти</Title>
      </Header>
      <Grid>
        <Card>
          <Icon>📍</Icon>
          <CardTitle>Адрес</CardTitle>
          <CardText>ул. Большая Дмитровка, 32</CardText>
          <CardText>Москва, метро Чеховская</CardText>
        </Card>
        <Card>
          <Icon>🕐</Icon>
          <CardTitle>Режим работы</CardTitle>
          <CardText>Пн — Чт: 18:00 — 02:00</CardText>
          <CardText>Пт — Сб: 18:00 — 04:00</CardText>
          <CardText>Вс: 12:00 — 00:00</CardText>
        </Card>
        <Card>
          <Icon>📞</Icon>
          <CardTitle>Связь</CardTitle>
          <CardLink href="tel:+74951234567">+7 (495) 123-45-67</CardLink>
          <CardText style={{ marginTop: '0.35rem' }}>
            Telegram: @velvetbar
          </CardText>
        </Card>
      </Grid>
    </Container>
  </Section>
)

export default Contacts
