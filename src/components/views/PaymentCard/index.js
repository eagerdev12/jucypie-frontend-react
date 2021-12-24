import React from 'react';
import styled from 'styled-components';
import { RightOutlined } from '@ant-design/icons';
import { Row, Typography, Col, Tag } from 'antd';

const PaymentCard = ({
  owner,
  number,
  cardType,
  address,
  isPrimary,
  onEdit,
}) => {
  const securredCardNumber = `${cardType} ****${number.substr(
    number.length - 4
  )}`;
  return (
    <CardWrapper>
      <Col>
        <CardImage src='/images/credit_cards_visa.svg' />
      </Col>
      <CardDefailsWrapper>
        <Row>
          <OwnerName>{owner}</OwnerName>
        </Row>
        <Row>
          <CardNumber>{securredCardNumber}</CardNumber>
        </Row>
        <Row>
          <AddressLabel>{address}</AddressLabel>
        </Row>
      </CardDefailsWrapper>
      <Col>
        <Row align='middle'>
          {isPrimary && <RoundedTag color='success'>Primary</RoundedTag>}
          <NavigationLink onClick={onEdit}>
            <RightOutlined />
          </NavigationLink>
        </Row>
      </Col>
    </CardWrapper>
  );
};

const CardWrapper = styled(Row)`
  width: 100%;
  margin-bottom: 30px;
`;

const CardDefailsWrapper = styled(Col)`
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const OwnerName = styled(Typography.Text)`
  font-weight: bold;
  font-size: 17px;
  line-height: 17px;
`;

const CardNumber = styled(Typography.Text)`
  font-size: 15px;
  line-height: 17px;
  color: #0095f8;
  padding: 5px 0;
`;

const AddressLabel = styled(Typography.Text)`
  font-size: 15px;
  line-height: 17px;
  color: rgba(64, 73, 80, 0.7);
`;

const CardImage = styled.img`
  width: 32px;
  object-fit: cover;
`;

const NavigationLink = styled.a`
  padding: 5px;
`;

const RoundedTag = styled(Tag)`
  width: 60px;
  height: 22px;
  font-size: 13px;
  line-height: 14px;
  border-radius: 5px;
  margin-right: 5px;
  align-items: center;
  display: flex;
`;

export default PaymentCard;
