import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  padding: 8rem 2rem;
  position: relative;
  overflow: hidden;
`

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 5rem;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 3rem;
  }
`

const SectionNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.2em;
  margin-bottom: 0.25rem;
`

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;

  &::before {
    content: '';
    display: block;
    width: 32px;
    height: 2px;
    background: ${({ theme }) => theme.colors.gold};
  }

  span {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gold};
  }
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.textPrimary};
`

const Note = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 340px;
  line-height: 1.7;
`

const PriceTable = styled.div`
  display: grid;
  gap: 1.5px;
  background: ${({ theme }) => theme.colors.border};
`

const PriceRow = styled.div`
  background: ${({ theme }) => theme.colors.card};
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 1.75rem 2rem;
  gap: 2rem;
  transition: background 0.2s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${({ theme }) => theme.colors.gold};
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }

  &:hover::before {
    transform: scaleY(1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 1.25rem 1.5rem;
  }
`

const PriceLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`

const PriceIndex = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.1em;
  min-width: 2rem;
`

const PriceInfo = styled.div``

const PriceName = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.2rem;
`

const PriceDesc = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const PriceValue = styled.div`
  text-align: right;
  white-space: nowrap;
`

const PriceFrom = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-right: 0.25rem;
`

const PriceAmount = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.gold};
`

const PriceCurrency = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gold};
  margin-left: 0.15rem;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  gap: 2rem;
  flex-wrap: wrap;
`

const FooterNote = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`

const CallBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.bg};
  background: ${({ theme }) => theme.colors.gold};
  padding: 0.8rem 1.75rem;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.goldLight};
  }
`

interface PriceItem {
  name: string
  desc: string
  price: string
}

const prices: PriceItem[] = [
  { name: 'Диагностика', desc: 'Компьютерная диагностика всех систем', price: '2 000' },
  { name: 'ТО (замена масла + фильтры)', desc: 'По регламенту производителя', price: '5 500' },
  { name: 'Кузовной ремонт', desc: 'Рихтовка, покраска, восстановление', price: '15 000' },
  { name: 'Шиномонтаж (4 колеса)', desc: 'Демонтаж, монтаж, балансировка', price: '2 500' },
  { name: 'Диагностика электрики', desc: 'Полная проверка электрооборудования', price: '3 000' },
  { name: 'Обслуживание АКПП', desc: 'Замена масла, диагностика трансмиссии', price: '8 000' },
]

const Pricing: React.FC = () => {
  return (
    <section id="pricing">
      <Section>
        <Inner>
          <Header className="reveal">
            <div>
              <SectionNumber>05</SectionNumber>
              <SectionLabel><span>Стоимость работ</span></SectionLabel>
              <Title>
                ПРАЙС-
                <br />ЛИСТ
              </Title>
            </div>
            <Note>
              Указаны стартовые цены. Точная стоимость определяется после диагностики.
              Никаких скрытых платежей.
            </Note>
          </Header>

          <PriceTable>
            {prices.map((item, index) => (
              <PriceRow key={item.name} className="reveal" style={{ transitionDelay: `${index * 0.08}s` }}>
                <PriceLeft>
                  <PriceIndex>{String(index + 1).padStart(2, '0')}</PriceIndex>
                  <PriceInfo>
                    <PriceName>{item.name}</PriceName>
                    <PriceDesc>{item.desc}</PriceDesc>
                  </PriceInfo>
                </PriceLeft>
                <PriceValue>
                  <PriceFrom>от</PriceFrom>
                  <PriceAmount>{item.price}</PriceAmount>
                  <PriceCurrency>₽</PriceCurrency>
                </PriceValue>
              </PriceRow>
            ))}
          </PriceTable>

          <Footer>
            <FooterNote>
              * Цены действительны на март 2026 г. Возможна скидка 10% при записи онлайн.
              <br />
              На все выполненные работы предоставляется официальная гарантия.
            </FooterNote>
            <CallBtn href="tel:+74959876543">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 10.5c-1 0-2-.2-3-.5a1 1 0 0 0-1 .2l-1.5 1.5a9.5 9.5 0 0 1-4-4l1.5-1.5a1 1 0 0 0 .2-1 9.5 9.5 0 0 1-.5-3A1 1 0 0 0 4.2 1.5H2.5A1 1 0 0 0 1.5 2.5 11.5 11.5 0 0 0 13 14a1 1 0 0 0 1-1v-1.5a1 1 0 0 0-1-1z" fill="currentColor" />
              </svg>
              Узнать точную цену
            </CallBtn>
          </Footer>
        </Inner>
      </Section>
    </section>
  )
}

export default Pricing
