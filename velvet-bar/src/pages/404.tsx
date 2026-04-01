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
  background: ${({ theme }) => theme.colors.bg};
`

const Code = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 6rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`

const Message = styled.p`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.gray600};
  margin-bottom: 2rem;
`

const HomeLink = styled.a`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.75rem 2rem;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`

const NotFoundPage: React.FC = () => (
  <Wrapper>
    <Code>404</Code>
    <Message>Страница не найдена — но бар всегда открыт</Message>
    <HomeLink href="/">Вернуться на главную</HomeLink>
  </Wrapper>
)

export default NotFoundPage

export const Head: HeadFC = () => <title>404 — Velvet Bar</title>
