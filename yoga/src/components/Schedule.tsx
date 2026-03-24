import React, { useState } from 'react'
import styled from 'styled-components'

interface ClassEntry {
  time: string
  name: string
}

interface DaySchedule {
  day: string
  shortDay: string
  classes: ClassEntry[]
}

const schedule: DaySchedule[] = [
  {
    day: 'Понедельник',
    shortDay: 'Пн',
    classes: [
      { time: '07:00', name: 'Хатха-йога' },
      { time: '10:00', name: 'Виньяса' },
      { time: '18:30', name: 'Для начинающих' },
      { time: '20:00', name: 'Медитация' },
    ],
  },
  {
    day: 'Вторник',
    shortDay: 'Вт',
    classes: [
      { time: '07:00', name: 'Аштанга' },
      { time: '12:00', name: 'Растяжка' },
      { time: '18:30', name: 'Хатха-йога' },
      { time: '20:00', name: 'Виньяса' },
    ],
  },
  {
    day: 'Среда',
    shortDay: 'Ср',
    classes: [
      { time: '07:00', name: 'Хатха-йога' },
      { time: '10:00', name: 'Для начинающих' },
      { time: '18:30', name: 'Виньяса' },
      { time: '20:00', name: 'Растяжка' },
    ],
  },
  {
    day: 'Четверг',
    shortDay: 'Чт',
    classes: [
      { time: '07:00', name: 'Аштанга' },
      { time: '12:00', name: 'Медитация' },
      { time: '18:30', name: 'Хатха-йога' },
      { time: '20:00', name: 'Виньяса' },
    ],
  },
  {
    day: 'Пятница',
    shortDay: 'Пт',
    classes: [
      { time: '07:00', name: 'Хатха-йога' },
      { time: '10:00', name: 'Виньяса' },
      { time: '18:30', name: 'Растяжка' },
      { time: '20:00', name: 'Медитация' },
    ],
  },
  {
    day: 'Суббота',
    shortDay: 'Сб',
    classes: [
      { time: '09:00', name: 'Виньяса' },
      { time: '11:00', name: 'Хатха-йога' },
      { time: '13:00', name: 'Для начинающих' },
    ],
  },
  {
    day: 'Воскресенье',
    shortDay: 'Вс',
    classes: [
      { time: '10:00', name: 'Медитация' },
      { time: '12:00', name: 'Растяжка' },
    ],
  },
]

const classColors: Record<string, string> = {
  'Хатха-йога': '#7A9E7E',
  'Виньяса': '#B8955A',
  'Аштанга': '#8A6A9A',
  'Для начинающих': '#5A8A9E',
  'Медитация': '#9E7A5A',
  'Растяжка': '#6A9A8A',
}

const Section = styled.section`
  background: ${({ theme }) => theme.colors.bgLight};
  padding: 120px 48px;

  @media (max-width: 768px) {
    padding: 80px 24px;
  }
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
`

const Eyebrow = styled.div`
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    opacity: 0.6;
  }
`

const SectionTitle = styled.h2`
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 0.04em;
`

const TabsWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

const DayTabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  margin-bottom: 0;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`

const DayTab = styled.button<{ $active: boolean }>`
  flex: 1;
  min-width: 80px;
  padding: 16px 12px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.78rem;
  font-weight: ${({ $active }) => ($active ? '500' : '400')};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.textDarkMuted)};
  border-bottom: 2px solid ${({ $active, theme }) => ($active ? theme.colors.accent : 'transparent')};
  margin-bottom: -1px;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`

const DayContent = styled.div`
  background: white;
  padding: 8px 0;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-top: none;
`

const ClassRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 20px 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  transition: background 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.bgLightCard};
  }
`

const ClassTime = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textDark};
  min-width: 64px;
  letter-spacing: 0.02em;
`

const ClassDot = styled.div<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`

const ClassName = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textDark};
  flex: 1;
`

const ClassBadge = styled.span<{ $color: string }>`
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color}60;
  padding: 4px 10px;
`

export const Schedule: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(0)
  const current = schedule[activeDay]

  return (
    <Section id="schedule">
      <SectionHeader>
        <Eyebrow>Недельная программа</Eyebrow>
        <SectionTitle>Расписание</SectionTitle>
      </SectionHeader>
      <TabsWrapper>
        <DayTabs>
          {schedule.map((day, i) => (
            <DayTab
              key={day.shortDay}
              $active={i === activeDay}
              onClick={() => setActiveDay(i)}
            >
              {day.shortDay}
            </DayTab>
          ))}
        </DayTabs>
        <DayContent>
          {current.classes.map((cls) => (
            <ClassRow key={`${cls.time}-${cls.name}`}>
              <ClassTime>{cls.time}</ClassTime>
              <ClassDot $color={classColors[cls.name] ?? '#B8955A'} />
              <ClassName>{cls.name}</ClassName>
              <ClassBadge $color={classColors[cls.name] ?? '#B8955A'}>
                {cls.time.startsWith('07') || cls.time.startsWith('09') || cls.time.startsWith('10') || cls.time.startsWith('11') || cls.time.startsWith('12') || cls.time.startsWith('13')
                  ? 'Утро / День'
                  : 'Вечер'}
              </ClassBadge>
            </ClassRow>
          ))}
        </DayContent>
      </TabsWrapper>
    </Section>
  )
}
