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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`

const ImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.burgundy}, ${({ theme }) => theme.colors.surface});
  border-radius: ${({ theme }) => theme.radius.xxl};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
`

const TextBlock = styled.div``

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
  margin-bottom: 1.25rem;
`

const Text = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.8;
  margin-bottom: 1.5rem;
`

const Stats = styled.div`
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
`

const Stat = styled.div``

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray500};
`

const About: React.FC = () => (
  <Section id="about">
    <Container>
      <ImagePlaceholder>🍸</ImagePlaceholder>
      <TextBlock>
        <Tag>О Velvet Bar</Tag>
        <Title>Больше, чем просто бар</Title>
        <Text>
          Velvet Bar — это пространство для тех, кто ценит вкус, звук и стиль.
          Мы создали место, где каждый вечер — событие: от авторских коктейлей
          от лучших барменов города до живых DJ-сетов и тематических вечеринок.
        </Text>
        <Text>
          Наша команда — бармены-энтузиасты с международным опытом,
          которые превращают каждый напиток в историю.
        </Text>
        <Stats>
          <Stat>
            <StatNumber>50+</StatNumber>
            <StatLabel>Авторских коктейлей</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>3</StatNumber>
            <StatLabel>Года в городе</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>4.9</StatNumber>
            <StatLabel>Рейтинг на Яндекс</StatLabel>
          </Stat>
        </Stats>
      </TextBlock>
    </Container>
  </Section>
)

export default About
