import React from 'react';
import styled from 'styled-components';
import { Typography, Row } from 'antd';
import { NavigationItem } from '../../atoms';

const AccountSettings = () => {
  return (
    <Panel>
      <NavigationItem title='Full Name' subtext='John Doe' />
      <NavigationItem title='Email' subtext='hello1@teal.com' />
      <NavigationItem title='Username' subtext='@johndoe' />

      <SubjectTitle>Securiy</SubjectTitle>

      <NavigationItem title='Password' subtext='......eien' />
      <NavigationItem title='Phone' subtext='+123982473' />
      <NavigationItem
        title='2Factor Authentication'
        subtext='Add an additional layer of protection to your account.'
      />
    </Panel>
  );
};

const Panel = styled(Row)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SubjectTitle = styled(Typography.Paragraph)`
  font-weight: bold;
  font-size: 19px;
  line-height: 150%;
  color: #404950;
  padding: 0 16px;
`;

export default AccountSettings;
