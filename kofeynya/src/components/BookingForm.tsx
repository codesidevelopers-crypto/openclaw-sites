import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import type { BookingFormData, FormStatus, ApiSubmitResponse } from '../types'

interface FieldProps {
  $hasError: boolean
}

interface WrapProps {
  $visible: boolean
}

const Section = styled.section<WrapProps>`
  padding: 6rem 1.5rem;
  background: ${({ theme }) => theme.colors.bgSection};
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.border}, transparent);
  }

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}
`

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`

const SectionHead = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const SectionTag = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 1rem;
`

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  margin-bottom: 0.75rem;
`

const SectionSub = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
`

const Form = styled.form`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 2.5rem;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
`

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textMuted};
`

const inputBase = css<FieldProps>`
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ $hasError, theme }) =>
    $hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  transition: border-color ${({ theme }) => theme.transitions.fast};
  width: 100%;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error : theme.colors.accent};
  }
`

const Input = styled.input<FieldProps>`${inputBase}`
const Select = styled.select<FieldProps>`${inputBase}`

const Textarea = styled.textarea<FieldProps>`
  ${inputBase}
  resize: vertical;
  min-height: 100px;
`

const ErrorMsg = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.error};
`

const SubmitBtn = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.bg};
  font-size: 1rem;
  font-weight: 700;
  border-radius: ${({ theme }) => theme.radii.md};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: background ${({ theme }) => theme.transitions.fast},
              transform ${({ theme }) => theme.transitions.fast};
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accentLight};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const StatusBox = styled.div<{ $type: 'success' | 'error' }>`
  margin-top: 1.25rem;
  padding: 1rem 1.25rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.95rem;
  font-weight: 500;
  text-align: center;

  ${({ $type, theme }) =>
    $type === 'success'
      ? css`
          background: rgba(76,175,80,0.12);
          border: 1px solid ${theme.colors.success};
          color: ${theme.colors.success};
        `
      : css`
          background: rgba(229,57,53,0.12);
          border: 1px solid ${theme.colors.error};
          color: ${theme.colors.error};
        `}
`

const timeSlots: readonly string[] = [
  '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
] as const

const guestOptions: readonly string[] = ['1', '2', '3', '4', '5', '6+'] as const

type FieldErrors = Partial<Record<keyof BookingFormData, string>>

const initialForm: BookingFormData = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: '',
  comment: '',
}

function validate(data: BookingFormData): FieldErrors {
  const errors: FieldErrors = {}
  if (!data.name.trim()) errors.name = 'Введите имя'
  if (!data.phone.trim()) errors.phone = 'Введите номер телефона'
  if (!data.date) errors.date = 'Выберите дату'
  if (!data.time) errors.time = 'Выберите время'
  if (!data.guests) errors.guests = 'Укажите количество гостей'
  return errors
}

export const BookingForm: React.FC = () => {
  const [form, setForm] = useState<BookingFormData>(initialForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const { ref, isVisible } = useScrollAnimation()

  const today = new Date().toISOString().split('T')[0]

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof BookingFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const fieldErrors = validate(form)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: 'booking', ...form }),
      })
      const data = await res.json() as ApiSubmitResponse
      if (res.ok || data.ok) {
        setStatus('success')
        setForm(initialForm)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section
      id="booking"
      ref={ref as React.RefObject<HTMLElement>}
      $visible={isVisible}
    >
      <Container>
        <SectionHead>
          <SectionTag>Бронирование</SectionTag>
          <SectionTitle>Забронируйте столик</SectionTitle>
          <SectionSub>Заполните форму — мы подтвердим бронь по телефону</SectionSub>
        </SectionHead>

        <Form onSubmit={handleSubmit} noValidate>
          <Row>
            <Field>
              <Label htmlFor="name">Ваше имя *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Иван Иванов"
                value={form.name}
                onChange={handleChange}
                $hasError={!!errors.name}
              />
              {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
            </Field>
            <Field>
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+7 (999) 000-00-00"
                value={form.phone}
                onChange={handleChange}
                $hasError={!!errors.phone}
              />
              {errors.phone && <ErrorMsg>{errors.phone}</ErrorMsg>}
            </Field>
          </Row>

          <Row>
            <Field>
              <Label htmlFor="date">Дата *</Label>
              <Input
                id="date"
                name="date"
                type="date"
                min={today}
                value={form.date}
                onChange={handleChange}
                $hasError={!!errors.date}
              />
              {errors.date && <ErrorMsg>{errors.date}</ErrorMsg>}
            </Field>
            <Field>
              <Label htmlFor="time">Время *</Label>
              <Select
                id="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                $hasError={!!errors.time}
              >
                <option value="">Выберите время</option>
                {timeSlots.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>
              {errors.time && <ErrorMsg>{errors.time}</ErrorMsg>}
            </Field>
          </Row>

          <Field>
            <Label htmlFor="guests">Количество гостей *</Label>
            <Select
              id="guests"
              name="guests"
              value={form.guests}
              onChange={handleChange}
              $hasError={!!errors.guests}
            >
              <option value="">Выберите</option>
              {guestOptions.map(g => (
                <option key={g} value={g}>{g} {g === '1' ? 'гость' : g === '6+' ? 'гостей' : 'гостя'}</option>
              ))}
            </Select>
            {errors.guests && <ErrorMsg>{errors.guests}</ErrorMsg>}
          </Field>

          <Field>
            <Label htmlFor="comment">Пожелания</Label>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Аллергии, особые пожелания, повод..."
              value={form.comment}
              onChange={handleChange}
              $hasError={false}
            />
          </Field>

          <SubmitBtn type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Отправляем...' : 'Забронировать стол'}
          </SubmitBtn>

          {status === 'success' && (
            <StatusBox $type="success">
              Заявка принята! Мы позвоним вам в течение 30 минут для подтверждения.
            </StatusBox>
          )}
          {status === 'error' && (
            <StatusBox $type="error">
              Произошла ошибка. Пожалуйста, позвоните нам напрямую: +7 (495) 123-45-67
            </StatusBox>
          )}
        </Form>
      </Container>
    </Section>
  )
}
