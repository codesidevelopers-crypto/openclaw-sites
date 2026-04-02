import React, { useState } from "react";
import * as styles from "./BookingForm.module.css";

interface FormData {
  name: string;
  phone: string;
  service: string;
  comment: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const serviceOptions = [
  "Мужская стрижка",
  "Женская стрижка",
  "Укладка",
  "Окрашивание",
  "Стрижка бороды",
  "Комплекс: стрижка + борода",
  "Детская стрижка",
  "Уход за волосами",
];

const BookingForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    service: "",
    comment: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Submit failed");

      setStatus("success");
      setForm({ name: "", phone: "", service: "", comment: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="form" className="section">
      <div className="container">
        <h2 className="section-title">Оставить заявку</h2>
        <p className="section-subtitle">
          Заполните форму — мы перезвоним и подберём удобное время
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Имя
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Ваше имя"
              value={form.name}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>
              Телефон
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="+7 (___) ___-__-__"
              value={form.phone}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="service" className={styles.label}>
              Услуга
            </label>
            <select
              id="service"
              name="service"
              required
              value={form.service}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="" disabled>
                Выберите услугу
              </option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="comment" className={styles.label}>
              Комментарий
            </label>
            <textarea
              id="comment"
              name="comment"
              placeholder="Пожелания или вопросы (необязательно)"
              value={form.comment}
              onChange={handleChange}
              className={`${styles.input} ${styles.textarea}`}
              rows={3}
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary ${styles.submit}`}
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Отправка..." : "Записаться"}
          </button>

          {status === "success" && (
            <p className={styles.success}>
              Заявка отправлена! Мы скоро свяжемся с вами.
            </p>
          )}
          {status === "error" && (
            <p className={styles.error}>
              Произошла ошибка. Попробуйте ещё раз или позвоните нам.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
