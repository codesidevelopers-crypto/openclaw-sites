import React from 'react'
import type { HeadFC } from 'gatsby'
import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.primaryLighter};
`

const Code = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 6rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.3;
  line-height: 1;
  margin-bottom: 1rem;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 1rem;
`

const Link = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  text-decoration: underline;
`

const NotFoundPage: React.FC = () => (
  <Wrapper>
    <Code>404</Code>
    <Title>Страница не найдена</Title>
    <Link href="/">Вернуться на главную →</Link>
  </Wrapper>
)

export default NotFoundPage

export const Head: HeadFC = () => <title>404 — Страница не найдена</title>
