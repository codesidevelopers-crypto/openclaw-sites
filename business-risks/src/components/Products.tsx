import React from 'react'
import styled from 'styled-components'

interface ProductsProps {
  onCtaClick: (source: string) => void
}

const Section = styled.section`
  padding: 5rem 2rem;
  background: white;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.75rem;
`

const Subtitle = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.gray600};
  margin-bottom: 3rem;
  max-width: 600px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.25rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div<{ $featured?: boolean }>`
  background: ${({ $featured, theme }) => $featured ? theme.colors.primaryLighter : theme.colors.gray50};
  border: 1.5px solid ${({ $featured, theme }) => $featured ? theme.colors.primaryLight : theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.5rem;
  transition: all 0.25s;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`

const Icon = styled.div`
  font-size: 1.75rem;
`

const Tag = styled.span<{ $type: 'new' | 'top' | 'base' }>`
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ $type, theme }) =>
    $type === 'new' ? '#FEF3C7' :
    $type === 'top' ? theme.colors.primaryLight :
    theme.colors.gray100};
  color: ${({ $type, theme }) =>
    $type === 'new' ? '#92400E' :
    $type === 'top' ? theme.colors.primaryDark :
    theme.colors.gray600};
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.5rem;
`

const CardDesc = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
  flex: 1;
  margin-bottom: 1rem;
`

const Features = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
`

const Feature = styled.li`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray700};
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;

  &::before {
    content: '✓';
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
  }
`

const CardLink = styled.button`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: left;
  padding: 0;
  transition: opacity 0.2s;
  margin-top: auto;

  &:hover {
    opacity: 0.75;
  }
`

interface ProductItem {
  icon: string
  title: string
  tag?: { text: string; type: 'new' | 'top' | 'base' }
  desc: string
  features: string[]
  href?: string
  featured?: boolean
}

const products: ProductItem[] = [
  {
    icon: '📈',
    title: 'Риски по операциям',
    desc: 'Видите общий уровень риска и понимаете, что на него влияет. Получаете предупреждения до проведения платежей.',
    features: [
      'Общий уровень риска по счёту',
      'Риски по типам операций',
      'Счётчик до высокого риска',
      'Рекомендации и подсказки',
      'Загрузка документов из любого банка',
    ],
  },
  {
    icon: '🔎',
    title: 'Риски по контрагентам',
    desc: 'Проверяйте партнёров до отправки денег — не после. Безлимитные проверки и мониторинг изменений.',
    features: [
      'Проверка до платежа',
      'Понятные сигналы риска',
      'Расширенные подсказки при оплате',
      'Безлимитные проверки',
      'Мониторинг изменений',
    ],
  },
  {
    icon: '🏛️',
    title: 'Надзорные органы',
    desc: 'Узнайте о плановых проверках и профилактических визитах раньше, чем они придут к вам.',
    features: [
      'Раннее предупреждение о проверках',
      'Профилактические визиты',
      'Уведомления об изменениях',
    ],
  },
  {
    icon: '⚖️',
    title: 'Арбитражные дела',
    desc: 'Следите за исками в реальном времени. Не пропустите важное судебное событие по вашему бизнесу.',
    features: [
      'Уведомления о новых исках',
      'История арбитражных дел',
      'Мониторинг изменений',
    ],
  },
  {
    icon: '📋',
    title: 'Исполнительные производства',
    desc: 'Мониторинг появлений в базе ФССП — защитите репутацию и операционную устойчивость бизнеса.',
    features: [
      'Мониторинг в ФССП',
      'Уведомления о новых производствах',
      'Репутационные риски',
    ],
  },
  {
    icon: '👷',
    title: 'Риски по самозанятым',
    tag: { text: 'Новое', type: 'new' },
    desc: 'Новый модуль для тех, кто работает с самозанятыми. Оцените риски и контролируйте статус.',
    features: [
      'Оценка рисков при работе с СМЗ',
      'Контроль статуса самозанятого',
      'Контроль лимитов дохода',
      'Рекомендации по работе',
    ],
  },
  {
    icon: '⭐',
    title: 'Всё включено',
    tag: { text: 'Топ выбор', type: 'top' },
    desc: 'Вся экосистема в одном тарифе. Годовая подписка со скидкой для тех, кто хочет полный контроль.',
    features: [
      'Все 6 продуктов сразу',
      'Годовая подписка — выгоднее',
      'Приоритетная поддержка',
      'Единый дашборд рисков',
    ],
    featured: true,
  },
  {
    icon: '🔧',
    title: 'Конструктор',
    desc: 'Выберите только нужные модули и платите за то, что реально используете.',
    features: [
      'Гибкий выбор сервисов',
      'Удобнее и дешевле поштучно',
      'Добавляйте модули в любой момент',
    ],
  },
]

const Products: React.FC<ProductsProps> = ({ onCtaClick }) => (
  <Section id="products">
    <Container>
      <SectionLabel>Экосистема продуктов</SectionLabel>
      <Title>Все продукты «Рисков бизнеса»</Title>
      <Subtitle>
        Выберите отдельный сервис, соберите конструктор или возьмите сразу всё —
        каждый продукт работает в вашем интернет-банке Точки.
      </Subtitle>
      <Grid>
        {products.slice(0, 4).map(p => (
          <Card key={p.title} $featured={p.featured}>
            <CardTop>
              <Icon>{p.icon}</Icon>
              {p.tag && <Tag $type={p.tag.type}>{p.tag.text}</Tag>}
            </CardTop>
            <CardTitle>{p.title}</CardTitle>
            <CardDesc>{p.desc}</CardDesc>
            <Features>
              {p.features.map(f => <Feature key={f}>{f}</Feature>)}
            </Features>
            <CardLink onClick={() => onCtaClick(p.title)}>Подключить →</CardLink>
          </Card>
        ))}
      </Grid>
      <Grid>
        {products.slice(4).map(p => (
          <Card key={p.title} $featured={p.featured}>
            <CardTop>
              <Icon>{p.icon}</Icon>
              {p.tag && <Tag $type={p.tag.type}>{p.tag.text}</Tag>}
            </CardTop>
            <CardTitle>{p.title}</CardTitle>
            <CardDesc>{p.desc}</CardDesc>
            <Features>
              {p.features.map(f => <Feature key={f}>{f}</Feature>)}
            </Features>
            <CardLink onClick={() => onCtaClick(p.title)}>Подключить →</CardLink>
          </Card>
        ))}
      </Grid>
    </Container>
  </Section>
)

export default Products
