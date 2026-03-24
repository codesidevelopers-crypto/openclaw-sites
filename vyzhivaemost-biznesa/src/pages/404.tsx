import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
`

const Code = styled.div`
  font-family: ${p => p.theme.fonts.mono};
  font-size: 5rem;
  font-weight: 600;
  color: ${p => p.theme.colors.accent};
  line-height: 1;
  margin-bottom: 16px;
`

const Msg = styled.p`
  color: ${p => p.theme.colors.textSub};
  margin-bottom: 32px;
`

const Link = styled.a`
  color: ${p => p.theme.colors.accent};
  font-weight: 600;
`

const NotFoundPage: React.FC = () => (
  <Wrap>
    <Code>404</Code>
    <Msg>Страница не найдена</Msg>
    <Link href="/">← На главную</Link>
  </Wrap>
)

export default NotFoundPage

export const Head: React.FC = () => <title>404 — Страница не найдена</title>
