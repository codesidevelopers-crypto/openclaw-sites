import React from 'react'
import styled from 'styled-components'

interface FormatsProps {
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
  max-width: 1100px;
  margin: 0 auto;
`

const SectionLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
  text-align: center;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.75rem;
  text-align: center;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray600};
  margin-bottom: 3rem;
  text-align: center;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div<{ $featured?: boolean }>`
  background: ${({ $featured, theme }) => $featured ? theme.colors.primary : theme.colors.gray50};
  border: 2px solid ${({ $featured, theme }) => $featured ? theme.colors.primary : theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 2rem;
  position: relative;
  transition: all 0.25s;

  &:hover {
    transform: ${({ $featured }) => $featured ? 'translateY(-4px)' : 'translateY(-2px)'};
    box-shadow: ${({ $featured, theme }) => $featured ? '0 20px 48px rgba(124,58,237,0.3)' : theme.shadow.md};
  }
`

const PopularBadge = styled.div`
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: #F59E0B;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.3rem 1rem;
  border-radius: 99px;
  white-space: nowrap;
`

const CardTitle = styled.h3<{ $featured?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.35rem;
  font-weight: 800;
  color: ${({ $featured, theme }) => $featured ? 'white' : theme.colors.gray900};
  margin-bottom: 0.25rem;
`

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
`

const Price = styled.div<{ $featured?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: 900;
  color: ${({ $featured, theme }) => $featured ? 'white' : theme.colors.gray900};
  line-height: 1;
`

const PriceUnit = styled.span<{ $featured?: boolean }>`
  font-size: 0.875rem;
  color: ${({ $featured, theme }) => $featured ? 'rgba(255,255,255,0.7)' : theme.colors.gray500};
`

const DiscountBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  background: rgba(255,255,255,0.2);
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
`

const CardSubtitle = styled.p<{ $featured?: boolean }>`
  font-size: 0.875rem;
  color: ${({ $featured, theme }) => $featured ? 'rgba(255,255,255,0.75)' : theme.colors.gray600};
  margin-bottom: 1.5rem;
  line-height: 1.5;
`

const Divider = styled.div<{ $featured?: boolean }>`
  height: 1px;
  background: ${({ $featured, theme }) => $featured ? 'rgba(255,255,255,0.15)' : theme.colors.gray200};
  margin-bottom: 1.25rem;
`

const FeatureList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-bottom: 2rem;
`

const FeatureItem = styled.li<{ $featured?: boolean }>`
  font-size: 0.875rem;
  color: ${({ $featured, theme }) => $featured ? 'rgba(255,255,255,0.9)' : theme.colors.gray700};
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;

  &::before {
    content: '✓';
    color: ${({ $featured, theme }) => $featured ? '#A5F3FC' : theme.colors.primary};
    font-weight: 700;
    flex-shrink: 0;
  }
`

const Warning = styled.div<{ $featured?: boolean }>`
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1.5;
  padding: 0.8rem 1rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  margin-bottom: 1rem;
  background: ${({ $featured, theme }) => $featured ? 'rgba(255,255,255,0.16)' : '#FEF3C7'};
  color: ${({ $featured, theme }) => $featured ? 'white' : '#92400E'};
`

const Btn = styled.button<{ $featured?: boolean }>`
  width: 100%;
  background: ${({ $featured, theme }) => $featured ? 'white' : theme.colors.primary};
  color: ${({ $featured, theme }) => $featured ? theme.colors.primary : 'white'};
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`

const Note = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray600};
  margin-top: 1.5rem;
  line-height: 1.7;
`

const ConstructorTable = styled.div`
  margin-top: 3rem;
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xxl};
  overflow: hidden;
`

const TableHeader = styled.div`
  padding: 1.5rem 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const TableTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.35rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
`

const TableSubtitle = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`

const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
`

const PriceName = styled.span`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray800};
`

const PriceValue = styled.span`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  white-space: nowrap;
`

const InlineNotes = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const MiniCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 1rem;
`

const MiniTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.5rem;
`

const MiniText = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`

const QuickConnect = styled.div`
  margin-top: 1.5rem;
  background: ${({ theme }) => theme.colors.primaryLighter};
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const QuickText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`

const QuickLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const QuickTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
`

const QuickDesc = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray700};
  line-height: 1.6;
  max-width: 680px;
`

const constructorPrices = [
  ['Риски по операциям, полная версия', '1900 ₽ / месяц'],
  ['Риски по контрагентам', '1200 ₽ / месяц'],
  ['Надзорные органы', '300 ₽ / месяц'],
  ['Арбитражные дела', '300 ₽ / месяц'],
  ['Судебные дела', '300 ₽ / месяц'],
  ['Исполнительные производства', '300 ₽ / месяц'],
  ['Риски по самозанятым', '750 ₽ / месяц'],
  ['Признаки дробления бизнеса', '750 ₽ / месяц'],
]

const Formats: React.FC<FormatsProps> = ({ onCtaClick }) => (
  <Section id="formats">
    <Container>
      <SectionLabel>Форматы подключения</SectionLabel>
      <Title>Подключайте сервис так, как удобно бизнесу</Title>
      <Subtitle>
        Продуктовые модули и тарифы — не одно и то же. Модули отвечают за конкретные
        задачи, а формат подключения определяет, как вы покупаете доступ: всё сразу
        или только нужные части.
      </Subtitle>
      <Grid>
        <Card>
          <CardTitle>Всё включено</CardTitle>
          <PriceRow>
            <Price>3 000 ₽</Price>
            <PriceUnit>/ месяц</PriceUnit>
          </PriceRow>
          <CardSubtitle>Все 8 продуктовых модулей одной подпиской. Подходит тем, кто хочет видеть полную картину рисков и не собирать набор вручную.</CardSubtitle>
          <Divider />
          <FeatureList>
            <FeatureItem>Все 8 продуктовых модулей</FeatureItem>
            <FeatureItem>Риски по операциям — полная версия</FeatureItem>
            <FeatureItem>Безлимитные проверки и мониторинг контрагентов</FeatureItem>
            <FeatureItem>Все 4 юридических и событийных модуля</FeatureItem>
            <FeatureItem>Риски по самозанятым и признаки дробления</FeatureItem>
            <FeatureItem>Можно дополнительно использовать безлимит в Проверке компании</FeatureItem>
          </FeatureList>
          <Btn onClick={() => onCtaClick('Всё включено — Месяц')}>
            Подключить за 3 000 ₽/мес
          </Btn>
        </Card>
        <Card $featured style={{ marginTop: '-12px' }}>
          <PopularBadge>★ Самый выгодный</PopularBadge>
          <CardTitle $featured>Всё включено на год</CardTitle>
          <PriceRow>
            <Price $featured>25 000 ₽</Price>
            <PriceUnit $featured>/ год</PriceUnit>
            <DiscountBadge>Скидка 30%</DiscountBadge>
          </PriceRow>
          <CardSubtitle $featured>
            Это не отдельный продукт, а тот же формат «Всё включено», только при оплате на год.
            Получаете все 8 модулей и экономите 30%.
          </CardSubtitle>
          <Divider $featured />
          <FeatureList>
            <FeatureItem $featured>Те же 8 продуктовых модулей, что и в месячном формате</FeatureItem>
            <FeatureItem $featured>Полная версия рисков по операциям и рабочий контур интеграций</FeatureItem>
            <FeatureItem $featured>Безлимитные проверки контрагентов и мониторинг изменений</FeatureItem>
            <FeatureItem $featured>Юридические уведомления, самозанятые и дробление бизнеса</FeatureItem>
            <FeatureItem $featured>Подходит, если хотите закрыть все задачи одним решением</FeatureItem>
          </FeatureList>
          <Btn $featured onClick={() => onCtaClick('Всё включено — Год')}>
            Подключить за 25 000 ₽/год
          </Btn>
        </Card>
        <Card>
          <CardTitle>Конструктор</CardTitle>
          <PriceRow>
            <Price>по модулям</Price>
          </PriceRow>
          <CardSubtitle>Выбираете один или несколько модулей и платите за каждый отдельно. Подходит, если нужно решить конкретную задачу, не покупая весь пакет.</CardSubtitle>
          <Warning>У Конструктора нет пакетной скидки. Вы платите сумму выбранных модулей. Если позже добавите ещё сервис, возможно пропорциональное досписание до общей даты платежа — это механика расчёта, а не скидка.</Warning>
          <Divider />
          <FeatureList>
            <FeatureItem>Любая комбинация из 8 продуктовых модулей</FeatureItem>
            <FeatureItem>Стоимость зависит от выбранного набора</FeatureItem>
            <FeatureItem>Риски по самозанятым можно подключить отдельно и быстро</FeatureItem>
            <FeatureItem>Подходит, если вам нужен точечный контроль отдельных зон риска</FeatureItem>
          </FeatureList>
          <Btn onClick={() => onCtaClick('Конструктор')}>
            Собрать свой набор
          </Btn>
        </Card>
      </Grid>

      <ConstructorTable>
        <TableHeader>
          <TableTitle>Цены модулей в Конструкторе</TableTitle>
          <TableSubtitle>
            Конструктор — это набор нужных модулей без пакетной скидки. Ниже — актуальная стоимость каждого модуля.
          </TableSubtitle>
        </TableHeader>
        <PriceGrid>
          {constructorPrices.map(([name, value]) => (
            <PriceItem key={name}>
              <PriceName>{name}</PriceName>
              <PriceValue>{value}</PriceValue>
            </PriceItem>
          ))}
        </PriceGrid>
        <InlineNotes>
          <MiniCard>
            <MiniTitle>Базовая версия «Рисков по операциям»</MiniTitle>
            <MiniText>
              Доступна бесплатно и подключена автоматически всем клиентам Точки. Платной является только полная версия модуля — 1900 ₽ / месяц.
            </MiniText>
          </MiniCard>
          <MiniCard>
            <MiniTitle>Важно про скидки</MiniTitle>
            <MiniText>
              Скидка 30% относится только к годовому формату «Всё включено». В Конструкторе скидки за пакет нет — вы платите только за выбранные модули.
            </MiniText>
          </MiniCard>
        </InlineNotes>
      </ConstructorTable>

      <QuickConnect>
        <QuickText>
          <QuickLabel>Отдельное быстрое подключение</QuickLabel>
          <QuickTitle>Риски по самозанятым — как самостоятельный модуль</QuickTitle>
          <QuickDesc>
            Если сейчас вам важно только безопасно работать с самозанятыми, можно подключить этот модуль отдельно за 750 ₽ / месяц.
            Это не тариф, а отдельный продуктовый модуль внутри экосистемы «Рисков бизнеса».
          </QuickDesc>
        </QuickText>
        <Btn onClick={() => onCtaClick('Риски по самозанятым — быстрое подключение')}>Подключить модуль</Btn>
      </QuickConnect>

      <Note>
        Сначала выбираете, какие продуктовые модули нужны бизнесу. Потом — способ подключения: «Всё включено», «Всё включено на год» или Конструктор.
      </Note>
    </Container>
  </Section>
)

export default Formats
