import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  source?: string
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(28px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10,10,20,0.55);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: ${fadeIn} 0.2s ease;
`

const Box = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radius.xxxl};
  padding: 2.5rem;
  width: 100%;
  max-width: 440px;
  animation: ${slideUp} 0.3s ease;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadow.xl};
`

const CloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gray100};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray600};
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.gray200};
  }
`

const ModalTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.5rem;
`

const ModalSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray600};
  margin-bottom: 1.75rem;
  line-height: 1.6;
`

const FieldLabel = styled.label`
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray700};
  margin-bottom: 0.35rem;
`

const FieldInput = styled.input`
  width: 100%;
  border: 1.5px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.gray900};
  transition: border-color 0.2s;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`

const SubmitBtn = styled.button<{ $loading: boolean }>`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.9rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all 0.2s;
  box-shadow: ${({ theme }) => theme.shadow.purple};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`

const PrivacyNote = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray400};
  text-align: center;
  margin-top: 0.75rem;
  line-height: 1.5;
`

const SuccessWrap = styled.div`
  text-align: center;
  padding: 1rem 0;
`

const SuccessCircle = styled.div`
  width: 64px;
  height: 64px;
  background: ${({ theme }) => theme.colors.greenLight};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  margin: 0 auto 1rem;
`

interface FormState {
  name: string
  phone: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, source = 'Не указано' }) => {
  const [form, setForm] = useState<FormState>({ name: '', phone: '' })
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'Заявка на подключение',
          'Имя': form.name,
          'Телефон': form.phone,
          'Источник интереса': source,
        }),
      })
      setSuccess(true)
    } catch {
      setSuccess(true)
    } finally {
      setLoading(false)
    }
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <Overlay onClick={handleOverlayClick}>
      <Box>
        <CloseBtn onClick={onClose} type="button">✕</CloseBtn>
        {success ? (
          <SuccessWrap>
            <SuccessCircle>✓</SuccessCircle>
            <ModalTitle>Заявка отправлена!</ModalTitle>
            <ModalSubtitle>
              Мы свяжемся с вами в ближайшее время и расскажем, как подключить нужный формат.
            </ModalSubtitle>
          </SuccessWrap>
        ) : (
          <>
            <ModalTitle>Перезвоним вам</ModalTitle>
            <ModalSubtitle>
              Оставьте номер — расскажем о сервисе и поможем выбрать формат подключения.
            </ModalSubtitle>
            <form onSubmit={handleSubmit}>
              <FieldLabel htmlFor="rb-modal-name">Ваше имя</FieldLabel>
              <FieldInput
                id="rb-modal-name"
                type="text"
                placeholder="Как вас зовут?"
                value={form.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                required
              />
              <FieldLabel htmlFor="rb-modal-phone">Телефон</FieldLabel>
              <FieldInput
                id="rb-modal-phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                required
              />
              <SubmitBtn type="submit" $loading={loading} disabled={loading}>
                {loading ? 'Отправка...' : 'Перезвоните мне'}
              </SubmitBtn>
              <PrivacyNote>
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </PrivacyNote>
            </form>
          </>
        )}
      </Box>
    </Overlay>
  )
}

export default Modal
