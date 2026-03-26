import React, { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const Wrapper = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bgDeep};
`

const BgImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url('/images/hero.jpg');
  background-size: cover;
  background-position: center;
  filter: brightness(0.25) saturate(0.6);
  transform: scale(1.05);
  transition: transform 0.5s ease;
`

const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
`

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(6,14,26,0.9) 0%,
    rgba(10,22,40,0.7) 50%,
    rgba(6,14,26,0.95) 100%
  );
  pointer-events: none;
`

const GoldLine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    ${({ theme }) => theme.colors.gold} 20%,
    ${({ theme }) => theme.colors.goldLight} 50%,
    ${({ theme }) => theme.colors.gold} 80%,
    transparent 100%
  );
`

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  padding-left: 4rem;
`

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.borderGold};
  background: ${({ theme }) => theme.colors.goldDim};
  color: ${({ theme }) => theme.colors.goldLight};
  font-family: ${({ theme }) => theme.fonts.narrow};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.4rem 1rem;
  margin-bottom: 2rem;
  animation: ${fadeUp} 0.8s ease both;
  animation-delay: 0.1s;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: ${({ theme }) => theme.colors.gold};
    border-radius: 50%;
  }
`

const Title = styled.h1`
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.15;
  max-width: 760px;
  margin-bottom: 1.5rem;
  animation: ${fadeUp} 0.8s ease both;
  animation-delay: 0.25s;

  em {
    font-style: normal;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.gold},
      ${({ theme }) => theme.colors.goldLight},
      ${({ theme }) => theme.colors.gold}
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 3s linear infinite;
  }
`

const Subtitle = styled.p`
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  color: ${({ theme }) => theme.colors.textSub};
  max-width: 580px;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  animation: ${fadeUp} 0.8s ease both;
  animation-delay: 0.4s;
`

const Stats = styled.div`
  display: flex;
  gap: 3rem;
  margin-bottom: 3rem;
  animation: ${fadeUp} 0.8s ease both;
  animation-delay: 0.55s;

  @media (max-width: 600px) {
    gap: 1.5rem;
    flex-wrap: wrap;
  }
`

const StatItem = styled.div`
  border-left: 2px solid ${({ theme }) => theme.colors.borderGold};
  padding-left: 1rem;
`

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gold};
  line-height: 1;
`

const StatLabel = styled.div`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 0.25rem;
`

const CTARow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  animation: ${fadeUp} 0.8s ease both;
  animation-delay: 0.7s;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.bgDeep};
  font-family: ${({ theme }) => theme.fonts.serif};
  font-weight: 700;
  font-size: 1rem;
  padding: 0.9rem 2.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.02em;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.goldLight};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.gold};
  }

  &::after {
    content: '→';
    transition: transform 0.2s ease;
  }

  &:hover::after {
    transform: translateX(4px);
  }
`

const CTASecondary = styled.a`
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 0.9rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
    border-color: ${({ theme }) => theme.colors.borderGold};
  }
`

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2.5rem;
  left: 4rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  animation: ${fadeUp} 1s ease both;
  animation-delay: 1.2s;

  &::before {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: ${({ theme }) => theme.colors.borderGold};
  }
`

const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = (): void => {
      if (bgRef.current) {
        const scrolled = window.scrollY
        bgRef.current.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Wrapper id="top">
      <BgImage ref={bgRef} style={{ backgroundImage: "url('/images/hero.jpg')" }} />
      <GridOverlay />
      <GradientOverlay />
      <GoldLine />
      <Content>
        <Badge>Профессиональное управление рисками</Badge>
        <Title>
          Защита вашего бизнеса<br />
          от <em>критических рисков</em>
        </Title>
        <Subtitle>
          Каждый третий бизнес в России закрывается из-за рисков, которые можно было предотвратить.
          Мы помогаем выявить уязвимости и выстроить систему защиты — прежде чем они станут проблемой.
        </Subtitle>
        <Stats>
          <StatItem>
            <StatNumber>73%</StatNumber>
            <StatLabel>МСБ не имеют<br />плана митигации</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>6</StatNumber>
            <StatLabel>Ключевых зон<br />риска</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>14 дней</StatNumber>
            <StatLabel>До первых<br />результатов</StatLabel>
          </StatItem>
        </Stats>
        <CTARow>
          <CTAButton href="#quiz">Пройти диагностику</CTAButton>
          <CTASecondary href="#risks">Узнать о рисках</CTASecondary>
        </CTARow>
      </Content>
      <ScrollIndicator>Прокрутите вниз</ScrollIndicator>
    </Wrapper>
  )
}

export default Hero
