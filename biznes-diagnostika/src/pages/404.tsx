import React from 'react'
import type { HeadFC } from 'gatsby'

export const Head: HeadFC = () => <title>404 — Страница не найдена</title>

export default function NotFoundPage(): JSX.Element {
  return (
    <div style={{ background: '#0B1120', color: '#F9FAFB', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
        <p style={{ color: '#9CA3AF', marginTop: '1rem' }}>Страница не найдена</p>
        <a href="/" style={{ color: '#3B82F6', marginTop: '1rem', display: 'inline-block' }}>На главную</a>
      </div>
    </div>
  )
}
