import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { BackNavigationHeader } from '../../../src/components/atoms';
import {
  PageLayout,
  NavMenu,
  SettingMenus,
  ProfileCard,
} from '../../../src/components/views';

const ConnectedAccounts = () => {
  return (
    <>
      <Head>
        <title>Connected Accounts / Settings / JuicyPie</title>
      </Head>
      <PageLayout
        leftComponents={<NavMenu />}
        rightComponents={
          <RigthPanel>
            <BackNavigationHeader title='Connected Accounts' />
            <ProfileView justify='space-between'>
              <ProfileCard
                showLink
                align='top'
                title='John Doe'
                subtext='Member since Jan 10, 2020'
              />
              <ActiveBadge>Active</ActiveBadge>
            </ProfileView>
          </RigthPanel>
        }
        width='xs'
        rightToMain
      >
        <SettingMenus title='Settings' />
      </PageLayout>
    </>
  );
};

const RigthPanel = styled(Col)`
  width: 500px;
  @media only screen and (max-width: 451px) {
    width: 100%;
  }
`;

const ProfileView = styled(Row)`
  padding: 0 16px;
`;

const ActiveBadge = styled.div`
  text-align: center;
  display: flex;
  height: 22px;
  align-items: center;
  padding: 0 10px;
  color: #52c41a;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  box-sizing: border-box;
  border-radius: 5px;
`;

export default ConnectedAccounts;
