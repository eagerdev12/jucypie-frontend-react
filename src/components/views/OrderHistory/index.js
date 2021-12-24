import React from 'react';
import styled from 'styled-components';
import { RightOutlined } from '@ant-design/icons';
import { Row, Col, Typography } from 'antd';

const OrderHistory = ({ orderUrl, orderId, details, selected, onDetail }) => {
  return (
    <OrderHistoryWrapper align='middle' selected={selected}>
      <Col>
        <OrderImage src={orderUrl} />
      </Col>
      <DetailsWrapper>
        <Row>
          <OrderID>{orderId}</OrderID>
        </Row>
        <Row>
          <OrderDetails>{details}</OrderDetails>
        </Row>
      </DetailsWrapper>
      <Col>
        <NavigationLink onClick={onDetail}>
          <RightOutlined />
        </NavigationLink>
      </Col>
    </OrderHistoryWrapper>
  );
};

const OrderHistoryWrapper = styled(Row)`
  height: 70px;
  margin-bottom: 15px;
  border-radius: 5px;
  cursor: pointer;
  background: ${(props) => (props.selected ? 'white' : 'initial')};
  box-shadow: ${(props) =>
    props.selected ? '0px 4px 20px rgba(228, 234, 238, 0.8)' : 'none'};
`;

const OrderImage = styled.img`
  margin: 10px 0;
  margin-left: 16px;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const DetailsWrapper = styled(Col)`
  flex: 1;
  padding: 0 10px;
`;

const NavigationLink = styled.a`
  padding: 5px;
  margin-right: 25px;
`;

const OrderID = styled(Typography.Text)`
  font-size: 15px;
  line-height: 17px;
  color: #0095f8;
`;

const OrderDetails = styled(Typography.Text)`
  font-size: 15px;
  line-height: 17px;
  color: rgba(64, 73, 80, 0.7);
`;

export default OrderHistory;
