import React from 'react';
import styled from 'styled-components';
import { Typography, Row, Button } from 'antd';
import { PaymentCard } from '../';

const PaymentSettings = ({ onUpdateCard }) => {
  const paymentList = [
    {
      user: 'John Doe',
      type: 'Visa',
      number: '4374 2108 9340 9348',
      address: '7651 Home St, Los Angeles, CA, 82801',
      primary: true,
    },
    {
      user: 'John Doe',
      type: 'Visa',
      number: '4374 2108 9340 9348',
      address: '7651 Home St, Los Angeles, CA, 82801',
      primary: false,
    },
  ];

  return (
    <Row>
      <SettingsHeader justify='space-between' align='middle'>
        <SettingsTitle>Payment Methods</SettingsTitle>
        <Button type='primary' onClick={(e) => onUpdateCard()}>
          + Add
        </Button>
      </SettingsHeader>
      <PaymentCardsWrapper>
        {paymentList.map((payment, index) => (
          <PaymentCard
            key={index}
            owner={payment.user}
            cardType={payment.type}
            number={payment.number}
            address={payment.address}
            isPrimary={payment.primary}
            onEdit={() => onUpdateCard(payment)}
          />
        ))}
      </PaymentCardsWrapper>
    </Row>
  );
};

PaymentSettings.AddCardView = ({ isEdit }) => {
  return (
    <Panel>
      <Row justify='center'>
        <LockFilled />
        Your information is secure & confidential
      </Row>
    </Panel>
  );
};

const Panel = styled(Row)`
  display: flex;
  flex-direction: column;
`;

const SecureTextWrapper = styled(Row)``;

const SettingsHeader = styled(Row)`
  width: 100%;
  margin-top: 14px;
  margin-bottom: 30px;
`;

const SettingsTitle = styled(Typography.Text)`
  font-weight: bold;
  font-size: 19px;
  line-height: 19px;
`;

const PaymentCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default PaymentSettings;
