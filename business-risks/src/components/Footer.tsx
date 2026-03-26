import React from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.bgDeep};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 3rem 2rem;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`

const Logo = styled.div`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: 0.04em;

  span {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: 600px) {
    gap: 1rem;
    flex-wrap: wrap;
  }
`

const NavLink = styled.a`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: color 0.2s ease;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.narrow};

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const Copyright = styled.div`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Footer: React.FC = () => (
  <FooterWrapper>
    <Container>
      <Logo>
        Бизнес<span>Риски</span>.рф
      </Logo>
      <Nav>
        <NavLink href="#risks">Риски</NavLink>
        <NavLink href="#quiz">Диагностика</NavLink>
        <NavLink href="#methodology">Методология</NavLink>
        <NavLink href="#cases">Кейсы</NavLink>
        <NavLink href="#consult">Консультация</NavLink>
      </Nav>
      <Copyright>© 2026. Все права защищены.</Copyright>
    </Container>
  </FooterWrapper>
)

export default Footer
