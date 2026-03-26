import React from "react"
import type { HeadFC, PageProps } from "gatsby"

const NotFoundPage: React.FC<PageProps> = () => (
  <main style={{ fontFamily: "sans-serif", textAlign: "center", padding: "4rem" }}>
    <h1>404</h1>
    <p>Страница не найдена.</p>
    <a href="/">На главную</a>
  </main>
)

export default NotFoundPage

export const Head: HeadFC = () => <title>404 — Не найдено</title>
