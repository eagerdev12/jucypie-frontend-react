import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { mobileAndTabletCheck } from '../../src/utils';
import { PageLayout, NavMenu, SettingMenus } from '../../src/components/views';

const Settings = ({ authUser }) => {
  console.log('adasdasdasdasda', authUser);
  const router = useRouter();
  useEffect(() => {
    !mobileAndTabletCheck() &&
      router.push('/settings/account', undefined, { shallow: true });
  }, []);

  return (
    <>
      <Head>
        <title>Settings / JuicyPie</title>
      </Head>
      <PageLayout leftComponents={<NavMenu />} width='xs'>
        <SettingMenus title='Settings' userName={authUser.name} />
      </PageLayout>
    </>
  );
};

export default Settings;
