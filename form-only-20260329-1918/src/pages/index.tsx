import React from 'react';
import type { HeadFC } from 'gatsby';
import styled from 'styled-components';
import ContactForm from '../components/ContactForm';

const Page = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.bgAlt};
  padding: 1.5rem;
`;

const IndexPage: React.FC = () => (
  <Page>
    <ContactForm />
  </Page>
);

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Заявка — форма обратной связи</title>
    <meta name="description" content="Оставьте заявку, и мы свяжемся с вами в ближайшее время." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </>
);
