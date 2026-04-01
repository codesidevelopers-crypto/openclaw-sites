import React from "react"

interface Benefit {
  icon: string
  title: string
  text: string
}

const items: Benefit[] = [
  {
    icon: "\u26A1",
    title: "Быстрая обработка",
    text: "Мы получаем вашу заявку мгновенно и реагируем в течение часа.",
  },
  {
    icon: "\uD83D\uDD12",
    title: "Безопасность данных",
    text: "Ваши персональные данные надёжно защищены и не передаются третьим лицам.",
  },
  {
    icon: "\uD83D\uDCAC",
    title: "Индивидуальный подход",
    text: "Каждая заявка рассматривается персонально нашим специалистом.",
  },
]

const Benefits: React.FC = () => (
  <section className="benefits section">
    <div className="container">
      <h2>Почему выбирают нас</h2>
      <div className="benefits-grid">
        {items.map((item) => (
          <div className="benefit-card" key={item.title}>
            <span className="benefit-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Benefits
