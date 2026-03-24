import React from 'react'
import styled, { keyframes } from 'styled-components'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 1.5rem 4rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,131,26,0.18) 0%, transparent 65%),
      radial-gradient(ellipse 50% 40% at 80% 80%, rgba(200,131,26,0.08) 0%, transparent 60%);
    pointer-events: none;
  }
`

const Eyebrow = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 1.5rem;
  animation: ${fadeUp} 0.7s ease both;
`

const HeroTitle = styled.h1`
  font-size: clamp(3rem, 9vw, 7.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
  animation: ${fadeUp} 0.7s 0.1s ease both;

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.accent};
  }
`

const HeroSub = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 520px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
  animation: ${fadeUp} 0.7s 0.2s ease both;
`

const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  animation: ${fadeUp} 0.7s 0.3s ease both;
`

const PrimaryBtn = styled.a`
  padding: 0.9rem 2.25rem;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.bg};
  font-size: 1rem;
  font-weight: 700;
  border-radius: ${({ theme }) => theme.radii.md};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: background ${({ theme }) => theme.transitions.fast},
              transform ${({ theme }) => theme.transitions.fast},
              box-shadow ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.accentLight};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`

const SecondaryBtn = styled.a`
  padding: 0.9rem 2.25rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1rem;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radii.md};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: border-color ${({ theme }) => theme.transitions.fast},
              color ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`

const Divider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.border}, transparent);
`

const ScrollHint = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  animation: ${fadeUp} 0.7s 0.5s ease both;

  &::after {
    content: '';
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, ${({ theme }) => theme.colors.border}, transparent);
  }
`

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <HeroSection id="hero">
      <Eyebrow>&#x2615; Авторский кофе · Москва</Eyebrow>
      <HeroTitle>
        Там, где<br /><em>кофе</em><br />говорит сам
      </HeroTitle>
      <HeroSub>
        Каждая чашка — это история. Зёрна из лучших плантаций мира,
        приготовленные с мастерством и любовью к своему делу.
      </HeroSub>
      <HeroActions>
        <PrimaryBtn href="#menu" onClick={scrollTo('menu')}>Смотреть меню</PrimaryBtn>
        <SecondaryBtn href="#booking" onClick={scrollTo('booking')}>Забронировать стол</SecondaryBtn>
      </HeroActions>
      <ScrollHint>Листать</ScrollHint>
      <Divider />
    </HeroSection>
  )
}
