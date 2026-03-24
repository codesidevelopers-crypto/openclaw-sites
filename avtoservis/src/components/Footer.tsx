import React from 'react'
import styled from 'styled-components'

const FooterEl = styled.footer`
  background: ${({ theme }) => theme.colors.bg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 3rem 2rem;
`

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
`

const Logo = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.1rem;
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
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.colors.gold};
  border-radius: 50%;
`

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 1rem;
  }
`

const FooterLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

const Copyright = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Footer: React.FC = () => {
  return (
    <FooterEl>
      <Inner>
        <Logo>
          <LogoDot />
          АВТО<span>РИТЕТ</span>
        </Logo>
        <FooterLinks>
          <FooterLink href="#services">Услуги</FooterLink>
          <FooterLink href="#about">О нас</FooterLink>
          <FooterLink href="#pricing">Цены</FooterLink>
          <FooterLink href="#contacts">Контакты</FooterLink>
        </FooterLinks>
        <Copyright>© 2026 АВТОРИТЕТ. Все права защищены.</Copyright>
      </Inner>
    </FooterEl>
  )
}

export default Footer
