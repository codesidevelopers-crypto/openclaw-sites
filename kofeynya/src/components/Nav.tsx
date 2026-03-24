import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

interface NavWrapProps {
  $scrolled: boolean
}

const NavWrap = styled.nav<NavWrapProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 2rem;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background ${({ theme }) => theme.transitions.normal},
              box-shadow ${({ theme }) => theme.transitions.normal};

  ${({ $scrolled, theme }) =>
    $scrolled &&
    css`
      background: rgba(15, 6, 0, 0.95);
      backdrop-filter: blur(12px);
      box-shadow: 0 1px 0 ${theme.colors.border};
    `}
`

const Logo = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: -0.02em;
  cursor: pointer;

  span {
    color: ${({ theme }) => theme.colors.text};
  }
`

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 640px) {
    display: none;
  }
`

const NavLink = styled.li`
  a {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textLight};
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`

const BookBtn = styled.a`
  padding: 0.5rem 1.25rem;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.bg};
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: ${({ theme }) => theme.radii.md};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: background ${({ theme }) => theme.transitions.fast},
              transform ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.accentLight};
    transform: translateY(-1px);
  }
`

export const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <NavWrap $scrolled={scrolled}>
      <Logo href="#hero" onClick={scrollTo('hero')}>
        Кофей<span>ня</span>
      </Logo>
      <NavLinks>
        <NavLink><a href="#menu" onClick={scrollTo('menu')}>Меню</a></NavLink>
        <NavLink><a href="#about" onClick={scrollTo('about')}>О нас</a></NavLink>
        <NavLink><a href="#booking" onClick={scrollTo('booking')}>Бронь</a></NavLink>
      </NavLinks>
      <BookBtn href="#booking" onClick={scrollTo('booking')}>Забронировать</BookBtn>
    </NavWrap>
  )
}
