import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

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
  background: ${({ $scrolled }) => $scrolled ? 'rgba(255,255,255,0.95)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(12px)' : 'none'};
  border-bottom: ${({ $scrolled, theme }) => $scrolled ? `1px solid ${theme.colors.gray200}` : 'none'};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  text-decoration: none;
`

const LogoDot = styled.span`
  width: 28px;
  height: 28px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: white;
  font-weight: 800;
`

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 1024px) {
    display: none;
  }
`

const NavLink = styled.a`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray600};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const CtaBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.55rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all 0.2s;
  box-shadow: ${({ theme }) => theme.shadow.purple};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`

const Navbar: React.FC<NavbarProps> = ({ onCtaClick }) => {
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Nav $scrolled={scrolled}>
      <Logo href="/">
        <LogoDot>РБ</LogoDot>
        Риски бизнеса
      </Logo>
      <Links>
        <NavLink href="#products">Модули</NavLink>
        <NavLink href="#operations">Операции</NavLink>
        <NavLink href="#counterparty">Контрагенты</NavLink>
        <NavLink href="#formats">Тарифы</NavLink>
        <NavLink href="#faq">FAQ</NavLink>
      </Links>
      <CtaBtn onClick={onCtaClick}>Подключить</CtaBtn>
    </Nav>
  )
}

export default Navbar
