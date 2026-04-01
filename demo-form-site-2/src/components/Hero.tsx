import React from "react"

const Hero: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById("contact-form")
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="hero">
      <div className="container">
        <h1>Оставьте заявку — мы свяжемся с&nbsp;вами</h1>
        <p>
          Заполните короткую форму, и наш специалист ответит вам в ближайшее
          время.
        </p>
        <button className="hero-cta" onClick={scrollToForm} type="button">
          Оставить заявку
        </button>
      </div>
    </section>
  )
}

export default Hero
