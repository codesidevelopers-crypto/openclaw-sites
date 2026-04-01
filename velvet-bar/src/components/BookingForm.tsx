import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const Section = styled.section`
  padding: 6rem 2rem;
  background: radial-gradient(ellipse at 50% 100%, ${({ theme }) => theme.colors.burgundy} 0%, ${({ theme }) => theme.colors.bg} 60%);

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const Container = styled.div`
  max-width: 580px;
  margin: 0 auto;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`

const Tag = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
`

const Title = styled.h2`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray600};
`

const FormCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 2.5rem;

  @media (max-width: 540px) {
    padding: 1.5rem;
  }
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const Field = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray800};
  margin-bottom: 0.35rem;
`

const Input = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.gray100};
  border: 1.5px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.gray900};
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }
`

const Textarea = styled.textarea`
  width: 100%;
  background: ${({ theme }) => theme.colors.gray100};
  border: 1.5px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.gray900};
  transition: border-color 0.2s;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }
`

const SubmitBtn = styled.button<{ $loading: boolean }>`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 1rem;
  font-size: 1.05rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all 0.2s;
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  box-shadow: ${({ theme }) => theme.shadow.neon};
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.neonStrong};
  }
`

const SuccessBox = styled.div`
  text-align: center;
  padding: 2rem 0;
  animation: ${fadeIn} 0.4s ease;
`

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  background: ${({ theme }) => theme.colors.successLight};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  margin: 0 auto 1rem;
`

const SuccessTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.5rem;
`

const SuccessText = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray600};
`

interface FormState {
  name: string
  phone: string
  date: string
  time: string
  guests: string
  comment: string
}

const initialForm: FormState = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: '',
  comment: '',
}

const BookingForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialForm)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'Бронирование столика',
          'Имя': form.name,
          'Телефон': form.phone,
          'Дата': form.date,
          'Время': form.time,
          'Количество гостей': form.guests,
          'Комментарий': form.comment,
        }),
      })
      setSuccess(true)
    } catch {
      setSuccess(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section id="booking">
      <Container>
        <Header>
          <Tag>Бронирование</Tag>
          <Title>Забронировать столик</Title>
          <Subtitle>Заполните форму — мы подтвердим бронь в течение 15 минут</Subtitle>
        </Header>
        <FormCard>
          {success ? (
            <SuccessBox>
              <SuccessIcon>✓</SuccessIcon>
              <SuccessTitle>Столик забронирован!</SuccessTitle>
              <SuccessText>Мы отправим подтверждение на ваш телефон. До встречи в Velvet!</SuccessText>
            </SuccessBox>
          ) : (
            <form onSubmit={handleSubmit}>
              <Field>
                <Label htmlFor="booking-name">Имя</Label>
                <Input
                  id="booking-name"
                  type="text"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={handleChange('name')}
                  required
                />
              </Field>
              <Field>
                <Label htmlFor="booking-phone">Телефон</Label>
                <Input
                  id="booking-phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  required
                />
              </Field>
              <Row>
                <Field>
                  <Label htmlFor="booking-date">Дата</Label>
                  <Input
                    id="booking-date"
                    type="date"
                    value={form.date}
                    onChange={handleChange('date')}
                    required
                  />
                </Field>
                <Field>
                  <Label htmlFor="booking-time">Время</Label>
                  <Input
                    id="booking-time"
                    type="time"
                    value={form.time}
                    onChange={handleChange('time')}
                    required
                  />
                </Field>
              </Row>
              <Field>
                <Label htmlFor="booking-guests">Количество гостей</Label>
                <Input
                  id="booking-guests"
                  type="number"
                  placeholder="2"
                  min="1"
                  max="20"
                  value={form.guests}
                  onChange={handleChange('guests')}
                  required
                />
              </Field>
              <Field>
                <Label htmlFor="booking-comment">Комментарий</Label>
                <Textarea
                  id="booking-comment"
                  placeholder="Особые пожелания, повод, предпочтения по зоне..."
                  value={form.comment}
                  onChange={handleChange('comment')}
                />
              </Field>
              <SubmitBtn type="submit" $loading={loading} disabled={loading}>
                {loading ? 'Отправка...' : 'Забронировать столик'}
              </SubmitBtn>
            </form>
          )}
        </FormCard>
      </Container>
    </Section>
  )
}

export default BookingForm
