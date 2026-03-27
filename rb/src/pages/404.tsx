import React from 'react'
import type { HeadFC } from 'gatsby'
import styled from 'styled-components'

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
  padding: 2rem;
`

const Code = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 6rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primaryLight};
  line-height: 1;
`

const Msg = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.gray600};
`

const Link = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  text-decoration: underline;
`

const NotFoundPage: React.FC = () => (
  <Wrap>
    <Code>404</Code>
    <Msg>Страница не найдена</Msg>
    <Link href="/">← На главную</Link>
  </Wrap>
)

export default NotFoundPage

export const Head: HeadFC = () => <title>404 — Риски бизнеса</title>
