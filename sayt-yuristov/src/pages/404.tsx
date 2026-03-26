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
  padding: 2rem;
  background: ${({ theme }) => theme.colors.bg};
`

const Code = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1;
  margin-bottom: 1rem;
  opacity: 0.5;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`

const Desc = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 2.5rem;
`

const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 2rem;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.bgDeep};
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accentLight};
    transform: translateY(-2px);
  }
`

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Wrapper>
      <Code>404</Code>
      <Title>Страница не найдена</Title>
      <Desc>К сожалению, запрошенная страница не существует.</Desc>
      <BackLink href="/">← Вернуться на главную</BackLink>
    </Wrapper>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => (
  <title>404 — Страница не найдена | Воронов и партнёры</title>
)
