import React, { useState, useCallback, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

interface MathExpression {
  text: string
  answer: number
}

type Operator = '+' | '−' | '×'

function generateExpression(): MathExpression {
  const operators: Operator[] = ['+', '−', '×']
  const op = operators[Math.floor(Math.random() * operators.length)]

  let a: number
  let b: number
  let answer: number

  if (op === '+') {
    a = Math.floor(Math.random() * 15) + 2
    b = Math.floor(Math.random() * 15) + 2
    answer = a + b
  } else if (op === '−') {
    b = Math.floor(Math.random() * 9) + 2
    a = b + Math.floor(Math.random() * 10) + 1
    answer = a - b
  } else {
    a = Math.floor(Math.random() * 9) + 2
    b = Math.floor(Math.random() * 9) + 2
    answer = a * b
  }

  return { text: `${a} ${op} ${b} = ?`, answer }
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-6px); }
  40%       { transform: translateX(6px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(4px); }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(7, 9, 15, 0.85);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease;
  padding: 24px;
`

const Modal = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.borderStrong};
  border-top: 2px solid ${p => p.theme.colors.accent};
  width: 100%;
  max-width: 420px;
  padding: 40px 36px 36px;
  position: relative;
  animation: ${slideUp} 0.25s ease;
`

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: ${p => p.theme.colors.textMuted};
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  font-size: 1.2rem;
  transition: color 0.15s;

  &:hover {
    color: ${p => p.theme.colors.text};
  }
`

const Label = styled.div`
  font-family: ${p => p.theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.accent};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: ${p => p.theme.colors.accent};
    border-radius: 50%;
  }
`

const Title = styled.h2`
  font-family: ${p => p.theme.fonts.display};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
  margin-bottom: 8px;
`

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: ${p => p.theme.colors.textSub};
  margin-bottom: 32px;
  line-height: 1.5;
`

const ExpressionBox = styled.div`
  background: ${p => p.theme.colors.surface2};
  border: 1px solid ${p => p.theme.colors.border};
  padding: 20px 24px;
  margin-bottom: 20px;
  text-align: center;
  font-family: ${p => p.theme.fonts.mono};
  font-size: 2rem;
  font-weight: 700;
  color: ${p => p.theme.colors.accent};
  letter-spacing: 0.05em;
`

const InputRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`

const Input = styled.input<{ $shaking: boolean }>`
  flex: 1;
  background: ${p => p.theme.colors.surface2};
  border: 1px solid ${p => p.theme.colors.border};
  color: ${p => p.theme.colors.text};
  font-family: ${p => p.theme.fonts.mono};
  font-size: 1.1rem;
  padding: 12px 16px;
  outline: none;
  transition: border-color 0.2s;
  animation: ${p => p.$shaking ? shake : 'none'} 0.4s ease;

  &:focus {
    border-color: ${p => p.theme.colors.accent};
  }

  /* remove spinner arrows */
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`

const ConfirmBtn = styled.button`
  background: ${p => p.theme.colors.accent};
  color: #0a0a0a;
  font-family: ${p => p.theme.fonts.display};
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s, transform 0.15s;

  &:hover {
    background: ${p => p.theme.colors.accentHover};
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const ErrorMsg = styled.div`
  font-size: 0.825rem;
  color: ${p => p.theme.colors.danger};
  font-family: ${p => p.theme.fonts.mono};
  min-height: 1.2em;
`

interface CaptchaModalProps {
  onSuccess: () => void
  onClose: () => void
}

export const CaptchaModal: React.FC<CaptchaModalProps> = ({ onSuccess, onClose }) => {
  const [expr, setExpr] = useState<MathExpression>(generateExpression)
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [shaking, setShaking] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [expr])

  const handleSubmit = useCallback((): void => {
    const num = parseInt(value, 10)
    if (isNaN(num)) {
      triggerError()
      return
    }
    if (num === expr.answer) {
      onSuccess()
    } else {
      triggerError()
      setExpr(generateExpression())
      setValue('')
    }
  }, [value, expr.answer, onSuccess])

  function triggerError(): void {
    setError('Неверно, попробуйте ещё раз')
    setShaking(true)
    setTimeout(() => setShaking(false), 450)
  }

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleSubmit()
    if (e.key === 'Escape') onClose()
  }, [handleSubmit, onClose])

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) onClose()
  }, [onClose])

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <CloseBtn onClick={onClose} aria-label="Закрыть">✕</CloseBtn>
        <Label>Проверка</Label>
        <Title>Подтвердите, что вы не робот</Title>
        <Subtitle>Решите простой пример, чтобы продолжить</Subtitle>

        <ExpressionBox>{expr.text}</ExpressionBox>

        <InputRow>
          <Input
            ref={inputRef}
            type="number"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue(e.target.value)
              setError('')
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ответ"
            $shaking={shaking}
          />
          <ConfirmBtn onClick={handleSubmit} disabled={value === ''}>
            Подтвердить
          </ConfirmBtn>
        </InputRow>

        <ErrorMsg>{error}</ErrorMsg>
      </Modal>
    </Overlay>
  )
}
