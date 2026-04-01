import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

interface NavbarProps {
  onBookClick: () => void
}

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;
  background: ${({ $scrolled }) => $scrolled ? 'rgba(10,10,10,0.95)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(12px)' : 'none'};
  border-bottom: ${({ $scrolled, theme }) => $scrolled ? `1px solid ${theme.colors.surfaceBorder}` : '1px solid transparent'};

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`

const Logo = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: 0.05em;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled.a`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray700};
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const BookBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s;
  box-shadow: ${({ theme }) => theme.shadow.neon};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.neonStrong};
  }
`

const MobileBtn = styled.button`
  display: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`

const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Nav $scrolled={scrolled}>
      <Logo href="#">Velvet<span>.</span></Logo>
      <Links>
        <NavLink href="#about">О нас</NavLink>
        <NavLink href="#cocktails">Коктейли</NavLink>
        <NavLink href="#program">Программа</NavLink>
        <NavLink href="#gallery">Атмосфера</NavLink>
        <NavLink href="#contacts">Контакты</NavLink>
        <BookBtn onClick={onBookClick}>Забронировать</BookBtn>
      </Links>
      <MobileBtn onClick={onBookClick}>☰</MobileBtn>
    </Nav>
  )
}

export default Navbar
