import React from 'react'
import styled from 'styled-components'
import type { HeadFC } from 'gatsby'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`

const Code = styled.div`
  font-family: 'Manrope', sans-serif;
  font-size: clamp(6rem, 20vw, 12rem);
  font-weight: 900;
  line-height: 1;
  background: ${({ theme }) => theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`

const HomeLink = styled.a`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing['2xl']}`};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  color: #fff;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.04);
  }
`

const NotFoundPage: React.FC = () => (
  <Container>
    <Code>404</Code>
    <Title>Страница не найдена</Title>
    <Subtitle>Кажется, такой страницы не существует</Subtitle>
    <HomeLink href="/">На главную</HomeLink>
  </Container>
)

export default NotFoundPage

export const Head: HeadFC = () => <title>404 — Страница не найдена</title>
