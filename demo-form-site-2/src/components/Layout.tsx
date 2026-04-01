import React from "react"
import "../styles/global.css"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <>{children}</>
}

export default Layout
