import React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'

const Section = styled.section`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1.5rem;
`

const Big = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(6rem, 20vw, 12rem);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1;
  margin-bottom: 1rem;
`

const Title = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
`

const Sub = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 2rem;
`

const HomeLink = styled.a`
  padding: 0.85rem 2rem;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.bg};
  font-weight: 700;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.accentLight};
  }
`

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Section>
        <Big>404</Big>
        <Title>Страница не найдена</Title>
        <Sub>Возможно, страница была удалена или вы ввели неверный адрес.</Sub>
        <HomeLink href="/">На главную</HomeLink>
      </Section>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>404 — Кофейня</title>
