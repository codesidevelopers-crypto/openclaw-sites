import React from 'react'
import styled from 'styled-components'

interface FormatsProps {
  onCtaClick: (source: string) => void
}

const Section = styled.section`
  padding: 5rem 2rem;
  background: white;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

const Container = styled.div`
  max-width: 1100px;
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
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 0.75rem;
  text-align: center;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray600};
  margin-bottom: 3rem;
  text-align: center;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div<{ $featured?: boolean }>`
  background: ${({ $featured, theme }) => $featured ? theme.colors.primary : theme.colors.gray50};
  border: 2px solid ${({ $featured, theme }) => $featured ? theme.colors.primary : theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xxl};
  padding: 2rem;
  position: relative;
  transition: all 0.25s;

  &:hover {
    transform: ${({ $featured }) => $featured ? 'translateY(-4px)' : 'translateY(-2px)'};
    box-shadow: ${({ $featured, theme }) => $featured ? '0 20px 48px rgba(124,58,237,0.3)' : theme.shadow.md};
  }
`

const PopularBadge = styled.div`
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: #F59E0B;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.3rem 1rem;
  border-radius: 99px;
  white-space: nowrap;
`

const CardTitle = styled.h3<{ $featured?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.35rem;
  font-weight: 800;
  color: ${({ $featured }) => $featured ? 'white' : undefined};
  color: ${({ $featured, theme }) => $featured ? 'white' : theme.colors.gray900};
  margin-bottom: 0.5rem;
`

const CardSubtitle = styled.p<{ $featured?: boolean }>`
  font-size: 0.875rem;
  color: ${({ $featured }) => $featured ? 'rgba(255,255,255,0.75)' : undefined};
  color: ${({ $featured, theme }) => $featured ? 'rgba(255,255,255,0.75)' : theme.colors.gray600};
  margin-bottom: 1.5rem;
  line-height: 1.5;
`

const Divider = styled.div<{ $featured?: boolean }>`
  height: 1px;
  background: ${({ $featured }) => $featured ? 'rgba(255,255,255,0.15)' : undefined};
  background: ${({ $featured, theme }) => $featured ? 'rgba(255,255,255,0.15)' : theme.colors.gray200};
  margin-bottom: 1.25rem;
`

const FeatureList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-bottom: 2rem;
`

const FeatureItem = styled.li<{ $featured?: boolean }>`
  font-size: 0.875rem;
  color: ${({ $featured }) => $featured ? 'rgba(255,255,255,0.9)' : undefined};
  color: ${({ $featured, theme }) => $featured ? 'rgba(255,255,255,0.9)' : theme.colors.gray700};
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;

  &::before {
    content: '✓';
    color: ${({ $featured }) => $featured ? '#A5F3FC' : undefined};
    color: ${({ $featured, theme }) => $featured ? '#A5F3FC' : theme.colors.primary};
    font-weight: 700;
    flex-shrink: 0;
  }
`

const Btn = styled.button<{ $featured?: boolean }>`
  width: 100%;
  background: ${({ $featured }) => $featured ? 'white' : undefined};
  background: ${({ $featured, theme }) => $featured ? 'white' : theme.colors.primary};
  color: ${({ $featured }) => $featured ? undefined : 'white'};
  color: ${({ $featured, theme }) => $featured ? theme.colors.primary : 'white'};
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`

const Formats: React.FC<FormatsProps> = ({ onCtaClick }) => (
  <Section id="formats">
    <Container>
      <SectionLabel>Форматы подключения</SectionLabel>
      <Title>Выберите подходящий формат</Title>
      <Subtitle>
        Подключите только нужное или возьмите сразу всю экосистему —
        выбор за вами.
      </Subtitle>
      <Grid>
        <Card>
          <CardTitle>Отдельные сервисы</CardTitle>
          <CardSubtitle>Для тех, кто хочет начать с одного продукта и попробовать</CardSubtitle>
          <Divider />
          <FeatureList>
            <FeatureItem>Любой продукт по отдельности</FeatureItem>
            <FeatureItem>Риски по операциям (базовая)</FeatureItem>
            <FeatureItem>Риски по контрагентам</FeatureItem>
            <FeatureItem>Юридические сервисы</FeatureItem>
            <FeatureItem>Подключение в любой момент</FeatureItem>
          </FeatureList>
          <Btn onClick={() => onCtaClick('Отдельные сервисы')}>
            Выбрать сервис
          </Btn>
        </Card>
        <Card $featured style={{ marginTop: '-12px' }}>
          <PopularBadge>★ Самый выгодный</PopularBadge>
          <CardTitle $featured>Всё включено</CardTitle>
          <CardSubtitle $featured>
            Весь набор продуктов одной подпиской. Годовой тариф — выгоднее всего.
          </CardSubtitle>
          <Divider $featured />
          <FeatureList>
            <FeatureItem $featured>Все 6 продуктов сразу</FeatureItem>
            <FeatureItem $featured>Риски по операциям (полная версия)</FeatureItem>
            <FeatureItem $featured>Безлимитные проверки контрагентов</FeatureItem>
            <FeatureItem $featured>Юридические сервисы</FeatureItem>
            <FeatureItem $featured>Риски по самозанятым</FeatureItem>
            <FeatureItem $featured>Годовая подписка со скидкой</FeatureItem>
            <FeatureItem $featured>Приоритетная поддержка</FeatureItem>
          </FeatureList>
          <Btn $featured onClick={() => onCtaClick('Всё включено')}>
            Подключить сейчас
          </Btn>
        </Card>
        <Card>
          <CardTitle>Конструктор</CardTitle>
          <CardSubtitle>Соберите набор под задачи вашего бизнеса — платите только за нужное</CardSubtitle>
          <Divider />
          <FeatureList>
            <FeatureItem>Любая комбинация продуктов</FeatureItem>
            <FeatureItem>Выгоднее покупки по отдельности</FeatureItem>
            <FeatureItem>Добавляйте модули в любой момент</FeatureItem>
            <FeatureItem>Гибкая настройка под бизнес</FeatureItem>
            <FeatureItem>Единый счёт и управление</FeatureItem>
          </FeatureList>
          <Btn onClick={() => onCtaClick('Конструктор')}>
            Собрать конструктор
          </Btn>
        </Card>
      </Grid>
    </Container>
  </Section>
)

export default Formats
