import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

interface NavProps {
  $scrolled: boolean
}

const Nav = styled.nav<NavProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 2rem;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.4s ease;

  ${({ $scrolled, theme }) =>
    $scrolled &&
    css`
      background: rgba(7, 9, 11, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid ${theme.colors.border};
    `}
`

const Logo = styled.a`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const LogoDot = styled.div`
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.colors.gold};
  border-radius: 50%;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const NavLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const NavCTA = styled.a`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.bg};
  background: ${({ theme }) => theme.colors.gold};
  padding: 0.6rem 1.4rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.goldLight};
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const MobileMenuBtn = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 0.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }

  span {
    display: block;
    width: 24px;
    height: 2px;
    background: ${({ theme }) => theme.colors.textPrimary};
    transition: all 0.3s ease;
  }
`

const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  background: rgba(7, 9, 11, 0.98);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.5rem 2rem;
  flex-direction: column;
  gap: 1rem;
  transform: translateY(${({ $open }) => ($open ? '0' : '-20px')});
  opacity: ${({ $open }) => ($open ? '1' : '0')};
  pointer-events: ${({ $open }) => ($open ? 'all' : 'none')};
  transition: all 0.3s ease;
  z-index: 99;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`

const MobileNavLink = styled.a`
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
    color: ${({ theme }) => theme.colors.gold};
  }
`

interface NavigationProps {
  onBookingClick: () => void
}

const Navigation: React.FC<NavigationProps> = ({ onBookingClick }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect((): (() => void) => {
    const handleScroll = (): void => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return (): void => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()
    onBookingClick()
    setMobileOpen(false)
  }

  return (
    <>
      <Nav $scrolled={scrolled}>
        <Logo href="/">
          <LogoDot />
          АВТО<span>РИТЕТ</span>
        </Logo>
        <NavLinks>
          <NavLink href="#services">Услуги</NavLink>
          <NavLink href="#about">О нас</NavLink>
          <NavLink href="#reviews">Отзывы</NavLink>
          <NavLink href="#pricing">Цены</NavLink>
          <NavLink href="#contacts">Контакты</NavLink>
        </NavLinks>
        <NavCTA href="#booking" onClick={handleCTAClick}>
          Записаться
        </NavCTA>
        <MobileMenuBtn onClick={() => setMobileOpen(!mobileOpen)} aria-label="Меню">
          <span />
          <span />
          <span />
        </MobileMenuBtn>
      </Nav>
      <MobileMenu $open={mobileOpen}>
        <MobileNavLink href="#services" onClick={() => setMobileOpen(false)}>Услуги</MobileNavLink>
        <MobileNavLink href="#about" onClick={() => setMobileOpen(false)}>О нас</MobileNavLink>
        <MobileNavLink href="#reviews" onClick={() => setMobileOpen(false)}>Отзывы</MobileNavLink>
        <MobileNavLink href="#pricing" onClick={() => setMobileOpen(false)}>Цены</MobileNavLink>
        <MobileNavLink href="#contacts" onClick={() => setMobileOpen(false)}>Контакты</MobileNavLink>
        <MobileNavLink href="#booking" onClick={handleCTAClick}>Записаться на сервис</MobileNavLink>
      </MobileMenu>
    </>
  )
}

export default Navigation
