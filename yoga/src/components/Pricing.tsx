import React from 'react'
import styled from 'styled-components'

interface PricingOption {
  title: string
  price: string
  perClass?: string
  features: string[]
  popular?: boolean
  cta: string
}

const options: PricingOption[] = [
  {
    title: 'Разовое занятие',
    price: '1 200 ₽',
    features: [
      'Любое направление',
      'Без записи заранее',
      'Коврик в аренду',
    ],
    cta: 'Попробовать',
  },
  {
    title: 'Абонемент · 4 занятия',
    price: '4 000 ₽',
    perClass: '1 000 ₽ / занятие',
    features: [
      'Действует 30 дней',
      'Любые направления',
      'Заморозка 1 раз',
    ],
    cta: 'Купить',
  },
  {
    title: 'Абонемент · 8 занятий',
    price: '7 200 ₽',
    perClass: '900 ₽ / занятие',
    features: [
      'Действует 60 дней',
      'Любые направления',
      'Заморозка 2 раза',
      'Персональная консультация',
    ],
    popular: true,
    cta: 'Купить',
  },
  {
    title: 'Безлимит',
    price: '12 000 ₽',
    perClass: 'месяц',
    features: [
      'Неограниченные занятия',
      'Все направления',
      'Приоритетная запись',
      'Коврик в подарок',
    ],
    cta: 'Купить',
  },
]

const Section = styled.section`
  background: ${({ theme }) => theme.colors.bg};
  padding: 120px 48px;

  @media (max-width: 768px) {
    padding: 80px 24px;
  }
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 72px;
`

const Eyebrow = styled.div`
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    opacity: 0.6;
  }
`

const SectionTitle = styled.h2`
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.04em;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div<{ $popular?: boolean }>`
  background: ${({ $popular, theme }) => ($popular ? theme.colors.accent : theme.colors.bgCard)};
  padding: 48px 36px;
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    z-index: 1;
  }
`

const PopularBadge = styled.div`
  position: absolute;
  top: -1px;
  right: 28px;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 6px 14px;
`

const CardTitle = styled.h3<{ $popular?: boolean }>`
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: ${({ $popular, theme }) => ($popular ? theme.colors.bg : theme.colors.textMuted)};
  margin-bottom: 32px;
`

const Price = styled.div<{ $popular?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.8rem;
  font-weight: 300;
  color: ${({ $popular, theme }) => ($popular ? theme.colors.bg : theme.colors.text)};
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 8px;
`

const PerClass = styled.div<{ $popular?: boolean }>`
  font-size: 0.78rem;
  color: ${({ $popular, theme }) => ($popular ? theme.colors.bg + '99' : theme.colors.textMuted)};
  letter-spacing: 0.06em;
  margin-bottom: 36px;
`

const Divider = styled.div<{ $popular?: boolean }>`
  height: 1px;
  background: ${({ $popular, theme }) => ($popular ? theme.colors.bg + '30' : theme.colors.border)};
  margin-bottom: 28px;
`

const Features = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;
  margin-bottom: 40px;
`

const Feature = styled.li<{ $popular?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.88rem;
  color: ${({ $popular, theme }) => ($popular ? theme.colors.bg : theme.colors.textMuted)};

  &::before {
    content: '—';
    color: ${({ $popular, theme }) => ($popular ? theme.colors.bg + 'AA' : theme.colors.accent)};
    flex-shrink: 0;
    font-family: ${({ theme }) => theme.fonts.heading};
  }
`

const CtaButton = styled.a<{ $popular?: boolean }>`
  display: block;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 16px;
  border: 1px solid ${({ $popular, theme }) => ($popular ? theme.colors.bg : theme.colors.accent)};
  color: ${({ $popular, theme }) => ($popular ? theme.colors.bg : theme.colors.accent)};
  transition: all 0.25s ease;

  &:hover {
    background: ${({ $popular, theme }) => ($popular ? theme.colors.bg : theme.colors.accent)};
    color: ${({ $popular, theme }) => ($popular ? theme.colors.accent : theme.colors.bg)};
  }
`

export const Pricing: React.FC = () => {
  return (
    <Section id="pricing">
      <SectionHeader>
        <Eyebrow>Абонементы</Eyebrow>
        <SectionTitle>Цены</SectionTitle>
      </SectionHeader>
      <Grid>
        {options.map((option) => (
          <Card key={option.title} $popular={option.popular}>
            {option.popular && <PopularBadge>Популярный</PopularBadge>}
            <CardTitle $popular={option.popular}>{option.title}</CardTitle>
            <Price $popular={option.popular}>{option.price}</Price>
            {option.perClass ? (
              <PerClass $popular={option.popular}>{option.perClass}</PerClass>
            ) : (
              <PerClass $popular={option.popular}>&nbsp;</PerClass>
            )}
            <Divider $popular={option.popular} />
            <Features>
              {option.features.map((f) => (
                <Feature key={f} $popular={option.popular}>{f}</Feature>
              ))}
            </Features>
            <CtaButton href="#booking" $popular={option.popular}>
              {option.cta}
            </CtaButton>
          </Card>
        ))}
      </Grid>
    </Section>
  )
}
