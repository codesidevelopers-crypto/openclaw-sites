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
  grid-template-rows: auto auto;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const Cell = styled.div<{ $span?: boolean }>`
  aspect-ratio: ${({ $span }) => $span ? '2 / 1' : '1 / 1'};
  grid-column: ${({ $span }) => $span ? 'span 2' : 'auto'};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.burgundy}, ${({ theme }) => theme.colors.surface});
  border-radius: ${({ theme }) => theme.radius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  transition: all 0.3s;
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadow.neon};
  }

  @media (max-width: 768px) {
    grid-column: auto;
    aspect-ratio: 4 / 3;
  }
`

const CellLabel = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray600};
  font-weight: 500;
`

const Gallery: React.FC = () => (
  <Section id="gallery">
    <Container>
      <Header>
        <Tag>Атмосфера</Tag>
        <Title>Почувствуй Velvet</Title>
      </Header>
      <Grid>
        <Cell $span>
          <CellLabel>Основной зал с барной стойкой</CellLabel>
        </Cell>
        <Cell>
          <CellLabel>VIP-зона</CellLabel>
        </Cell>
        <Cell>
          <CellLabel>DJ-пульт</CellLabel>
        </Cell>
        <Cell>
          <CellLabel>Коктейльная мастерская</CellLabel>
        </Cell>
        <Cell $span>
          <CellLabel>Летняя терраса</CellLabel>
        </Cell>
      </Grid>
    </Container>
  </Section>
)

export default Gallery
