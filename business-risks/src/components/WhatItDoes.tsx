import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  padding: 5rem 2rem;
  background: ${({ theme }) => theme.colors.gray50};

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 3rem;
  max-width: 560px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  transition: all 0.25s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.lg};
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primaryLight};
  }
`

const Icon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.5rem;
`

const CardDesc = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`

const items = [
  {
    icon: '📊',
    title: 'Анализирует операции',
    desc: 'Оценивает каждую транзакцию по критериям 115-ФЗ и подсказывает, что влияет на риск',
  },
  {
    icon: '⚡',
    title: 'Предупреждает заранее',
    desc: 'Сигналит до отправки платежа, пока ещё можно скорректировать ситуацию',
  },
  {
    icon: '🔍',
    title: 'Проверяет контрагентов',
    desc: 'Анализирует партнёров по реестрам и показывает понятные сигналы риска',
  },
  {
    icon: '🏛️',
    title: 'Следит за правовым полем',
    desc: 'Сообщает о проверках, исках и появлениях в ФССП — раньше, чем вы узнаете сами',
  },
  {
    icon: '💡',
    title: 'Подсказывает, что делать',
    desc: 'Даёт конкретные рекомендации, а не просто показывает цифры',
  },
]

const WhatItDoes: React.FC = () => (
  <Section>
    <Container>
      <SectionLabel>Возможности сервиса</SectionLabel>
      <Title>Один сервис — полная картина рисков</Title>
      <Grid>
        {items.map(item => (
          <Card key={item.title}>
            <Icon>{item.icon}</Icon>
            <CardTitle>{item.title}</CardTitle>
            <CardDesc>{item.desc}</CardDesc>
          </Card>
        ))}
      </Grid>
    </Container>
  </Section>
)

export default WhatItDoes
