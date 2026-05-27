import React from 'react';
import styled from 'styled-components';
import { GlobalStyles } from '../styles/GlobalStyles';
import { theme } from '../styles/theme';

const NotFoundPage: React.FC = () => {
  return (
    <Wrapper>
      <GlobalStyles />
      <Card>
        <Badge>404</Badge>
        <Title>Страница не найдена</Title>
        <Text>Похоже, ссылка устарела или страница была перемещена. Вернитесь на главную.</Text>
        <LinkButton href="/">На главную</LinkButton>
      </Card>
    </Wrapper>
  );
};

export default NotFoundPage;

const Wrapper = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: ${theme.colors.background};
  padding: 24px;
`;

const Card = styled.div`
  width: min(560px, 100%);
  padding: 40px;
  border-radius: 28px;
  background: #ffffff;
  border: 1px solid ${theme.colors.border};
  box-shadow: 0 24px 48px rgba(14, 24, 45, 0.08);
`;

const Badge = styled.div`
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(70, 119, 255, 0.1);
  color: ${theme.colors.accent};
  font-weight: 700;
  margin-bottom: 18px;
`;

const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 40px;
`;

const Text = styled.p`
  margin: 0 0 20px;
  color: ${theme.colors.muted};
  line-height: 1.7;
`;

const LinkButton = styled.a`
  display: inline-flex;
  padding: 14px 18px;
  border-radius: 14px;
  background: ${theme.colors.accent};
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
`;
