import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`

interface Question {
  id: number
  text: string
  options: QuizOption[]
  riskOptions: string[]
}

interface QuizOption {
  label: string
  value: string
  isRisk: boolean
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Ваш бизнес работает более 3 лет?',
    options: [
      { label: 'Да', value: 'yes', isRisk: false },
      { label: 'Нет', value: 'no', isRisk: true },
    ],
    riskOptions: ['no'],
  },
  {
    id: 2,
    text: 'У вас есть финансовая подушка (запас средств на 3+ месяца)?',
    options: [
      { label: 'Да', value: 'yes', isRisk: false },
      { label: 'Частично', value: 'partial', isRisk: true },
      { label: 'Нет', value: 'no', isRisk: true },
    ],
    riskOptions: ['partial', 'no'],
  },
  {
    id: 3,
    text: 'Вы проверяете контрагентов перед сделкой?',
    options: [
      { label: 'Всегда', value: 'always', isRisk: false },
      { label: 'Иногда', value: 'sometimes', isRisk: true },
      { label: 'Никогда', value: 'never', isRisk: true },
    ],
    riskOptions: ['sometimes', 'never'],
  },
  {
    id: 4,
    text: 'У вас есть штатный юрист или договор с юридической компанией?',
    options: [
      { label: 'Да', value: 'yes', isRisk: false },
      { label: 'Нет', value: 'no', isRisk: true },
    ],
    riskOptions: ['no'],
  },
  {
    id: 5,
    text: 'Ваш бизнес зависит от 1–2 ключевых клиентов (>50% выручки)?',
    options: [
      { label: 'Да', value: 'yes', isRisk: true },
      { label: 'Нет', value: 'no', isRisk: false },
    ],
    riskOptions: ['yes'],
  },
  {
    id: 6,
    text: 'Есть ли у вас план действий на случай форс-мажора?',
    options: [
      { label: 'Да', value: 'yes', isRisk: false },
      { label: 'Нет', value: 'no', isRisk: true },
    ],
    riskOptions: ['no'],
  },
]

interface RiskLevel {
  level: 'low' | 'medium' | 'high'
  label: string
  color: string
  description: string
  recommendations: string[]
}

const getRiskLevel = (score: number): RiskLevel => {
  if (score <= 1) {
    return {
      level: 'low',
      label: 'Низкий уровень риска',
      color: '#4CC97A',
      description: 'Ваш бизнес имеет хорошую базу защиты. Сосредоточьтесь на поддержании текущих практик и мониторинге изменений.',
      recommendations: [
        'Регулярно обновляйте оценку рисков (раз в квартал)',
        'Проводите аудит договоров ежегодно',
        'Следите за изменениями в законодательстве',
      ],
    }
  } else if (score <= 3) {
    return {
      level: 'medium',
      label: 'Средний уровень риска',
      color: '#C9A84C',
      description: 'Выявлены зоны уязвимости, которые требуют внимания. Без системной работы риски могут материализоваться в течение 6–12 месяцев.',
      recommendations: [
        'Создайте финансовый резервный фонд (3 месяца расходов)',
        'Подключите юридическое сопровождение',
        'Диверсифицируйте клиентскую базу',
        'Разработайте план действий при форс-мажоре',
      ],
    }
  } else {
    return {
      level: 'high',
      label: 'Высокий уровень риска',
      color: '#C94C4C',
      description: 'Критические уязвимости требуют немедленного внимания. Рекомендуем срочную консультацию со специалистом по управлению рисками.',
      recommendations: [
        'Срочная диагностика финансового состояния',
        'Аудит всех действующих договоров',
        'Разработка антикризисного плана',
        'Юридическая защита ключевых активов',
        'Выстраивание системы управления рисками',
      ],
    }
  }
}

const Section = styled.section`
  padding: 7rem 2rem;
  background: ${({ theme }) => theme.colors.bg};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.borderGold},
      transparent
    );
  }
`

const Container = styled.div`
  max-width: 780px;
  margin: 0 auto;
`

const SectionLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.narrow};
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: 1rem;
  text-align: center;
`

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-bottom: 0.75rem;
`

const SectionDesc = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSub};
  text-align: center;
  margin-bottom: 3rem;
`

const QuizCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2.5rem;

  @media (max-width: 600px) {
    padding: 1.75rem;
  }
`

const ProgressBar = styled.div`
  margin-bottom: 2.5rem;
`

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
`

const ProgressTrack = styled.div`
  height: 3px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  overflow: hidden;
`

const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.gold},
    ${({ theme }) => theme.colors.goldLight}
  );
  border-radius: 2px;
  transition: width 0.4s ease;
`

const QuestionNum = styled.div`
  font-family: ${({ theme }) => theme.fonts.narrow};
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: 0.75rem;
`

const QuestionText = styled.h3`
  font-size: clamp(1.1rem, 2.5vw, 1.35rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 1.75rem;
  line-height: 1.45;
  animation: ${fadeIn} 0.4s ease;
`

const OptionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  animation: ${fadeIn} 0.4s ease 0.1s both;
`

interface OptionBtnProps {
  $selected: boolean
}

const OptionBtn = styled.button<OptionBtnProps>`
  width: 100%;
  text-align: left;
  padding: 1rem 1.25rem;
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.goldDim : theme.colors.surface2};
  border: 1px solid ${({ theme, $selected }) =>
    $selected ? theme.colors.borderGold : theme.colors.border};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.goldLight : theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background: ${({ theme }) => theme.colors.goldDim};
    border-color: ${({ theme }) => theme.colors.borderGold};
    color: ${({ theme }) => theme.colors.goldLight};
  }

  &::before {
    content: '';
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    border: 2px solid ${({ theme, $selected }) =>
      $selected ? theme.colors.gold : theme.colors.border};
    border-radius: 50%;
    background: ${({ theme, $selected }) =>
      $selected ? theme.colors.gold : 'transparent'};
    transition: all 0.2s ease;
  }
`

const NavRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const NextBtn = styled.button<{ $disabled: boolean }>`
  background: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.surface2 : theme.colors.gold};
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.textMuted : theme.colors.bgDeep};
  font-family: ${({ theme }) => theme.fonts.serif};
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.75rem 2rem;
  border: none;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;

  &:hover:not([disabled]) {
    background: ${({ theme }) => theme.colors.goldLight};
    transform: translateY(-1px);
  }
`

interface ResultProps {
  $color: string
}

const ResultCard = styled.div<ResultProps>`
  animation: ${fadeIn} 0.6s ease;
`

const ResultHeader = styled.div<ResultProps>`
  padding: 2rem 2.5rem;
  border-left: 4px solid ${({ $color }) => $color};
  background: ${({ $color }) => $color}18;
  margin-bottom: 2rem;
`

const RiskBadge = styled.div<ResultProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ $color }) => $color};
  font-family: ${({ theme }) => theme.fonts.narrow};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: ${({ $color }) => $color};
    border-radius: 50%;
  }
`

const ResultTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.5rem;
`

const ResultDesc = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSub};
  line-height: 1.65;
`

const RecsTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.narrow};
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1rem;
  padding: 0 2.5rem;
`

const RecsList = styled.ul`
  list-style: none;
  padding: 0 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

const RecItem = styled.li<ResultProps>`
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.text};
  padding-left: 1.25rem;
  position: relative;

  &::before {
    content: '→';
    position: absolute;
    left: 0;
    color: ${({ $color }) => $color};
    font-size: 0.85rem;
  }
`

const ResultCTA = styled.div`
  padding: 1.5rem 2.5rem 2.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 0.5rem;
`

const ResultCTAText = styled.p`
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 1.25rem;
`

const ResultButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.bgDeep};
  font-family: ${({ theme }) => theme.fonts.serif};
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.8rem 1.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.goldLight};
    transform: translateY(-2px);
  }
`

const RetryBtn = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 0.85rem;
  padding: 0.5rem 1.25rem;
  cursor: pointer;
  margin-left: 1rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderGold};
    color: ${({ theme }) => theme.colors.gold};
  }
`

const RiskQuiz: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResult, setShowResult] = useState(false)

  const question = QUESTIONS[currentQ]
  const selectedAnswer = question !== undefined ? answers[question.id] : undefined
  const pct = ((currentQ + (showResult ? 1 : 0)) / QUESTIONS.length) * 100

  const handleAnswer = (value: string): void => {
    if (question !== undefined) {
      setAnswers((prev) => ({ ...prev, [question.id]: value }))
    }
  }

  const handleNext = (): void => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleReset = (): void => {
    setCurrentQ(0)
    setAnswers({})
    setShowResult(false)
  }

  const score = QUESTIONS.reduce((acc, q) => {
    const answer = answers[q.id]
    if (answer !== undefined && q.riskOptions.includes(answer)) {
      return acc + 1
    }
    return acc
  }, 0)

  const riskLevel = getRiskLevel(score)

  return (
    <Section id="quiz">
      <Container>
        <SectionLabel>Экспресс-диагностика</SectionLabel>
        <SectionTitle>Оцените риски вашего бизнеса</SectionTitle>
        <SectionDesc>6 вопросов — и вы узнаете уровень риска прямо сейчас</SectionDesc>

        <QuizCard>
          <ProgressBar>
            <ProgressLabel>
              <span>Прогресс</span>
              <span>{showResult ? QUESTIONS.length : currentQ + 1} / {QUESTIONS.length}</span>
            </ProgressLabel>
            <ProgressTrack>
              <ProgressFill $pct={pct} />
            </ProgressTrack>
          </ProgressBar>

          {!showResult && question !== undefined ? (
            <>
              <QuestionNum>Вопрос {currentQ + 1} из {QUESTIONS.length}</QuestionNum>
              <QuestionText key={currentQ}>{question.text}</QuestionText>
              <OptionsGrid key={`opts-${currentQ}`}>
                {question.options.map((opt) => (
                  <OptionBtn
                    key={opt.value}
                    $selected={selectedAnswer === opt.value}
                    onClick={() => handleAnswer(opt.value)}
                  >
                    {opt.label}
                  </OptionBtn>
                ))}
              </OptionsGrid>
              <NavRow>
                <NextBtn
                  $disabled={selectedAnswer === undefined}
                  disabled={selectedAnswer === undefined}
                  onClick={handleNext}
                >
                  {currentQ < QUESTIONS.length - 1 ? 'Следующий вопрос' : 'Получить результат'}
                </NextBtn>
              </NavRow>
            </>
          ) : (
            <ResultCard $color={riskLevel.color}>
              <ResultHeader $color={riskLevel.color}>
                <RiskBadge $color={riskLevel.color}>{riskLevel.label}</RiskBadge>
                <ResultTitle>Баллов риска: {score} из {QUESTIONS.length}</ResultTitle>
                <ResultDesc>{riskLevel.description}</ResultDesc>
              </ResultHeader>

              <RecsTitle>Рекомендации</RecsTitle>
              <RecsList>
                {riskLevel.recommendations.map((rec) => (
                  <RecItem key={rec} $color={riskLevel.color}>{rec}</RecItem>
                ))}
              </RecsList>

              <ResultCTA>
                <ResultCTAText>
                  Получите подробный анализ и персональный план митигации рисков от наших специалистов
                </ResultCTAText>
                <ResultButton href="#consult">
                  Записаться на консультацию
                </ResultButton>
                <RetryBtn onClick={handleReset}>Пройти ещё раз</RetryBtn>
              </ResultCTA>
            </ResultCard>
          )}
        </QuizCard>
      </Container>
    </Section>
  )
}

export default RiskQuiz
