import React from "react";
import "../styles/global.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
      rel="stylesheet"
    />
    <main>{children}</main>
  </>
);

export default Layout;
