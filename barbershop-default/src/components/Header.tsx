import React, { useState } from "react";
import * as styles from "./Header.module.css";

const navLinks = [
  { href: "#benefits", label: "Преимущества" },
  { href: "#services", label: "Услуги" },
  { href: "#process", label: "Как записаться" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacts", label: "Контакты" },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo}>
          Барбершоп
        </a>
        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Открыть меню"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#form" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
            Записаться
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
