import React, { useState } from 'react';
import { Row, Card, Col, Typography, Radio, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ProfileCard from '../ProfileCard';
import { VectorIcon } from '../../atoms';
import styled from 'styled-components';

const ButtonGroup = Button.Group;

const CartItem = () => {
  const [itemCount, setItemCount] = useState(1);

  return (
    <CartWrapper bordered={false}>
      <ProfileCard
        title='Together Brands'
        subtext='1 item in your cart from this store'
      />
      <CartItemBody justify='space-between'>
        <Col>
          <Row>
            <Col>
              <ProductImage src='/images/temp/product-picture.png' />
            </Col>
            <ProductDescriptions>
              <ProductTitle>JuicyPie Essentials Toilet Paper</ProductTitle>
              <MonthlyPack>12 Pack, Monthly...</MonthlyPack>
            </ProductDescriptions>
          </Row>
        </Col>
        <CostsWrapper>
          <ProductCost>US $9.95</ProductCost>
          <TotalCost>$14.95</TotalCost>
        </CostsWrapper>
      </CartItemBody>
      <Row>Free shipping from the U.S.</Row>
      <Row>
        <SubscriptionButton>
          <SubscriptionIcon src='/images/noun_subscribe.svg' />
          Subscription. <BoldText>More info</BoldText>
        </SubscriptionButton>
      </Row>
      <Row align='middle' justify='space-between'>
        <SelectCountGroup>
          <Radio value={1}></Radio>
          <StyledButtonGroup>
            <NoneBorderedButton
              onClick={(e) => {
                return itemCount > 1 && setItemCount(itemCount - 1);
              }}
            >
              <MinusOutlined />
            </NoneBorderedButton>
            <label>{itemCount}</label>
            <NoneBorderedButton onClick={(e) => setItemCount(itemCount + 1)}>
              <PlusOutlined />
            </NoneBorderedButton>
          </StyledButtonGroup>
        </SelectCountGroup>
        <Col>
          <VectorIcon name='More' width={21} height={5.4} />
        </Col>
      </Row>
    </CartWrapper>
  );
};

const CartWrapper = styled(Card)`
  margin-bottom: 16px;
  @media only screen and (max-width: 451px) {
    border-radius: 0;
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  display: flex;
  align-items: center;
`;

const SelectCountGroup = styled(Col)`
  display: flex;
  align-items: center;
`;

const BoldText = styled.b`
  padding: 0 4px;
`;

const NoneBorderedButton = styled(Button)`
  border: none;
  color: #343434;
  &:hover {
    color: #343434;
  }
  &:active {
    color: #343434;
  }
`;

const ProductDescriptions = styled(Col)`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
`;

const CostsWrapper = styled(ProductDescriptions)`
  @media only screen and (max-width: 451px) {
    position: absolute:
    bottom: 4px;
    left: 60px;
    flex-direction: row;
    algin-items: center;
    transform: translateY(-100%);
  }
`;

const ProductCost = styled(Typography.Text)`
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  text-align: right;
`;

const TotalCost = styled(Typography.Text)`
  font-size: 13px;
  line-height: 14px;
  text-decoration-line: line-through;
  text-align: right;
  margin-top: 10px;
  @media only screen and (max-width: 451px) {
    margin-top: 0;
    margin-left: 5px;
  }
`;

const ProductTitle = styled(Typography.Text)`
  font-size: 15px;
  line-height: 149.89%;
`;

const MonthlyPack = styled(Typography.Text)`
  margin-top: 19px;
  font-size: 13px;
  line-height: 149.89%;
  @media only screen and (max-width: 451px) {
    display: none;
  }
`;

const SubscriptionButton = styled.span`
  display: flex;
  align-items: center;
  background: rgba(255, 242, 144, 0.6);
  padding: 6px 8px;
  border-radius: 18px;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const SubscriptionIcon = styled.img`
  width: 14.5px;
  margin-right: 5px;
`;

const CartItemBody = styled(Row)`
  position: relative;
  padding: 20px 0;
`;

export default CartItem;
