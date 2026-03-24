import React from 'react'
import styled, { keyframes } from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'

const fadeUpAnim = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`

const fadeInAnim = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 680px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
`

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(7, 9, 11, 0.3) 0%,
      rgba(7, 9, 11, 0.1) 30%,
      rgba(7, 9, 11, 0.5) 60%,
      rgba(7, 9, 11, 0.95) 100%
    );
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(7, 9, 11, 0.6) 0%,
      transparent 60%
    );
    z-index: 1;
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 6rem;
`

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(201, 162, 39, 0.12);
  border: 1px solid rgba(201, 162, 39, 0.3);
  color: ${({ theme }) => theme.colors.gold};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.4rem 1rem;
  margin-bottom: 1.5rem;
  animation: ${fadeInAnim} 0.8s ease both;
  animation-delay: 0.3s;
`

const BadgeDot = styled.span`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.colors.gold};
  border-radius: 50%;
  display: inline-block;
`

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1.5rem;
  animation: ${fadeUpAnim} 0.9s ease both;
  animation-delay: 0.5s;

  .accent {
    color: ${({ theme }) => theme.colors.gold};
    display: block;
  }
`

const HeroTagline = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 520px;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  animation: ${fadeUpAnim} 0.9s ease both;
  animation-delay: 0.7s;
`

const HeroActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  animation: ${fadeUpAnim} 0.9s ease both;
  animation-delay: 0.9s;
`

const PrimaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.bg};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.goldLight};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  span {
    position: relative;
    z-index: 1;
  }

  svg {
    position: relative;
    z-index: 1;
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &:hover svg {
    transform: translateX(4px);
  }
`

const SecondaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: color 0.2s ease;

  &::after {
    content: '';
    display: inline-block;
    width: 32px;
    height: 1px;
    background: currentColor;
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &:hover::after {
    width: 48px;
  }
`

const HeroStats = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 6rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${fadeInAnim} 1s ease both;
  animation-delay: 1.2s;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const StatItem = styled.div`
  text-align: right;
`

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1;
`

const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  margin-top: 0.25rem;
`

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: ${fadeInAnim} 1s ease both;
  animation-delay: 1.5s;
`

const ScrollLine = styled.div`
  width: 1px;
  height: 50px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.gold} 0%, transparent 100%);
  animation: ${keyframes`
    0%, 100% { transform: scaleY(1); opacity: 1; }
    50% { transform: scaleY(0.5); opacity: 0.5; }
  `} 2s ease infinite;
`

const ScrollText = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  writing-mode: vertical-rl;
`

interface HeroProps {
  onBookingClick: () => void
}

const Hero: React.FC<HeroProps> = ({ onBookingClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()
    onBookingClick()
  }

  return (
    <HeroSection id="hero">
      <HeroBg>
        <StaticImage
          src="../images/hero.jpg"
          alt="Профессиональный автосервис АВТОРИТЕТ"
          layout="fullWidth"
          objectFit="cover"
          objectPosition="center"
          placeholder="blurred"
        />
      </HeroBg>

      <HeroContent>
        <HeroBadge>
          <BadgeDot />
          Премиальный автосервис · Москва
        </HeroBadge>

        <HeroTitle>
          АВТО
          <span className="accent">РИТЕТ</span>
        </HeroTitle>

        <HeroTagline>
          Когда важна каждая деталь. Профессиональный ремонт и обслуживание
          автомобилей любой сложности — с гарантией на все работы.
        </HeroTagline>

        <HeroActions>
          <PrimaryBtn href="#booking" onClick={handleClick}>
            <span>Записаться на сервис</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </PrimaryBtn>
          <SecondaryBtn href="#services">
            Наши услуги
          </SecondaryBtn>
        </HeroActions>
      </HeroContent>

      <HeroStats>
        <StatItem>
          <StatNumber>12+</StatNumber>
          <StatLabel>Лет опыта</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>8 000</StatNumber>
          <StatLabel>Клиентов</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>15</StatNumber>
          <StatLabel>Мастеров</StatLabel>
        </StatItem>
      </HeroStats>

      <ScrollIndicator>
        <ScrollText>Scroll</ScrollText>
        <ScrollLine />
      </ScrollIndicator>
    </HeroSection>
  )
}

export default Hero
