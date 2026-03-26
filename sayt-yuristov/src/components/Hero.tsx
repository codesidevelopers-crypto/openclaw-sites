import React from 'react'
import styled, { keyframes } from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  id: hero;
`

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }
`

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(
      135deg,
      rgba(7, 28, 25, 0.92) 0%,
      rgba(11, 43, 38, 0.85) 50%,
      rgba(7, 28, 25, 0.78) 100%
    );

  /* Marble texture via CSS */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 12px,
        rgba(212, 175, 55, 0.025) 12px,
        rgba(212, 175, 55, 0.025) 13px
      );
  }

  /* Vignette */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 30%, rgba(7, 28, 25, 0.6) 100%);
  }
`

const GoldLineTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.accent}, transparent);
  z-index: 10;
`

const GoldLineBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent);
  z-index: 10;
`

const HeroContent = styled.div`
  position: relative;
  z-index: 5;
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem 5rem;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 7rem 1.25rem 4rem;
  }
`

const EyebrowLine = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  animation: ${fadeUp} 0.8s ease forwards;
`

const EyebrowBar = styled.span`
  display: block;
  width: 40px;
  height: 2px;
  background: ${({ theme }) => theme.colors.accent};
`

const Eyebrow = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 700;
  line-height: 1.08;
  color: ${({ theme }) => theme.colors.text};
  max-width: 780px;
  margin-bottom: 1.75rem;
  animation: ${fadeUp} 0.8s 0.15s ease forwards;
  opacity: 0;

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.accent};
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 540px;
  line-height: 1.7;
  margin-bottom: 3rem;
  animation: ${fadeUp} 0.8s 0.3s ease forwards;
  opacity: 0;
`

const HeroActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.8s 0.45s ease forwards;
  opacity: 0;
`

const PrimaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.25rem;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.bgDeep};
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.accentLight};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.goldStrong};
    &::before { opacity: 1; }
  }

  &:active { transform: translateY(0); }
`

const SecondaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.25rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid rgba(245, 240, 232, 0.3);
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`

const HeroStats = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 5rem;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${fadeUp} 0.8s 0.6s ease forwards;
  opacity: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

const StatItem = styled.div`
  text-align: right;
  border-right: 2px solid ${({ theme }) => theme.colors.accent};
  padding-right: 1.25rem;
`

const StatNum = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1;
`

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 0.25rem;
`

const ScrollHint = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.5;
  animation: ${fadeUp} 0.8s 0.9s ease forwards;

  span {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const ScrollLine = styled.div`
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.accent}, transparent);
`

const Hero: React.FC = () => {
  return (
    <HeroSection id="hero">
      <GoldLineTop />

      <HeroBg>
        <StaticImage
          src="../images/hero-bg.jpg"
          alt="Юридическая фирма"
          layout="fullWidth"
          style={{ width: '100%', height: '100%' }}
          imgStyle={{ objectFit: 'cover', objectPosition: 'center' }}
          placeholder="blurred"
        />
      </HeroBg>

      <HeroOverlay />

      <HeroContent>
        <EyebrowLine>
          <EyebrowBar />
          <Eyebrow>Воронов и партнёры · с 2009 года</Eyebrow>
        </EyebrowLine>

        <HeroTitle>
          Юридическая защита,{' '}
          <em>которой вы заслуживаете</em>
        </HeroTitle>

        <HeroSubtitle>
          Профессиональные адвокаты с 15-летним опытом. Мы защищаем ваши права
          в судах, консультируем бизнес и решаем сложнейшие правовые вопросы.
        </HeroSubtitle>

        <HeroActions>
          <PrimaryBtn href="#contact">
            Получить консультацию
          </PrimaryBtn>
          <SecondaryBtn href="#services">
            Наши услуги →
          </SecondaryBtn>
        </HeroActions>
      </HeroContent>

      <HeroStats>
        <StatItem>
          <StatNum>15+</StatNum>
          <StatLabel>лет опыта</StatLabel>
        </StatItem>
        <StatItem>
          <StatNum>1200+</StatNum>
          <StatLabel>выигранных дел</StatLabel>
        </StatItem>
        <StatItem>
          <StatNum>94%</StatNum>
          <StatLabel>успешных решений</StatLabel>
        </StatItem>
      </HeroStats>

      <ScrollHint>
        <span>Прокрутите</span>
        <ScrollLine />
      </ScrollHint>

      <GoldLineBottom />
    </HeroSection>
  )
}

export default Hero
