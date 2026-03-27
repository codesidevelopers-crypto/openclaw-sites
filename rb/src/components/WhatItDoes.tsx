import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  padding: 5rem 2rem;
  background: ${({ theme }) => theme.colors.white};

  @media (max-width: 768px) {
    padding: 3rem 1rem;
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

const Label = styled.div`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.75rem, 3.5vw, 2.6rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 1rem;
  line-height: 1.2;
`

const Subtitle = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.gray600};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 1.75rem;
  transition: all 0.25s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryLight};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadow.md};
    background: ${({ theme }) => theme.colors.white};
  }
`

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-bottom: 1.25rem;
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.6rem;
`

const CardText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.65;
`

interface Problem {
  icon: string
  title: string
  text: string
}

const problems: Problem[] = [
  {
    icon: '⚠️',
    title: 'Блокировка счёта «из ниоткуда»',
    text: 'Банк присылает запрос или блокирует операцию — вы не понимали, что что-то шло не так. Сервис показывает риски заранее и объясняет, что сделать.',
  },
  {
    icon: '🔍',
    title: 'Сомнительный контрагент',
    text: 'Вы отправили деньги, а потом узнали, что компания — однодневка или имеет долги в ФССП. Проверяйте до оплаты — безлимитно.',
  },
  {
    icon: '⚖️',
    title: 'Судебное дело без предупреждения',
    text: 'Иск уже подан или производство открыто, а вы не знали. Сервис мониторит арбитраж, суды и ФССП и сообщает первым.',
  },
  {
    icon: '👷',
    title: 'Риски при работе с самозанятыми',
    text: 'Регулярные выплаты, нестандартное оформление — и вопросы от налоговой. Модуль помогает выстроить безопасную схему работы.',
  },
  {
    icon: '🏗️',
    title: 'Признаки дробления бизнеса',
    text: 'Структура операций может выглядеть подозрительно — даже без злого умысла. Узнайте об этом первыми, а не от банка.',
  },
  {
    icon: '📊',
    title: 'Данные раскиданы по разным местам',
    text: 'Операции в банке, контрагенты в сервисах, суды — в картотеке арбитража. «Риски бизнеса» собирает всё в одном окне внутри банка.',
  },
]

const WhatItDoes: React.FC = () => (
  <Section id="what-it-does">
    <Container>
      <Header>
        <Label>Что решает сервис</Label>
        <Title>Риски бизнеса, которые вы могли не замечать</Title>
        <Subtitle>
          Каждый из этих сценариев встречается у тысяч компаний. Сервис помогает
          увидеть их заблаговременно — и действовать уверенно.
        </Subtitle>
      </Header>
      <Grid>
        {problems.map((p) => (
          <Card key={p.title}>
            <CardIcon>{p.icon}</CardIcon>
            <CardTitle>{p.title}</CardTitle>
            <CardText>{p.text}</CardText>
          </Card>
        ))}
      </Grid>
    </Container>
  </Section>
)

export default WhatItDoes
