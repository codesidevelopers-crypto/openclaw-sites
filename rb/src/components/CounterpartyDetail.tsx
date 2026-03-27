import React from 'react'
import styled from 'styled-components'

interface CounterpartyDetailProps {
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`

const Left = styled.div``

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
  margin-bottom: 1rem;
`

const SubText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.75;
  margin-bottom: 1.5rem;
`

const FeatureList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 2rem;
`

const Feature = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray700};
  line-height: 1.5;
`

const FeatureIcon = styled.span`
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 800;
  margin-top: 1px;
`

const ScenarioBox = styled.div`
  background: ${({ theme }) => theme.colors.primaryLighter};
  border: 1.5px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.25rem;
  margin-bottom: 1.5rem;
`

const ScenarioLabel = styled.div`
  font-size: 0.72rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
`

const ScenarioText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray800};
  line-height: 1.65;
`

const EcoServices = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.25rem;
  margin-bottom: 2rem;
`

const EcoTitle = styled.div`
  font-size: 0.82rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray500};
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 0.75rem;
`

const EcoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.gray700};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`

const EcoArrow = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.75rem;
  margin-left: auto;
`

const PrimaryBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.875rem 2rem;
  font-size: 0.95rem;
  font-weight: 600;
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
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 1.5rem;
  overflow: hidden;
`

const SearchRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`

const SearchInput = styled.div`
  flex: 1;
  background: white;
  border: 1.5px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.6rem 0.875rem;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.gray500};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const SearchBtn = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.6rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
`

const ResultCard = styled.div<{ $riskLevel: 'ok' | 'warn' | 'danger' }>`
  background: white;
  border: 1px solid ${({ $riskLevel }) =>
    $riskLevel === 'ok' ? '#BBF7D0' :
    $riskLevel === 'warn' ? '#FDE68A' :
    '#FECACA'};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.1rem;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const ResultName = styled.div`
  font-size: 0.88rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
`

const RiskBadge = styled.span<{ $level: 'ok' | 'warn' | 'danger' }>`
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.65rem;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ $level, theme }) =>
    $level === 'ok' ? theme.colors.greenLight :
    $level === 'warn' ? theme.colors.yellowLight :
    theme.colors.redLight};
  color: ${({ $level, theme }) =>
    $level === 'ok' ? theme.colors.green :
    $level === 'warn' ? theme.colors.yellow :
    theme.colors.red};
`

const ResultTags = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`

const Tag = styled.span<{ $type: 'ok' | 'warn' | 'bad' }>`
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ $type, theme }) =>
    $type === 'ok' ? theme.colors.greenLight :
    $type === 'warn' ? theme.colors.yellowLight :
    theme.colors.redLight};
  color: ${({ $type, theme }) =>
    $type === 'ok' ? theme.colors.green :
    $type === 'warn' ? theme.colors.yellow :
    theme.colors.red};
`

const MonitorNote = styled.div`
  margin-top: 1rem;
  background: ${({ theme }) => theme.colors.primaryLighter};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 0.75rem 1rem;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.gray700};
  line-height: 1.5;
`

const CounterpartyDetail: React.FC<CounterpartyDetailProps> = ({ onCtaClick }) => (
  <Section id="counterparty">
    <Container>
      <Left>
        <Label>Риски по контрагентам</Label>
        <Title>Проверяйте партнёров до отправки денег</Title>
        <SubText>
          Безлимитные проверки и постоянный мониторинг изменений — всё внутри
          вашего интернет-банка. Сервис сигнализирует при создании платежа, если
          контрагент вызывает вопросы.
        </SubText>

        <FeatureList>
          <Feature>
            <FeatureIcon>∞</FeatureIcon>
            Безлимитные проверки — без ограничений по количеству запросов
          </Feature>
          <Feature>
            <FeatureIcon>🔔</FeatureIcon>
            Мониторинг изменений по контрагентам — уведомления при смене статуса
          </Feature>
          <Feature>
            <FeatureIcon>⚠️</FeatureIcon>
            Негативные индикаторы: долги ФССП, ликвидация, массовый директор/адрес
          </Feature>
          <Feature>
            <FeatureIcon>💳</FeatureIcon>
            Расширенные подсказки в платежах — сигнал появляется до отправки
          </Feature>
          <Feature>
            <FeatureIcon>📋</FeatureIcon>
            Загрузка документов и комментарии к контрагентам
          </Feature>
          <Feature>
            <FeatureIcon>🔍</FeatureIcon>
            Проверка по ИНН, ОГРН, названию — быстро и бесплатно
          </Feature>
        </FeatureList>

        <ScenarioBox>
          <ScenarioLabel>Сценарий: перед оплатой</ScenarioLabel>
          <ScenarioText>
            Вы создаёте платёж контрагенту — сервис автоматически проверяет его
            и показывает сигнал прямо в форме платежа. Если есть вопросы, вы видите
            это до нажатия «Отправить». Документы можно приложить сразу.
          </ScenarioText>
        </ScenarioBox>

        <EcoServices>
          <EcoTitle>Связанные сервисы экосистемы</EcoTitle>
          <EcoItem>
            <span>🏢</span>
            <span>Проверка компании — детальный отчёт по любому контрагенту</span>
            <EcoArrow>→</EcoArrow>
          </EcoItem>
          <EcoItem>
            <span>📁</span>
            <span>Досье контрагента — полная история и документы</span>
            <EcoArrow>→</EcoArrow>
          </EcoItem>
        </EcoServices>

        <PrimaryBtn onClick={() => onCtaClick('Риски по контрагентам — подключить')}>
          Подключить за 1 200 ₽/мес
        </PrimaryBtn>
      </Left>
      <Right>
        <MockCard>
          <SearchRow>
            <SearchInput>🔍 Найти контрагента по ИНН или названию...</SearchInput>
            <SearchBtn>Проверить</SearchBtn>
          </SearchRow>
          <ResultCard $riskLevel="ok">
            <ResultHeader>
              <ResultName>ООО «Строймастер»</ResultName>
              <RiskBadge $level="ok">Низкий риск</RiskBadge>
            </ResultHeader>
            <ResultTags>
              <Tag $type="ok">ИНН верифицирован</Tag>
              <Tag $type="ok">Налоги в норме</Tag>
              <Tag $type="ok">Нет долгов ФССП</Tag>
              <Tag $type="ok">Активен 8 лет</Tag>
            </ResultTags>
          </ResultCard>
          <ResultCard $riskLevel="warn">
            <ResultHeader>
              <ResultName>ООО «Техснаб»</ResultName>
              <RiskBadge $level="warn">Средний риск</RiskBadge>
            </ResultHeader>
            <ResultTags>
              <Tag $type="warn">Задержка отчётности</Tag>
              <Tag $type="bad">Долг ФССП 120 000 ₽</Tag>
              <Tag $type="ok">ИНН верифицирован</Tag>
            </ResultTags>
          </ResultCard>
          <ResultCard $riskLevel="danger">
            <ResultHeader>
              <ResultName>ООО «Промбытсервис»</ResultName>
              <RiskBadge $level="danger">Высокий риск</RiskBadge>
            </ResultHeader>
            <ResultTags>
              <Tag $type="bad">Массовый директор</Tag>
              <Tag $type="bad">Массовый адрес</Tag>
              <Tag $type="bad">Нет сотрудников</Tag>
              <Tag $type="warn">Ликвидируется</Tag>
            </ResultTags>
          </ResultCard>
          <MonitorNote>
            🔔 Мониторинг включён для 142 контрагентов. При изменении статуса
            вы получите уведомление.
          </MonitorNote>
        </MockCard>
      </Right>
    </Container>
  </Section>
)

export default CounterpartyDetail
