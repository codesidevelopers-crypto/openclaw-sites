import React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 24px;
  gap: 24px;
`

const Number = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 8rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.accent};
  opacity: 0.4;
  line-height: 1;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text};
`

const Body = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const BackLink = styled.a`
  font-size: 0.78rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  border-bottom: 1px solid ${({ theme }) => theme.colors.accent}60;
  padding-bottom: 2px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Wrapper>
      <Number>404</Number>
      <Title>Страница не найдена</Title>
      <Body>Возможно, страница была перемещена или удалена.</Body>
      <BackLink href="/">Вернуться на главную</BackLink>
    </Wrapper>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>404 — Прана</title>
