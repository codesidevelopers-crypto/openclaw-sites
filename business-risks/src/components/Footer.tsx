import React from 'react'
import styled from 'styled-components'

const Foot = styled.footer`
  background: ${({ theme }) => theme.colors.gray900};
  color: rgba(255,255,255,0.6);
  padding: 2.5rem;
  text-align: center;
  font-size: 0.85rem;
  line-height: 1.7;
`

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const LogoDot = styled.div`
  width: 28px;
  height: 28px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 900;
  font-family: ${({ theme }) => theme.fonts.heading};
`

const LogoText = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  color: white;
  font-size: 1rem;
`

const Footer: React.FC = () => (
  <Foot>
    <LogoRow>
      <LogoDot>Т</LogoDot>
      <LogoText>Точка Банк — Риски бизнеса</LogoText>
    </LogoRow>
    <p>© {new Date().getFullYear()} АО «Банк Точка». Все права защищены.</p>
    <p>Использование сервиса регулируется условиями обслуживания банка.</p>
  </Foot>
)

export default Footer
