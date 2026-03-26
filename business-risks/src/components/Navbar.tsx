import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

interface NavbarProps {
  onCtaClick: () => void
}

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;

  ${({ $scrolled }) => $scrolled && css`
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(12px);
    box-shadow: 0 1px 0 rgba(0,0,0,0.08);
  `}

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.gray900};
  text-decoration: none;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const LogoDot = styled.div`
  width: 28px;
  height: 28px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 900;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled.a`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray700};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const NavCta = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.5rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  font-family: ${({ theme }) => theme.fonts.body};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`

const Navbar: React.FC<NavbarProps> = ({ onCtaClick }) => {
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Nav $scrolled={scrolled}>
      <Logo href="/">
        <LogoDot>Т</LogoDot>
        Точка <span>Риски</span>
      </Logo>
      <NavLinks>
        <NavLink href="#products">Продукты</NavLink>
        <NavLink href="#operations">Операции</NavLink>
        <NavLink href="#counterparties">Контрагенты</NavLink>
        <NavLink href="#formats">Тарифы</NavLink>
        <NavLink href="#faq">FAQ</NavLink>
      </NavLinks>
      <NavCta onClick={onCtaClick}>Подключить</NavCta>
    </Nav>
  )
}

export default Navbar
