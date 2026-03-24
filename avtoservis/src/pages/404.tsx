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
  padding: 2rem;
`

const Code = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(6rem, 20vw, 14rem);
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 2px ${({ theme }) => theme.colors.border};
  line-height: 1;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
`

const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 2.5rem;
`

const Btn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.bg};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.9rem 2rem;
`

const NotFoundPage: React.FC = () => (
  <Wrapper>
    <Code>404</Code>
    <Title>Страница не найдена</Title>
    <Text>Возможно, страница была удалена или вы ввели неверный адрес.</Text>
    <Btn href="/">На главную</Btn>
  </Wrapper>
)

export default NotFoundPage

export const Head: HeadFC = () => <title>404 — АВТОРИТЕТ</title>
