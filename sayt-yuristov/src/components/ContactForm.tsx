import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  name: string
  phone: string
  email: string
  type: string
  description: string
}

const INITIAL_FORM: FormData = {
  name: '',
  phone: '',
  email: '',
  type: '',
  description: '',
}

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 2rem;
  background: ${({ theme }) => theme.colors.bgDeep};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.accent}, transparent);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 5rem 1.25rem;
  }
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const LeftCol = styled.div``

const SectionEyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
`

const GoldBar = styled.span`
  display: block;
  width: 40px;
  height: 2px;
  background: ${({ theme }) => theme.colors.accent};
`

const EyebrowText = styled.span`
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.15;
  margin-bottom: 1.5rem;

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.accent};
  }
`

const SectionDesc = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
  margin-bottom: 2.5rem;
`

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  transition: color 0.2s ease;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.borderGold};
  }
`

const ContactIcon = styled.span`
  font-size: 1.1rem;
  width: 32px;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDim};
`

const inputStyles = `
  width: 100%;
  padding: 0.9rem 1rem;
  background: rgba(15, 53, 48, 0.5);
  border: 1px solid;
  font-size: 0.9rem;
  line-height: 1.5;
  outline: none;
  transition: all 0.2s ease;
  appearance: none;
`

const Input = styled.input`
  ${inputStyles}
  border-color: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder { color: ${({ theme }) => theme.colors.textDim}; }

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderGold};
    background: rgba(15, 53, 48, 0.8);
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.08);
  }
`

const Select = styled.select`
  ${inputStyles}
  border-color: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.bgCard};
  cursor: pointer;

  option { background: ${({ theme }) => theme.colors.bgCard}; }

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderGold};
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.08);
  }
`

const Textarea = styled.textarea`
  ${inputStyles}
  border-color: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  min-height: 120px;

  &::placeholder { color: ${({ theme }) => theme.colors.textDim}; }

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderGold};
    background: rgba(15, 53, 48, 0.8);
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.08);
  }
`

const SubmitBtn = styled.button<{ $loading: boolean }>`
  padding: 1.1rem 2.5rem;
  background: ${({ theme, $loading }) => ($loading ? theme.colors.accentDark : theme.colors.accent)};
  color: ${({ theme }) => theme.colors.bgDeep};
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none;
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  width: 100%;
  animation: ${({ $loading }) => ($loading ? pulse : 'none')} 1.5s ease infinite;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accentLight};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.goldStrong};
  }
`

const SuccessMsg = styled.div`
  padding: 1.5rem 2rem;
  background: rgba(76, 175, 130, 0.12);
  border: 1px solid rgba(76, 175, 130, 0.4);
  text-align: center;

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.success};
    font-weight: 500;
  }

  span {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-top: 0.5rem;
    display: block;
  }
`

const ErrorMsg = styled.div`
  padding: 1rem 1.25rem;
  background: rgba(224, 84, 84, 0.1);
  border: 1px solid rgba(224, 84, 84, 0.35);
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.error};
`

const formatPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, '').replace(/^8/, '7')
  if (!digits.startsWith('7')) return raw

  const d = digits.slice(1)
  let result = '+7'
  if (d.length > 0) result += ` (${d.slice(0, 3)}`
  if (d.length >= 3) result += `) ${d.slice(3, 6)}`
  if (d.length >= 6) result += `-${d.slice(6, 8)}`
  if (d.length >= 8) result += `-${d.slice(8, 10)}`
  return result
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [status, setStatus] = useState<FormStatus>('idle')
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const el = sectionRef.current
    if (el) {
      el.querySelectorAll('.animate-on-scroll').forEach((item) => observer.observe(item))
    }

    return () => observer.disconnect()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target
    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, phone: formatPhone(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setStatus('loading')

    const payload = {
      form: 'Обратная связь',
      Имя: formData.name,
      Телефон: formData.phone,
      Email: formData.email,
      'Тип обращения': formData.type,
      'Описание проблемы': formData.description || '—',
    }

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setStatus('success')
        setFormData(INITIAL_FORM)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" ref={sectionRef}>
      <Inner>
        <LeftCol>
          <SectionEyebrow className="animate-on-scroll">
            <GoldBar />
            <EyebrowText>Свяжитесь с нами</EyebrowText>
          </SectionEyebrow>
          <SectionTitle className="animate-on-scroll">
            Расскажите о вашей <em>ситуации</em>
          </SectionTitle>
          <SectionDesc className="animate-on-scroll">
            Первая консультация — бесплатно. Мы изучим вашу ситуацию и ответим
            в течение 2 часов в рабочее время.
          </SectionDesc>

          <ContactInfo className="animate-on-scroll">
            <ContactItem href="tel:+74951234567">
              <ContactIcon>📞</ContactIcon>
              +7 (495) 123-45-67
            </ContactItem>
            <ContactItem href="mailto:info@voronov-law.ru">
              <ContactIcon>✉️</ContactIcon>
              info@voronov-law.ru
            </ContactItem>
            <ContactItem href="#">
              <ContactIcon>📍</ContactIcon>
              Москва, ул. Пречистенка, д. 10, офис 301
            </ContactItem>
            <ContactItem href="#">
              <ContactIcon>🕐</ContactIcon>
              Пн–Пт: 9:00–20:00, Сб: 10:00–16:00
            </ContactItem>
          </ContactInfo>
        </LeftCol>

        <div className="animate-on-scroll">
          {status === 'success' ? (
            <SuccessMsg>
              <p>✓ Спасибо! Мы свяжемся с вами в течение 2 часов.</p>
              <span>Ваша заявка принята и передана специалисту.</span>
            </SuccessMsg>
          ) : (
            <Form onSubmit={handleSubmit} noValidate>
              <Row>
                <FieldWrap>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Иван Петров"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FieldWrap>
                <FieldWrap>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </FieldWrap>
              </Row>

              <FieldWrap>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ivan@mail.ru"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FieldWrap>

              <FieldWrap>
                <Label htmlFor="type">Тип обращения *</Label>
                <Select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Выберите категорию...</option>
                  <option value="Гражданский спор">Гражданский спор</option>
                  <option value="Корпоративное">Корпоративное право</option>
                  <option value="Семейное">Семейное право</option>
                  <option value="Недвижимость">Недвижимость</option>
                  <option value="Уголовное">Уголовная защита</option>
                  <option value="Трудовое">Трудовые споры</option>
                  <option value="Другое">Другое</option>
                </Select>
              </FieldWrap>

              <FieldWrap>
                <Label htmlFor="description">Опишите ситуацию</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Кратко опишите вашу ситуацию и вопрос..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </FieldWrap>

              {status === 'error' && (
                <ErrorMsg>
                  Произошла ошибка при отправке. Позвоните нам по телефону или попробуйте позже.
                </ErrorMsg>
              )}

              <SubmitBtn
                type="submit"
                $loading={status === 'loading'}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
              </SubmitBtn>
            </Form>
          )}
        </div>
      </Inner>
    </Section>
  )
}

export default ContactForm
