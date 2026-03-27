import React from 'react'
import styled from 'styled-components'

interface ExpertHelpProps {
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
  max-width: 1100px;
  margin: 0 auto;
`

const Inner = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radius.xxxl};
  padding: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
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
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 1rem;
`

const SubText = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.75;
  margin-bottom: 1.5rem;
`

const FeatureList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 2rem;
`

const Feature = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray700};
  line-height: 1.5;
`

const FIcon = styled.span`
  width: 22px;
  height: 22px;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 800;
  margin-top: 2px;
`

const Btn = styled.button`
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

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ScenarioCard = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.25rem;
`

const ScTitle = styled.div`
  font-size: 0.88rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const ScText = styled.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.6;
`

const AssistantNote = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1rem 1.25rem;
`

const ANText = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  line-height: 1.6;
`

const scenarios = [
  {
    icon: '📨',
    title: 'Пришёл запрос документов от банка',
    text: 'Эксперт поможет разобраться, что именно запрашивают, какие документы нужно подготовить и как правильно ответить.',
  },
  {
    icon: '🚫',
    title: 'Операция заблокирована или отказано',
    text: 'Разберём ситуацию: что стало причиной, как подать обоснование, что делать дальше по 115-ФЗ.',
  },
  {
    icon: '🔴',
    title: 'Критичный уровень риска по счёту',
    text: 'Сигнал сервиса стал красным или фиолетовым — эксперт поможет разработать план действий.',
  },
]

const ExpertHelp: React.FC<ExpertHelpProps> = ({ onCtaClick }) => (
  <Section id="expert">
    <Container>
      <Inner>
        <Left>
          <Label>Экспертная помощь</Label>
          <Title>Комплаенс-эксперт и Комплаенс-ассистент</Title>
          <SubText>
            Сервис помогает видеть риски. Но иногда ситуация требует человека:
            когда пришёл запрос от банка, заблокировали операцию или не понятно, что делать с сигналом.
            Тогда подключается комплаенс-эксперт.
          </SubText>
          <FeatureList>
            <Feature>
              <FIcon>✓</FIcon>
              Помогает разобраться в конкретном сложном кейсе по 115-ФЗ
            </Feature>
            <Feature>
              <FIcon>✓</FIcon>
              Консультирует по подготовке документов и объяснений
            </Feature>
            <Feature>
              <FIcon>✓</FIcon>
              Работает в связке с данными сервиса — видит вашу картину
            </Feature>
            <Feature>
              <FIcon>✓</FIcon>
              Помогает при высоком и критичном уровне риска
            </Feature>
            <Feature>
              <FIcon>✓</FIcon>
              Комплаенс-ассистент — AI-помощник для первичных вопросов 24/7
            </Feature>
          </FeatureList>
          <Btn onClick={() => onCtaClick('Комплаенс-эксперт')}>
            Получить помощь эксперта
          </Btn>
        </Left>
        <Right>
          {scenarios.map((s) => (
            <ScenarioCard key={s.title}>
              <ScTitle>
                <span>{s.icon}</span>
                {s.title}
              </ScTitle>
              <ScText>{s.text}</ScText>
            </ScenarioCard>
          ))}
          <AssistantNote>
            <ANText>
              <strong>Комплаенс-ассистент</strong> — это AI-помощник внутри банка. Отвечает
              на вопросы по 115-ФЗ, помогает с первичной навигацией в сложной ситуации.
              Не заменяет живого эксперта, но помогает разобраться и понять, что делать дальше.
            </ANText>
          </AssistantNote>
        </Right>
      </Inner>
    </Container>
  </Section>
)

export default ExpertHelp
