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

const Card = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  border: 1.5px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.5rem;
  transition: all 0.25s;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.colors.primaryLight};
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

const Tag = styled.span<{ $type: 'new' | 'base' }>`
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ $type }) => $type === 'new' ? '#FEF3C7' : '#F3F4F6'};
  color: ${({ $type }) => $type === 'new' ? '#92400E' : '#6B7280'};
`

const FreeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.greenLight};
  color: ${({ theme }) => theme.colors.green};
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.2rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
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
  tag?: { text: string; type: 'new' | 'base' }
  desc: string
  features: string[]
  freeBase?: boolean
}

const products: ProductItem[] = [
  {
    icon: '📈',
    title: 'Риски по операциям',
    desc: 'Видьте общий уровень риска и понимайте, что на него влияет. Получайте предупреждения до проведения платежей.',
    features: [
      'Общий уровень риска по счёту',
      'Риски по типам операций',
      'Счётчик до следующего уровня риска',
      'Предупреждения в момент платежа',
      'Подробные рекомендации',
    ],
    freeBase: true,
  },
  {
    icon: '🔎',
    title: 'Риски по контрагентам',
    desc: 'Проверяйте партнёров до отправки денег. Безлимитные проверки и мониторинг изменений — всё включено.',
    features: [
      'Проверка до платежа',
      'Понятные сигналы риска',
      'Расширенные подсказки при оплате',
      'Безлимитные проверки',
      'Безлимитный мониторинг изменений',
    ],
  },
  {
    icon: '🏛️',
    title: 'Надзорные органы',
    desc: 'Узнайте о плановых проверках и профилактических визитах заранее — пока есть время подготовиться.',
    features: [
      'Раннее предупреждение о проверках',
      'Профилактические визиты',
      'Уведомления об изменениях',
    ],
  },
  {
    icon: '⚖️',
    title: 'Арбитражные дела',
    desc: 'Следите за судебными событиями в арбитраже в реальном времени. Новый иск — сразу в уведомлении.',
    features: [
      'Уведомления о новых исках',
      'История арбитражных дел',
      'Мониторинг по контрагентам',
    ],
  },
  {
    icon: '📋',
    title: 'Судебные дела',
    desc: 'Суды общей юрисдикции — отдельный мониторинг. Не смешивайте с арбитражем. Узнайте о деле первым.',
    features: [
      'Уведомления о новых делах',
      'Суды общей юрисдикции',
      'Мониторинг по вашей компании',
    ],
  },
  {
    icon: '📂',
    title: 'Исполнительные производства',
    desc: 'Мониторинг появлений в базе ФССП. Узнайте раньше, чем это повлияет на расчёты с партнёрами.',
    features: [
      'Мониторинг в базе ФССП',
      'Уведомления о новых производствах',
      'Репутационные риски',
    ],
  },
  {
    icon: '👷',
    title: 'Риски по самозанятым',
    tag: { text: 'Новое', type: 'new' },
    desc: 'Для тех, кто работает с самозанятыми. Раннее предупреждение о рисках регулярных выплат физлицам.',
    features: [
      'Оценка рисков при работе с СМЗ',
      'Контроль статуса самозанятого',
      'Контроль лимитов дохода',
      'Рекомендации по оформлению',
    ],
  },
  {
    icon: '🔀',
    title: 'Признаки дробления бизнеса',
    tag: { text: 'Новое', type: 'new' },
    desc: 'Помогает заметить признаки, которые могут привлечь внимание банка и регуляторов — до серьёзных последствий.',
    features: [
      'Сигналы раннего предупреждения',
      'Анализ структуры операций',
      'Рекомендации по снижению риска',
    ],
  },
]

const Products: React.FC<ProductsProps> = ({ onCtaClick }) => (
  <Section id="products">
    <Container>
      <SectionLabel>Продуктовые модули</SectionLabel>
      <Title>Все 8 модулей «Рисков бизнеса»</Title>
      <Subtitle>
        Восемь продуктовых модулей для полного контроля рисков. Подключите
        нужные по отдельности или возьмите все сразу в формате «Всё включено».
      </Subtitle>
      <Grid>
        {products.slice(0, 4).map(p => (
          <Card key={p.title}>
            <CardTop>
              <Icon>{p.icon}</Icon>
              {p.tag && <Tag $type={p.tag.type}>{p.tag.text}</Tag>}
            </CardTop>
            {p.freeBase && <FreeBadge>✓ Базовая версия бесплатно</FreeBadge>}
            <CardTitle>{p.title}</CardTitle>
            <CardDesc>{p.desc}</CardDesc>
            <Features>
              {p.features.map(f => <Feature key={f}>{f}</Feature>)}
            </Features>
            <CardLink onClick={() => onCtaClick(p.title)}>Подробнее →</CardLink>
          </Card>
        ))}
      </Grid>
      <Grid>
        {products.slice(4).map(p => (
          <Card key={p.title}>
            <CardTop>
              <Icon>{p.icon}</Icon>
              {p.tag && <Tag $type={p.tag.type}>{p.tag.text}</Tag>}
            </CardTop>
            <CardTitle>{p.title}</CardTitle>
            <CardDesc>{p.desc}</CardDesc>
            <Features>
              {p.features.map(f => <Feature key={f}>{f}</Feature>)}
            </Features>
            <CardLink onClick={() => onCtaClick(p.title)}>Подробнее →</CardLink>
          </Card>
        ))}
      </Grid>
    </Container>
  </Section>
)

export default Products
