import React from 'react';
import styled from 'styled-components';
import { Row, Tabs } from 'antd';
import { PaymentSettings, ShippingSettings } from '../';

const ShippingPaymentSettings = ({ onUpdateCard, onUpdateAddress }) => {
  return (
    <Panel>
      <StyledTabs defaultActiveKey='1' size='small'>
        <Tabs.TabPane tab='Payment' key='1'>
          <PaymentSettings onUpdateCard={onUpdateCard} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Shipping' key='2'>
          <ShippingSettings onUpdateAddress={onUpdateAddress} />
        </Tabs.TabPane>
      </StyledTabs>
    </Panel>
  );
};

const Panel = styled(Row)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledTabs = styled(Tabs)`
  padding: 10px 30px !important;
`;

export default ShippingPaymentSettings;
