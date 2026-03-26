import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

interface NavProps {
  $scrolled: boolean
}

const NavWrapper = styled.nav<NavProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.25rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.4s ease;

  ${({ $scrolled, theme }) =>
    $scrolled &&
    css`
      background: rgba(7, 28, 25, 0.97);
      backdrop-filter: blur(20px);
      padding: 0.875rem 2rem;
      border-bottom: 1px solid ${theme.colors.borderGold};
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1rem 1.25rem;
  }
`

const Logo = styled.a`
  display: flex;
  flex-direction: column;
  gap: 0;
  text-decoration: none;
`

const LogoMain = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.02em;
  line-height: 1.1;
`

const LogoSub = styled.span`
  font-size: 0.65rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  list-style: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const NavLink = styled.a`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  transition: color 0.2s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    &::after { width: 100%; }
  }
`

const NavCTA = styled.a`
  padding: 0.6rem 1.4rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.bgDeep};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <NavWrapper $scrolled={scrolled}>
      <Logo href="#hero">
        <LogoMain>Воронов и партнёры</LogoMain>
        <LogoSub>Юридическая фирма</LogoSub>
      </Logo>

      <NavLinks>
        <li><NavLink href="#services">Услуги</NavLink></li>
        <li><NavLink href="#why-us">О фирме</NavLink></li>
        <li><NavLink href="#team">Команда</NavLink></li>
        <li><NavLink href="#process">Процесс</NavLink></li>
        <li><NavLink href="#contact">Контакты</NavLink></li>
      </NavLinks>

      <NavCTA href="#contact">Консультация</NavCTA>
    </NavWrapper>
  )
}

export default Navigation
