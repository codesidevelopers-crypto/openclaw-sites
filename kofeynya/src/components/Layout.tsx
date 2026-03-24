import React from 'react'
import styled from 'styled-components'
import { Nav } from './Nav'
import { Footer } from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

const Main = styled.main`
  min-height: 100vh;
`

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Nav />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}

export default Layout
