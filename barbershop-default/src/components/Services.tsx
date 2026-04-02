import React from "react";
import * as styles from "./Services.module.css";

interface Service {
  name: string;
  price: string;
  duration: string;
}

const services: Service[] = [
  { name: "Мужская стрижка", price: "от 1 500 ₽", duration: "45 мин" },
  { name: "Женская стрижка", price: "от 2 000 ₽", duration: "60 мин" },
  { name: "Укладка", price: "от 1 200 ₽", duration: "30 мин" },
  { name: "Окрашивание", price: "от 3 500 ₽", duration: "90 мин" },
  { name: "Стрижка бороды", price: "от 800 ₽", duration: "20 мин" },
  { name: "Комплекс: стрижка + борода", price: "от 2 000 ₽", duration: "60 мин" },
  { name: "Детская стрижка", price: "от 1 000 ₽", duration: "30 мин" },
  { name: "Уход за волосами", price: "от 1 500 ₽", duration: "40 мин" },
];

const Services: React.FC = () => (
  <section id="services" className={`section ${styles.section}`}>
    <div className="container">
      <h2 className="section-title">Услуги и цены</h2>
      <p className="section-subtitle">
        Всё, что нужно для аккуратного и стильного образа
      </p>
      <div className={styles.grid}>
        {services.map((s) => (
          <div key={s.name} className={styles.row}>
            <div className={styles.info}>
              <span className={styles.name}>{s.name}</span>
              <span className={styles.duration}>{s.duration}</span>
            </div>
            <span className={styles.price}>{s.price}</span>
          </div>
        ))}
      </div>
      <div className={styles.cta}>
        <a href="#form" className="btn btn-primary">
          Записаться
        </a>
      </div>
    </div>
  </section>
);

export default Services;
