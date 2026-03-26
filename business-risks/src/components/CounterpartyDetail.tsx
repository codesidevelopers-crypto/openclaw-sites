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
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const Right = styled.div``
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

const Features = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 2rem;
`

const Feature = styled.li`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
`

const FeatureIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
`

const FeatureText = styled.div``

const FeatureTitle = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.15rem;
`

const FeatureDesc = styled.div`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.colors.gray600};
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

const MockCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow.xl};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.gray50};
  border: 1.5px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.75rem 1rem;
  margin-bottom: 1.25rem;
`

const SearchText = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray500};
  flex: 1;
`

const SearchBtn = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  background: ${({ theme }) => theme.colors.primary};
  padding: 0.35rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.sm};
`

const ResultCard = styled.div<{ $risk: 'low' | 'medium' | 'high' }>`
  border: 1.5px solid ${({ $risk, theme }) =>
    $risk === 'low' ? theme.colors.greenLight :
    $risk === 'medium' ? theme.colors.warningLight :
    theme.colors.dangerLight};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 1.25rem;
  margin-bottom: 0.75rem;
`

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`

const ResultName = styled.div`
  font-weight: 700;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray900};
`

const ResultInn = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray500};
`

const RiskBadge = styled.span<{ $risk: 'low' | 'medium' | 'high' }>`
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
  background: ${({ $risk, theme }) =>
    $risk === 'low' ? theme.colors.greenLight :
    $risk === 'medium' ? theme.colors.warningLight :
    theme.colors.dangerLight};
  color: ${({ $risk, theme }) =>
    $risk === 'low' ? theme.colors.green :
    $risk === 'medium' ? theme.colors.warning :
    theme.colors.danger};
`

const ResultSignals = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

const Signal = styled.div`
  font-size: 0.775rem;
  color: ${({ theme }) => theme.colors.gray600};
  display: flex;
  gap: 0.4rem;
`

const CounterpartyDetail: React.FC<CounterpartyDetailProps> = ({ onCtaClick }) => (
  <Section id="counterparties">
    <Container>
      <Left>
        <MockCard>
          <SearchBar>
            <span style={{ color: '#9CA3AF' }}>🔍</span>
            <SearchText>ИНН, ОГРН или название компании</SearchText>
            <SearchBtn>Проверить</SearchBtn>
          </SearchBar>
          <ResultCard $risk="high">
            <ResultHeader>
              <div>
                <ResultName>ООО «Артём и Партнёры»</ResultName>
                <ResultInn>ИНН 7701234567 · ОГРН 1027700000000</ResultInn>
              </div>
              <RiskBadge $risk="high">Высокий риск</RiskBadge>
            </ResultHeader>
            <ResultSignals>
              <Signal>⚠️ Компания в списке ненадёжных контрагентов</Signal>
              <Signal>⚠️ Массовый адрес регистрации</Signal>
              <Signal>⚠️ Частая смена учредителей</Signal>
            </ResultSignals>
          </ResultCard>
          <ResultCard $risk="medium">
            <ResultHeader>
              <div>
                <ResultName>ИП Смирнова Е.В.</ResultName>
                <ResultInn>ИНН 773456789012</ResultInn>
              </div>
              <RiskBadge $risk="medium">Средний риск</RiskBadge>
            </ResultHeader>
            <ResultSignals>
              <Signal>💡 Зарегистрирована менее 1 года назад</Signal>
              <Signal>💡 Рекомендуем запросить документы</Signal>
            </ResultSignals>
          </ResultCard>
          <ResultCard $risk="low">
            <ResultHeader>
              <div>
                <ResultName>ООО «Технологии Будущего»</ResultName>
                <ResultInn>ИНН 7709876543</ResultInn>
              </div>
              <RiskBadge $risk="low">Низкий риск</RiskBadge>
            </ResultHeader>
            <ResultSignals>
              <Signal>✓ Работает 8 лет, нет нарушений</Signal>
            </ResultSignals>
          </ResultCard>
        </MockCard>
      </Left>
      <Right>
        <SectionLabel>Риски по контрагентам</SectionLabel>
        <Title>Проверяйте партнёров до того, как отправили деньги</Title>
        <Description>
          Видьте сигналы риска в момент платежа — не после его проведения.
          Безлимитные проверки, мониторинг изменений и история — всё это
          помогает выстраивать безопасные деловые отношения.
        </Description>
        <Features>
          {[
            { icon: '⚡', title: 'Проверка до платежа', desc: 'Расширенные подсказки прямо при создании платёжного поручения' },
            { icon: '🔄', title: 'Мониторинг изменений', desc: 'Уведомления, если что-то поменялось у ваших контрагентов' },
            { icon: '∞', title: 'Безлимитные проверки', desc: 'Проверяйте любое количество компаний без ограничений' },
            { icon: '📜', title: 'История изменений', desc: 'Полная хронология всех изменений по каждому контрагенту' },
          ].map(f => (
            <Feature key={f.title}>
              <FeatureIcon>{f.icon}</FeatureIcon>
              <FeatureText>
                <FeatureTitle>{f.title}</FeatureTitle>
                <FeatureDesc>{f.desc}</FeatureDesc>
              </FeatureText>
            </Feature>
          ))}
        </Features>
        <ConnectBtn onClick={() => onCtaClick('Риски по контрагентам')}>
          Подключить →
        </ConnectBtn>
      </Right>
    </Container>
  </Section>
)

export default CounterpartyDetail
