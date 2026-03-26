import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  padding: 5rem 2rem;
  background: ${({ theme }) => theme.colors.gray900};
  color: white;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: white;
  margin-bottom: 0.75rem;
  max-width: 600px;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: rgba(255,255,255,0.65);
  margin-bottom: 3rem;
  max-width: 560px;
  line-height: 1.7;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div<{ $highlight?: boolean }>`
  background: ${({ $highlight }) => $highlight ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.06)'};
  border: 1px solid ${({ $highlight }) => $highlight ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.1)'};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.5rem;
  transition: all 0.25s;

  &:hover {
    background: rgba(255,255,255,0.1);
    transform: translateY(-3px);
  }
`

const CardIcon = styled.div`
  font-size: 1.75rem;
  margin-bottom: 0.875rem;
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`

const CardDesc = styled.p`
  font-size: 0.85rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.6;
`

const NewTag = styled.span`
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
  background: rgba(250,204,21,0.2);
  color: #FCD34D;
  margin-bottom: 0.75rem;
`

const features = [
  {
    icon: '📅',
    title: 'Годовая подписка «Всё включено»',
    desc: 'Подключитесь на год и получите доступ ко всем продуктам по выгодной цене — без ежемесячных расходов.',
    isNew: false,
  },
  {
    icon: '📂',
    title: 'Документы из других банков',
    desc: 'Загружайте налоговые документы и выписки из любого банка — система учитывает нагрузку в полном объёме.',
    isNew: true,
  },
  {
    icon: '🔗',
    title: 'Интеграции с другими банками',
    desc: 'Подключите счета из других банков для полноценного учёта налоговой нагрузки и корректного расчёта риска.',
    isNew: true,
  },
  {
    icon: '👷',
    title: 'Риски по самозанятым',
    desc: 'Новый модуль для компаний, работающих с самозанятыми: оценка рисков, статус и лимиты под контролем.',
    isNew: true,
  },
  {
    icon: '🔔',
    title: 'Мониторинг изменений',
    desc: 'Уведомления при любых изменениях у ваших контрагентов — смена директора, адреса, статуса.',
    isNew: false,
  },
  {
    icon: '📜',
    title: 'История изменений',
    desc: 'Полная хронология всех событий по каждому контрагенту — видьте, как менялся его профиль риска.',
    isNew: false,
  },
  {
    icon: '💡',
    title: 'Рекомендации по безопасности',
    desc: 'Конкретные советы, а не просто уровень риска. Сервис подсказывает, что сделать, чтобы снизить риск.',
    isNew: false,
  },
  {
    icon: '📄',
    title: 'Загрузка документов по операциям',
    desc: 'Загружайте подтверждающие документы напрямую в систему — они сразу учитываются при расчёте риска.',
    isNew: false,
  },
]

const NewFeatures: React.FC = () => (
  <Section>
    <Container>
      <SectionLabel>Новые возможности</SectionLabel>
      <Title>Что появилось в сервисе</Title>
      <Subtitle>
        Мы постоянно развиваем «Риски бизнеса» — вот что нового появилось
        и что уже доступно в вашем интернет-банке.
      </Subtitle>
      <Grid>
        {features.map(f => (
          <Card key={f.title} $highlight={f.isNew}>
            {f.isNew && <NewTag>Новое</NewTag>}
            <CardIcon>{f.icon}</CardIcon>
            <CardTitle>{f.title}</CardTitle>
            <CardDesc>{f.desc}</CardDesc>
          </Card>
        ))}
      </Grid>
    </Container>
  </Section>
)

export default NewFeatures
