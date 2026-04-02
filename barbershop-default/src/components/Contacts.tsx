import React from "react";
import * as styles from "./Contacts.module.css";

const Contacts: React.FC = () => (
  <section id="contacts" className={`section ${styles.section}`}>
    <div className="container">
      <h2 className="section-title">Контакты</h2>
      <p className="section-subtitle">Мы всегда рады вас видеть</p>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Адрес</h3>
          <p className={styles.cardText}>
            г. Москва, ул. Примерная, д. 42
            <br />
            (5 минут от метро)
          </p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Режим работы</h3>
          <p className={styles.cardText}>
            Пн–Пт: 10:00–21:00
            <br />
            Сб–Вс: 10:00–20:00
          </p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Связаться</h3>
          <p className={styles.cardText}>
            <a href="tel:+74951234567">+7 (495) 123-45-67</a>
            <br />
            <a href="mailto:hello@barbershop.ru">hello@barbershop.ru</a>
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Contacts;
