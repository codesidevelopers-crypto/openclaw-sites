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
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
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
  font-size: clamp(1.5rem, 2.5vw, 2.25rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 1rem;
`

const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray700};
  line-height: 1.7;
  margin-bottom: 2rem;
`

const VersionsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`

const VersionCard = styled.div<{ $featured?: boolean }>`
  background: ${({ $featured, theme }) => $featured ? theme.colors.primary : 'white'};
  color: ${({ $featured, theme }) => $featured ? 'white' : theme.colors.gray900};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 1.25rem;
  border: 1.5px solid ${({ $featured, theme }) => $featured ? theme.colors.primary : theme.colors.gray200};
`

const VersionTitle = styled.div<{ $featured?: boolean }>`
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: inherit;
`

const VersionList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const VersionItem = styled.li<{ $featured?: boolean }>`
  font-size: 0.8rem;
  color: ${({ $featured, theme }) => $featured ? 'rgba(255,255,255,0.85)' : theme.colors.gray600};
  display: flex;
  gap: 0.4rem;
  align-items: flex-start;

  &::before {
    content: '•';
    color: ${({ $featured, theme }) => $featured ? 'rgba(255,255,255,0.6)' : theme.colors.primary};
    flex-shrink: 0;
  }
`

const ConnectBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.875rem 2rem;
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
`

const MockTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 1.25rem;
`

const RiskLevel = styled.div`
  margin-bottom: 1.25rem;
`

const RiskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`

const RiskLabel = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray600};
`

const RiskValue = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.green};
`

const Bar = styled.div`
  height: 10px;
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: 99px;
  overflow: hidden;
`

const BarFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $color }) => $color};
  border-radius: 99px;
`

const FactorsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`

const Factor = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: ${({ theme }) => theme.radius.md};
`

const FactorName = styled.span`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.colors.gray800};
`

const FactorBadge = styled.span<{ $ok: boolean }>`
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
  background: ${({ $ok, theme }) => $ok ? theme.colors.greenLight : theme.colors.yellowLight};
  color: ${({ $ok, theme }) => $ok ? theme.colors.green : theme.colors.yellow};
`

const Hint = styled.div`
  background: ${({ theme }) => theme.colors.primaryLighter};
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.875rem 1rem;
  font-size: 0.825rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  line-height: 1.5;
`

const OperationsDetail: React.FC<OperationsDetailProps> = ({ onCtaClick }) => (
  <Section id="operations">
    <Container>
      <Left>
        <SectionLabel>Риски по операциям</SectionLabel>
        <Title>Видьте риск по каждой операции — до того, как провели платёж</Title>
        <Description>
          Сервис анализирует структуру ваших операций и показывает, что влияет
          на уровень риска по 115-ФЗ. Загружайте документы из любого банка —
          налоговая нагрузка учитывается в полном объёме.
        </Description>
        <VersionsRow>
          <VersionCard>
            <VersionTitle>Базовая — бесплатно</VersionTitle>
            <VersionList>
              <VersionItem>Общий уровень риска по счёту</VersionItem>
              <VersionItem>Счётчик до следующего уровня риска</VersionItem>
              <VersionItem>Уведомления об изменении риска</VersionItem>
              <VersionItem>Задача в интернет-банке при росте риска</VersionItem>
              <VersionItem>Загрузка налоговых документов</VersionItem>
            </VersionList>
          </VersionCard>
          <VersionCard $featured>
            <VersionTitle $featured>Полная версия</VersionTitle>
            <VersionList>
              <VersionItem $featured>Риски по типам операций</VersionItem>
              <VersionItem $featured>Предупреждения до платежа</VersionItem>
              <VersionItem $featured>Загрузка документов из других банков</VersionItem>
              <VersionItem $featured>Интеграция 1С:Бухгалтерия и 1С:УНФ</VersionItem>
              <VersionItem $featured>Подробные рекомендации</VersionItem>
            </VersionList>
          </VersionCard>
        </VersionsRow>
        <ConnectBtn onClick={() => onCtaClick('Риски по операциям')}>
          Подключить →
        </ConnectBtn>
      </Left>
      <Right>
        <MockCard>
          <MockTitle>Уровень риска по операциям</MockTitle>
          <RiskLevel>
            <RiskHeader>
              <RiskLabel>Общий уровень</RiskLabel>
              <RiskValue>23% — Низкий</RiskValue>
            </RiskHeader>
            <Bar>
              <BarFill $pct={23} $color="#10B981" />
            </Bar>
          </RiskLevel>
          <FactorsList>
            <Factor>
              <FactorName>Снятие наличных</FactorName>
              <FactorBadge $ok>Норма</FactorBadge>
            </Factor>
            <Factor>
              <FactorName>Платежи физическим лицам</FactorName>
              <FactorBadge $ok={false}>Обратить внимание</FactorBadge>
            </Factor>
            <Factor>
              <FactorName>Налоговая нагрузка</FactorName>
              <FactorBadge $ok>Норма</FactorBadge>
            </Factor>
            <Factor>
              <FactorName>Транзитные операции</FactorName>
              <FactorBadge $ok>Норма</FactorBadge>
            </Factor>
          </FactorsList>
          <Hint>
            💡 До повышения риска остаётся 77 пунктов. Рекомендуем
            добавить документы по платежам физлицам, чтобы снизить риск.
          </Hint>
        </MockCard>
      </Right>
    </Container>
  </Section>
)

export default OperationsDetail
