import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import type { NavLink } from '../types'

const NAV_LINKS: NavLink[] = [
  { label: 'Услуги', href: '#services' },
  { label: 'О нас', href: '#about' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Отзывы', href: '#testimonials' },
  { label: 'Контакты', href: '#contact' },
]

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0 2rem;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all ${({ theme }) => theme.transitions.base};

  ${({ $scrolled, theme }) =>
    $scrolled &&
    css`
      background: rgba(13, 13, 13, 0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid ${theme.colors.border};
      height: 64px;
    `}
`

const Logo = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  span.accent {
    color: ${({ theme }) => theme.colors.accent};
  }

  span.tagline {
    font-size: 0.55rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
    display: block;
    line-height: 1;
    margin-top: 2px;
  }
`

const LogoMark = styled.div`
  width: 36px;
  height: 36px;
  background: ${({ theme }) => theme.colors.accent};
  clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 900;
  color: white;
  flex-shrink: 0;
`

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const NavLinkItem = styled.li``

const NavLinkAnchor = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color ${({ theme }) => theme.transitions.fast};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    transition: width ${({ theme }) => theme.transitions.base};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};

    &::after {
      width: 100%;
    }
  }
`

const BookButton = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.6rem 1.5rem;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: pointer;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);

  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }

  span {
    display: block;
    width: 24px;
    height: 2px;
    background: ${({ theme }) => theme.colors.text};
    transition: all ${({ theme }) => theme.transitions.base};
  }
`

const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: rgba(13, 13, 13, 0.98);
  backdrop-filter: blur(12px);
  padding: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transform: ${({ $open }) => ($open ? 'translateY(0)' : 'translateY(-10px)')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'all' : 'none')};
  transition: all ${({ theme }) => theme.transitions.base};
  z-index: 999;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`

const MobileNavLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Nav $scrolled={scrolled}>
        <Logo href="#" onClick={(e) => handleNavClick(e, '#')}>
          <LogoMark>A</LogoMark>
          <div>
            <span>Auto<span className="accent">Pro</span></span>
            <span className="tagline">Premium Service</span>
          </div>
        </Logo>

        <NavLinks>
          {NAV_LINKS.map((link) => (
            <NavLinkItem key={link.href}>
              <NavLinkAnchor
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </NavLinkAnchor>
            </NavLinkItem>
          ))}
        </NavLinks>

        <BookButton href="#booking" onClick={(e) => handleNavClick(e, '#booking')}>
          Записаться
        </BookButton>

        <MobileMenuButton onClick={() => setMobileOpen(!mobileOpen)} aria-label="Меню">
          <span />
          <span />
          <span />
        </MobileMenuButton>
      </Nav>

      <MobileMenu $open={mobileOpen}>
        {NAV_LINKS.map((link) => (
          <MobileNavLink
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </MobileNavLink>
        ))}
        <MobileNavLink href="#booking" onClick={(e) => handleNavClick(e, '#booking')}>
          Записаться
        </MobileNavLink>
      </MobileMenu>
    </>
  )
}

export default Navigation
