import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, Row, Button } from 'antd';
import { NavigationItem, MultipleSelect } from '../../atoms';
import { withApollo, useMutation, useQuery } from 'react-apollo';
import { UPDATE_USER_SETTING_MUTATION, GET_USER_QUERY } from '../../../graphql';
import { TrophyOutlined } from '@ant-design/icons';

const NotificationSettings = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { userId: userId },
  });
  const [isEmail, setIsEmail] = useState(false);
  const [isPush, setIsPush] = useState(false);
  const [defaultValues, setDefaultValues] = useState([]);

  useEffect(() => {
    setIsEmail(data?.userSetting?.notification?.trending?.isEmail);

    setIsPush(data?.userSetting?.notification?.trending?.isPush);

    if (
      data?.userSetting?.notification?.trending?.isEmail &&
      data?.userSetting?.notification?.trending?.isPush
    ) {
      setDefaultValues(['Email', 'Push']);
    } else if (data?.userSetting?.notification?.trending?.isEmail) {
      setDefaultValues(['Email']);
    } else if (data?.userSetting?.notification?.trending?.isPush) {
      setDefaultValues(['Push']);
    }
  }, [data]);

  const [updateUserSetting] = useMutation(UPDATE_USER_SETTING_MUTATION);

  const updateFollowsYouSettingsNotification = (values = []) => {
    updateUserSetting({
      variables: {
        updateUserSetting: {
          userId: userId,
          notification: {
            authorsFollow: {
              isEmail: values.includes('Email') ? true : false,
              isPush: values.includes('Push') ? true : false,
            },
          },
        },
      },
    })
      .then((data) => {
        const isEmail = values.includes('Email') ? true : false;
        setIsEmail(isEmail);
        const isPush = values.includes('Push') ? true : false;
        setIsPush(isPush);

        if (isEmail && isPush) {
          setDefaultValues(['Email', 'Push']);
        } else if (isEmail) {
          setDefaultValues(['Email']);
        } else if (isPush) {
          setDefaultValues(['Push']);
        }
      })
      .catch((error) => {});
  };

  const updateLikeYourPostSettingsNotification = (values = []) => {
    updateUserSetting({
      variables: {
        updateUserSetting: {
          userId: userId,
          notification: {
            socialActivity: {
              isEmail: values.includes('Email') ? true : false,
              isPush: values.includes('Push') ? true : false,
            },
          },
        },
      },
    })
      .then((data) => {
        const isEmail = values.includes('Email') ? true : false;
        setIsEmail(isEmail);
        const isPush = values.includes('Push') ? true : false;
        setIsPush(isPush);

        if (isEmail && isPush) {
          setDefaultValues(['Email', 'Push']);
        } else if (isEmail) {
          setDefaultValues(['Email']);
        } else if (isPush) {
          setDefaultValues(['Push']);
        }
      })
      .catch((error) => {});
  };
  return (
    <Panel>
      <NavigationItem
        title='Trending'
        route='trending'
        subtext='Trending content across the platform and some editorial picks'
      />
      <NavigationItem
        title='Recommended'
        route='recommended'
        subtext='Content we think you’ll love based on your preferences'
      />
      <NavigationItem
        title='You may like'
        route='youMayLike'
        subtext='Authors, Pages and Shops you may like browsing'
      />

      <SubjectTitle>Activity on JuicyPie</SubjectTitle>

      <SettingMenuWrapper justify='space-between'>
        <Typography.Text>Someone follows you</Typography.Text>
        <MultipleSelect
          options={['Email', 'Push']}
          selected={{
            Email: isEmail,
            Push: isPush,
          }}
          onChange={(values) => {
            updateFollowsYouSettingsNotification(values);
          }}
          defaultValues={defaultValues}
        />
      </SettingMenuWrapper>
      <SettingMenuWrapper justify='space-between'>
        <Typography.Text>Someone likes your posts</Typography.Text>
        <MultipleSelect
          options={['Email', 'Push']}
          selected={{
            Email: isEmail,
            Push: isPush,
          }}
          onChange={(values) => {
            updateLikeYourPostSettingsNotification(values);
          }}
          defaultValues={defaultValues}
        />
      </SettingMenuWrapper>
    </Panel>
  );
};

NotificationSettings.TrendingView = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { userId: userId },
  });
  const [isDaily, setIsDaily] = useState(false);
  const [isWeekly, setIsWeekly] = useState(false);
  const [isOff, setIsOff] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPush, setIsPush] = useState(false);
  const [defaultValues, setDefaultValues] = useState([]);

  useEffect(() => {
    setIsDaily(data?.userSetting?.notification?.trending?.button?.isDaily);
    setIsWeekly(data?.userSetting?.notification?.trending?.button?.isWeekly);
    setIsOff(data?.userSetting?.notification?.trending?.button?.isOff);

    setIsEmail(data?.userSetting?.notification?.trending?.isEmail);

    setIsPush(data?.userSetting?.notification?.trending?.isPush);

    if (
      data?.userSetting?.notification?.trending?.isEmail &&
      data?.userSetting?.notification?.trending?.isPush
    ) {
      setDefaultValues(['Email', 'Push']);
    } else if (data?.userSetting?.notification?.trending?.isEmail) {
      setDefaultValues(['Email']);
    } else if (data?.userSetting?.notification?.trending?.isPush) {
      setDefaultValues(['Push']);
    }
  }, [data]);

  const [updateUserSetting] = useMutation(UPDATE_USER_SETTING_MUTATION);
  const updateTrendingSettings = (setting) => {
    updateUserSetting({
      variables: {
        updateUserSetting: {
          userId: userId,
          notification: {
            trending: {
              button: setting,
              isEmail: data?.userSetting?.notification?.trending?.isEmail,
              isPush: data?.userSetting?.notification?.trending?.isPush,
            },
          },
        },
      },
    })
      .then((response) => {
        const notifTrendingBtn =
          response.data.upsertUserSetting.notification.trending.button;
        setIsDaily(notifTrendingBtn.isDaily);
        setIsWeekly(notifTrendingBtn.isWeekly);
        setIsOff(notifTrendingBtn.isOff);
      })
      .catch((error) => {});
  };

  const updateTrendingSettingsNotification = (values = []) => {
    console.log(values);
    updateUserSetting({
      variables: {
        updateUserSetting: {
          userId: userId,
          notification: {
            trending: {
              isEmail: values.includes('Email') ? true : false,
              isPush: values.includes('Push') ? true : false,
              button: {
                isDaily:
                  data?.userSetting?.notification?.trending?.button?.isDaily,
                isWeekly:
                  data?.userSetting?.notification?.trending?.button?.isWeekly,
                isOff: data?.userSetting?.notification?.trending?.button?.isOff,
              },
            },
          },
        },
      },
    })
      .then((response) => {
        const isEmail = values.includes('Email') ? true : false;
        setIsEmail(isEmail);
        const isPush = values.includes('Push') ? true : false;
        setIsPush(isPush);

        if (isEmail && isPush) {
          setDefaultValues(['Email', 'Push']);
        } else if (isEmail) {
          setDefaultValues(['Email']);
        } else if (isPush) {
          setDefaultValues(['Push']);
        }
      })
      .catch((error) => {});
  };

  return (
    <SettingPanel>
      <Typography.Text>
        Where would you like to see trending notifications?
      </Typography.Text>
      <SettingsOptionWapper>
        <MultipleSelect
          options={['Email', 'Push']}
          selected={{
            Email: isEmail,
            Push: isPush,
          }}
          onChange={(values) => {
            updateTrendingSettingsNotification(values);
          }}
          defaultValues={defaultValues}
        />
      </SettingsOptionWapper>
      <Panel>
        <Typography.Text>How often?</Typography.Text>
        <OptionsWrapper>
          <OptionButton
            onClick={() =>
              updateTrendingSettings({
                isDaily: true,
                isWeekly: false,
                isOff: false,
              })
            }
            active={isDaily}
          >
            Daily
          </OptionButton>
          <OptionButton
            onClick={() =>
              updateTrendingSettings({
                isDaily: false,
                isWeekly: true,
                isOff: false,
              })
            }
            active={isWeekly}
          >
            Weekly
          </OptionButton>
          <OptionButton
            onClick={() =>
              updateTrendingSettings({
                isDaily: false,
                isWeekly: false,
                isOff: true,
              })
            }
            active={isOff}
          >
            Off
          </OptionButton>
        </OptionsWrapper>
      </Panel>
    </SettingPanel>
  );
};

NotificationSettings.RecommendedView = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { userId: userId },
  });
  const [isDaily, setIsDaily] = useState(false);
  const [isWeekly, setIsWeekly] = useState(false);
  const [isOff, setIsOff] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPush, setIsPush] = useState(false);
  const [defaultValues, setDefaultValues] = useState([]);

  useEffect(() => {
    setIsDaily(data?.userSetting?.notification?.recommended?.button?.isDaily);
    setIsWeekly(data?.userSetting?.notification?.recommended?.button?.isWeekly);
    setIsOff(data?.userSetting?.notification?.recommended?.button?.isOff);

    setIsEmail(data?.userSetting?.notification?.recommended?.isEmail);

    setIsPush(data?.userSetting?.notification?.recommended?.isPush);

    console.log(
      '--',
      data?.userSetting?.notification?.recommended?.isEmail,
      data?.userSetting?.notification?.recommended?.isPush
    );
    if (
      data?.userSetting?.notification?.recommended?.isEmail &&
      data?.userSetting?.notification?.recommended?.isPush
    ) {
      setDefaultValues(['Email', 'Push']);
    } else if (data?.userSetting?.notification?.recommended?.isEmail) {
      setDefaultValues(['Email']);
    } else if (data?.userSetting?.notification?.recommended?.isPush) {
      setDefaultValues(['Push']);
    }
  }, [data]);

  const [updateUserSetting] = useMutation(UPDATE_USER_SETTING_MUTATION);
  const updateRecommendedSettings = (setting) => {
    updateUserSetting({
      variables: {
        updateUserSetting: {
          userId: userId,
          notification: {
            recommended: {
              button: setting,
              isEmail: data?.userSetting?.notification?.recommended?.isEmail,
              isPush: data?.userSetting?.notification?.recommended?.isPush,
            },
          },
        },
      },
    })
      .then((response) => {
        const notifTrendingBtn =
          response.data.upsertUserSetting.notification.recommended.button;
        console.log(notifTrendingBtn);
        setIsDaily(notifTrendingBtn.isDaily);
        setIsWeekly(notifTrendingBtn.isWeekly);
        setIsOff(notifTrendingBtn.isOff);
      })
      .catch((error) => {});
  };

  const updateRecommendedSettingsNotification = (values = []) => {
    updateUserSetting({
      variables: {
        updateUserSetting: {
          userId: userId,
          notification: {
            recommended: {
              isEmail: values.includes('Email') ? true : false,
              isPush: values.includes('Push') ? true : false,
              button: {
                isDaily:
                  data?.userSetting?.notification?.recommended?.button?.isDaily,
                isWeekly:
                  data?.userSetting?.notification?.recommended?.button
                    ?.isWeekly,
                isOff:
                  data?.userSetting?.notification?.recommended?.button?.isOff,
              },
            },
          },
        },
      },
    })
      .then((response) => {
        const isEmail = values.includes('Email') ? true : false;
        setIsEmail(isEmail);
        const isPush = values.includes('Push') ? true : false;
        setIsPush(isPush);

        if (isEmail && isPush) {
          setDefaultValues(['Email', 'Push']);
        } else if (isEmail) {
          setDefaultValues(['Email']);
        } else if (isPush) {
          setDefaultValues(['Push']);
        }
      })
      .catch((error) => {});
  };

  // useEffect(() =>{

  // },[notifTrendingBtn])

  return (
    <Panel>
      <Typography.Text>
        Where would you like to see recommended notifications?
      </Typography.Text>
      <SettingsOptionWapper>
        <MultipleSelect
          options={['Email', 'Push']}
          selected={{
            Email: isEmail,
            Push: isPush,
          }}
          onChange={(values) => {
            updateRecommendedSettingsNotification(values);
          }}
          defaultValues={defaultValues}
        />
      </SettingsOptionWapper>
      <Panel>
        <Typography.Text>How often?</Typography.Text>
        <OptionsWrapper>
          <OptionButton
            onClick={() =>
              updateRecommendedSettings({
                isDaily: true,
                isWeekly: false,
                isOff: false,
              })
            }
            active={isDaily}
          >
            Daily
          </OptionButton>
          <OptionButton
            onClick={() =>
              updateRecommendedSettings({
                isDaily: false,
                isWeekly: true,
                isOff: false,
              })
            }
            active={isWeekly}
          >
            Weekly
          </OptionButton>
          <OptionButton
            onClick={() =>
              updateRecommendedSettings({
                isDaily: false,
                isWeekly: false,
                isOff: true,
              })
            }
            active={isOff}
          >
            Off
          </OptionButton>
        </OptionsWrapper>
      </Panel>
    </Panel>
  );
};

NotificationSettings.YouMayLikeView = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { userId: userId },
  });
  const [isDaily, setIsDaily] = useState(false);
  const [isWeekly, setIsWeekly] = useState(false);
  const [isOff, setIsOff] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPush, setIsPush] = useState(false);
  const [defaultValues, setDefaultValues] = useState([]);

  useEffect(() => {
    setIsDaily(data?.userSetting?.notification?.authorsLike?.button?.isDaily);
    setIsWeekly(data?.userSetting?.notification?.authorsLike?.button?.isWeekly);
    setIsOff(data?.userSetting?.notification?.authorsLike?.button?.isOff);

    setIsEmail(data?.userSetting?.notification?.authorsLike?.isEmail);

    setIsPush(data?.userSetting?.notification?.authorsLike?.isPush);

    if (
      data?.userSetting?.notification?.authorsLike?.isEmail &&
      data?.userSetting?.notification?.authorsLike?.isPush
    ) {
      setDefaultValues(['Email', 'Push']);
    } else if (data?.userSetting?.notification?.authorsLike?.isEmail) {
      setDefaultValues(['Email']);
    } else if (data?.userSetting?.notification?.authorsLike?.isPush) {
      setDefaultValues(['Push']);
    }
  }, []);

  const [updateUserSetting] = useMutation(UPDATE_USER_SETTING_MUTATION);
  const updateYouMayLikeSettings = (setting) => {
    console.log('Settings', setting);
    updateUserSetting({
      variables: {
        updateUserSetting: {
          userId: userId,
          notification: {
            authorsLike: {
              button: setting,
              isEmail: data?.userSetting?.notification?.authorsLike?.isEmail,
              isPush: data?.userSetting?.notification?.authorsLike?.isPush,
            },
          },
        },
      },
    })
      .then((response) => {
        const notifTrendingBtn =
          response.data.upsertUserSetting.notification.authorsLike.button;
        setIsDaily(notifTrendingBtn.isDaily);
        setIsWeekly(notifTrendingBtn.isWeekly);
        setIsOff(notifTrendingBtn.isOff);
      })
      .catch((error) => {});
  };

  const updateYouMayLikeSettingsNotification = (values = []) => {
    updateUserSetting({
      variables: {
        updateUserSetting: {
          userId: userId,
          notification: {
            authorsLike: {
              isEmail: values.includes('Email') ? true : false,
              isPush: values.includes('Push') ? true : false,
              button: {
                isDaily:
                  data?.userSetting?.notification?.authorsLike?.button?.isDaily,
                isWeekly:
                  data?.userSetting?.notification?.authorsLike?.button
                    ?.isWeekly,
                isOff:
                  data?.userSetting?.notification?.authorsLike?.button?.isOff,
              },
            },
          },
        },
      },
    })
      .then((response) => {
        const isEmail = values.includes('Email') ? true : false;
        setIsEmail(isEmail);
        const isPush = values.includes('Push') ? true : false;
        setIsPush(isPush);

        if (isEmail && isPush) {
          setDefaultValues(['Email', 'Push']);
        } else if (isEmail) {
          setDefaultValues(['Email']);
        } else if (isPush) {
          setDefaultValues(['Push']);
        }
      })
      .catch((error) => {});
  };
  return (
    <SettingPanel>
      <Typography.Text>
        Where would you like to see notifications?
      </Typography.Text>
      <SettingsOptionWapper>
        <MultipleSelect
          options={['Email', 'Push']}
          selected={{
            Email: isEmail,
            Push: isPush,
          }}
          onChange={(values) => {
            updateYouMayLikeSettingsNotification(values);
          }}
          defaultValues={defaultValues}
        />
      </SettingsOptionWapper>
      <Panel>
        <Typography.Text>How often?</Typography.Text>
        <OptionsWrapper>
          <OptionButton
            onClick={() =>
              updateYouMayLikeSettings({
                isDaily: true,
                isWeekly: false,
                isOff: false,
              })
            }
            active={isDaily}
          >
            Daily
          </OptionButton>
          <OptionButton
            onClick={() =>
              updateYouMayLikeSettings({
                isDaily: false,
                isWeekly: true,
                isOff: false,
              })
            }
            active={isWeekly}
          >
            Weekly
          </OptionButton>
          <OptionButton
            onClick={() =>
              updateYouMayLikeSettings({
                isDaily: false,
                isWeekly: false,
                isOff: true,
              })
            }
            active={isOff}
          >
            Off
          </OptionButton>
        </OptionsWrapper>
      </Panel>
    </SettingPanel>
  );
};

const Panel = styled(Row)`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media only screen and (max-width: 451px) {
    padding-right: 16px;
  }
`;

const SettingPanel = styled(Panel)`
  @media only screen and (max-width: 451px) {
    padding: 0 16px;
  }
`;

const SubjectTitle = styled(Typography.Paragraph)`
  font-weight: bold;
  font-size: 19px;
  line-height: 150%;
  color: #404950;
  padding: 0 16px;
`;

const SettingsOptionWapper = styled(Row)`
  margin: 15px 0 30px 0;
`;

const SettingMenuWrapper = styled(Row)`
  padding: 0 16px;
  margin-bottom: 30px;
`;

const OptionsWrapper = styled(Row)`
  width: 100%;
  margin-top: 15px;
`;

const OptionButton = styled(Button)`
  width: 118px;
  box-sizing: border-box;
  border-radius: 5px;
  margin-right: 15px;
  color: ${(props) => (props.active ? '#0095F8' : '#404950')};
  border: 1px solid ${(props) => (props.active ? '#0095F8' : '#E4EAEE')};
  background: ${(props) => (props.active ? '#FFFFFF' : 'transparent')};
  @media only screen and (max-width: 451px) {
    width: 88px;
  }
`;

export default NotificationSettings;
