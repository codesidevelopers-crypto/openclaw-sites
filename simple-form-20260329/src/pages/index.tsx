import React, { useState, ChangeEvent, FormEvent } from "react";
import styled, { css } from "styled-components";
import type { HeadFC } from "gatsby";

type FormFields = {
  name: string;
  phone: string;
  comment: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

const INITIAL_FORM: FormFields = { name: "", phone: "", comment: "" };

const IndexPage: React.FC = () => {
  const [form, setForm] = useState<FormFields>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Имя: form.name,
          Телефон: form.phone,
          Комментарий: form.comment,
          Источник: "simple-form",
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Page>
      <Card>
        {status === "success" ? (
          <SuccessBlock>
            <SuccessTitle>Заявка отправлена</SuccessTitle>
            <SuccessText>Мы свяжемся с вами в ближайшее время.</SuccessText>
          </SuccessBlock>
        ) : (
          <>
            <CardHeader>
              <Title>Оставьте заявку</Title>
              <Subtitle>Свяжемся с вами и обсудим задачу</Subtitle>
            </CardHeader>

            <Form onSubmit={handleSubmit} noValidate>
              <Field>
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ваше имя"
                  required
                  autoComplete="name"
                />
              </Field>

              <Field>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+7 (___) ___-__-__"
                  required
                  autoComplete="tel"
                />
              </Field>

              <Field>
                <Label htmlFor="comment">Комментарий</Label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  placeholder="Расскажите о вашей задаче"
                  rows={4}
                  autoComplete="off"
                />
              </Field>

              {status === "error" && (
                <ErrorText>Произошла ошибка. Попробуйте ещё раз.</ErrorText>
              )}

              <SubmitButton type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Отправляем…" : "Отправить"}
              </SubmitButton>
            </Form>
          </>
        )}
      </Card>
    </Page>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Оставьте заявку</title>;

/* ─── Layout ─────────────────────────────────────────────── */

const Page = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.xl};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: ${({ theme }) => theme.space.xxl};
  width: 100%;
  max-width: 440px;

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.space.xl};
  }
`;

/* ─── Header ─────────────────────────────────────────────── */

const CardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.font.size.xxl};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  line-height: ${({ theme }) => theme.font.lineHeight.tight};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.font.size.base};
  color: ${({ theme }) => theme.colors.muted};
  line-height: ${({ theme }) => theme.font.lineHeight.base};
`;

/* ─── Form ───────────────────────────────────────────────── */

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const inputBase = css`
  width: 100%;
  font-family: inherit;
  font-size: ${({ theme }) => theme.font.size.base};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.625rem ${({ theme }) => theme.space.md};
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
    opacity: 0.7;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent}22;
  }
`;

const Input = styled.input`
  ${inputBase}
`;

const Textarea = styled.textarea`
  ${inputBase}
  resize: vertical;
  min-height: 96px;
  line-height: ${({ theme }) => theme.font.lineHeight.base};
`;

/* ─── Actions ────────────────────────────────────────────── */

const SubmitButton = styled.button`
  width: 100%;
  font-family: inherit;
  font-size: ${({ theme }) => theme.font.size.base};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: #ffffff;
  background: ${({ theme }) => theme.colors.accent};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.75rem ${({ theme }) => theme.space.xl};
  cursor: pointer;
  transition: background 0.15s ease, opacity 0.15s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accentHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.errorText};
`;

/* ─── Success ────────────────────────────────────────────── */

const SuccessBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.md} 0;
`;

const SuccessTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  color: ${({ theme }) => theme.colors.successText};
`;

const SuccessText = styled.p`
  font-size: ${({ theme }) => theme.font.size.base};
  color: ${({ theme }) => theme.colors.muted};
`;
