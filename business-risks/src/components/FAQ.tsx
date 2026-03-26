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
    q: 'Чем продуктовые модули отличаются от форматов подключения?',
    a: '«Риски по операциям», «Риски по контрагентам», «Арбитражные дела» и другие — это продуктовые модули: отдельные сервисы с конкретной пользой. «Всё включено» и «Конструктор» — это форматы подключения, то есть способы оплатить доступ к модулям. Это разные уровни: продукты — что вы получаете, форматы — как платите.',
  },
  {
    q: 'Почему в «Конструкторе» нет скидки?',
    a: 'Конструктор — это гибкий формат: вы выбираете только нужные модули и платите за каждый по отдельности. Скидки за объём здесь нет — именно за это вы получаете свободу выбора. Если хотите все модули — «Всё включено» на год даст скидку 30%.',
  },
  {
    q: 'Кому подойдёт сервис?',
    a: 'Сервис подходит предпринимателям, собственникам бизнеса, бухгалтерам и финансовым менеджерам — тем, кто хочет работать спокойно и прозрачно. Особенно полезен для компаний с активными расчётами, большим числом контрагентов или работой с самозанятыми.',
  },
  {
    q: 'Как выбрать между «Конструктором» и «Всё включено»?',
    a: 'Если вы чётко знаете, какие именно риски для вас критичны — выберите Конструктор и соберите нужный набор. Если хотите полную картину и не думать о том, что можете упустить — берите «Всё включено». Годовая подписка «Всё включено» даёт скидку 30%.',
  },
  {
    q: 'Чем базовая версия «Рисков по операциям» отличается от полной?',
    a: 'Базовая версия показывает общий уровень риска по счёту, счётчик до повышения риска, уведомления об изменениях и задачу в интернет-банке при росте риска — и это бесплатно. Полная версия добавляет: детализацию по типам операций, предупреждения до проведения платежа, загрузку документов из других банков, интеграцию с 1С и расширенные рекомендации.',
  },
  {
    q: 'Почему «Судебные дела» — отдельный модуль, а не часть «Арбитражных дел»?',
    a: 'Это принципиально разные судебные системы. Арбитражные суды рассматривают споры между организациями и ИП. Суды общей юрисдикции — дела с участием физических лиц, включая собственников и директоров вашей компании. Смешивать их нельзя — это разные базы, разные уведомления, разные риски.',
  },
  {
    q: 'Что такое «Признаки дробления бизнеса»?',
    a: 'Это новый модуль, который анализирует структуру ваших операций и помогает заметить признаки, которые могут привлечь внимание банка или налоговых органов. Речь о ситуациях, когда бизнес формально разделён на несколько юрлиц, но по операциям выглядит как единое целое. Модуль помогает увидеть это заранее.',
  },
  {
    q: 'Как работает интеграция с 1С?',
    a: 'Полная версия «Рисков по операциям» поддерживает интеграцию с 1С:Бухгалтерия предприятия и 1С:УНФ. Данные о налоговой нагрузке и расходах передаются автоматически — не нужно вручную выгружать документы. Это даёт более точную оценку риска.',
  },
  {
    q: 'Как учитываются документы из другого банка?',
    a: 'В базовой версии вы можете загрузить налоговые документы прямо в сервис. В полной версии — выписки и документы из любого банка, а также через интеграцию с 1С. Система автоматически учтёт полную налоговую нагрузку при расчёте риска.',
  },
  {
    q: 'Что такое «Риски по самозанятым»?',
    a: 'Это модуль для компаний, которые работают с самозанятыми. Он помогает оценить риски такого сотрудничества, контролировать статус самозанятого и следить за соблюдением лимитов дохода. Полезен тем, кто хочет работать с самозанятыми безопасно и не получать претензий от ФНС.',
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
