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
  max-width: 680px;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: rgba(255,255,255,0.7);
  margin-bottom: 2.5rem;
  max-width: 720px;
  line-height: 1.7;
`

const WorkContour = styled.div`
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 1.5rem;
  margin-bottom: 2rem;
`

const ContourGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1rem;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`

const ContourCard = styled.div`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.1rem;
`

const ContourTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.6rem;
`

const ContourText = styled.p`
  font-size: 0.87rem;
  color: rgba(255,255,255,0.72);
  line-height: 1.65;
  margin-bottom: 0.75rem;
`

const ContourList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`

const ContourItem = styled.li`
  font-size: 0.82rem;
  color: rgba(255,255,255,0.82);
  line-height: 1.55;
  display: flex;
  gap: 0.45rem;

  &::before {
    content: '→';
    color: #C4B5FD;
    font-weight: 700;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  color: rgba(255,255,255,0.7);
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
    desc: 'Те же восемь модулей, что и в месячном формате, но с оплатой на год и скидкой 30%.',
    isNew: false,
  },
  {
    icon: '📂',
    title: 'Документы по налогам из другого банка',
    desc: 'Если налоги платятся не в Точке, сервис помогает учесть их при расчёте риска без ручной путаницы.',
    isNew: true,
  },
  {
    icon: '🧾',
    title: 'Документы по другим операциям',
    desc: 'Отдельный сценарий для подтверждающих документов по операциям, которые требуют пояснений.',
    isNew: false,
  },
  {
    icon: '🏦',
    title: 'Интеграции с другими банками',
    desc: 'Т-Банк, Альфа Банк и Модульбанк помогают автоматически учитывать налоговую нагрузку и не подгружать документы регулярно.',
    isNew: true,
  },
  {
    icon: '1️⃣',
    title: '1С:Бухгалтерия предприятия и 1С:УНФ',
    desc: 'После настройки показатели риска можно видеть прямо в 1С через отдельное расширение.',
    isNew: true,
  },
  {
    icon: '💡',
    title: 'Рекомендации и безопасная работа',
    desc: 'Сервис не только показывает сигнал, но и подсказывает, что сделать дальше, чтобы снизить риск.',
    isNew: false,
  },
]

const NewFeatures: React.FC = () => (
  <Section>
    <Container>
      <SectionLabel>Новые возможности и рабочий контур</SectionLabel>
      <Title>Как сервис встраивается в реальную работу компании</Title>
      <Subtitle>
        «Риски бизнеса» не живут отдельно от вашей операционки. Сервис помогает учитывать налоги из других банков,
        загружать документы по разным сценариям и видеть показатели риска там, где вы уже работаете — в интернет-банке и в 1С.
      </Subtitle>

      <WorkContour>
        <ContourGrid>
          <ContourCard>
            <ContourTitle>Если налоги платятся в другом банке</ContourTitle>
            <ContourText>
              Сервис умеет учитывать налоговую нагрузку не только по операциям в Точке. Если налоги уходят через другой банк,
              это можно показать через документы или интеграцию — и тогда расчёт риска становится точнее.
            </ContourText>
            <ContourList>
              <ContourItem>Загрузка документов по налогам — отдельный сценарий</ContourItem>
              <ContourItem>Документы по другим операциям загружаются отдельно</ContourItem>
              <ContourItem>Суммы налогов в интерфейсе не «раздуваются» автоматически — учитывается именно контекст расчёта риска</ContourItem>
              <ContourItem>Интеграции с Т-Банком, Альфа Банком и Модульбанком позволяют меньше работать вручную</ContourItem>
            </ContourList>
          </ContourCard>
          <ContourCard>
            <ContourTitle>Интеграция в 1С и единый рабочий контур</ContourTitle>
            <ContourText>
              Полная версия «Рисков по операциям» поддерживает интеграцию с 1С:Бухгалтерия предприятия и 1С:УНФ.
              После настройки через расширение 1С показатели риска видны прямо внутри привычного рабочего процесса.
            </ContourText>
            <ContourList>
              <ContourItem>1С:Бухгалтерия предприятия</ContourItem>
              <ContourItem>1С:УНФ</ContourItem>
              <ContourItem>Расширение 1С для встраивания показателей риска</ContourItem>
              <ContourItem>Автоматический учёт налоговой нагрузки и меньше ручных пояснений</ContourItem>
            </ContourList>
          </ContourCard>
        </ContourGrid>
      </WorkContour>

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
