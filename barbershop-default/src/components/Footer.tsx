import React from "react";
import * as styles from "./Footer.module.css";

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={`container ${styles.inner}`}>
      <span className={styles.logo}>Барбершоп</span>
      <span className={styles.copy}>
        &copy; {new Date().getFullYear()} Все права защищены
      </span>
    </div>
  </footer>
);

export default Footer;
