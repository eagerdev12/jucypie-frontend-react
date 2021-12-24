import React from 'react';
import styled from 'styled-components';
import { Col } from 'antd';
import { PageLayout, SettingMenus, NavMenu } from '../';

const SettingsPageLayout = ({ children }) => {
  return (
    <>
      <PageLayout
        leftComponents={<NavMenu />}
        rightComponents={<RigthPanel>{children}</RigthPanel>}
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

export default SettingsPageLayout;
