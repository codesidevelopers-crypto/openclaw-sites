import React from 'react'
import styled from 'styled-components'

interface LegalRisksProps {
  onCtaClick: (source: string) => void
}

const Section = styled.section`
  padding: 5rem 2rem;
  background: ${({ theme }) => theme.colors.gray50};

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div`
  margin-bottom: 3rem;
`

const SectionLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.75rem;
  max-width: 700px;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray600};
  max-width: 720px;
  line-height: 1.7;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.75rem;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  transition: all 0.25s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.lg};
    transform: translateY(-3px);
  }
`

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.75rem;
`

const CardDesc = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.65;
  margin-bottom: 1rem;
`

const CardFeatures = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`

const CardFeature = styled.li`
  font-size: 0.83rem;
  color: ${({ theme }) => theme.colors.gray700};
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  line-height: 1.55;

  &::before {
    content: '→';
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
    font-weight: 700;
  }
`

const UseCase = styled.div`
  background: ${({ theme }) => theme.colors.primaryLighter};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 0.9rem 1rem;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.gray800};
  line-height: 1.6;
  margin-bottom: 1rem;
`

const CardBtn = styled.button`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  padding: 0;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`

const cards = [
  {
    icon: '🏛️',
    title: 'Надзорные органы',
    desc: 'Отслеживает плановые проверки, профилактические визиты и другие контрольные события. Полезно, если важно заранее понять, что может потребовать подготовки, документов и внимания команды.',
    features: [
      'Что отслеживаем: проверки и профилактические визиты по вашей компании',
      'О чём предупреждаем: о новых событиях и изменениях в контрольной активности',
      'Чем полезно: можно заранее собрать документы и подготовить ответственных',
      'Почему важно узнать заранее: проверка, о которой узнали постфактум, уже сжимает время на реакцию',
    ],
    useCase: 'Сценарий: предприниматель узнаёт о профилактическом визите заранее и успевает подготовить документы и внутренние процессы, а не собирает всё в спешке в последний момент.',
  },
  {
    icon: '⚖️',
    title: 'Арбитражные дела',
    desc: 'Следит за арбитражными судами по вашей компании и контрагентам. Это отдельный модуль для бизнес-споров между организациями и ИП — с понятными уведомлениями о новых исках и движении дел.',
    features: [
      'Что отслеживаем: арбитражные дела по компании и выбранным контрагентам',
      'О чём предупреждаем: новый иск, изменение статуса дела, новые события в карточке',
      'Чем полезно: можно заранее оценить риск сделки или понять, что происходит у партнёра',
      'Почему важно узнать заранее: новый иск у контрагента лучше заметить до перевода денег, а не после',
    ],
    useCase: 'Сценарий: перед крупной оплатой вы видите, что у поставщика появился новый арбитражный спор, и можете перепроверить условия сделки или запросить дополнительные документы.',
  },
  {
    icon: '📋',
    title: 'Судебные дела',
    desc: 'Отдельно отслеживает суды общей юрисдикции. Это не арбитраж: здесь могут появляться дела с участием физических лиц, директоров, собственников и других связанных лиц — поэтому модуль вынесен отдельно.',
    features: [
      'Что отслеживаем: судебные дела в судах общей юрисдикции',
      'О чём предупреждаем: о новых делах и изменениях в уже найденных карточках',
      'Чем полезно: помогает не пропустить события, которые могут косвенно влиять на бизнес и репутацию',
      'Почему важно узнать заранее: такие сигналы лучше увидеть до того, как они превращаются в операционную проблему',
    ],
    useCase: 'Сценарий: у собственника или директора появляется новое судебное дело — вы видите это заранее и понимаете, что ситуация может потребовать внимания, пока она ещё не ударила по расчётам и партнёрам.',
  },
  {
    icon: '📂',
    title: 'Исполнительные производства',
    desc: 'Следит за появлением новых производств в базе ФССП. Это помогает заранее понимать, что происходит с вашей компанией или контрагентом, и не узнавать об этом уже после репутационных и операционных последствий.',
    features: [
      'Что отслеживаем: новые исполнительные производства и изменения по уже найденным',
      'О чём предупреждаем: о появлении в базе ФССП и обновлениях карточек',
      'Чем полезно: помогает оценить репутационный и операционный риск до сделки или во время работы с партнёром',
      'Почему важно узнать заранее: лучше узнать о производстве до платежа, а не когда это уже влияет на отношения с партнёрами',
    ],
    useCase: 'Сценарий: у контрагента появляется новое исполнительное производство — сервис предупреждает об этом до очередного платежа, и вы успеваете перепроверить партнёра.',
  },
]

const LegalRisks: React.FC<LegalRisksProps> = ({ onCtaClick }) => (
  <Section>
    <Container>
      <Header>
        <SectionLabel>Юридические и событийные риски</SectionLabel>
        <Title>Четыре отдельных модуля — чтобы не смешивать разные источники риска</Title>
        <Subtitle>
          Надзорные органы, арбитражные дела, судебные дела и исполнительные производства — это разные типы событий.
          Важно понимать, что именно произошло, о чём сервис предупреждает и почему лучше узнать об этом заранее, а не постфактум.
        </Subtitle>
      </Header>
      <Grid>
        {cards.map(c => (
          <Card key={c.title}>
            <CardIcon>{c.icon}</CardIcon>
            <CardTitle>{c.title}</CardTitle>
            <CardDesc>{c.desc}</CardDesc>
            <CardFeatures>
              {c.features.map(f => <CardFeature key={f}>{f}</CardFeature>)}
            </CardFeatures>
            <UseCase>{c.useCase}</UseCase>
            <CardBtn onClick={() => onCtaClick(c.title)}>Подключить →</CardBtn>
          </Card>
        ))}
      </Grid>
    </Container>
  </Section>
)

export default LegalRisks
