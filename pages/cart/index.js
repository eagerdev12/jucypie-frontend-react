import React from 'react';
import Head from 'next/head';
import { Typography, Col, Row, Card, Radio, Button } from 'antd';
import { PageLayout, NavMenu, CartItem } from '../../src/components/views';
import { BackNavigationHeader } from '../../src/components/atoms';
import styled from 'styled-components';
import { LockFilled } from '@ant-design/icons';

const Cart = () => {
  return (
    <>
      <Head>
        <title>Carts / JuicyPie</title>
      </Head>
      <PageLayout leftComponents={<NavMenu />}>
        <TitleWrapper>
          <BackNavigationHeader title='Cart' backable='true' />
        </TitleWrapper>
        <CartsCountWrapper>
          <CartCountsAlert>
            You have <BoldText>1 item</BoldText>in your cart from
            <BoldText>1 store</BoldText>
          </CartCountsAlert>
          <CartCountsAlert>
            Select your items and securely checkout.
          </CartCountsAlert>
        </CartsCountWrapper>
        <CartsWrapper>
          <CartItem />
          <CartItem />
          <CartItem />
        </CartsWrapper>
        <CartsMenu>
          <CartOptionsCard bordered={false}>
            <Row align='middle' justify='space-between'>
              <Radio>All</Radio>
              <PriceWrapper>
                <TotalPrice>$9.95</TotalPrice>
                <Button type='primary'>
                  <LockFilled />
                  <ButtonTitle>Checkout</ButtonTitle>
                </Button>
              </PriceWrapper>
            </Row>
          </CartOptionsCard>
        </CartsMenu>
      </PageLayout>
    </>
  );
};

const TitleWrapper = styled(Row)`
  @media only screen and (max-width: 451px) {
    display: none;
  }
`;

const CartsCountWrapper = styled(Row)`
  @media only screen and (max-width: 451px) {
    margin-top: 74px;
  }
`;

const CartCountsAlert = styled(Row)`
  font-size: 17px;
  line-height: 25px;
  padding: 7px 21px;
`;

const CartsWrapper = styled(Row)`
  display: flex;
  flex-direction: column;
  margin-top: 23px;
  margin-bottom: 64px;
`;

const CartsMenu = styled(Row)`
  width: 600px;
  position: fixed;
  bottom: 0;
  @media only screen and (max-width: 451px) {
    width: 100%;
    height: 45px;
    bottom: 64px;
  }
`;

const PriceWrapper = styled(Col)`
  display: flex;
  align-items: center;
`;

const ButtonTitle = styled(Typography.Text)`
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  color: #ffffff;
`;

const BoldText = styled.b`
  padding: 0 4px;
`;

const TotalPrice = styled.span`
  width: 113px;
  border: 0.5px solid #0095f8;
  padding: 7px 10px;
  margin-right: 5px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(228, 234, 238, 0.8);
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  color: #0095f8;
`;

const CartOptionsCard = styled(Card)`
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: 0px 4px 20px rgba(228, 234, 238, 0.8);
  .ant-card-body {
    width: 100%;
  }
  @media only screen and (max-width: 451px) {
    border-radius: 0;
    .ant-card-body {
      padding: 7px 1rem;
    }
  }
`;

export default Cart;
