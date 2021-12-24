import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Col } from 'antd';
import { BackNavigationHeader } from '../../../src/components/atoms';
import {
  PageLayout,
  NavMenu,
  SettingMenus,
  OrderHistory,
} from '../../../src/components/views';

const OrderDetailsPage = () => {
  const router = useRouter();
  const order = {
    id: '55647876',
    image: '/images/temp/product-picture.png',
    details: '1x Hand sanitizer',
  };

  return (
    <>
      <Head>
        <title>Order Details / Settings / JuicyPie</title>
      </Head>
      <PageLayout
        leftComponents={<NavMenu />}
        rightComponents={
          <RigthPanel>
            <BackNavigationHeader backable title={order.id} />
            <OrderHistory
              key={order.id}
              orderUrl={order.image}
              orderId={`#${order.id}`}
              details={order.details}
              selected
            />
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

export default OrderDetailsPage;
