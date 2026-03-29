import React, { useState } from 'react';
import styled from 'styled-components';

interface FormFields {
  Имя: string;
  Телефон: string;
  Сообщение: string;
  Источник: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 480px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 3rem 2.5rem;
  }
`;

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 0.5rem;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 2rem;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.625rem 0.875rem;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.bgAlt};
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition: border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
    background: ${({ theme }) => theme.colors.bg};
  }
`;

const Textarea = styled.textarea`
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.625rem 0.875rem;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.bgAlt};
  outline: none;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 100px;
  transition: border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
    background: ${({ theme }) => theme.colors.bg};
  }
`;

const SubmitButton = styled.button<{ $loading: boolean }>`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: ${({ theme, $loading }) =>
    $loading ? theme.colors.textMuted : theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
  transition: background ${({ theme }) => theme.transitions.base};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.7;
  }
`;

const Alert = styled.div<{ $variant: 'success' | 'error' }>`
  padding: 0.875rem 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  background: ${({ theme, $variant }) =>
    $variant === 'success' ? theme.colors.successBg : theme.colors.errorBg};
  color: ${({ theme, $variant }) =>
    $variant === 'success' ? theme.colors.success : theme.colors.error};
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === 'success' ? theme.colors.successBorder : theme.colors.errorBorder};
`;

const INITIAL: FormFields = {
  Имя: '',
  Телефон: '',
  Сообщение: '',
  Источник: 'Форма сайта',
};

const ContactForm: React.FC = () => {
  const [fields, setFields] = useState<FormFields>(INITIAL);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(text || `Ошибка сервера: ${response.status}`);
      }

      setStatus('success');
      setFields(INITIAL);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Не удалось отправить заявку.';
      setErrorMessage(message);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <Card>
        <Heading>Заявка отправлена</Heading>
        <Alert $variant="success">
          Спасибо! Мы получили вашу заявку и скоро свяжемся с вами.
        </Alert>
      </Card>
    );
  }

  return (
    <Card>
      <Heading>Оставьте заявку</Heading>
      <Subtitle>Заполните форму, и мы свяжемся с вами в ближайшее время.</Subtitle>

      <form onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="Источник" value={fields.Источник} />

        <FieldGroup>
          <Label>
            Имя
            <Input
              type="text"
              name="Имя"
              value={fields.Имя}
              onChange={handleChange}
              placeholder="Иван Иванов"
              required
              autoComplete="name"
            />
          </Label>

          <Label>
            Телефон
            <Input
              type="tel"
              name="Телефон"
              value={fields.Телефон}
              onChange={handleChange}
              placeholder="+7 999 000-00-00"
              required
              autoComplete="tel"
            />
          </Label>

          <Label>
            Сообщение
            <Textarea
              name="Сообщение"
              value={fields.Сообщение}
              onChange={handleChange}
              placeholder="Опишите ваш вопрос или задачу"
            />
          </Label>
        </FieldGroup>

        {status === 'error' && (
          <Alert $variant="error" style={{ marginBottom: '1rem' }}>
            Не удалось отправить заявку. {errorMessage}
          </Alert>
        )}

        <SubmitButton
          type="submit"
          disabled={status === 'loading'}
          $loading={status === 'loading'}
        >
          {status === 'loading' ? 'Отправка…' : 'Отправить заявку'}
        </SubmitButton>
      </form>
    </Card>
  );
};

export default ContactForm;
