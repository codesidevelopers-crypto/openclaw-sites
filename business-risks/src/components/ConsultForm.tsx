import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`

type BusinessType = 'ООО' | 'ИП' | 'Самозанятый' | ''
type Industry = 'Торговля' | 'Производство' | 'IT' | 'Услуги' | 'Строительство' | 'Другое' | ''
type Revenue = 'До 10 млн руб.' | '10–100 млн руб.' | 'Свыше 100 млн руб.' | ''

interface FormData {
  name: string
  phone: string
  email: string
  businessType: BusinessType
  industry: Industry
  revenue: Revenue
  risks: string[]
  comment: string
}

const INITIAL_DATA: FormData = {
  name: '',
  phone: '',
  email: '',
  businessType: '',
  industry: '',
  revenue: '',
  risks: [],
  comment: '',
}

const RISK_OPTIONS = [
  'Финансовые риски',
  'Юридические и регуляторные риски',
  'Партнёрские риски',
  'Кадровые риски',
  'Цифровые и IT риски',
  'Операционные риски',
]

const formatPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  const d = digits.startsWith('8') || digits.startsWith('7')
    ? digits.slice(1)
    : digits
  let result = '+7'
  if (d.length > 0) result += ' (' + d.slice(0, 3)
  if (d.length >= 3) result += ') ' + d.slice(3, 6)
  if (d.length >= 6) result += '-' + d.slice(6, 8)
  if (d.length >= 8) result += '-' + d.slice(8, 10)
  return result
}

const Section = styled.section`
  padding: 7rem 2rem;
  background: ${({ theme }) => theme.colors.bgDeep};
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
  max-width: 860px;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
`

const SectionLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.narrow};
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: 1rem;
`

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.75rem;
`

const SectionDesc = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSub};
`

const FormCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const StepsNav = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

interface StepTabProps {
  $active: boolean
  $done: boolean
}

const StepTab = styled.div<StepTabProps>`
  flex: 1;
  padding: 1.25rem;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.narrow};
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme, $active, $done }) =>
    $active ? theme.colors.goldLight : $done ? theme.colors.gold : theme.colors.textMuted};
  border-bottom: 2px solid ${({ theme, $active }) =>
    $active ? theme.colors.gold : 'transparent'};
  transition: all 0.2s ease;
  cursor: default;
  position: relative;

  &::after {
    content: ${({ $done }) => ($done ? "'✓'" : "''")};
    margin-left: 0.4rem;
    color: ${({ theme }) => theme.colors.gold};
  }
`

const FormBody = styled.div`
  padding: 2.5rem;
  animation: ${fadeIn} 0.4s ease;

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`

const FieldGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1.25rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const FieldFull = styled.div`
  margin-bottom: 1.25rem;
`

const Label = styled.label`
  display: block;
  font-size: 0.78rem;
  font-family: ${({ theme }) => theme.fonts.narrow};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.4rem;
`

const Input = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.95rem;
  padding: 0.75rem 1rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderGold};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const Select = styled.select`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.95rem;
  padding: 0.75rem 1rem;
  outline: none;
  transition: border-color 0.2s ease;
  appearance: none;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderGold};
  }

  option {
    background: ${({ theme }) => theme.colors.surface};
  }
`

const RadioGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`

interface RadioBtnProps {
  $active: boolean
}

const RadioBtn = styled.button<RadioBtnProps>`
  padding: 0.5rem 1.1rem;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.goldDim : theme.colors.surface2};
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.borderGold : theme.colors.border};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.goldLight : theme.colors.textSub};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderGold};
    color: ${({ theme }) => theme.colors.gold};
  }
`

const CheckGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

interface CheckItemProps {
  $active: boolean
}

const CheckItem = styled.button<CheckItemProps>`
  text-align: left;
  padding: 0.65rem 1rem;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.goldDim : theme.colors.surface2};
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.borderGold : theme.colors.border};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.goldLight : theme.colors.textSub};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderGold};
  }

  &::before {
    content: '';
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    border: 1px solid ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.border};
    background: ${({ theme, $active }) =>
      $active ? theme.colors.gold : 'transparent'};
    transition: all 0.2s ease;
  }
`

const Textarea = styled.textarea`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.95rem;
  padding: 0.75rem 1rem;
  outline: none;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderGold};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const NavRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const BackBtn = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSub};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.88rem;
  padding: 0.65rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderGold};
    color: ${({ theme }) => theme.colors.gold};
  }
`

const NextBtn = styled.button<{ $disabled?: boolean }>`
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

const SuccessCard = styled.div`
  padding: 4rem 2.5rem;
  text-align: center;
  animation: ${fadeIn} 0.5s ease;
`

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  border: 2px solid ${({ theme }) => theme.colors.gold};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1.5rem;
  color: ${({ theme }) => theme.colors.gold};
`

const SuccessTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.75rem;
`

const SuccessText = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSub};
  max-width: 420px;
  margin: 0 auto;
`

const ConsultForm: React.FC = () => {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(INITIAL_DATA)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]): void => {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const toggleRisk = (risk: string): void => {
    setData((prev) => ({
      ...prev,
      risks: prev.risks.includes(risk)
        ? prev.risks.filter((r) => r !== risk)
        : [...prev.risks, risk],
    }))
  }

  const step1Valid = data.name.trim() !== '' && data.phone.trim() !== '' && data.email.trim() !== ''
  const step2Valid = data.businessType !== '' && data.industry !== '' && data.revenue !== ''
  const step3Valid = data.risks.length > 0

  const handleSubmit = async (): Promise<void> => {
    setSubmitting(true)
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'Консультация по рискам',
          'Имя': data.name,
          'Телефон': data.phone,
          'Email': data.email,
          'Форма бизнеса': data.businessType,
          'Отрасль': data.industry,
          'Годовой оборот': data.revenue,
          'Основные риски': data.risks.join(', '),
          'Комментарий': data.comment || '—',
        }),
      })
      setSuccess(true)
    } catch {
      setSuccess(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Section id="consult">
      <Container>
        <SectionHeader>
          <SectionLabel>Записаться на консультацию</SectionLabel>
          <SectionTitle>Получите персональный анализ рисков</SectionTitle>
          <SectionDesc>Первая консультация бесплатно — 45 минут с экспертом</SectionDesc>
        </SectionHeader>

        <FormCard>
          <StepsNav>
            {[1, 2, 3].map((s) => (
              <StepTab key={s} $active={step === s} $done={step > s}>
                Шаг {s}
              </StepTab>
            ))}
          </StepsNav>

          {success ? (
            <SuccessCard>
              <SuccessIcon>✓</SuccessIcon>
              <SuccessTitle>Заявка отправлена</SuccessTitle>
              <SuccessText>
                Наш специалист свяжется с вами в течение одного рабочего дня
                для подтверждения времени консультации.
              </SuccessText>
            </SuccessCard>
          ) : step === 1 ? (
            <FormBody key="step1">
              <FieldGroup>
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Иван Петров"
                    value={data.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateField('name', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={data.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateField('phone', formatPhone(e.target.value))
                    }
                  />
                </div>
              </FieldGroup>
              <FieldFull>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ivan@company.ru"
                  value={data.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateField('email', e.target.value)
                  }
                />
              </FieldFull>
              <NavRow>
                <div />
                <NextBtn
                  $disabled={!step1Valid}
                  disabled={!step1Valid}
                  onClick={() => setStep(2)}
                >
                  Далее
                </NextBtn>
              </NavRow>
            </FormBody>
          ) : step === 2 ? (
            <FormBody key="step2">
              <FieldFull>
                <Label>Форма бизнеса *</Label>
                <RadioGroup>
                  {(['ООО', 'ИП', 'Самозанятый'] as BusinessType[]).map((bt) => (
                    <RadioBtn
                      key={bt}
                      $active={data.businessType === bt}
                      onClick={() => updateField('businessType', bt)}
                    >
                      {bt}
                    </RadioBtn>
                  ))}
                </RadioGroup>
              </FieldFull>
              <FieldGroup>
                <div>
                  <Label htmlFor="industry">Отрасль *</Label>
                  <Select
                    id="industry"
                    value={data.industry}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      updateField('industry', e.target.value as Industry)
                    }
                  >
                    <option value="">Выберите отрасль</option>
                    {(['Торговля', 'Производство', 'IT', 'Услуги', 'Строительство', 'Другое'] as Industry[]).map(
                      (ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      )
                    )}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="revenue">Годовой оборот *</Label>
                  <Select
                    id="revenue"
                    value={data.revenue}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      updateField('revenue', e.target.value as Revenue)
                    }
                  >
                    <option value="">Выберите диапазон</option>
                    {(['До 10 млн руб.', '10–100 млн руб.', 'Свыше 100 млн руб.'] as Revenue[]).map(
                      (r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      )
                    )}
                  </Select>
                </div>
              </FieldGroup>
              <NavRow>
                <BackBtn onClick={() => setStep(1)}>Назад</BackBtn>
                <NextBtn
                  $disabled={!step2Valid}
                  disabled={!step2Valid}
                  onClick={() => setStep(3)}
                >
                  Далее
                </NextBtn>
              </NavRow>
            </FormBody>
          ) : (
            <FormBody key="step3">
              <FieldFull>
                <Label>Основные риски, которые вас беспокоят *</Label>
                <CheckGrid>
                  {RISK_OPTIONS.map((risk) => (
                    <CheckItem
                      key={risk}
                      $active={data.risks.includes(risk)}
                      onClick={() => toggleRisk(risk)}
                    >
                      {risk}
                    </CheckItem>
                  ))}
                </CheckGrid>
              </FieldFull>
              <FieldFull>
                <Label htmlFor="comment">Опишите ситуацию (необязательно)</Label>
                <Textarea
                  id="comment"
                  placeholder="Расскажите подробнее о ситуации или задайте вопрос..."
                  value={data.comment}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    updateField('comment', e.target.value)
                  }
                />
              </FieldFull>
              <NavRow>
                <BackBtn onClick={() => setStep(2)}>Назад</BackBtn>
                <NextBtn
                  $disabled={!step3Valid || submitting}
                  disabled={!step3Valid || submitting}
                  onClick={handleSubmit}
                >
                  {submitting ? 'Отправка...' : 'Отправить заявку'}
                </NextBtn>
              </NavRow>
            </FormBody>
          )}
        </FormCard>
      </Container>
    </Section>
  )
}

export default ConsultForm
