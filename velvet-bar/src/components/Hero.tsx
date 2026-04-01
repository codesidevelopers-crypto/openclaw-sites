import React from 'react'
import styled, { keyframes } from 'styled-components'

interface HeroProps {
  onBookClick: () => void
}

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8rem 2rem 6rem;
  position: relative;
  overflow: hidden;
  background: radial-gradient(ellipse at 50% 0%, ${({ theme }) => theme.colors.burgundy} 0%, ${({ theme }) => theme.colors.bg} 60%);

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, ${({ theme }) => theme.colors.primaryGlow} 0%, transparent 70%);
    pointer-events: none;
    opacity: 0.3;
  }

  @media (max-width: 768px) {
    padding: 7rem 1rem 4rem;
    min-height: auto;
  }
`

const Content = styled.div`
  max-width: 700px;
  position: relative;
  z-index: 1;
`

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.4rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 45, 123, 0.25);
`

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;

  span {
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.primary});
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
  }
`

const Subtitle = styled.p`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 540px;
  margin-left: auto;
  margin-right: auto;
`

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`

const PrimaryBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 1rem 2.5rem;
  font-size: 1.05rem;
  font-weight: 700;
  transition: all 0.2s;
  box-shadow: ${({ theme }) => theme.shadow.neon};
  font-family: ${({ theme }) => theme.fonts.body};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.neonStrong};
  }
`

const SecondaryBtn = styled.a`
  border: 1.5px solid ${({ theme }) => theme.colors.gray400};
  color: ${({ theme }) => theme.colors.gray800};
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 1rem 2.5rem;
  font-size: 1.05rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s;
  font-family: ${({ theme }) => theme.fonts.body};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Hero: React.FC<HeroProps> = ({ onBookClick }) => (
  <Section id="hero">
    <Content>
      <Badge>Авторские коктейли &middot; DJ каждые выходные</Badge>
      <Title>
        Место, где вечер становится{' '}
        <span>незабываемым</span>
      </Title>
      <Subtitle>
        Velvet Bar — бар с характером в самом сердце города.
        Авторская коктейльная карта, живые DJ-сеты и атмосфера,
        в которую хочется возвращаться.
      </Subtitle>
      <Buttons>
        <PrimaryBtn onClick={onBookClick}>Забронировать столик</PrimaryBtn>
        <SecondaryBtn href="#cocktails">Наши коктейли →</SecondaryBtn>
      </Buttons>
    </Content>
  </Section>
)

export default Hero
