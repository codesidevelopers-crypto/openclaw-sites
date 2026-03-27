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
  font-size: clamp(1.6rem, 2.6vw, 2.3rem);
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

const Accent = styled.div`
  background: ${({ theme }) => theme.colors.primaryLighter};
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1rem 1.1rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray800};
  line-height: 1.65;
  margin-bottom: 1.5rem;
`

const Features = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 1.5rem;
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
  font-weight: 700;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.15rem;
`

const FeatureDesc = styled.div`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`

const EcosystemCard = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1rem 1.1rem;
  margin-bottom: 1.5rem;
`

const EcosystemTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.5rem;
`

const EcosystemText = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.65;
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

const TopHint = styled.div`
  background: ${({ theme }) => theme.colors.primaryLighter};
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 0.8rem 0.95rem;
  font-size: 0.82rem;
  line-height: 1.55;
  margin-bottom: 1rem;
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
  gap: 1rem;
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
  white-space: nowrap;
`

const ResultSignals = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`

const Signal = styled.div`
  font-size: 0.79rem;
  color: ${({ theme }) => theme.colors.gray600};
  display: flex;
  gap: 0.4rem;
  line-height: 1.5;
`

const DynamicBlock = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 0.9rem 1rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray700};
  line-height: 1.6;
  margin-top: 0.4rem;
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
          <TopHint>
            Сначала проверить — потом платить. Сервис показывает сигналы риска ещё до отправки денег и помогает не пропустить тревожные изменения по партнёру.
          </TopHint>
          <ResultCard $risk="high">
            <ResultHeader>
              <div>
                <ResultName>ООО «Артём и Партнёры»</ResultName>
                <ResultInn>ИНН 7701234567 · ОГРН 1027700000000</ResultInn>
              </div>
              <RiskBadge $risk="high">Высокий риск</RiskBadge>
            </ResultHeader>
            <ResultSignals>
              <Signal>⚠️ У контрагента ухудшилась деловая репутация и появились новые негативные сигналы</Signal>
              <Signal>⚠️ Массовый адрес регистрации и частая смена учредителей</Signal>
              <Signal>⚠️ Есть исполнительные производства — лучше проверить до оплаты</Signal>
              <Signal>⚠️ Расширенная подсказка в платеже рекомендует запросить документы и отложить перевод</Signal>
            </ResultSignals>
          </ResultCard>
          <ResultCard $risk="medium">
            <ResultHeader>
              <div>
                <ResultName>ИП Смирнова Е.В.</ResultName>
                <ResultInn>ИНН 773456789012</ResultInn>
              </div>
              <RiskBadge $risk="medium">Динамический риск</RiskBadge>
            </ResultHeader>
            <ResultSignals>
              <Signal>💡 Профиль риска изменился за последнюю неделю</Signal>
              <Signal>💡 Рекомендуем проверить досье контрагента перед оплатой</Signal>
              <Signal>💡 Мониторинг продолжит отслеживать новые события без ограничений</Signal>
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
              <Signal>✓ Компания работает 8 лет, без тревожных изменений</Signal>
              <Signal>✓ Безлимитный мониторинг оставит компанию под наблюдением и предупредит, если профиль риска изменится</Signal>
            </ResultSignals>
          </ResultCard>
          <DynamicBlock>
            Риск контрагента меняется динамически. Сегодня партнёр может выглядеть безопасно, а завтра у него появится новый иск, блокировка, смена директора или производство в ФССП. Поэтому важны не только проверки, но и безлимитный мониторинг изменений.
          </DynamicBlock>
        </MockCard>
      </Left>
      <Right>
        <SectionLabel>Риски по контрагентам</SectionLabel>
        <Title>Лучше узнать о риске до перевода денег, а не после</Title>
        <Description>
          Модуль помогает проверять контрагентов до сделки, видеть негативные признаки и получать
          расширенные подсказки прямо в момент платежа. Это не просто разовая проверка по карточке компании,
          а постоянный мониторинг деловой репутации и изменений у партнёров.
        </Description>
        <Accent>
          Сценарий простой: сначала проверить — потом платить. Если у нового или тревожного контрагента
          меняется профиль риска, сервис предупредит заранее и подскажет следующий шаг.
        </Accent>
        <Features>
          {[
            { icon: '⚡', title: 'Проверка до платежа', desc: 'Расширенные подсказки прямо при создании платёжного поручения помогают заметить риск до отправки денег.' },
            { icon: '🔄', title: 'Безлимитный мониторинг', desc: 'Следите за изменениями без ограничений: новые иски, исполнительные производства, смена адреса, директора и другие сигналы.' },
            { icon: '∞', title: 'Безлимитные проверки', desc: 'Проверяйте любое количество компаний и ИП, когда подключаете новых партнёров или пересматриваете текущих.' },
            { icon: '🏷️', title: 'Деловая репутация', desc: 'Сервис собирает негативные признаки, чтобы вы могли оценить надёжность партнёра до сделки, а не после проблем.' },
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
        <EcosystemCard>
          <EcosystemTitle>Связь с соседними сервисами экосистемы</EcosystemTitle>
          <EcosystemText>
            В «Рисках по контрагентам» вы видите сигналы, мониторинг и подсказки в платеже. Если нужно копнуть глубже,
            можно перейти в «Проверку компании» и «Досье контрагента», чтобы изучить партнёра подробнее и собрать больше фактов до сделки.
          </EcosystemText>
        </EcosystemCard>
        <ConnectBtn onClick={() => onCtaClick('Риски по контрагентам')}>
          Подключить модуль
        </ConnectBtn>
      </Right>
    </Container>
  </Section>
)

export default CounterpartyDetail
