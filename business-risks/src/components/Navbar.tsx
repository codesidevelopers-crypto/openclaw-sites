import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface NavbarWrapperProps {
  $scrolled: boolean
}

const NavbarWrapper = styled.nav<NavbarWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.25rem 2rem;
  background: ${({ $scrolled, theme }) =>
    $scrolled ? `${theme.colors.bgDeep}F0` : 'transparent'};
  border-bottom: 1px solid ${({ $scrolled, theme }) =>
    $scrolled ? theme.colors.border : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(12px)' : 'none')};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.a`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  letter-spacing: 0.04em;

  span {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.narrow};
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSub};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const CTABtn = styled.a`
  font-family: ${({ theme }) => theme.fonts.narrow};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.bgDeep};
  background: ${({ theme }) => theme.colors.gold};
  padding: 0.5rem 1.25rem;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.goldLight};
  }
`

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <NavbarWrapper $scrolled={scrolled}>
      <Logo href="#top">
        Бизнес<span>Риски</span>
      </Logo>
      <NavLinks>
        <NavLink href="#risks">Риски</NavLink>
        <NavLink href="#quiz">Диагностика</NavLink>
        <NavLink href="#methodology">Методология</NavLink>
        <NavLink href="#cases">Кейсы</NavLink>
        <CTABtn href="#consult">Консультация</CTABtn>
      </NavLinks>
    </NavbarWrapper>
  )
}

export default Navbar
