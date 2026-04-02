import React from "react";
import * as styles from "./Benefits.module.css";

interface Benefit {
  icon: string;
  title: string;
  text: string;
}

const benefits: Benefit[] = [
  {
    icon: "✂️",
    title: "Опытные мастера",
    text: "Каждый стилист — профессионал с многолетним опытом и постоянным обучением.",
  },
  {
    icon: "⏱️",
    title: "Запись за минуту",
    text: "Оставьте заявку на сайте — мы перезвоним и подберём удобное время.",
  },
  {
    icon: "🏠",
    title: "Уютная атмосфера",
    text: "Современный интерьер, приятная музыка и кофе — всё для вашего комфорта.",
  },
  {
    icon: "💰",
    title: "Прозрачные цены",
    text: "Никаких скрытых доплат. Вы всегда знаете стоимость заранее.",
  },
];

const Benefits: React.FC = () => (
  <section id="benefits" className="section">
    <div className="container">
      <h2 className="section-title">Почему выбирают нас</h2>
      <p className="section-subtitle">
        Мы делаем всё, чтобы вам было удобно и результат радовал
      </p>
      <div className={styles.grid}>
        {benefits.map((b) => (
          <div key={b.title} className={styles.card}>
            <span className={styles.icon}>{b.icon}</span>
            <h3 className={styles.cardTitle}>{b.title}</h3>
            <p className={styles.cardText}>{b.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
