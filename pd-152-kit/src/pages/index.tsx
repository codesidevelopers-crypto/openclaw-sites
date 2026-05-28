import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyles } from '../styles/GlobalStyles';
import { theme } from '../styles/theme';

type PricingTier = 'Базовый' | 'Стандарт' | 'Расширенный' | 'Не знаю';
type FormStep = 1 | 2 | 3;
type NeedType = 'site_docs' | 'rkn_notice' | 'full_package' | 'not_sure';
type PaymentIntent = 'yes' | 'need_price' | 'researching';
type YesNoUnsure = 'Да' | 'Нет' | 'Не уверен';
type NoticeStatus = 'Да' | 'Нет' | 'Не знаю';

type StepOneData = {
  name: string;
  phone: string;
  email: string;
  website: string;
  inn: string;
  selectedTariff: PricingTier;
};

type StepTwoData = {
  hasForms: YesNoUnsure;
  usesTools: YesNoUnsure;
  hasEmployees: YesNoUnsure;
  filedNoticeBefore: NoticeStatus;
  needType: NeedType;
  paymentIntent: PaymentIntent;
};

type FormMeta = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  referrer: string;
  page_url: string;
};

type FullFormPayload = StepOneData & StepTwoData & FormMeta;

type AnalyticsEventName =
  | 'page_view'
  | 'hero_cta_click'
  | 'pricing_view'
  | 'tariff_click'
  | 'form_start'
  | 'form_step_1_submit'
  | 'form_step_2_submit'
  | 'form_success'
  | 'faq_open'
  | 'final_cta_click';

type AnalyticsPayload = Record<string, string | boolean | number | undefined>;

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  ym?: (...args: unknown[]) => void;
};

const trackEvent = (event: AnalyticsEventName, payload: AnalyticsPayload = {}): void => {
  const data = { event, ...payload };

  if (typeof window !== 'undefined') {
    const currentWindow = window as DataLayerWindow;

    if (Array.isArray(currentWindow.dataLayer)) {
      currentWindow.dataLayer.push(data);
    }

    if (typeof currentWindow.ym === 'function' && process.env.GATSBY_YANDEX_METRIKA_ID) {
      currentWindow.ym(process.env.GATSBY_YANDEX_METRIKA_ID, 'reachGoal', event, payload);
    }
  }

  // eslint-disable-next-line no-console
  console.info('[analytics]', data);
};

const getUrlParam = (key: string): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  return new URLSearchParams(window.location.search).get(key) ?? '';
};

const buildMeta = (): FormMeta => ({
  utm_source: getUrlParam('utm_source'),
  utm_medium: getUrlParam('utm_medium'),
  utm_campaign: getUrlParam('utm_campaign'),
  utm_content: getUrlParam('utm_content'),
  utm_term: getUrlParam('utm_term'),
  referrer: typeof document !== 'undefined' ? document.referrer : '',
  page_url: typeof window !== 'undefined' ? window.location.href : '',
});

const submitLead = async (payload: FullFormPayload): Promise<void> => {
  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Не удалось отправить заявку. Попробуйте ещё раз.');
  }
};

const heroPoints = [
  '7–14 дней на подготовку',
  'Оплата после согласования состава работ',
  'Документы готовят специалисты по 152-ФЗ',
  'Без универсальных шаблонов “для всех”',
];

const whoItsFor = [
  'Есть сайт с формой заявки',
  'Используете cookies, Метрику, CRM или рассылки',
  'Есть сотрудники или соискатели',
  'Собираете заявки из соцсетей или мессенджеров',
  'Передаёте данные подрядчикам',
  'Не уверены, подавали ли уведомление в РКН',
];

const deliverables = [
  'Политика обработки персональных данных',
  'Согласия и формулировки для сайта',
  'Рекомендации по cookies и метрикам',
  'Документы по сотрудникам — если применимо',
  'Подготовленное уведомление в РКН — если требуется',
  'Инструкция: что, где и когда разместить',
];

const processSteps = [
  'Вы заполняете короткую анкету о бизнесе',
  'Мы определяем состав документов и согласуем стоимость',
  'Готовим комплект и инструкцию за 7–14 дней',
];

const pricing = [
  {
    tier: 'Базовый' as PricingTier,
    price: 'от 29 900 ₽',
    description: 'Для сайта с формами заявок и базовыми сценариями сбора данных.',
    items: ['Политика и согласие', 'Формулировки для сайта', 'Базовые рекомендации по размещению'],
  },
  {
    tier: 'Стандарт' as PricingTier,
    price: 'от 49 900 ₽',
    description: 'Для бизнеса с сайтом, клиентской базой, сотрудниками, CRM и несколькими каналами сбора данных.',
    items: ['Всё из базового', 'Блок по сотрудникам', 'Подготовка уведомления РКН'],
  },
  {
    tier: 'Расширенный' as PricingTier,
    price: 'от 79 900 ₽',
    description: 'Для сложных процессов: несколько сайтов, подрядчики, внешние сервисы, нестандартные сценарии.',
    items: ['Индивидуальный состав комплекта', 'Несколько сценариев сбора данных', 'Подробная проработка процессов'],
  },
];

const faqItems = [
  {
    question: 'Нужно ли уведомлять РКН всем?',
    answer:
      'Не всегда. Это зависит от того, как именно вы собираете и обрабатываете данные. Мы поможем понять это после анкеты.',
  },
  {
    question: 'Вы проверяете сайт автоматически?',
    answer:
      'Нет. Мы не делаем автоматический аудит. Комплект готовится вручную на основе анкеты о вашем бизнесе и процессах.',
  },
  {
    question: 'Можно ли использовать шаблон из интернета?',
    answer:
      'Можно как ориентир, но шаблон редко учитывает ваши реальные процессы, cookies, сотрудников, подрядчиков и уведомление РКН.',
  },
  {
    question: 'Даёте ли вы гарантию?',
    answer:
      'Нет абсолютных гарантий мы не обещаем. Наша задача — подготовить документы и инструкции так, чтобы снизить риск ошибок и претензий.',
  },
];

const initialStepOne: StepOneData = {
  name: '',
  phone: '',
  email: '',
  website: '',
  inn: '',
  selectedTariff: 'Не знаю',
};

const initialStepTwo: StepTwoData = {
  hasForms: 'Да',
  usesTools: 'Да',
  hasEmployees: 'Не уверен',
  filedNoticeBefore: 'Не знаю',
  needType: 'full_package',
  paymentIntent: 'need_price',
};

const IndexPage: React.FC = () => {
  const [step, setStep] = useState<FormStep>(1);
  const [stepOne, setStepOne] = useState<StepOneData>(initialStepOne);
  const [stepTwo, setStepTwo] = useState<StepTwoData>(initialStepTwo);
  const [meta, setMeta] = useState<FormMeta>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    referrer: '',
    page_url: '',
  });
  const [startedForm, setStartedForm] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricingTracked, setPricingTracked] = useState(false);

  useEffect(() => {
    setMeta(buildMeta());
    trackEvent('page_view', {
      page_type: 'landing',
      has_utm: typeof window !== 'undefined' ? window.location.search.includes('utm_') : false,
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const pricingSection = document.getElementById('pricing');
    if (!pricingSection || pricingTracked) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('pricing_view', { section: 'pricing' });
            setPricingTracked(true);
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(pricingSection);

    return () => observer.disconnect();
  }, [pricingTracked]);

  const payload = useMemo<FullFormPayload>(
    () => ({
      ...stepOne,
      ...stepTwo,
      ...meta,
    }),
    [meta, stepOne, stepTwo]
  );

  const goToForm = (eventName: 'hero_cta_click' | 'final_cta_click', label: string): void => {
    trackEvent(eventName, { cta_text: label });

    if (!startedForm) {
      setStartedForm(true);
      trackEvent('form_start', { source: label });
    }

    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleTariffClick = (tier: PricingTier): void => {
    setStepOne((current) => ({ ...current, selectedTariff: tier }));
    trackEvent('tariff_click', { tariff: tier });

    if (!startedForm) {
      setStartedForm(true);
      trackEvent('form_start', { source: `pricing_${tier}` });
    }

    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleStepOneChange = (field: keyof StepOneData) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    if (!startedForm) {
      setStartedForm(true);
      trackEvent('form_start', { source: 'field_interaction' });
    }

    setStepOne((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleStepTwoChange =
    <K extends keyof StepTwoData>(field: K) =>
    (event: ChangeEvent<HTMLSelectElement>): void => {
      setStepTwo((current) => ({
        ...current,
        [field]: event.target.value as StepTwoData[K],
      }));
    };

  const submitStepOne = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!stepOne.name || !stepOne.phone || !stepOne.email || !stepOne.website) {
      setError('Заполните имя, телефон, email и сайт компании.');
      return;
    }

    setError('');
    trackEvent('form_step_1_submit', {
      selected_tariff: stepOne.selectedTariff,
      has_inn: Boolean(stepOne.inn),
    });
    setStep(2);
  };

  const submitStepTwo = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      trackEvent('form_step_2_submit', {
        has_forms: stepTwo.hasForms,
        uses_tools: stepTwo.usesTools,
        has_employees: stepTwo.hasEmployees,
        need_type: stepTwo.needType,
        payment_intent: stepTwo.paymentIntent,
      });

      await submitLead(payload);
      trackEvent('form_success', {
        selected_tariff: stepOne.selectedTariff,
        payment_intent: stepTwo.paymentIntent,
      });
      setStep(3);
    } catch (submissionError) {
      const message = submissionError instanceof Error ? submissionError.message : 'Не удалось отправить заявку.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <GlobalStyles />

      <Hero>
        <Container>
          <HeroGrid>
            <HeroMain>
              <Eyebrow>152-ФЗ · fake door landing</Eyebrow>
              <HeroTitle>Документы по персональным данным под ваш бизнес</HeroTitle>
              <HeroText>
                Подготовим политику, согласия, формулировки для сайта, инструкцию по размещению и уведомление в
                РКН — на основе анкеты о вашем бизнесе.
              </HeroText>
              <HeroActions>
                <PrimaryButton type="button" onClick={() => goToForm('hero_cta_click', 'Получить расчёт')}>
                  Получить расчёт
                </PrimaryButton>
                <SecondaryButton type="button" onClick={() => goToForm('hero_cta_click', 'Проверить, что нужно')}>
                  Проверить, что нужно
                </SecondaryButton>
              </HeroActions>
            </HeroMain>

            <TrustCard>
              <SummaryTitle>Коротко о формате работы</SummaryTitle>
              <BulletList>
                {heroPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </BulletList>
            </TrustCard>
          </HeroGrid>
        </Container>
      </Hero>

      <Section>
        <Container>
          <CompactGrid>
            <ContentCard>
              <SectionTitle>Кому это актуально</SectionTitle>
              <BulletList>
                {whoItsFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </BulletList>
            </ContentCard>

            <NoticeCard>
              <SectionTitle>Почему это важно</SectionTitle>
              <SectionText>
                Если данные собираются, но документы, согласия или уведомление оформлены неверно, это может
                привести к вопросам со стороны клиентов, партнёров или РКН. Мы помогаем заранее привести
                документы и процесс сбора согласий в порядок.
              </SectionText>
            </NoticeCard>
          </CompactGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <WideCard>
            <SectionTitle>Что клиент получает</SectionTitle>
            <ResultGrid>
              {deliverables.map((item) => (
                <ResultItem key={item}>{item}</ResultItem>
              ))}
            </ResultGrid>
          </WideCard>
        </Container>
      </Section>

      <Section>
        <Container>
          <WideCard>
            <SectionTitle>Как это работает</SectionTitle>
            <ProcessGrid>
              {processSteps.map((item, index) => (
                <ProcessItem key={item}>
                  <StepIndex>0{index + 1}</StepIndex>
                  <ProcessText>{item}</ProcessText>
                </ProcessItem>
              ))}
            </ProcessGrid>
          </WideCard>
        </Container>
      </Section>

      <Section id="pricing">
        <Container>
          <SectionHeader>
            <SectionTitle>Стоимость</SectionTitle>
            <SectionText>
              Точный состав документов определяется после анкеты. Ниже — ориентиры для проверки спроса и
              готовности платить.
            </SectionText>
          </SectionHeader>
          <PricingGrid>
            {pricing.map((item) => (
              <PricingCard key={item.tier}>
                <PricingTierLabel>{item.tier}</PricingTierLabel>
                <PricingPrice>{item.price}</PricingPrice>
                <PricingDescription>{item.description}</PricingDescription>
                <CompactList>
                  {item.items.map((priceItem) => (
                    <li key={priceItem}>{priceItem}</li>
                  ))}
                </CompactList>
                <PrimaryButton type="button" onClick={() => handleTariffClick(item.tier)}>
                  Выбрать тариф
                </PrimaryButton>
              </PricingCard>
            ))}
          </PricingGrid>
          <MutedNote>
            Финальная стоимость зависит от состава документов и подтверждается после анкеты. Оплата — только
            после согласования работ.
          </MutedNote>
        </Container>
      </Section>

      <Section id="lead-form">
        <Container narrow>
          <WideCard>
            <SectionTitle>Заявка</SectionTitle>
            <SectionText>
              Основной путь простой: короткая анкета → предварительный состав работ → согласование стоимости.
            </SectionText>

            {step === 1 && (
              <FormCard onSubmit={submitStepOne}>
                <FormGrid>
                  <Field>
                    <label htmlFor="name">Имя</label>
                    <Input id="name" value={stepOne.name} onChange={handleStepOneChange('name')} />
                  </Field>
                  <Field>
                    <label htmlFor="phone">Телефон</label>
                    <Input id="phone" value={stepOne.phone} onChange={handleStepOneChange('phone')} />
                  </Field>
                  <Field>
                    <label htmlFor="email">Email</label>
                    <Input id="email" type="email" value={stepOne.email} onChange={handleStepOneChange('email')} />
                  </Field>
                  <Field>
                    <label htmlFor="website">Сайт компании</label>
                    <Input id="website" value={stepOne.website} onChange={handleStepOneChange('website')} />
                  </Field>
                  <Field>
                    <label htmlFor="inn">ИНН — необязательно</label>
                    <Input id="inn" value={stepOne.inn} onChange={handleStepOneChange('inn')} />
                  </Field>
                  <Field>
                    <label htmlFor="selectedTariff">Выбранный тариф</label>
                    <Select id="selectedTariff" value={stepOne.selectedTariff} onChange={handleStepOneChange('selectedTariff')}>
                      <option value="Не знаю">Не знаю</option>
                      <option value="Базовый">Базовый</option>
                      <option value="Стандарт">Стандарт</option>
                      <option value="Расширенный">Расширенный</option>
                    </Select>
                  </Field>
                </FormGrid>
                {error && <ErrorText>{error}</ErrorText>}
                <PrimaryButton type="submit">Продолжить</PrimaryButton>
              </FormCard>
            )}

            {step === 2 && (
              <FormCard onSubmit={submitStepTwo}>
                <FormGrid>
                  <Field>
                    <label htmlFor="hasForms">Есть ли формы на сайте</label>
                    <Select id="hasForms" value={stepTwo.hasForms} onChange={handleStepTwoChange('hasForms')}>
                      <option value="Да">Да</option>
                      <option value="Нет">Нет</option>
                      <option value="Не уверен">Не уверен</option>
                    </Select>
                  </Field>
                  <Field>
                    <label htmlFor="usesTools">Используете ли cookies / Метрику / CRM</label>
                    <Select id="usesTools" value={stepTwo.usesTools} onChange={handleStepTwoChange('usesTools')}>
                      <option value="Да">Да</option>
                      <option value="Нет">Нет</option>
                      <option value="Не уверен">Не уверен</option>
                    </Select>
                  </Field>
                  <Field>
                    <label htmlFor="hasEmployees">Есть ли сотрудники</label>
                    <Select id="hasEmployees" value={stepTwo.hasEmployees} onChange={handleStepTwoChange('hasEmployees')}>
                      <option value="Да">Да</option>
                      <option value="Нет">Нет</option>
                      <option value="Не уверен">Не уверен</option>
                    </Select>
                  </Field>
                  <Field>
                    <label htmlFor="filedNoticeBefore">Подавали ли уведомление в РКН</label>
                    <Select id="filedNoticeBefore" value={stepTwo.filedNoticeBefore} onChange={handleStepTwoChange('filedNoticeBefore')}>
                      <option value="Да">Да</option>
                      <option value="Нет">Нет</option>
                      <option value="Не знаю">Не знаю</option>
                    </Select>
                  </Field>
                  <Field>
                    <label htmlFor="needType">Что нужно</label>
                    <Select id="needType" value={stepTwo.needType} onChange={handleStepTwoChange('needType')}>
                      <option value="site_docs">Документы для сайта</option>
                      <option value="rkn_notice">Уведомление РКН</option>
                      <option value="full_package">Полный комплект</option>
                      <option value="not_sure">Не знаю</option>
                    </Select>
                  </Field>
                  <Field>
                    <label htmlFor="paymentIntent">Готовность оплатить после согласования</label>
                    <Select id="paymentIntent" value={stepTwo.paymentIntent} onChange={handleStepTwoChange('paymentIntent')}>
                      <option value="yes">Да</option>
                      <option value="need_price">Хочу сначала узнать стоимость</option>
                      <option value="researching">Пока изучаю</option>
                    </Select>
                  </Field>
                </FormGrid>
                {error && <ErrorText>{error}</ErrorText>}
                <ButtonRow>
                  <SecondaryButton type="button" onClick={() => setStep(1)}>
                    Назад
                  </SecondaryButton>
                  <PrimaryButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}
                  </PrimaryButton>
                </ButtonRow>
              </FormCard>
            )}

            {step === 3 && (
              <SuccessCard>
                <SuccessTitle>Спасибо</SuccessTitle>
                <SectionText>
                  Мы изучим ответы, определим предварительный состав документов и свяжемся с вами для
                  согласования стоимости. Оплата потребуется только после подтверждения состава работ.
                </SectionText>
              </SuccessCard>
            )}
          </WideCard>
        </Container>
      </Section>

      <Section>
        <Container>
          <WideCard>
            <SectionTitle>FAQ</SectionTitle>
            <FaqList>
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  onToggle={(event) => {
                    if ((event.currentTarget as HTMLDetailsElement).open) {
                      trackEvent('faq_open', { question: item.question });
                    }
                  }}
                >
                  <summary>{item.question}</summary>
                  <FaqAnswer>{item.answer}</FaqAnswer>
                </details>
              ))}
            </FaqList>
          </WideCard>
        </Container>
      </Section>

      <FooterSection>
        <Container>
          <FooterCard>
            <SectionTitle>Нужно быстро понять, что требуется именно вашему бизнесу?</SectionTitle>
            <SectionText>
              Оставьте заявку — мы определим предварительный состав комплекта и вернёмся с понятным предложением.
            </SectionText>
            <PrimaryButton type="button" onClick={() => goToForm('final_cta_click', 'Начать с анкеты')}>
              Начать с анкеты
            </PrimaryButton>
          </FooterCard>
        </Container>
      </FooterSection>
    </Page>
  );
};

export default IndexPage;

const Page = styled.main`
  background: ${theme.colors.background};
  color: ${theme.colors.text};
`;

const Container = styled.div<{ narrow?: boolean }>`
  width: min(1080px, calc(100% - 32px));
  margin: 0 auto;
  ${({ narrow }): string => (narrow ? 'max-width: 860px;' : '')}
`;

const Hero = styled.section`
  padding: 40px 0 28px;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

const HeroMain = styled.div`
  padding: 8px 0;
`;

const Eyebrow = styled.div`
  color: ${theme.colors.accent};
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 14px;
`;

const HeroTitle = styled.h1`
  margin: 0 0 14px;
  font-size: clamp(36px, 5vw, 52px);
  line-height: 1.02;
  letter-spacing: -0.04em;
  max-width: 760px;
`;

const HeroText = styled.p`
  margin: 0;
  max-width: 700px;
  color: ${theme.colors.muted};
  font-size: 18px;
  line-height: 1.65;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 22px;
`;

const TrustCard = styled.div`
  padding: 22px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadow.md};
`;

const SummaryTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 20px;
  line-height: 1.3;
`;

const Section = styled.section`
  padding: 16px 0 18px;
`;

const SectionHeader = styled.div`
  margin-bottom: 18px;
  max-width: 700px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 10px;
  font-size: clamp(24px, 3.2vw, 32px);
  line-height: 1.15;
  letter-spacing: -0.03em;
`;

const SectionText = styled.p`
  margin: 0;
  color: ${theme.colors.muted};
  font-size: 16px;
  line-height: 1.7;
`;

const CompactGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 18px;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

const ContentCard = styled.div`
  padding: 24px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadow.sm};
`;

const NoticeCard = styled(ContentCard)`
  background: ${theme.colors.surface};
`;

const WideCard = styled.div`
  padding: 24px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadow.sm};
`;

const BulletList = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 10px;
  line-height: 1.6;
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 860px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const ResultItem = styled.div`
  padding: 16px 18px;
  border-radius: 18px;
  background: ${theme.colors.surface};
  line-height: 1.55;
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessItem = styled.div`
  padding: 18px;
  border-radius: 18px;
  background: ${theme.colors.surface};
`;

const StepIndex = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${theme.colors.accent};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const ProcessText = styled.p`
  margin: 0;
  line-height: 1.6;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PricingCard = styled.div`
  padding: 22px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadow.sm};
  display: grid;
  gap: 14px;
`;

const PricingTierLabel = styled.div`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${theme.colors.accent};
`;

const PricingPrice = styled.div`
  font-size: 34px;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.04em;
`;

const PricingDescription = styled.p`
  margin: 0;
  color: ${theme.colors.muted};
  line-height: 1.65;
`;

const CompactList = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  line-height: 1.55;
`;

const MutedNote = styled.p`
  margin: 14px 0 0;
  color: ${theme.colors.muted};
  font-size: 15px;
  line-height: 1.65;
`;

const FormCard = styled.form`
  margin-top: 16px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: grid;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 600;
  }
`;

const Input = styled.input`
  min-height: 50px;
  border-radius: 14px;
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  padding: 0 14px;
`;

const Select = styled.select`
  min-height: 50px;
  border-radius: 14px;
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  padding: 0 14px;
`;

const ErrorText = styled.div`
  margin: 14px 0 0;
  color: ${theme.colors.danger};
  font-weight: 600;
`;

const SuccessCard = styled.div`
  margin-top: 16px;
  padding: 20px;
  border-radius: 18px;
  background: ${theme.colors.surface};
`;

const SuccessTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 22px;
`;

const FaqList = styled.div`
  display: grid;
  gap: 10px;

  details {
    border-radius: 16px;
    background: ${theme.colors.surface};
    padding: 14px 16px;
  }

  summary {
    cursor: pointer;
    font-weight: 600;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }
`;

const FaqAnswer = styled.p`
  margin: 10px 0 0;
  color: ${theme.colors.muted};
  line-height: 1.6;
`;

const FooterSection = styled.section`
  padding: 20px 0 48px;
`;

const FooterCard = styled.div`
  padding: 28px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadow.sm};
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const buttonBase = `
  min-height: 52px;
  padding: 0 18px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const PrimaryButton = styled.button`
  ${buttonBase}
  border: none;
  background: ${theme.colors.accent};
  color: #ffffff;
  box-shadow: 0 12px 28px rgba(70, 119, 255, 0.18);

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }
`;

const SecondaryButton = styled.button`
  ${buttonBase}
  border: 1px solid ${theme.colors.border};
  background: #ffffff;
  color: ${theme.colors.text};
`;
