import React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
  background: ${({ theme }) => theme.colors.bg};
  text-align: center;
  padding: 2rem;
`

const Code = styled.div`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gold};
  opacity: 0.5;
  line-height: 1;
`

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.white};
`

const Link = styled.a`
  font-family: ${({ theme }) => theme.fonts.narrow};
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGold};
  padding-bottom: 2px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.75;
  }
`

const NotFoundPage: React.FC<PageProps> = () => (
  <Wrapper>
    <Code>404</Code>
    <Title>Страница не найдена</Title>
    <Link href="/">Вернуться на главную</Link>
  </Wrapper>
)

export default NotFoundPage

export const Head: HeadFC = () => <title>404 — Страница не найдена</title>
