import React, { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import heroImg from '../images/hero.jpg'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const rotateSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Section = styled.section`
  position: relative;
  height: 100vh;
  min-height: 680px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const BgImage = styled.div<{ $src: string }>`
  position: absolute;
  inset: 0;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  transform: scale(1.05);
  animation: ${fadeIn} 1.2s ease forwards;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(13, 26, 13, 0.75) 0%,
    rgba(13, 26, 13, 0.55) 40%,
    rgba(13, 26, 13, 0.80) 100%
  );
`

const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 24px;
  max-width: 760px;
`

const Eyebrow = styled.div`
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 28px;
  animation: ${fadeUp} 0.8s ease 0.2s both;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    opacity: 0.6;
  }
`

const Title = styled.h1`
  font-size: clamp(4.5rem, 12vw, 9rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.text};
  line-height: 0.9;
  margin-bottom: 32px;
  animation: ${fadeUp} 0.8s ease 0.4s both;
  text-shadow: 0 4px 40px rgba(0,0,0,0.5);
`

const Tagline = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(0.95rem, 2vw, 1.15rem);
  font-weight: 300;
  color: rgba(248, 243, 236, 0.8);
  letter-spacing: 0.04em;
  line-height: 1.7;
  margin-bottom: 52px;
  animation: ${fadeUp} 0.8s ease 0.6s both;
`

const CtaButton = styled.a`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 18px 48px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.bg};
  position: relative;
  overflow: hidden;
  animation: ${fadeUp} 0.8s ease 0.8s both;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.accentLight};
    transform: translateX(-101%);
    transition: transform 0.35s ease;
  }

  &:hover::before {
    transform: translateX(0);
  }

  span {
    position: relative;
    z-index: 1;
  }

  &:hover {
    box-shadow: 0 8px 32px rgba(184, 149, 90, 0.4);
  }
`

const MandalaDecor = styled.div`
  position: absolute;
  right: 5%;
  bottom: 8%;
  width: 220px;
  height: 220px;
  opacity: 0.06;
  animation: ${rotateSlow} 60s linear infinite;

  @media (max-width: 768px) {
    display: none;
  }
`

const MandalaDecorLeft = styled.div`
  position: absolute;
  left: 4%;
  top: 15%;
  width: 140px;
  height: 140px;
  opacity: 0.04;
  animation: ${rotateSlow} 90s linear infinite reverse;

  @media (max-width: 768px) {
    display: none;
  }
`

const ScrollHint = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: ${fadeIn} 1s ease 1.5s both;
  opacity: 0.5;
`

const ScrollLine = styled.div`
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.accent}, transparent);
`

const ScrollLabel = styled.span`
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`

const MandalaSvg: React.FC = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="95" stroke="white" strokeWidth="0.5"/>
    <circle cx="100" cy="100" r="75" stroke="white" strokeWidth="0.5"/>
    <circle cx="100" cy="100" r="55" stroke="white" strokeWidth="0.5"/>
    <circle cx="100" cy="100" r="35" stroke="white" strokeWidth="0.5"/>
    <circle cx="100" cy="100" r="15" stroke="white" strokeWidth="0.5"/>
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
      <line
        key={deg}
        x1="100"
        y1="5"
        x2="100"
        y2="195"
        stroke="white"
        strokeWidth="0.5"
        transform={`rotate(${deg} 100 100)`}
      />
    ))}
    {[0, 45, 90, 135].map((deg) => (
      <ellipse
        key={deg}
        cx="100"
        cy="100"
        rx="20"
        ry="55"
        stroke="white"
        strokeWidth="0.5"
        transform={`rotate(${deg} 100 100)`}
      />
    ))}
  </svg>
)

export const Hero: React.FC = () => {
  return (
    <Section>
      <BgImage $src={heroImg} />
      <Overlay />
      <MandalaDecorLeft>
        <MandalaSvg />
      </MandalaDecorLeft>
      <MandalaDecor>
        <MandalaSvg />
      </MandalaDecor>
      <Content>
        <Eyebrow>Йога-студия · Москва</Eyebrow>
        <Title>Прана</Title>
        <Tagline>
          Пространство для глубокой практики и внутреннего баланса.<br />
          Найдите гармонию тела, дыхания и ума.
        </Tagline>
        <CtaButton href="#booking">
          <span>Записаться на пробное занятие</span>
        </CtaButton>
      </Content>
      <ScrollHint>
        <ScrollLabel>Скролл</ScrollLabel>
        <ScrollLine />
      </ScrollHint>
    </Section>
  )
}
