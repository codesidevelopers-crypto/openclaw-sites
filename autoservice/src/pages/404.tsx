import React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
  padding: 2rem;
`

const ErrorCode = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 10rem;
  font-weight: 900;
  line-height: 1;
  -webkit-text-stroke: 2px ${({ theme }) => theme.colors.accent};
  color: transparent;
  letter-spacing: -0.04em;
`

const ErrorTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
`

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  max-width: 400px;
`

const HomeButton = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.85rem 2rem;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <PageWrapper>
        <ErrorCode>404</ErrorCode>
        <ErrorTitle>Страница не найдена</ErrorTitle>
        <ErrorText>
          Страница, которую вы ищете, не существует или была перемещена.
        </ErrorText>
        <HomeButton href="/">Вернуться на главную</HomeButton>
      </PageWrapper>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>404 — AutoPro</title>
