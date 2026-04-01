import React, { useState } from "react"

interface FormData {
  name: string
  phone: string
  email: string
  comment: string
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
}

type Status = "idle" | "submitting" | "success" | "error"

const initialData: FormData = {
  name: "",
  phone: "",
  email: "",
  comment: "",
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) {
    errors.name = "Введите имя"
  }
  if (!data.phone.trim()) {
    errors.phone = "Введите телефон"
  } else if (!/^\+?[\d\s()-]{7,}$/.test(data.phone.trim())) {
    errors.phone = "Некорректный формат телефона"
  }
  if (!data.email.trim()) {
    errors.email = "Введите email"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Некорректный email"
  }
  return errors
}

const ContactForm: React.FC = () => {
  const [data, setData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>("idle")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus("submitting")
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Ошибка отправки")
      setStatus("success")
      setData(initialData)
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="form-section section" id="contact-form">
      <div className="container">
        <h2>Оставить заявку</h2>
        <p>Заполните форму и мы свяжемся с вами</p>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="name">Имя</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ваше имя"
                value={data.name}
                onChange={handleChange}
                autoComplete="name"
              />
              {errors.name && <div className="field-error">{errors.name}</div>}
            </div>

            <div className="form-field">
              <label htmlFor="phone">Телефон</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={data.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
              {errors.phone && (
                <div className="field-error">{errors.phone}</div>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={data.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && (
                <div className="field-error">{errors.email}</div>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="comment">Комментарий</label>
              <textarea
                id="comment"
                name="comment"
                placeholder="Ваш комментарий (необязательно)"
                value={data.comment}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="form-submit"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Отправка..." : "Отправить заявку"}
            </button>

            {status === "success" && (
              <div className="form-message success">
                Заявка отправлена! Мы свяжемся с вами в ближайшее время.
              </div>
            )}
            {status === "error" && (
              <div className="form-message error">
                Произошла ошибка. Попробуйте ещё раз.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
