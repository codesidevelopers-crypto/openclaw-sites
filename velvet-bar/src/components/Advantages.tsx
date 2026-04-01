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
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 2rem;
  text-align: center;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.5rem;
`

const CardDesc = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`

interface AdvantageData {
  icon: string
  title: string
  desc: string
}

const advantages: AdvantageData[] = [
  { icon: '🍸', title: 'Авторская карта', desc: '50+ уникальных коктейлей, которые вы не найдёте в другом баре города' },
  { icon: '🎧', title: 'Живая музыка', desc: 'DJ-сеты по выходным и джазовые вечера по четвергам' },
  { icon: '✨', title: 'Уникальная атмосфера', desc: 'Неоновый свет, бархатные текстуры и продуманный дизайн' },
  { icon: '🪑', title: 'VIP-зоны', desc: 'Приватные кабинки для особых вечеров и деловых встреч' },
  { icon: '📱', title: 'Онлайн-бронь', desc: 'Забронируйте столик за пару кликов — без звонков и ожидания' },
  { icon: '🌙', title: 'До утра', desc: 'Работаем до 4:00 в выходные — ваш вечер не закончится рано' },
]

const Advantages: React.FC = () => (
  <Section id="advantages">
    <Container>
      <Header>
        <Tag>Преимущества</Tag>
        <Title>Почему выбирают нас</Title>
      </Header>
      <Grid>
        {advantages.map((a) => (
          <Card key={a.title}>
            <Icon>{a.icon}</Icon>
            <CardTitle>{a.title}</CardTitle>
            <CardDesc>{a.desc}</CardDesc>
          </Card>
        ))}
      </Grid>
    </Container>
  </Section>
)

export default Advantages
