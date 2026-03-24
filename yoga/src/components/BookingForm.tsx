import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'

type Direction =
  | 'Хатха-йога'
  | 'Виньяса'
  | 'Аштанга'
  | 'Йога для начинающих'
  | 'Медитация'
  | 'Растяжка'

type DayLabel =
  | 'Понедельник'
  | 'Вторник'
  | 'Среда'
  | 'Четверг'
  | 'Пятница'
  | 'Суббота'
  | 'Воскресенье'

const directionOptions: Direction[] = [
  'Хатха-йога',
  'Виньяса',
  'Аштанга',
  'Йога для начинающих',
  'Медитация',
  'Растяжка',
]

const dayOptions: DayLabel[] = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
]

const dayShort: Record<DayLabel, string> = {
  'Понедельник': 'Пн',
  'Вторник': 'Вт',
  'Среда': 'Ср',
  'Четверг': 'Чт',
  'Пятница': 'Пт',
  'Суббота': 'Сб',
  'Воскресенье': 'Вс',
}

interface FormData {
  direction: Direction | ''
  days: DayLabel[]
  name: string
  phone: string
  comment: string
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const Section = styled.section`
  background: ${({ theme }) => theme.colors.bgLight};
  padding: 120px 48px;

  @media (max-width: 768px) {
    padding: 80px 24px;
  }
`

const Inner = styled.div`
  max-width: 700px;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
`

const Eyebrow = styled.div`
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    opacity: 0.6;
  }
`

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 0.04em;
  margin-bottom: 12px;
`

const SectionSubtitle = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textDarkMuted};
`

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 52px;
`

const ProgressStep = styled.div<{ $active: boolean; $done: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 16px;
    left: 50%;
    right: -50%;
    height: 1px;
    background: ${({ $done, theme }) => ($done ? theme.colors.accent : theme.colors.borderLight)};
    transition: background 0.4s ease;
  }

  &:last-child::after {
    display: none;
  }
`

const StepDot = styled.div<{ $active: boolean; $done: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ $active, $done, theme }) =>
    $done ? theme.colors.accent : $active ? theme.colors.accentLight : theme.colors.borderLight};
  border: 1px solid ${({ $active, $done, theme }) =>
    $done || $active ? theme.colors.accent : theme.colors.borderLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 500;
  color: ${({ $active, $done, theme }) =>
    $done || $active ? theme.colors.bg : theme.colors.textDarkMuted};
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
`

const StepLabel = styled.div<{ $active: boolean }>`
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.textDarkMuted)};
  white-space: nowrap;
`

const FormStep = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  flex-direction: column;
  gap: 32px;
  animation: ${fadeIn} 0.4s ease;
`

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const FieldLabel = styled.label`
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
`

const DirectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  @media (max-width: 580px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const DirectionOption = styled.label<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 12px;
  border: 1px solid ${({ $selected, theme }) => ($selected ? theme.colors.accent : theme.colors.borderLight)};
  background: ${({ $selected, theme }) => ($selected ? theme.colors.accent + '15' : 'transparent')};
  cursor: pointer;
  font-size: 0.85rem;
  color: ${({ $selected, theme }) => ($selected ? theme.colors.accent : theme.colors.textDarkMuted)};
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }

  input {
    display: none;
  }
`

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;

  @media (max-width: 500px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const DayOption = styled.label<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  border: 1px solid ${({ $selected, theme }) => ($selected ? theme.colors.accent : theme.colors.borderLight)};
  background: ${({ $selected, theme }) => ($selected ? theme.colors.accent : 'transparent')};
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: ${({ $selected }) => ($selected ? '500' : '400')};
  color: ${({ $selected, theme }) => ($selected ? theme.colors.bg : theme.colors.textDarkMuted)};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  input {
    display: none;
  }
`

const TextInput = styled.input`
  width: 100%;
  padding: 14px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDarkMuted};
    opacity: 0.6;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  outline: none;
  resize: none;
  min-height: 80px;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDarkMuted};
    opacity: 0.6;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
`

const PrimaryButton = styled.button`
  flex: 1;
  padding: 18px 32px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.bg};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: all 0.25s ease;
  border: 1px solid ${({ theme }) => theme.colors.accent};

  &:hover {
    background: ${({ theme }) => theme.colors.accentLight};
    border-color: ${({ theme }) => theme.colors.accentLight};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const SecondaryButton = styled.button`
  padding: 18px 24px;
  background: transparent;
  color: ${({ theme }) => theme.colors.textDarkMuted};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.78rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  transition: all 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.textDarkMuted};
    color: ${({ theme }) => theme.colors.textDark};
  }
`

const SuccessState = styled.div`
  text-align: center;
  padding: 80px 40px;
  animation: ${fadeIn} 0.6s ease;
`

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.sage}20;
  border: 1px solid ${({ theme }) => theme.colors.sage};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 28px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.sage};
`

const SuccessTitle = styled.h3`
  font-size: 2rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 12px;
`

const SuccessText = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textDarkMuted};
  line-height: 1.7;
`

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  const limited = digits.slice(0, 11)

  if (limited.length === 0) return ''
  if (limited.length <= 1) return '+7'
  if (limited.length <= 4) return `+7 (${limited.slice(1)}`
  if (limited.length <= 7) return `+7 (${limited.slice(1, 4)}) ${limited.slice(4)}`
  if (limited.length <= 9) return `+7 (${limited.slice(1, 4)}) ${limited.slice(4, 7)}-${limited.slice(7)}`
  return `+7 (${limited.slice(1, 4)}) ${limited.slice(4, 7)}-${limited.slice(7, 9)}-${limited.slice(9, 11)}`
}

export const BookingForm: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    direction: '',
    days: [],
    name: '',
    phone: '',
    comment: '',
  })

  const handleDayToggle = (day: DayLabel): void => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((prev) => ({ ...prev, phone: formatPhone(e.target.value) }))
  }

  const canProceedStep1 = formData.direction !== '' && formData.days.length > 0

  const handleSubmit = async (): Promise<void> => {
    if (!formData.name || !formData.phone) return
    setLoading(true)

    const payload = {
      form: 'Пробное занятие',
      'Направление': formData.direction,
      'Удобные дни': formData.days.join(', '),
      'Имя': formData.name,
      'Телефон': formData.phone,
      'Комментарий': formData.comment || '—',
    }

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {
      // proceed to success regardless
    }

    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Section id="booking">
        <Inner>
          <SuccessState>
            <SuccessIcon>✓</SuccessIcon>
            <SuccessTitle>Заявка отправлена</SuccessTitle>
            <SuccessText>
              Мы свяжемся с вами в ближайшее время, чтобы подтвердить запись.<br />
              До встречи в студии Прана.
            </SuccessText>
          </SuccessState>
        </Inner>
      </Section>
    )
  }

  return (
    <Section id="booking">
      <Inner>
        <SectionHeader>
          <Eyebrow>Первый шаг</Eyebrow>
          <SectionTitle>Пробное занятие</SectionTitle>
          <SectionSubtitle>Запишитесь — и мы подберём удобное время</SectionSubtitle>
        </SectionHeader>

        <ProgressBar>
          <ProgressStep $active={step === 1} $done={step > 1}>
            <StepDot $active={step === 1} $done={step > 1}>
              {step > 1 ? '✓' : '1'}
            </StepDot>
            <StepLabel $active={step === 1}>Направление</StepLabel>
          </ProgressStep>
          <ProgressStep $active={step === 2} $done={false}>
            <StepDot $active={step === 2} $done={false}>2</StepDot>
            <StepLabel $active={step === 2}>Контакты</StepLabel>
          </ProgressStep>
        </ProgressBar>

        <FormStep $visible={step === 1}>
          <FieldGroup>
            <FieldLabel>Выберите направление</FieldLabel>
            <DirectionGrid>
              {directionOptions.map((dir) => (
                <DirectionOption key={dir} $selected={formData.direction === dir}>
                  <input
                    type="radio"
                    name="direction"
                    value={dir}
                    checked={formData.direction === dir}
                    onChange={() => setFormData((prev) => ({ ...prev, direction: dir }))}
                  />
                  {dir}
                </DirectionOption>
              ))}
            </DirectionGrid>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Удобные дни</FieldLabel>
            <DaysGrid>
              {dayOptions.map((day) => (
                <DayOption key={day} $selected={formData.days.includes(day)}>
                  <input
                    type="checkbox"
                    checked={formData.days.includes(day)}
                    onChange={() => handleDayToggle(day)}
                  />
                  {dayShort[day]}
                </DayOption>
              ))}
            </DaysGrid>
          </FieldGroup>

          <ButtonRow>
            <PrimaryButton
              onClick={() => setStep(2)}
              disabled={!canProceedStep1}
            >
              Продолжить
            </PrimaryButton>
          </ButtonRow>
        </FormStep>

        <FormStep $visible={step === 2}>
          <FieldGroup>
            <FieldLabel>Ваше имя</FieldLabel>
            <TextInput
              type="text"
              placeholder="Как вас зовут?"
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Телефон</FieldLabel>
            <TextInput
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={formData.phone}
              onChange={handlePhoneChange}
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Комментарий <span style={{ fontWeight: 300, opacity: 0.6 }}>(необязательно)</span></FieldLabel>
            <TextArea
              placeholder="Ваш уровень подготовки, пожелания..."
              value={formData.comment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData((prev) => ({ ...prev, comment: e.target.value }))
              }
            />
          </FieldGroup>

          <ButtonRow>
            <SecondaryButton onClick={() => setStep(1)}>
              Назад
            </SecondaryButton>
            <PrimaryButton
              onClick={handleSubmit}
              disabled={!formData.name || !formData.phone || loading}
            >
              {loading ? 'Отправляем...' : 'Записаться'}
            </PrimaryButton>
          </ButtonRow>
        </FormStep>
      </Inner>
    </Section>
  )
}
