import React from 'react'
import type { HeadFC } from 'gatsby'
import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
`

const Code = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 6rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.border};
  line-height: 1;
  margin-bottom: 20px;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 32px;
`

const HomeLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.accent};
  color: #030810;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 0.875rem;
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.radius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    transform: translateY(-1px);
  }
`

const NotFoundPage: React.FC = () => (
  <Wrapper>
    <Code>404</Code>
    <Title>Страница не найдена</Title>
    <Text>Такой страницы не существует. Вернитесь на главную.</Text>
    <HomeLink href="/">На главную →</HomeLink>
  </Wrapper>
)

export default NotFoundPage

export const Head: HeadFC = () => <title>404 — Страница не найдена</title>
