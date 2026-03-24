import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

interface LayoutProps {
  children: React.ReactNode
}

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: ${({ $scrolled }) => ($scrolled ? '16px 48px' : '28px 48px')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ $scrolled, theme }) =>
    $scrolled
      ? `${theme.colors.bg}ee`
      : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(12px)' : 'none')};
  border-bottom: ${({ $scrolled, theme }) =>
    $scrolled ? `1px solid ${theme.colors.border}` : '1px solid transparent'};
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    padding: ${({ $scrolled }) => ($scrolled ? '14px 24px' : '20px 24px')};
  }
`

const Logo = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.08em;

  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;

  @media (max-width: 900px) {
    display: none;
  }
`

const NavLink = styled.a`
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`

const NavCta = styled.a`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 10px 24px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accent};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.bg};
  }

  @media (max-width: 900px) {
    display: none;
  }
`

const Main = styled.main`
  min-height: 100vh;
`

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.bgSection};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 60px 48px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 48px 24px 32px;
  }
`

const FooterLogo = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.text};
  span { color: ${({ theme }) => theme.colors.accent}; }
`

const FooterTagline = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.06em;
  text-align: center;
`

const FooterDivider = styled.div`
  width: 40px;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
`

const FooterCopy = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.04em;
`

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Nav $scrolled={scrolled}>
        <Logo href="/">
          Пра<span>на</span>
        </Logo>
        <NavLinks>
          <NavLink href="#directions">Направления</NavLink>
          <NavLink href="#schedule">Расписание</NavLink>
          <NavLink href="#teachers">Преподаватели</NavLink>
          <NavLink href="#pricing">Цены</NavLink>
          <NavLink href="#contacts">Контакты</NavLink>
        </NavLinks>
        <NavCta href="#booking">Записаться</NavCta>
      </Nav>
      <Main>{children}</Main>
      <Footer>
        <FooterLogo>Пра<span>на</span></FooterLogo>
        <FooterTagline>Йога-студия в Москве · ул. Большая Никитская, 15</FooterTagline>
        <FooterDivider />
        <FooterCopy>© 2024 Прана. Все права защищены.</FooterCopy>
      </Footer>
    </>
  )
}

export default Layout
