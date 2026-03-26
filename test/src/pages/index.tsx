import React, { useState } from "react"
import type { HeadFC, PageProps } from "gatsby"

const pageStyle: React.CSSProperties = {
  fontFamily: "'Roboto', sans-serif",
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  color: "#111111",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
}

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginTop: "2rem",
  width: "100%",
  maxWidth: "320px",
}

const inputStyle: React.CSSProperties = {
  padding: "0.6rem 0.8rem",
  fontSize: "1rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
  outline: "none",
}

const buttonStyle: React.CSSProperties = {
  padding: "0.6rem 1.2rem",
  fontSize: "1rem",
  backgroundColor: "#111111",
  color: "#ffffff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
}

const IndexPage: React.FC<PageProps> = () => {
  const [name, setName] = useState<string>("")
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: "Тест", "Имя": name }),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={pageStyle}>
      <h1 style={{ margin: 0, fontSize: "2.5rem" }}>Тестовый сайт</h1>
      <p style={{ margin: "0.5rem 0 0", fontSize: "1.2rem", color: "#444" }}>
        Это работает ✓
      </p>
      {submitted ? (
        <p style={{ marginTop: "2rem", fontSize: "1.1rem", color: "#2a7" }}>Отправлено!</p>
      ) : (
        <form style={formStyle} onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />
          <button style={buttonStyle} type="submit" disabled={loading}>
            {loading ? "Отправка…" : "Отправить"}
          </button>
        </form>
      )}
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Тестовый сайт</title>
