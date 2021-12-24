import React from 'react';
import Head from 'next/head';
import { PageLayout, NavMenu } from '../../src/components/views';

const Notifications = () => {
  return (
    <>
      <Head>
        <title>Notifications / JuicyPie</title>
      </Head>
      <PageLayout leftComponents={<NavMenu />}></PageLayout>
    </>
  );
};

export default Notifications;
