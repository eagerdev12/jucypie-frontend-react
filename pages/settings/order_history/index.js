import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Col } from 'antd';
import { BackNavigationHeader } from '../../../src/components/atoms';
import {
  PageLayout,
  NavMenu,
  SettingMenus,
  OrderHistory,
} from '../../../src/components/views';

const OrderHistoryPage = () => {
  const router = useRouter();
  const orderHistoryData = [
    {
      id: '55647876',
      image: '/images/temp/product-picture.png',
      details: '1x Hand sanitizer',
    },
    {
      id: '55647877',
      image: '/images/temp/product-picture.png',
      details: '1x Hand sanitizer',
    },
  ];

  const showOrderDetail = (order) => {
    router.push(`/settings/order_history/${order.id}`, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <Head>
        <title>Order History / Settings / JuicyPie</title>
      </Head>
      <PageLayout
        leftComponents={<NavMenu />}
        rightComponents={
          <RightPanel>
            <BackNavigationHeader title='Order History' />
            <OrderHistoryWrapper>
              {orderHistoryData.map((order, index) => (
                <OrderHistory
                  key={order.id}
                  orderUrl={order.image}
                  orderId={`#${order.id}`}
                  details={order.details}
                  onDetail={() => showOrderDetail(order)}
                  selected={index === 0}
                />
              ))}
            </OrderHistoryWrapper>
          </RightPanel>
        }
        width='xs'
        rightToMain
      >
        <SettingMenus title='Settings' />
      </PageLayout>
    </>
  );
};

const RightPanel = styled(Col)`
  width: 500px;
  @media only screen and (max-width: 451px) {
    width: 100%;
  }
`;

const OrderHistoryWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 0 16px;
  flex-direction: column;
`;

export default OrderHistoryPage;
