import React from 'react'
import styled, { css } from 'styled-components'
import type { QuizCategory, QuizAnswers } from '../types'

interface QuizStepProps {
  category: QuizCategory
  answers: QuizAnswers
  onAnswer: (questionId: string, score: number) => void
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
  isComplete: boolean
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
`

const CategoryHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`

const CategoryIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 0.75rem;
  line-height: 1;
`

const CategoryTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
`

const QuestionBlock = styled.div`
  margin-bottom: 2rem;
`

const QuestionText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
  line-height: 1.5;
`

const QuestionNumber = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.5rem;
`

const OptionsGrid = styled.div`
  display: grid;
  gap: 0.625rem;
`

interface OptionButtonProps {
  $selected: boolean
  $categoryColor: string
}

const OptionButton = styled.button<OptionButtonProps>`
  width: 100%;
  padding: 1rem 1.25rem;
  text-align: left;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgCard};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
  line-height: 1.5;
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    border-color: ${({ $categoryColor }) => $categoryColor};
    background: ${({ theme }) => theme.colors.bgCardHover};
    transform: translateX(4px);
  }

  ${({ $selected, $categoryColor }) =>
    $selected &&
    css`
      border-color: ${$categoryColor};
      background: ${$categoryColor}18;
      color: ${$categoryColor};
      font-weight: 600;
    `}
`

const RadioDot = styled.span<{ $selected: boolean; $color: string }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${({ $selected, $color, theme }) =>
    $selected ? $color : theme.colors.border};
  background: ${({ $selected, $color }) => ($selected ? $color : 'transparent')};
  flex-shrink: 0;
  transition: all 0.2s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: white;
    opacity: ${({ $selected }) => ($selected ? 1 : 0)};
    transition: opacity 0.2s ease;
  }
`

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.5rem;
  gap: 1rem;
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`

interface NextButtonProps {
  $color: string
  $disabled: boolean
}

const NextButton = styled.button<NextButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ $color, $disabled }) => ($disabled ? 'transparent' : $color)};
  border: 1.5px solid ${({ $color, $disabled, theme }) =>
    $disabled ? theme.colors.border : $color};
  color: ${({ $disabled, theme }) => ($disabled ? theme.colors.textMuted : '#060A12')};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  transition: all 0.2s ease;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  &:hover:not([disabled]) {
    filter: brightness(1.1);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px ${({ $color }) => $color}44;
  }
`

const QuizStep: React.FC<QuizStepProps> = ({
  category,
  answers,
  onAnswer,
  onNext,
  onPrev,
  isFirst,
  isLast,
  isComplete,
}) => {
  return (
    <Wrapper>
      <CategoryHeader>
        <CategoryIcon>{category.icon}</CategoryIcon>
        <CategoryTitle>{category.title}</CategoryTitle>
      </CategoryHeader>

      {category.questions.map((q, qi) => (
        <QuestionBlock key={q.id}>
          <QuestionNumber>Вопрос {qi + 1}</QuestionNumber>
          <QuestionText>{q.text}</QuestionText>
          <OptionsGrid>
            {q.options.map((opt, oi) => {
              const selected = answers[q.id] === opt.score
              return (
                <OptionButton
                  key={oi}
                  $selected={selected}
                  $categoryColor={category.color}
                  onClick={() => onAnswer(q.id, opt.score)}
                >
                  <RadioDot $selected={selected} $color={category.color} />
                  {opt.label}
                </OptionButton>
              )
            })}
          </OptionsGrid>
        </QuestionBlock>
      ))}

      <Nav>
        {!isFirst ? (
          <BackButton onClick={onPrev}>← Назад</BackButton>
        ) : (
          <div />
        )}
        <NextButton
          $color={category.color}
          $disabled={!isComplete}
          disabled={!isComplete}
          onClick={onNext}
        >
          {isLast ? 'Получить результат →' : 'Далее →'}
        </NextButton>
      </Nav>
    </Wrapper>
  )
}

export default QuizStep
