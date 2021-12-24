import React from 'react';
import styled from 'styled-components';
import { Typography, Row, Button } from 'antd';
import { ShippingCard } from '../';

const ShippingSettings = ({ onUpdateAddress }) => {
  const shippingList = [
    {
      user: 'John Doe',
      address: '7651 Home St, Los Angeles, CA, 82801',
      primary: true,
    },
    {
      user: 'John Doe',
      address: '7651 Home St, Los Angeles, CA, 82801',
      primary: false,
    },
  ];
  return (
    <Row>
      <SettingsHeader justify='space-between' align='middle'>
        <SettingsTitle>Shipping</SettingsTitle>
        <Button type='primary' onClick={(e) => onUpdateAddress()}>
          + Add
        </Button>
      </SettingsHeader>
      <ShippingCardsWrapper>
        {shippingList.map((shipping, index) => (
          <ShippingCard
            key={index}
            owner={shipping.user}
            address={shipping.address}
            isPrimary={shipping.primary}
            onEdit={() => onUpdateAddress(shipping)}
          />
        ))}
      </ShippingCardsWrapper>
    </Row>
  );
};

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

const ShippingCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default ShippingSettings;
