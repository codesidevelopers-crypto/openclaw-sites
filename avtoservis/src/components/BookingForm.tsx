import React, { useState, useCallback } from 'react'
import styled, { keyframes, css } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`

const Section = styled.section`
  padding: 8rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`

const Header = styled.div`
  margin-bottom: 4rem;
`

const SectionNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.2em;
  margin-bottom: 0.25rem;
`

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;

  &::before {
    content: '';
    display: block;
    width: 32px;
    height: 2px;
    background: ${({ theme }) => theme.colors.gold};
  }

  span {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gold};
  }
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.textPrimary};
`

const FormWrapper = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  max-width: 800px;
`

const ProgressBar = styled.div`
  background: ${({ theme }) => theme.colors.card};
  height: 4px;
  position: relative;
`

const ProgressFill = styled.div<{ $step: number }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: ${({ theme }) => theme.colors.gold};
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${({ $step }) => ($step === 1 ? '33.3%' : $step === 2 ? '66.6%' : '100%')};
`

const StepIndicators = styled.div`
  display: flex;
  padding: 1.5rem 2rem;
  gap: 0;
  background: ${({ theme }) => theme.colors.card};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const StepIndicator = styled.div<{ $active: boolean; $done: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 100%;
    height: 1px;
    background: ${({ $done, theme }) => ($done ? theme.colors.gold : theme.colors.border)};
    transform: translateY(-50%);
    pointer-events: none;
  }
`

const StepCircle = styled.div<{ $active: boolean; $done: boolean }>`
  width: 32px;
  height: 32px;
  border: 2px solid ${({ $active, $done, theme }) =>
    $done ? theme.colors.gold : $active ? theme.colors.gold : theme.colors.border};
  background: ${({ $active, $done, theme }) =>
    $done ? theme.colors.gold : $active ? theme.colors.goldDim : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ $active, $done, theme }) =>
    $done ? theme.colors.bg : $active ? theme.colors.gold : theme.colors.textMuted};
  flex-shrink: 0;
  transition: all 0.3s ease;
  z-index: 1;
  background-clip: padding-box;
`

const StepLabel = styled.div<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.75rem;
  font-weight: ${({ $active }) => ($active ? '700' : '400')};
  color: ${({ $active, theme }) => ($active ? theme.colors.textPrimary : theme.colors.textMuted)};
  letter-spacing: 0.05em;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`

const FormBody = styled.div`
  padding: 2.5rem 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 2rem 1.5rem;
  }
`

const StepContent = styled.div`
  animation: ${fadeIn} 0.4s ease both;
`

const StepTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`

const StepDesc = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 2rem;
`

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const CheckboxLabel = styled.label<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid ${({ $checked, theme }) => ($checked ? theme.colors.gold : theme.colors.border)};
  background: ${({ $checked, theme }) => ($checked ? theme.colors.goldDim : theme.colors.card)};
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
  }
`

const CheckboxBox = styled.div<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ $checked, theme }) => ($checked ? theme.colors.gold : theme.colors.border)};
  background: ${({ $checked, theme }) => ($checked ? theme.colors.gold : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
`

const CheckboxText = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`

const FieldGrid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: ${({ $cols }) => `repeat(${$cols ?? 2}, 1fr)`};
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const inputStyles = css`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  padding: 0.75rem 1rem;
  outline: none;
  transition: border-color 0.2s ease;
  width: 100%;
  appearance: none;
  -webkit-appearance: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.gold};
  }
`

const Input = styled.input`
  ${inputStyles}
`

const Select = styled.select`
  ${inputStyles}
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235A6878' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
`

const Textarea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  min-height: 100px;
`

const FormActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
`

const BackBtn = styled.button`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`

const NextBtn = styled.button<{ $disabled?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.bg};
  background: ${({ $disabled, theme }) => ($disabled ? theme.colors.textMuted : theme.colors.gold)};
  padding: 0.9rem 2rem;
  transition: all 0.2s ease;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.goldLight};
  }
`

const SuccessBlock = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  animation: ${fadeIn} 0.5s ease both;
`

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.colors.goldDim};
  border: 2px solid ${({ theme }) => theme.colors.gold};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: ${({ theme }) => theme.colors.gold};
`

const SuccessTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
`

const SuccessText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.7;
`

interface FormData {
  services: string[]
  carBrand: string
  carModel: string
  carYear: string
  problem: string
  name: string
  phone: string
  date: string
  comment: string
}

const serviceOptions = ['Диагностика', 'ТО', 'Кузовной ремонт', 'Шиномонтаж', 'Электрика', 'АКПП']
const carBrands = ['BMW', 'Mercedes', 'Audi', 'Toyota', 'Lexus', 'Kia', 'Hyundai', 'Volkswagen', 'Skoda', 'Другое']
const currentYear = 2025
const years = Array.from({ length: 26 }, (_, i) => String(currentYear - i))

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  if (!digits) return ''
  let result = '+7'
  if (digits.length > 1) result += ` (${digits.slice(1, 4)}`
  if (digits.length > 4) result += `) ${digits.slice(4, 7)}`
  if (digits.length > 7) result += `-${digits.slice(7, 9)}`
  if (digits.length > 9) result += `-${digits.slice(9, 11)}`
  return result
}

const formatDate = (dateStr: string): string => {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-')
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  const monthIdx = parseInt(month, 10) - 1
  return `${parseInt(day, 10)} ${months[monthIdx]} ${year}`
}

interface BookingFormProps {
  bookingRef: React.RefObject<HTMLElement>
}

const BookingForm: React.FC<BookingFormProps> = ({ bookingRef }) => {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    services: [],
    carBrand: '',
    carModel: '',
    carYear: '',
    problem: '',
    name: '',
    phone: '',
    date: '',
    comment: '',
  })

  const toggleService = useCallback((service: string): void => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
      const { name, value } = e.target
      if (name === 'phone') {
        setFormData((prev) => ({ ...prev, phone: formatPhone(value) }))
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }))
      }
    },
    []
  )

  const handleSubmit = async (): Promise<void> => {
    setLoading(true)
    try {
      const payload = {
        form: 'Запись на сервис',
        'Услуги': formData.services.join(', '),
        'Марка авто': formData.carBrand,
        'Модель': formData.carModel,
        'Год выпуска': formData.carYear,
        'Описание проблемы': formData.problem || '—',
        'Имя': formData.name,
        'Телефон': formData.phone,
        'Удобная дата': formatDate(formData.date),
        'Комментарий': formData.comment || '—',
      }
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setSubmitted(true)
    } catch (_err) {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const step1Valid = formData.services.length > 0
  const step2Valid = formData.carBrand !== '' && formData.carModel !== '' && formData.carYear !== ''
  const step3Valid = formData.name !== '' && formData.phone.length >= 16

  const steps = [
    { num: 1, label: 'Услуга' },
    { num: 2, label: 'Автомобиль' },
    { num: 3, label: 'Контакты' },
  ]

  return (
    <section id="booking" ref={bookingRef as React.RefObject<HTMLElement>}>
      <Section>
        <Header className="reveal">
          <SectionNumber>06</SectionNumber>
          <SectionLabel><span>Запись онлайн</span></SectionLabel>
          <Title>
            ЗАПИСЬ
            <br />НА СЕРВИС
          </Title>
        </Header>

        <FormWrapper className="reveal">
          <ProgressBar>
            <ProgressFill $step={step} />
          </ProgressBar>

          <StepIndicators>
            {steps.map((s) => (
              <StepIndicator key={s.num} $active={step === s.num} $done={step > s.num}>
                <StepCircle $active={step === s.num} $done={step > s.num}>
                  {step > s.num ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    s.num
                  )}
                </StepCircle>
                <StepLabel $active={step === s.num}>{s.label}</StepLabel>
              </StepIndicator>
            ))}
          </StepIndicators>

          <FormBody>
            {submitted ? (
              <SuccessBlock>
                <SuccessIcon>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M7 18l7 7 15-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </SuccessIcon>
                <SuccessTitle>Заявка принята!</SuccessTitle>
                <SuccessText>
                  Мы свяжемся с вами в течение 30 минут для подтверждения записи.
                  Спасибо, что выбрали АВТОРИТЕТ.
                </SuccessText>
              </SuccessBlock>
            ) : (
              <>
                {step === 1 && (
                  <StepContent key="step1">
                    <StepTitle>Выберите услугу</StepTitle>
                    <StepDesc>Можно выбрать несколько услуг одновременно</StepDesc>
                    <CheckboxGrid>
                      {serviceOptions.map((service) => (
                        <CheckboxLabel
                          key={service}
                          $checked={formData.services.includes(service)}
                          onClick={() => toggleService(service)}
                        >
                          <HiddenCheckbox
                            type="checkbox"
                            checked={formData.services.includes(service)}
                            onChange={() => toggleService(service)}
                          />
                          <CheckboxBox $checked={formData.services.includes(service)}>
                            {formData.services.includes(service) && (
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M1.5 5l2.5 2.5 4.5-4" stroke="#07090B" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            )}
                          </CheckboxBox>
                          <CheckboxText>{service}</CheckboxText>
                        </CheckboxLabel>
                      ))}
                    </CheckboxGrid>
                    <FormActions>
                      <span />
                      <NextBtn
                        $disabled={!step1Valid}
                        disabled={!step1Valid}
                        onClick={() => step1Valid && setStep(2)}
                      >
                        Далее →
                      </NextBtn>
                    </FormActions>
                  </StepContent>
                )}

                {step === 2 && (
                  <StepContent key="step2">
                    <StepTitle>Данные автомобиля</StepTitle>
                    <StepDesc>Укажите марку, модель и год выпуска</StepDesc>
                    <FieldGrid>
                      <Field>
                        <Label>Марка *</Label>
                        <Select name="carBrand" value={formData.carBrand} onChange={handleChange}>
                          <option value="">Выберите марку</option>
                          {carBrands.map((b) => <option key={b} value={b}>{b}</option>)}
                        </Select>
                      </Field>
                      <Field>
                        <Label>Год выпуска *</Label>
                        <Select name="carYear" value={formData.carYear} onChange={handleChange}>
                          <option value="">Год</option>
                          {years.map((y) => <option key={y} value={y}>{y}</option>)}
                        </Select>
                      </Field>
                    </FieldGrid>
                    <FieldGrid $cols={1}>
                      <Field>
                        <Label>Модель *</Label>
                        <Input
                          type="text"
                          name="carModel"
                          placeholder="Например: X5, Camry, Octavia"
                          value={formData.carModel}
                          onChange={handleChange}
                        />
                      </Field>
                    </FieldGrid>
                    <FieldGrid $cols={1}>
                      <Field>
                        <Label>Описание проблемы</Label>
                        <Textarea
                          name="problem"
                          placeholder="Опишите симптомы или что нужно сделать"
                          value={formData.problem}
                          onChange={handleChange}
                        />
                      </Field>
                    </FieldGrid>
                    <FormActions>
                      <BackBtn onClick={() => setStep(1)}>
                        ← Назад
                      </BackBtn>
                      <NextBtn
                        $disabled={!step2Valid}
                        disabled={!step2Valid}
                        onClick={() => step2Valid && setStep(3)}
                      >
                        Далее →
                      </NextBtn>
                    </FormActions>
                  </StepContent>
                )}

                {step === 3 && (
                  <StepContent key="step3">
                    <StepTitle>Ваши контакты</StepTitle>
                    <StepDesc>Мы перезвоним для подтверждения записи</StepDesc>
                    <FieldGrid>
                      <Field>
                        <Label>Имя *</Label>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Иван Петров"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Field>
                      <Field>
                        <Label>Телефон *</Label>
                        <Input
                          type="tel"
                          name="phone"
                          placeholder="+7 (999) 123-45-67"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </Field>
                    </FieldGrid>
                    <FieldGrid $cols={1}>
                      <Field>
                        <Label>Удобная дата</Label>
                        <Input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </Field>
                    </FieldGrid>
                    <FieldGrid $cols={1}>
                      <Field>
                        <Label>Комментарий</Label>
                        <Textarea
                          name="comment"
                          placeholder="Удобное время, дополнительные пожелания..."
                          value={formData.comment}
                          onChange={handleChange}
                        />
                      </Field>
                    </FieldGrid>
                    <FormActions>
                      <BackBtn onClick={() => setStep(2)}>
                        ← Назад
                      </BackBtn>
                      <NextBtn
                        $disabled={!step3Valid || loading}
                        disabled={!step3Valid || loading}
                        onClick={handleSubmit}
                      >
                        {loading ? 'Отправка...' : 'Записаться'}
                      </NextBtn>
                    </FormActions>
                  </StepContent>
                )}
              </>
            )}
          </FormBody>
        </FormWrapper>
      </Section>
    </section>
  )
}

export default BookingForm
