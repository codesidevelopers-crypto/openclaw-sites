import React from 'react'
import styled from 'styled-components'

interface OperationsDetailProps {
  onCtaClick: (source: string) => void
}

const Section = styled.section`
  padding: 5rem 2rem;
  background: ${({ theme }) => theme.colors.primaryLighter};

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`

const Left = styled.div``

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
  font-size: clamp(1.75rem, 3vw, 2.4rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 1rem;
`

const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray700};
  line-height: 1.75;
  margin-bottom: 1.5rem;
`

const Insight = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray800};
  line-height: 1.65;
`

const Compare = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const VersionCard = styled.div<{ $featured?: boolean }>`
  background: ${({ $featured, theme }) => $featured ? theme.colors.primary : 'white'};
  color: ${({ $featured, theme }) => $featured ? 'white' : theme.colors.gray900};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.25rem;
  border: 1.5px solid ${({ $featured, theme }) => $featured ? theme.colors.primary : theme.colors.gray200};
`

const VersionTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.05rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
`

const VersionLead = styled.p<{ $featured?: boolean }>`
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 0.9rem;
  color: ${({ $featured, theme }) => $featured ? 'rgba(255,255,255,0.88)' : theme.colors.gray600};
`

const VersionList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`

const VersionItem = styled.li<{ $featured?: boolean }>`
  font-size: 0.82rem;
  line-height: 1.55;
  color: ${({ $featured, theme }) => $featured ? 'rgba(255,255,255,0.88)' : theme.colors.gray700};
  display: flex;
  gap: 0.5rem;

  &::before {
    content: '•';
    color: ${({ $featured, theme }) => $featured ? '#C4B5FD' : theme.colors.primary};
    font-weight: 700;
  }
`

const WhyBlock = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
`

const WhyTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.05rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.8rem;
`

const ReasonList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const ReasonCard = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 0.9rem 1rem;
`

const ReasonName = styled.div`
  font-size: 0.88rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.35rem;
`

const ReasonText = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.55;
`

const GridCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.75rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const InfoCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.1rem 1.15rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
`

const InfoTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.5rem;
`

const InfoList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const InfoItem = styled.li`
  font-size: 0.83rem;
  color: ${({ theme }) => theme.colors.gray700};
  line-height: 1.55;
  display: flex;
  gap: 0.45rem;

  &::before {
    content: '→';
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }
`

const ConnectBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.95rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  box-shadow: ${({ theme }) => theme.shadow.purple};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`

const Right = styled.div``

const MockCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow.xl};
  position: sticky;
  top: 96px;

  @media (max-width: 968px) {
    position: static;
  }
`

const MockTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 800;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 1rem;
`

const MainMetric = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1rem;
  margin-bottom: 1rem;
`

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`

const MetricLabel = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray600};
`

const MetricValue = styled.span`
  font-size: 0.82rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.yellow};
`

const Bar = styled.div`
  height: 10px;
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 0.65rem;
`

const BarFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $color }) => $color};
  border-radius: 99px;
`

const MetaText = styled.div`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.5;
`

const PurpleTask = styled.div`
  background: linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%);
  color: white;
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1rem 1.1rem;
  margin-bottom: 1rem;
`

const PurpleLabel = styled.div`
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.8;
  margin-bottom: 0.35rem;
`

const PurpleText = styled.div`
  font-size: 0.85rem;
  line-height: 1.55;
`

const Pane = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xl};
  overflow: hidden;
  margin-bottom: 1rem;
`

const PaneHeader = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  padding: 0.85rem 1rem;
  font-size: 0.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
`

const PaneBody = styled.div`
  padding: 0.9rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`

const LineName = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray700};
`

const Badge = styled.span<{ $tone: 'green' | 'yellow' | 'red' | 'violet' }>`
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.24rem 0.6rem;
  border-radius: 999px;
  background: ${({ $tone }) =>
    $tone === 'green' ? '#DCFCE7' :
    $tone === 'yellow' ? '#FEF3C7' :
    $tone === 'red' ? '#FEE2E2' : '#EDE9FE'};
  color: ${({ $tone }) =>
    $tone === 'green' ? '#15803D' :
    $tone === 'yellow' ? '#B45309' :
    $tone === 'red' ? '#B91C1C' : '#6D28D9'};
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`

const ActionCard = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 0.85rem;
`

const ActionTitle = styled.div`
  font-size: 0.78rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.25rem;
`

const ActionText = styled.div`
  font-size: 0.76rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.5;
`

const OperationsDetail: React.FC<OperationsDetailProps> = ({ onCtaClick }) => (
  <Section id="operations">
    <Container>
      <Left>
        <SectionLabel>Риски по операциям</SectionLabel>
        <Title>Не просто видеть риск, а понимать, что делать дальше</Title>
        <Description>
          Это один из центральных модулей «Рисков бизнеса». Он показывает общий уровень риска,
          подсвечивает факторы по типам операций, предупреждает прямо в момент платежа и помогает
          действовать заранее: отправить документы, скорректировать сценарий оплаты, учесть налоги
          из другого банка или посмотреть рекомендации по безопасной работе.
        </Description>
        <Insight>
          Базовая версия помогает держать под контролем общий риск и загрузку документов.
          Полная версия даёт рабочую механику: подсказки до платежа, уровни риска по типам операций,
          сколько осталось до следующего уровня риска, историю изменений, рекомендации и интеграции
          с другими банками и 1С.
        </Insight>

        <Compare>
          <VersionCard>
            <VersionTitle>Базовая версия — бесплатно</VersionTitle>
            <VersionLead>
              Подключена автоматически. Помогает увидеть общий уровень риска и быстро отреагировать,
              если сервис просит документы.
            </VersionLead>
            <VersionList>
              <VersionItem>Общий уровень риска по счёту</VersionItem>
              <VersionItem>Уведомления об изменении общего риска</VersionItem>
              <VersionItem>Фиолетовая задача в интернет-банке при высоком или критичном риске</VersionItem>
              <VersionItem>Загрузка документов по налогам</VersionItem>
              <VersionItem>Загрузка документов по другим операциям</VersionItem>
            </VersionList>
          </VersionCard>
          <VersionCard $featured>
            <VersionTitle>Полная версия — 1900 ₽ / месяц</VersionTitle>
            <VersionLead $featured>
              Для тех, кому важно не разбираться постфактум, а получать подсказки в рабочем процессе
              и видеть более точную картину риска по каждому типу операций.
            </VersionLead>
            <VersionList>
              <VersionItem $featured>Всё из базовой версии</VersionItem>
              <VersionItem $featured>Предупреждения и подсказки в момент платежа</VersionItem>
              <VersionItem $featured>Уровни риска по типам операций</VersionItem>
              <VersionItem $featured>Счётчик «сколько осталось до следующего уровня риска»</VersionItem>
              <VersionItem $featured>Подробные рекомендации и больше деталей по параметрам риска</VersionItem>
              <VersionItem $featured>Интеграции с Т-Банком, Альфа Банком и Модульбанком</VersionItem>
              <VersionItem $featured>Интеграция в 1С:Бухгалтерия предприятия и 1С:УНФ</VersionItem>
            </VersionList>
          </VersionCard>
        </Compare>

        <WhyBlock>
          <WhyTitle>Из-за чего обычно растёт риск</WhyTitle>
          <ReasonList>
            <ReasonCard>
              <ReasonName>Низкая налоговая нагрузка</ReasonName>
              <ReasonText>Если налоги платятся в другом банке, сервис подскажет загрузить документы или подключить интеграцию, чтобы учесть их корректно.</ReasonText>
            </ReasonCard>
            <ReasonCard>
              <ReasonName>Переводы физлицам и ИП</ReasonName>
              <ReasonText>Сервис заранее подсвечивает зону внимания, если сценарий расчётов становится чувствительным для банковской логики.</ReasonText>
            </ReasonCard>
            <ReasonCard>
              <ReasonName>Торговля без закупки и нетипичные операции</ReasonName>
              <ReasonText>Помогает увидеть сценарии, которые выбиваются из привычного профиля бизнеса и требуют пояснений или документов.</ReasonText>
            </ReasonCard>
            <ReasonCard>
              <ReasonName>Разрыв НДС и признаки дробления</ReasonName>
              <ReasonText>Показывает дополнительные сигналы внимания, чтобы можно было скорректировать действия до серьёзных последствий.</ReasonText>
            </ReasonCard>
          </ReasonList>
        </WhyBlock>

        <GridCards>
          <InfoCard>
            <InfoTitle>Что помогает сделать сервис</InfoTitle>
            <InfoList>
              <InfoItem>Понять, какие факторы влияют на общий риск и на риск по отдельным типам операций</InfoItem>
              <InfoItem>Получить подсказку прямо в момент платежа, пока деньги ещё не отправлены</InfoItem>
              <InfoItem>Загрузить документы по налогам и по другим операциям отдельными сценариями</InfoItem>
              <InfoItem>Посмотреть историю изменений и увидеть, что именно стало триггером</InfoItem>
            </InfoList>
          </InfoCard>
          <InfoCard>
            <InfoTitle>Рабочий контур и интеграции</InfoTitle>
            <InfoList>
              <InfoItem>Учёт налоговой нагрузки через Т-Банк, Альфа Банк и Модульбанк</InfoItem>
              <InfoItem>Интеграция в 1С:Бухгалтерия предприятия и 1С:УНФ через расширение 1С</InfoItem>
              <InfoItem>Отраслевые рекомендации и правила безопасной работы</InfoItem>
              <InfoItem>Параметры внимания: нетипичные операции, оптимизация налогов, торговля без закупки, разрыв НДС</InfoItem>
            </InfoList>
          </InfoCard>
        </GridCards>

        <ConnectBtn onClick={() => onCtaClick('Риски по операциям')}>
          Подключить полную версию
        </ConnectBtn>
      </Left>
      <Right>
        <MockCard>
          <MockTitle>Что видно на экране сервиса сразу</MockTitle>
          <MainMetric>
            <MetricRow>
              <MetricLabel>Общий уровень риска</MetricLabel>
              <MetricValue>61% — Средний</MetricValue>
            </MetricRow>
            <Bar>
              <BarFill $pct={61} $color="#F59E0B" />
            </Bar>
            <MetaText>До следующего уровня риска осталось 9 п. — сервис подсказывает, на что обратить внимание сейчас.</MetaText>
          </MainMetric>

          <PurpleTask>
            <PurpleLabel>Фиолетовая задача</PurpleLabel>
            <PurpleText>
              Загрузите документы по налогам из другого банка, чтобы уточнить расчёт риска и снять часть сигналов внимания.
            </PurpleText>
          </PurpleTask>

          <Pane>
            <PaneHeader>Подсказки в момент платежа</PaneHeader>
            <PaneBody>
              <Line>
                <LineName>Платёж новому контрагенту на физлицо</LineName>
                <Badge $tone="yellow">Нужна проверка</Badge>
              </Line>
              <Line>
                <LineName>Нетипичная операция для вашего профиля</LineName>
                <Badge $tone="violet">Подсказка</Badge>
              </Line>
              <Line>
                <LineName>Документы по этой операции ещё не загружены</LineName>
                <Badge $tone="red">Отправить документы</Badge>
              </Line>
            </PaneBody>
          </Pane>

          <Pane>
            <PaneHeader>Факторы риска и история изменений</PaneHeader>
            <PaneBody>
              <Line>
                <LineName>Налоговая нагрузка учтена не полностью</LineName>
                <Badge $tone="yellow">Внимание</Badge>
              </Line>
              <Line>
                <LineName>Разрыв НДС</LineName>
                <Badge $tone="yellow">Новый параметр</Badge>
              </Line>
              <Line>
                <LineName>Торговля без закупки</LineName>
                <Badge $tone="yellow">Проверить</Badge>
              </Line>
              <Line>
                <LineName>Нетипичные операции</LineName>
                <Badge $tone="violet">Анализ</Badge>
              </Line>
              <Line>
                <LineName>Оптимизация налогов</LineName>
                <Badge $tone="yellow">Сигнал</Badge>
              </Line>
            </PaneBody>
          </Pane>

          <Actions>
            <ActionCard>
              <ActionTitle>Документы по налогам</ActionTitle>
              <ActionText>Загрузить вручную или подключить интеграцию с другим банком.</ActionText>
            </ActionCard>
            <ActionCard>
              <ActionTitle>Документы по другим операциям</ActionTitle>
              <ActionText>Отправить подтверждение по конкретной операции без ожидания запроса.</ActionText>
            </ActionCard>
            <ActionCard>
              <ActionTitle>Интеграция с 1С</ActionTitle>
              <ActionText>Видеть показатели риска в 1С:Бухгалтерия предприятия и 1С:УНФ.</ActionText>
            </ActionCard>
            <ActionCard>
              <ActionTitle>Рекомендации</ActionTitle>
              <ActionText>Правила безопасной работы и отраслевые советы, чтобы снизить риск.</ActionText>
            </ActionCard>
          </Actions>
        </MockCard>
      </Right>
    </Container>
  </Section>
)

export default OperationsDetail
