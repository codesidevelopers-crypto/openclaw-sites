import React from "react";
import * as styles from "./Hero.module.css";

const Hero: React.FC = () => (
  <section className={styles.hero}>
    <div className={`container ${styles.inner}`}>
      <h1 className={styles.title}>
        Стильная стрижка
        <br />
        <span className={styles.accent}>без лишней сложности</span>
      </h1>
      <p className={styles.subtitle}>
        Современная парикмахерская рядом с вами. Стрижки, укладки и уход для
        мужчин и женщин. Запись за&nbsp;минуту.
      </p>
      <div className={styles.actions}>
        <a href="#form" className="btn btn-primary">
          Оставить заявку
        </a>
        <a href="#services" className="btn btn-outline">
          Наши услуги
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
