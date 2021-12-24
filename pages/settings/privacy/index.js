import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Typography, Row, Col, Switch } from 'antd';
import { BackNavigationHeader } from '../../../src/components/atoms';
import {
  PageLayout,
  NavMenu,
  SettingMenus,
} from '../../../src/components/views';

import { useMutation, useQuery } from 'react-apollo';
import {
  GET_USER_QUERY,
  UPDATE_USER_SETTING_MUTATION,
} from '../../../src/graphql';

const PrivacySettings = ({ authUser }) => {
  const [privacyData, setPrivacyData] = useState({});
  const [userData, setUserData] = useState({});

  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { userId: authUser.ID },
  });

  const [updateUserSetting] = useMutation(UPDATE_USER_SETTING_MUTATION);

  const updateSetting = (value, privacyName) => {
    let privacy = privacyData;
    privacy['__typename'] = undefined;
    if (privacyName.value == 'isFollowersShow') {
      privacy['isFollowersShow'] = value;
    } else if (privacyName.value == 'isFollowingShow') {
      privacy['isFollowingShow'] = value;
    } else if (privacyName.value == 'isFollowButtonShow') {
      privacy['isFollowButtonShow'] = value;
    } else if (privacyName.value == 'isSocialLinksShow') {
      privacy['isSocialLinksShow'] = value;
    } else if (privacyName.value == 'isProfileBioShow') {
      privacy['isProfileBioShow'] = value;
    }

    updateUserSetting({
      variables: {
        updateUserSetting: {
          userId: authUser.ID,
          privacy: privacy,
        },
      },
    })
      .then((response) => {
        console.log('update name', response.data);
        setPrivacyData(response.data.updateUserSetting.privacy);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    if (error) {
      return;
    }

    if (data) {
      setUserData(data.userSetting.account);
      setPrivacyData(data.userSetting.privacy);
    }
  }, [data]);

  const privacys = [
    {
      label: 'Show Followers',
      value: 'isFollowersShow',
      current: privacyData.isFollowersShow,
    },
    {
      label: 'Show following',
      value: 'isFollowingShow',
      current: privacyData.isFollowingShow,
    },
    {
      label: 'Follow button',
      value: 'isFollowButtonShow',
      current: privacyData.isFollowButtonShow,
    },
    {
      label: 'Social links',
      value: 'isSocialLinksShow',
      current: privacyData.isSocialLinksShow,
    },
    {
      label: 'Profile bio',
      value: 'isProfileBioShow',
      current: privacyData.isProfileBioShow,
    },
  ];

  return (
    <>
      <Head>
        <title>Privacy / Settings / JuicyPie</title>
      </Head>
      <PageLayout
        leftComponents={<NavMenu />}
        rightComponents={
          <RigthPanel>
            <BackNavigationHeader title='Privacy' />
            {privacys.map((privacy, index) => {
              return (
                <PrivacySettingMenu justify='space-between' key={index}>
                  <SettingTitle>{privacy.label}</SettingTitle>
                  <Switch
                    checked={privacy.current}
                    onChange={(e) => updateSetting(e, privacy)}
                  />
                </PrivacySettingMenu>
              );
            })}
          </RigthPanel>
        }
        width='xs'
        rightToMain
      >
        <SettingMenus title='Settings' userName={userData.name} />
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

const SettingTitle = styled(Typography.Text)`
  font-size: 17px;
  line-height: 150%;
`;

const PrivacySettingMenu = styled(Row)`
  padding: 0 16px;
  margin-bottom: 17px;
`;

export default PrivacySettings;
