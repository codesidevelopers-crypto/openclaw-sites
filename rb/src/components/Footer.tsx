import React from 'react'
import styled from 'styled-components'

const FooterWrap = styled.footer`
  background: ${({ theme }) => theme.colors.gray900};
  padding: 2rem;
  text-align: center;
`

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const LogoDot = styled.div`
  width: 28px;
  height: 28px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 800;
  color: white;
  font-family: ${({ theme }) => theme.fonts.heading};
`

const LogoText = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.95rem;
  font-weight: 700;
  color: white;
`

const Copy = styled.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.gray500};
`

const Links = styled.div`
  display: flex;
  gap: 1.5rem;
`

const FootLink = styled.a`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.gray500};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.gray300};
  }
`

const Footer: React.FC = () => (
  <FooterWrap>
    <Inner>
      <LogoArea>
        <LogoDot>РБ</LogoDot>
        <LogoText>Риски бизнеса</LogoText>
      </LogoArea>
      <Copy>© 2025 Точка Банк. Все права защищены.</Copy>
      <Links>
        <FootLink href="#">Условия подключения</FootLink>
        <FootLink href="#">Политика конфиденциальности</FootLink>
      </Links>
    </Inner>
  </FooterWrap>
)

export default Footer
