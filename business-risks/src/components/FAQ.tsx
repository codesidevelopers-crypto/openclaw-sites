import React, { useState } from 'react'
import styled from 'styled-components'

const Section = styled.section`
  padding: 5rem 2rem;
  background: ${({ theme }) => theme.colors.gray50};

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const SectionLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
  text-align: center;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 3rem;
  text-align: center;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const Item = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryLight};
  }
`

const Question = styled.button<{ $open: boolean }>`
  width: 100%;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray900};
  text-align: left;
  gap: 1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Chevron = styled.span<{ $open: boolean }>`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ $open, theme }) => $open ? theme.colors.primary : theme.colors.gray100};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $open }) => $open ? 'white' : '#6B7280'};
  font-size: 0.75rem;
  transition: all 0.2s;
  transform: ${({ $open }) => $open ? 'rotate(180deg)' : 'none'};
`

const Answer = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => $open ? '400px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`

const AnswerInner = styled.div`
  padding: 0 1.5rem 1.25rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.7;
`

interface FAQItem {
  q: string
  a: string
}

const faqItems: FAQItem[] = [
  {
    q: 'Зачем нужен сервис «Риски бизнеса»?',
    a: 'Сервис помогает предпринимателям заранее видеть факторы риска по операциям, контрагентам и юридическим событиям. Вместо того чтобы узнавать о проблемах постфактум, вы видите сигналы заблаговременно и можете скорректировать ситуацию.',
  },
  {
    q: 'Кому подойдёт сервис?',
    a: 'Сервис подходит предпринимателям, собственникам бизнеса, бухгалтерам и финансовым менеджерам — тем, кто хочет работать спокойно и прозрачно. Особенно полезен для компаний с активными расчётами, большим числом контрагентов или работой с самозанятыми.',
  },
  {
    q: 'Как выбрать между «Конструктором» и «Всё включено»?',
    a: 'Если вы чётко знаете, какие именно риски для вас критичны — выберите Конструктор и соберите нужный набор. Если хотите полную картину и не думать о том, что можете упустить — берите «Всё включено». Годовая подписка делает его ещё выгоднее.',
  },
  {
    q: 'Чем базовая версия «Рисков по операциям» отличается от полной?',
    a: 'Базовая версия показывает общий уровень риска по счёту и счётчик до повышения риска. Полная версия добавляет: детализацию по типам операций, предупреждения до проведения платежа, загрузку документов (в том числе из других банков) и расширенные рекомендации.',
  },
  {
    q: 'Как учитываются документы из другого банка?',
    a: 'Вы можете загрузить выписки и налоговые документы из любого банка прямо в сервис. Система автоматически учтёт их при расчёте налоговой нагрузки — это даёт более точную картину риска.',
  },
  {
    q: 'Как работают уведомления об изменениях?',
    a: 'Как только у контрагента меняется что-то важное (статус, директор, адрес, появление в реестрах) — вы получаете уведомление в интернет-банке. Для юридических событий (суды, проверки, ФССП) — аналогично: уведомление приходит сразу.',
  },
  {
    q: 'Что такое «Риски по самозанятым»?',
    a: 'Это новый модуль для компаний, которые работают с самозанятыми. Он помогает оценить риски такого сотрудничества, контролировать статус самозанятого и следить за соблюдением лимитов дохода. Полезен тем, кто хочет работать с самозанятыми безопасно.',
  },
  {
    q: 'Как подключить сервис?',
    a: 'Нажмите кнопку «Подключить» на этой странице, оставьте контакт — и мы свяжемся с вами, расскажем о форматах и поможем выбрать подходящий. Подключение происходит прямо в интернет-банке Точки.',
  },
]

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <Section id="faq">
      <Container>
        <SectionLabel>FAQ</SectionLabel>
        <Title>Часто задаваемые вопросы</Title>
        <List>
          {faqItems.map((item, idx) => (
            <Item key={idx}>
              <Question
                $open={open === idx}
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                {item.q}
                <Chevron $open={open === idx}>▼</Chevron>
              </Question>
              <Answer $open={open === idx}>
                <AnswerInner>{item.a}</AnswerInner>
              </Answer>
            </Item>
          ))}
        </List>
      </Container>
    </Section>
  )
}

export default FAQ
