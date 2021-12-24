import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { useRouter } from 'next/router';
import { Col } from 'antd';
import { BackNavigationHeader } from '../../../src/components/atoms';
import {
  PageLayout,
  NavMenu,
  AccountSettings,
  SettingMenus,
} from '../../../src/components/views';

import { useMutation, useQuery } from 'react-apollo';
import {
  GET_USER_QUERY,
  UPDATE_USER_SETTING_MUTATION,
} from '../../../src/graphql';
const {
  EditNameView,
  EditEmailView,
  EditUserNameView,
  UpdatePassword,
} = AccountSettings;

const AccountSetting = ({ authUser }) => {
  const router = useRouter();
  const { query } = router;

  const { loading, error, data, refetch } = useQuery(GET_USER_QUERY, {
    variables: { userId: authUser.ID },
  });
  const [updateUserSetting] = useMutation(UPDATE_USER_SETTING_MUTATION);

  const updateSetting = (change = {}) => {
    router.back();

    updateUserSetting({
      variables: {
        updateUserSetting: {
          userId: authUser.ID,
          ...change,
        },
      },
    })
      .then((data) => {
        refetch();
        // if (data && data?.upsertUserSetting) {
        //   setUserSetting(data?.upsertUserSetting);
        // }

        // console.log("update name", data..dataupsertUserSetting);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const [userSetting, setUserSetting] = useState({});

  useEffect(() => {
    if (data && data?.userSetting) {
      setUserSetting(data?.userSetting);
    }
  }, [loading]);

  const RightPanelComponents = () => {
    let title = '';
    if (!query.edit) {
      title = 'Account';
    } else if (query.edit === 'edit_name') {
      title = 'Edit name';
    } else if (query.edit === 'edit_email') {
      title = 'Edit email';
    } else if (query.edit === 'edit_username') {
      title = 'Edit username';
    } else if (query.edit === 'update_password') {
      title = 'Update password';
    }

    return (
      <RigthPanel>
        <BackNavigationHeader
          backable={query.edit ? true : false}
          title={title}
        />
        {!query.edit && (
          <AccountSettings
            name={userSetting?.account?.name}
            email={userSetting?.account?.email}
            mobile={userSetting?.account?.mobile}
            userName={userSetting?.account?.userName}
            userId={userSetting?.account?.ID}
          />
        )}
        {query.edit === 'edit_name' && (
          <EditNameView
            updateSetting={updateSetting}
            userAccountData={userSetting?.account}
          />
        )}
        {query.edit === 'edit_email' && (
          <EditEmailView
            updateSetting={updateSetting}
            userAccountData={userSetting?.account}
          />
        )}
        {query.edit === 'edit_username' && (
          <EditUserNameView
            updateSetting={updateSetting}
            userAccountData={userSetting?.account}
          />
        )}
        {query.edit === 'update_password' && (
          <UpdatePassword updateSetting={updateSetting} />
        )}
      </RigthPanel>
    );
  };

  return (
    <>
      <Head>
        <title>Account / Settings / JuicyPie</title>
      </Head>
      <PageLayout
        leftComponents={<NavMenu />}
        rightComponents={<RightPanelComponents />}
        width='xs'
        rightToMain
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
    padding-right: 16px;
  }
`;

export default compose(
  connect((state) => state, {}),
  withApollo
)(AccountSetting);
