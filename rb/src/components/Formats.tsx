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

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const Label = styled.div`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.75rem;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray600};
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.7;
`

const ConceptNote = styled.div`
  background: ${({ theme }) => theme.colors.primaryLighter};
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.25rem 1.5rem;
  margin-bottom: 2.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray800};
  line-height: 1.7;
  text-align: center;
`

const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  align-items: start;

  @media (max-width: 900px) {
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
    transform: translateY(-3px);
    box-shadow: ${({ $featured, theme }) => $featured ? theme.shadow.purpleHover : theme.shadow.md};
  }
`

const PopularTag = styled.div`
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: #E8951A;
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.3rem 1rem;
  border-radius: 99px;
  white-space: nowrap;
`

const CardTitle = styled.h3<{ $featured?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.35rem;
  font-weight: 800;
  color: ${({ $featured }) => $featured ? 'white' : '#111118'};
  margin-bottom: 0.25rem;
`

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0.75rem 0;
`

const PriceVal = styled.div<{ $featured?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: 900;
  color: ${({ $featured }) => $featured ? 'white' : '#111118'};
  line-height: 1;
`

const PriceUnit = styled.span<{ $featured?: boolean }>`
  font-size: 0.85rem;
  color: ${({ $featured }) => $featured ? 'rgba(255,255,255,0.65)' : '#7A7A8F'};
`

const SaveTag = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  background: rgba(255,255,255,0.2);
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
`

const CardDesc = styled.p<{ $featured?: boolean }>`
  font-size: 0.88rem;
  color: ${({ $featured }) => $featured ? 'rgba(255,255,255,0.75)' : '#5A5A6F'};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`

const Divider = styled.div<{ $featured?: boolean }>`
  height: 1px;
  background: ${({ $featured }) => $featured ? 'rgba(255,255,255,0.15)' : '#E2E2EE'};
  margin-bottom: 1.25rem;
`

const IncludesList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-bottom: 1.75rem;
`

const IncludeItem = styled.li<{ $featured?: boolean }>`
  font-size: 0.85rem;
  color: ${({ $featured }) => $featured ? 'rgba(255,255,255,0.9)' : '#3A3A4F'};
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  line-height: 1.4;

  &::before {
    content: '✓';
    color: ${({ $featured }) => $featured ? '#A5F3FC' : '#0D9F6F'};
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
  }
`

const WarningBox = styled.div<{ $featured?: boolean }>`
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.55;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  margin-bottom: 1rem;
  background: ${({ $featured }) => $featured ? 'rgba(255,255,255,0.14)' : '#FEF3C7'};
  color: ${({ $featured }) => $featured ? 'rgba(255,255,255,0.85)' : '#92400E'};
`

const Btn = styled.button<{ $featured?: boolean }>`
  width: 100%;
  background: ${({ $featured, theme }) => $featured ? 'white' : theme.colors.primary};
  color: ${({ $featured, theme }) => $featured ? theme.colors.primary : 'white'};
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.875rem;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`

const ModuleTable = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xxl};
  overflow: hidden;
  margin-bottom: 1.5rem;
`

const TableHead = styled.div`
  padding: 1.5rem 1.5rem 0.875rem;
`

const TableHeadTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.4rem;
`

const TableHeadDesc = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`

const TableRows = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
`

const RowName = styled.span`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.gray800};
`

const RowPrice = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  white-space: nowrap;
`

const TableNotes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const NoteCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 1rem;
`

const NoteTitle = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.35rem;
`

const NoteText = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`

const SelfEmployedBlock = styled.div`
  background: ${({ theme }) => theme.colors.primaryLighter};
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const SelfTextBlock = styled.div``

const SelfLabel = styled.div`
  font-size: 0.72rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.4rem;
`

const SelfTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.4rem;
`

const SelfText = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.gray700};
  max-width: 600px;
  line-height: 1.6;
`

const SmBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.75rem 1.5rem;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  white-space: nowrap;
  transition: all 0.2s;
  box-shadow: ${({ theme }) => theme.shadow.purple};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`

const FootNote = styled.p`
  text-align: center;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.7;
  max-width: 640px;
  margin: 0 auto;
`

const constructorModules: [string, string][] = [
  ['Риски по операциям, полная версия', '1 900 ₽ / месяц'],
  ['Риски по контрагентам', '1 200 ₽ / месяц'],
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
      <Header>
        <Label>Форматы подключения</Label>
        <Title>Тарифы на всё или только нужное</Title>
        <Subtitle>
          Продуктовые модули и форматы подключения — разные вещи. Модули отвечают
          на «что получаю», формат — на «как покупаю». Выбирайте под свои задачи.
        </Subtitle>
      </Header>

      <ConceptNote>
        <strong>Важно понимать:</strong> Форматы подключения — это не продукты, а способы купить доступ к модулям.
        «Всё включено» и «Конструктор» — это тарифы. Продукты — это 8 модулей выше.
      </ConceptNote>

      <PriceGrid>
        <Card>
          <CardTitle>Всё включено</CardTitle>
          <PriceRow>
            <PriceVal>3 000 ₽</PriceVal>
            <PriceUnit>/ месяц</PriceUnit>
          </PriceRow>
          <CardDesc>
            Все 8 продуктовых модулей одной подпиской. Для тех, кто хочет
            видеть полную картину рисков без ручного подбора.
          </CardDesc>
          <Divider />
          <IncludesList>
            <IncludeItem>Все 8 продуктовых модулей</IncludeItem>
            <IncludeItem>Полная версия рисков по операциям</IncludeItem>
            <IncludeItem>Безлимитные проверки контрагентов</IncludeItem>
            <IncludeItem>Все 4 юридических и событийных модуля</IncludeItem>
            <IncludeItem>Самозанятые и признаки дробления</IncludeItem>
            <IncludeItem>Интеграции с банками и 1С</IncludeItem>
          </IncludesList>
          <Btn onClick={() => onCtaClick('Всё включено — Месяц')}>
            Подключить за 3 000 ₽/мес
          </Btn>
        </Card>

        <Card $featured style={{ marginTop: '-14px' }}>
          <PopularTag>★ Самый выгодный</PopularTag>
          <CardTitle $featured>Всё включено на год</CardTitle>
          <PriceRow>
            <PriceVal $featured>25 000 ₽</PriceVal>
            <PriceUnit $featured>/ год</PriceUnit>
            <SaveTag>Скидка 30%</SaveTag>
          </PriceRow>
          <CardDesc $featured>
            Тот же формат «Всё включено», но при оплате за год. Те же 8 модулей — экономия 11 000 ₽.
          </CardDesc>
          <Divider $featured />
          <IncludesList>
            <IncludeItem $featured>Те же 8 модулей, что в месячном тарифе</IncludeItem>
            <IncludeItem $featured>Полная версия операций и все интеграции</IncludeItem>
            <IncludeItem $featured>Безлимитный мониторинг контрагентов</IncludeItem>
            <IncludeItem $featured>Юридические уведомления, самозанятые, дробление</IncludeItem>
            <IncludeItem $featured>Скидка 30% — только при годовой оплате</IncludeItem>
          </IncludesList>
          <Btn $featured onClick={() => onCtaClick('Всё включено — Год')}>
            Подключить за 25 000 ₽/год
          </Btn>
        </Card>

        <Card>
          <CardTitle>Конструктор</CardTitle>
          <PriceRow>
            <PriceVal>по модулям</PriceVal>
          </PriceRow>
          <CardDesc>
            Платите только за нужные модули. Цена = сумма выбранных сервисов.
            Пакетной скидки нет — это принцип Конструктора.
          </CardDesc>
          <WarningBox>
            У Конструктора нет пакетной скидки. Скидка 30% — только в формате «Всё включено на год». В Конструкторе вы платите сумму выбранных модулей.
          </WarningBox>
          <Divider />
          <IncludesList>
            <IncludeItem>Любая комбинация из 8 модулей</IncludeItem>
            <IncludeItem>Риски по самозанятым — доступен отдельно</IncludeItem>
            <IncludeItem>Добавляете новые модули — возможно досписание</IncludeItem>
            <IncludeItem>Подходит для точечного закрытия задач</IncludeItem>
          </IncludesList>
          <Btn onClick={() => onCtaClick('Конструктор')}>Собрать свой набор</Btn>
        </Card>
      </PriceGrid>

      <ModuleTable>
        <TableHead>
          <TableHeadTitle>Цены модулей в Конструкторе</TableHeadTitle>
          <TableHeadDesc>
            Выбираете нужные модули — платите их сумму. Пакетной скидки нет.
          </TableHeadDesc>
        </TableHead>
        <TableRows>
          {constructorModules.map(([name, price]) => (
            <TableRow key={name}>
              <RowName>{name}</RowName>
              <RowPrice>{price}</RowPrice>
            </TableRow>
          ))}
        </TableRows>
        <TableNotes>
          <NoteCard>
            <NoteTitle>Базовая версия операций — бесплатно</NoteTitle>
            <NoteText>
              Базовая версия «Рисков по операциям» подключена всем клиентам Точки автоматически и бесплатно.
              Полная версия — 1 900 ₽/мес.
            </NoteText>
          </NoteCard>
          <NoteCard>
            <NoteTitle>Скидки только в «Всё включено на год»</NoteTitle>
            <NoteText>
              Скидка 30% относится исключительно к годовому формату «Всё включено».
              В Конструкторе скидок за пакет не предусмотрено.
            </NoteText>
          </NoteCard>
        </TableNotes>
      </ModuleTable>

      <SelfEmployedBlock>
        <SelfTextBlock>
          <SelfLabel>Быстрое отдельное подключение</SelfLabel>
          <SelfTitle>Риски по самозанятым — как самостоятельный модуль</SelfTitle>
          <SelfText>
            Нужен только этот модуль прямо сейчас? Подключите его отдельно за 750 ₽/мес.
            Это продуктовый модуль, не тариф — он входит и в Конструктор, и в «Всё включено».
          </SelfText>
        </SelfTextBlock>
        <SmBtn onClick={() => onCtaClick('Самозанятые — быстрое подключение')}>
          Подключить модуль
        </SmBtn>
      </SelfEmployedBlock>

      <FootNote>
        Сначала определитесь, какие задачи нужно решить. Потом выберите формат: если нужна
        полная защита — «Всё включено». Если конкретные зоны риска — Конструктор.
      </FootNote>
    </Container>
  </Section>
)

export default Formats
