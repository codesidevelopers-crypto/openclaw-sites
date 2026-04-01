import React from "react"

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container">
      <p>&copy; {new Date().getFullYear()} Demo Form. Все права защищены.</p>
      <p>demoform2.example.com</p>
    </div>
  </footer>
)

export default Footer
