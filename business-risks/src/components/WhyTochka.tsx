import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  padding: 5rem 2rem;
  background: white;

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
  text-align: center;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.75rem;
  text-align: center;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray600};
  margin-bottom: 3.5rem;
  text-align: center;
  line-height: 1.7;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  text-align: center;
  padding: 2rem 1rem;
`

const IconWrap = styled.div`
  width: 72px;
  height: 72px;
  background: ${({ theme }) => theme.colors.primaryLighter};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1.25rem;
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.625rem;
`

const CardDesc = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.65;
`

const items = [
  {
    icon: '🏦',
    title: 'Внутри интернет-банка',
    desc: 'Не нужно заходить в отдельный сервис — всё доступно прямо в вашем кабинете Точки',
  },
  {
    icon: '🖥️',
    title: 'Всё в одном окне',
    desc: 'Операции, контрагенты, суды, проверки — единый дашборд без лишних переключений',
  },
  {
    icon: '💬',
    title: 'Понятные подсказки',
    desc: 'Не просто уровень риска, а конкретные рекомендации — что сделать, чтобы стало лучше',
  },
  {
    icon: '⏰',
    title: 'Помогает заранее',
    desc: 'Сервис предупреждает, пока ещё есть возможность что-то изменить — не после проблемы',
  },
]

const WhyTochka: React.FC = () => (
  <Section>
    <Container>
      <SectionLabel>Почему Точка</SectionLabel>
      <Title>Сервис, который помогает, а не пугает</Title>
      <Subtitle>
        «Риски бизнеса» — это не комплаенс-инструмент. Это помощник,
        который говорит языком пользы для вашего бизнеса.
      </Subtitle>
      <Grid>
        {items.map(i => (
          <Card key={i.title}>
            <IconWrap>{i.icon}</IconWrap>
            <CardTitle>{i.title}</CardTitle>
            <CardDesc>{i.desc}</CardDesc>
          </Card>
        ))}
      </Grid>
    </Container>
  </Section>
)

export default WhyTochka
