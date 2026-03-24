import React from 'react'
import styled from 'styled-components'
import type { HeadFC, PageProps } from 'gatsby'

const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`

const Code = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(5rem, 15vw, 10rem);
  font-weight: 900;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 1rem;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
`

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2.5rem;
`

const HomeLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`

const NotFoundPage: React.FC<PageProps> = () => (
  <Wrapper>
    <Code>404</Code>
    <Title>Страница не найдена</Title>
    <Subtitle>Такой страницы не существует. Вернитесь на главную.</Subtitle>
    <HomeLink href="/">← На главную</HomeLink>
  </Wrapper>
)

export default NotFoundPage

export const Head: HeadFC = () => <title>404 — Страница не найдена | Здоров Бизнес</title>
