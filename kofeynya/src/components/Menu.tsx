import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import type { MenuItem } from '../types'

const menuItems: readonly MenuItem[] = [
  { id: '1', name: 'Эспрессо', description: 'Плотный, насыщенный, с ореховым послевкусием', price: 180, category: 'coffee', emoji: '☕' },
  { id: '2', name: 'Флэт Уайт', description: 'Двойной ристретто с бархатистым молоком', price: 260, category: 'coffee', emoji: '🥛' },
  { id: '3', name: 'Фильтр', description: 'Сезонный моносорт, раскрывающий терруар', price: 240, category: 'coffee', emoji: '🫖' },
  { id: '4', name: 'Матча Латте', description: 'Японский чай маття с молоком', price: 290, category: 'tea', emoji: '🍵' },
  { id: '5', name: 'Чайный сет', description: 'Авторский купаж с сезонными добавками', price: 320, category: 'tea', emoji: '🫖' },
  { id: '6', name: 'Круассан', description: 'Слоёный, с маслом, свежей выпечки', price: 180, category: 'food', emoji: '🥐' },
  { id: '7', name: 'Авокадо тост', description: 'Ржаной хлеб, авокадо, яйцо пашот', price: 380, category: 'food', emoji: '🍞' },
  { id: '8', name: 'Тирамису', description: 'Классический, с маскарпоне и ромом', price: 290, category: 'dessert', emoji: '🍰' },
] as const

type Category = 'all' | MenuItem['category']

const categories: readonly { id: Category; label: string }[] = [
  { id: 'all', label: 'Всё меню' },
  { id: 'coffee', label: 'Кофе' },
  { id: 'tea', label: 'Чай' },
  { id: 'food', label: 'Еда' },
  { id: 'dessert', label: 'Десерты' },
] as const

interface SectionProps {
  $visible: boolean
}

interface FilterBtnProps {
  $active: boolean
}

const Section = styled.section<SectionProps>`
  padding: 6rem 1.5rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}
`

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`

const SectionHead = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const SectionTag = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 1rem;
`

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
`

const FilterRow = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`

const FilterBtn = styled.button<FilterBtnProps>`
  padding: 0.5rem 1.25rem;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ $active, theme }) =>
    $active
      ? css`
          background: ${theme.colors.accent};
          color: ${theme.colors.bg};
        `
      : css`
          background: transparent;
          border: 1px solid ${theme.colors.border};
          color: ${theme.colors.textMuted};
          &:hover {
            border-color: ${theme.colors.accent};
            color: ${theme.colors.accent};
          }
        `}
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
`

const Card = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 1.75rem;
  transition: border-color ${({ theme }) => theme.transitions.normal},
              transform ${({ theme }) => theme.transitions.normal},
              box-shadow ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.card};
  }
`

const CardEmoji = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`

const CardName = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
`

const CardDesc = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
  margin-bottom: 1.25rem;
`

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CardPrice = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
`

const CardUnit = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const { ref, isVisible } = useScrollAnimation()

  const filtered = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory)

  return (
    <Section
      id="menu"
      ref={ref as React.RefObject<HTMLElement>}
      $visible={isVisible}
    >
      <Container>
        <SectionHead>
          <SectionTag>Меню</SectionTag>
          <SectionTitle>Что мы готовим</SectionTitle>
        </SectionHead>

        <FilterRow>
          {categories.map(cat => (
            <FilterBtn
              key={cat.id}
              $active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </FilterBtn>
          ))}
        </FilterRow>

        <Grid>
          {filtered.map(item => (
            <Card key={item.id}>
              <CardEmoji>{item.emoji}</CardEmoji>
              <CardName>{item.name}</CardName>
              <CardDesc>{item.description}</CardDesc>
              <CardFooter>
                <CardPrice>{item.price} ₽</CardPrice>
                <CardUnit>за порцию</CardUnit>
              </CardFooter>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
