import React, { useState } from "react";
import * as styles from "./FAQ.module.css";

interface FAQItem {
  question: string;
  answer: string;
}

const items: FAQItem[] = [
  {
    question: "Нужно ли записываться заранее?",
    answer:
      "Рекомендуем записаться через форму на сайте — так мы гарантируем, что мастер будет свободен. Но вы также можете попробовать прийти без записи.",
  },
  {
    question: "Сколько длится стрижка?",
    answer:
      "Мужская стрижка занимает около 45 минут, женская — около часа. Точное время зависит от сложности.",
  },
  {
    question: "Можно ли прийти с ребёнком?",
    answer:
      "Конечно! У нас есть детские стрижки. Мастера умеют работать с маленькими клиентами.",
  },
  {
    question: "Какие способы оплаты вы принимаете?",
    answer:
      "Наличные, банковские карты и переводы по СБП.",
  },
  {
    question: "Где вы находитесь?",
    answer:
      "Адрес указан в разделе «Контакты» ниже. Мы расположены в центре, рядом с метро.",
  },
];

const FAQRow: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.item} ${open ? styles.itemOpen : ""}`}>
      <button
        className={styles.question}
        onClick={() => setOpen(!open)}
        type="button"
        aria-expanded={open}
      >
        <span>{item.question}</span>
        <span className={styles.chevron}>{open ? "−" : "+"}</span>
      </button>
      {open && <p className={styles.answer}>{item.answer}</p>}
    </div>
  );
};

const FAQ: React.FC = () => (
  <section id="faq" className="section">
    <div className="container">
      <h2 className="section-title">Частые вопросы</h2>
      <p className="section-subtitle">
        Ответы на популярные вопросы наших клиентов
      </p>
      <div className={styles.list}>
        {items.map((item) => (
          <FAQRow key={item.question} item={item} />
        ))}
      </div>
    </div>
  </section>
);

export default FAQ;
