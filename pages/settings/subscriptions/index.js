import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import {
  BackNavigationHeader,
  MultipleSelect,
} from '../../../src/components/atoms';
import {
  PageLayout,
  NavMenu,
  SettingMenus,
} from '../../../src/components/views';

const Subscriptions = () => {
  return (
    <>
      <Head>
        <title>Subscriptions / Settings / JuicyPie</title>
      </Head>
      <PageLayout
        leftComponents={<NavMenu />}
        rightComponents={
          <RigthPanel>
            <BackNavigationHeader title='Subscriptions' />
            <SettingsWrapper justify='space-between'>
              <OptionWrapper>
                <MultipleSelect options={['Active', 'Cancelled']} />
              </OptionWrapper>
              <OptionWrapper>
                <MultipleSelect
                  options={['Profiles', 'Products', 'Shops', 'Pages']}
                />
              </OptionWrapper>
            </SettingsWrapper>
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

const SettingsWrapper = styled(Row)`
  padding: 0 16px;
`;

const OptionWrapper = styled(Row)`
  padding-bottom: 20px;
`;

export default Subscriptions;
