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
  margin-bottom: 0.75rem;
`

const Subtitle = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.gray600};
  max-width: 500px;
  margin: 0 auto;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 868px) {
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
  padding: 1.75rem;
  transition: all 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadow.neon};
    transform: translateY(-4px);
  }
`

const CardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`

const CardName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.5rem;
`

const CardDesc = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
  margin-bottom: 1rem;
`

const CardPrice = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
`

interface CocktailData {
  icon: string
  name: string
  desc: string
  price: string
}

const cocktails: CocktailData[] = [
  { icon: '🍹', name: 'Velvet Sunset', desc: 'Ром, маракуйя, лайм, кокосовый сироп и тонкий дымок розмарина', price: '690 ₽' },
  { icon: '🥃', name: 'Midnight Gold', desc: 'Бурбон, мёд, апельсиновая цедра, ангостура и дубовая щепа', price: '790 ₽' },
  { icon: '🍸', name: 'Neon Fizz', desc: 'Джин, бузина, просекко, огурец и электролит мяты', price: '650 ₽' },
  { icon: '🫧', name: 'Silk Sour', desc: 'Текила бланко, личи, юзу, яичный белок и розовый перец', price: '720 ₽' },
  { icon: '🍷', name: 'Black Dahlia', desc: 'Мескаль, чёрная смородина, агава, лаванда и активированный уголь', price: '850 ₽' },
  { icon: '🧊', name: 'Arctic Mule', desc: 'Водка, имбирный эль, лайм, чили и мята с ледяной подачей', price: '590 ₽' },
]

const Cocktails: React.FC = () => (
  <Section id="cocktails">
    <Container>
      <Header>
        <Tag>Коктейльная карта</Tag>
        <Title>Фирменные коктейли</Title>
        <Subtitle>
          Каждый напиток — авторская разработка наших барменов
        </Subtitle>
      </Header>
      <Grid>
        {cocktails.map((c) => (
          <Card key={c.name}>
            <CardIcon>{c.icon}</CardIcon>
            <CardName>{c.name}</CardName>
            <CardDesc>{c.desc}</CardDesc>
            <CardPrice>{c.price}</CardPrice>
          </Card>
        ))}
      </Grid>
    </Container>
  </Section>
)

export default Cocktails
