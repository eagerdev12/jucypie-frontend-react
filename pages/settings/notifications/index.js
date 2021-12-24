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
  NotificationSettings,
} from '../../../src/components/views';
import { useMutation, useQuery } from 'react-apollo';
import {
  GET_USER_QUERY,
  UPDATE_USER_SETTING_MUTATION,
} from '../../../src/graphql';
const { TrendingView, RecommendedView, YouMayLikeView } = NotificationSettings;

const Notifications = ({ authUser }) => {
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { userId: authUser.ID },
  });

  const router = useRouter();
  const { query } = router;

  const RightComponents = () => {
    let title = '';
    if (!query.edit) {
      title = 'Notifications';
    } else if (query.edit === 'trending') {
      title = 'Trending';
    } else if (query.edit === 'recommended') {
      title = 'Recommended';
    } else if (query.edit === 'youMayLike') {
      title = 'You May Like';
    }

    return (
      <RigthPanel>
        <BackNavigationHeader backable={query.edit} title={title} />
        {!query.edit && <NotificationSettings userId={authUser.ID} />}
        {query.edit === 'trending' && <TrendingView userId={authUser.ID} />}
        {query.edit === 'recommended' && (
          <RecommendedView userId={authUser.ID} />
        )}
        {query.edit === 'youMayLike' && <YouMayLikeView userId={authUser.ID} />}
      </RigthPanel>
    );
  };

  return (
    <>
      <Head>
        <title>Notifications / Settings / JuicyPie</title>
      </Head>
      <PageLayout
        leftComponents={<NavMenu />}
        rightComponents={<RightComponents />}
        width='xs'
        rightTsoMain
      >
        <SettingMenus
          title='Settings'
          userName={data?.userSetting?.account?.name}
        />
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

export default Notifications;
