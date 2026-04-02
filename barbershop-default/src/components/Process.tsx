import React from "react";
import * as styles from "./Process.module.css";

interface Step {
  num: string;
  title: string;
  text: string;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Оставьте заявку",
    text: "Заполните короткую форму на сайте — это займёт меньше минуты.",
  },
  {
    num: "02",
    title: "Мы перезвоним",
    text: "Администратор свяжется с вами и подберёт удобное время.",
  },
  {
    num: "03",
    title: "Приходите к нам",
    text: "Мастер уже ждёт вас. Расслабьтесь и наслаждайтесь процессом.",
  },
  {
    num: "04",
    title: "Результат",
    text: "Уходите с идеальной стрижкой и хорошим настроением.",
  },
];

const Process: React.FC = () => (
  <section id="process" className="section">
    <div className="container">
      <h2 className="section-title">Как проходит запись</h2>
      <p className="section-subtitle">
        Четыре простых шага до идеальной стрижки
      </p>
      <div className={styles.grid}>
        {steps.map((s) => (
          <div key={s.num} className={styles.step}>
            <span className={styles.num}>{s.num}</span>
            <h3 className={styles.stepTitle}>{s.title}</h3>
            <p className={styles.stepText}>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
