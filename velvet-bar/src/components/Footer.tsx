import React from 'react'
import styled from 'styled-components'

const FooterWrap = styled.footer`
  padding: 2rem;
  background: ${({ theme }) => theme.colors.bg};
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  text-align: center;
`

const Text = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray500};
`

const Brand = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`

const Footer: React.FC = () => (
  <FooterWrap>
    <Text>&copy; {new Date().getFullYear()} <Brand>Velvet Bar</Brand>. Все права защищены.</Text>
  </FooterWrap>
)

export default Footer
