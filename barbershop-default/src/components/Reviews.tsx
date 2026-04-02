import React from "react";
import * as styles from "./Reviews.module.css";

interface Review {
  name: string;
  text: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "Алексей М.",
    text: "Отличная стрижка и приятная атмосфера. Записался за минуту, пришёл точно ко времени — никаких очередей.",
    rating: 5,
  },
  {
    name: "Мария К.",
    text: "Мастер сразу поняла, что мне нужно. Результат превзошёл ожидания. Обязательно вернусь!",
    rating: 5,
  },
  {
    name: "Дмитрий В.",
    text: "Стригусь здесь уже полгода. Стабильное качество, адекватные цены и дружелюбная команда.",
    rating: 5,
  },
];

const Stars: React.FC<{ count: number }> = ({ count }) => (
  <div className={styles.stars}>
    {Array.from({ length: count }, (_, i) => (
      <span key={i}>★</span>
    ))}
  </div>
);

const Reviews: React.FC = () => (
  <section id="reviews" className={`section ${styles.section}`}>
    <div className="container">
      <h2 className="section-title">Отзывы клиентов</h2>
      <p className="section-subtitle">
        Нам доверяют — и нам это важно
      </p>
      <div className={styles.grid}>
        {reviews.map((r) => (
          <div key={r.name} className={styles.card}>
            <Stars count={r.rating} />
            <p className={styles.text}>{r.text}</p>
            <span className={styles.name}>{r.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Reviews;
