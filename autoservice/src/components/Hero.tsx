import React, { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

const drift = keyframes`
  0% { transform: scale(1) translateX(0); }
  50% { transform: scale(1.04) translateX(-10px); }
  100% { transform: scale(1) translateX(0); }
`

const lineGrow = keyframes`
  from { width: 0; }
  to { width: 60px; }
`

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: ${drift} 18s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      rgba(13, 13, 13, 0.92) 0%,
      rgba(13, 13, 13, 0.75) 45%,
      rgba(26, 26, 46, 0.5) 70%,
      transparent 100%
    );
  }
`

const NoiseOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
  pointer-events: none;
`

const RedAccentLine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(
    to bottom,
    transparent,
    ${({ theme }) => theme.colors.accent} 30%,
    ${({ theme }) => theme.colors.accent} 70%,
    transparent
  );
  z-index: 2;
`

const DiagonalCut = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: ${({ theme }) => theme.colors.bg};
  clip-path: polygon(0 100%, 100% 100%, 100% 60%, 0 100%);
  z-index: 2;
`

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  padding-top: 72px;
  width: 100%;
`

const PreTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fadeInUp 0.6s ease 0.2s forwards;

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`

const PreTitleLine = styled.div`
  height: 2px;
  background: ${({ theme }) => theme.colors.accent};
  animation: ${lineGrow} 0.8s ease 0.4s both;
`

const PreTitleText = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fadeInUp 0.7s ease 0.3s forwards;

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  span.block {
    display: block;
  }

  span.outline {
    -webkit-text-stroke: 2px ${({ theme }) => theme.colors.text};
    color: transparent;
  }

  span.accent {
    color: ${({ theme }) => theme.colors.accent};
  }
`

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 520px;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  opacity: 0;
  animation: fadeInUp 0.7s ease 0.5s forwards;

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`

const HeroActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeInUp 0.7s ease 0.7s forwards;

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`

const PrimaryButton = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.1);
    transform: translateX(-100%);
    transition: transform ${({ theme }) => theme.transitions.base};
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.glowStrong};
    transform: translateY(-2px);

    &::before {
      transform: translateX(100%);
    }
  }
`

const SecondaryButton = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`

const StatsBar = styled.div`
  position: absolute;
  bottom: 120px;
  right: 0;
  z-index: 3;
  display: flex;
  gap: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const StatItem = styled.div`
  padding: 1.5rem 2rem;
  background: rgba(26, 26, 46, 0.8);
  backdrop-filter: blur(10px);
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  min-width: 140px;
  opacity: 0;
  animation: slideInRight 0.6s ease var(--delay, 0.8s) forwards;

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
`

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1;
  margin-bottom: 0.25rem;
`

const StatLabel = styled.div`
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 140px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: fadeIn 1s ease 1.5s forwards;

  @keyframes fadeIn {
    to { opacity: 1; }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const ScrollLine = styled.div`
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.accent}, transparent);
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`

const ScrollText = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  writing-mode: vertical-rl;
`

const Hero: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleMouseMove = (e: MouseEvent): void => {
      const rect = section.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const img = section.querySelector('img') as HTMLImageElement | null
      if (img) {
        img.style.transform = `scale(1.03) translate(${(x - 0.5) * -15}px, ${(y - 0.5) * -8}px)`
      }
    }

    section.addEventListener('mousemove', handleMouseMove)
    return () => section.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <HeroSection ref={sectionRef}>
      <HeroBackground>
        <img src="/images/hero.jpg" alt="AutoPro — профессиональный автосервис" />
      </HeroBackground>
      <NoiseOverlay />
      <RedAccentLine />

      <HeroContent>
        <PreTitle>
          <PreTitleLine />
          <PreTitleText>Premium Auto Service</PreTitleText>
        </PreTitle>

        <HeroTitle>
          <span className="block">Ваш автомобиль</span>
          <span className="block outline">заслуживает</span>
          <span className="block accent">лучшего</span>
        </HeroTitle>

        <HeroSubtitle>
          Профессиональный сервис с 10-летним опытом. Диагностика, ТО, кузовные работы
          и покраска на оборудовании немецкого класса.
        </HeroSubtitle>

        <HeroActions>
          <PrimaryButton href="#booking" onClick={(e) => handleNavClick(e, '#booking')}>
            Записаться онлайн
          </PrimaryButton>
          <SecondaryButton href="#services" onClick={(e) => handleNavClick(e, '#services')}>
            Наши услуги
          </SecondaryButton>
        </HeroActions>
      </HeroContent>

      <StatsBar>
        <StatItem style={{ '--delay': '0.9s' } as React.CSSProperties}>
          <StatNumber>10+</StatNumber>
          <StatLabel>лет опыта</StatLabel>
        </StatItem>
        <StatItem style={{ '--delay': '1.0s' } as React.CSSProperties}>
          <StatNumber>5K+</StatNumber>
          <StatLabel>клиентов</StatLabel>
        </StatItem>
        <StatItem style={{ '--delay': '1.1s' } as React.CSSProperties}>
          <StatNumber>20</StatNumber>
          <StatLabel>мастеров</StatLabel>
        </StatItem>
      </StatsBar>

      <ScrollIndicator>
        <ScrollLine />
        <ScrollText>Scroll</ScrollText>
      </ScrollIndicator>

      <DiagonalCut />
    </HeroSection>
  )
}

export default Hero
