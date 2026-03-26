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
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: ${fadeIn} 0.2s ease;
`

const Box = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 2.5rem;
  width: 100%;
  max-width: 440px;
  animation: ${slideUp} 0.3s ease;
  position: relative;
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
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray600};
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.gray200};
  }
`

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray600};
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray700};
  margin-bottom: 0.35rem;
`

const Input = styled.input`
  width: 100%;
  border: 1.5px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.gray900};
  transition: border-color 0.2s;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const SubmitBtn = styled.button<{ $loading: boolean }>`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: background 0.2s, transform 0.1s;
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`

const SuccessBox = styled.div`
  text-align: center;
  padding: 1rem 0;
`

const SuccessIcon = styled.div`
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
  interest: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, source = 'Не указано' }) => {
  const [form, setForm] = useState<FormState>({ name: '', phone: '', interest: source })
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
          'Тип интереса': form.interest || source,
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
    <Overlay onClick={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) onClose() }}>
      <Box>
        <CloseBtn onClick={onClose}>✕</CloseBtn>
        {success ? (
          <SuccessBox>
            <SuccessIcon>✓</SuccessIcon>
            <Title>Заявка отправлена!</Title>
            <Subtitle>Мы свяжемся с вами в ближайшее время и расскажем, как подключить сервис.</Subtitle>
          </SuccessBox>
        ) : (
          <>
            <Title>Перезвоните мне</Title>
            <Subtitle>Оставьте номер — мы расскажем о сервисе и поможем выбрать формат.</Subtitle>
            <form onSubmit={handleSubmit}>
              <Label htmlFor="modal-name">Имя</Label>
              <Input
                id="modal-name"
                type="text"
                placeholder="Ваше имя"
                value={form.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <Label htmlFor="modal-phone">Телефон</Label>
              <Input
                id="modal-phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, phone: e.target.value }))}
                required
              />
              <SubmitBtn type="submit" $loading={loading} disabled={loading}>
                {loading ? 'Отправка...' : 'Перезвоните мне'}
              </SubmitBtn>
            </form>
          </>
        )}
      </Box>
    </Overlay>
  )
}

export default Modal
