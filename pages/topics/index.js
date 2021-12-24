import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Typography, Row, Button, notification } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withApollo, useMutation } from 'react-apollo';
import { SAVE_USER_MUTATION } from '../../src/graphql';
import { TopicItem } from '../../src/components/atoms';
import { PageLayout, NavMenu } from '../../src/components/views';
import { TOPICS } from '../../src/utils/constants';
import { useRouter } from 'next/router';

const openNotification = (errorMessage) => {
  notification.error({
    message: 'Error',
    description: <div>{errorMessage}</div>,
  });
};

const TopicSelect = ({ authUser }) => {
  const router = useRouter();
  const [topics, setTopics] = useState([]);
  const [updateUser, { loading, data, error }] = useMutation(
    SAVE_USER_MUTATION
  );

  const handleClick = (title, state) => {
    setTopics(state ? [...topics, title] : topics.filter((i) => i != title));
  };

  useEffect(() => {
    if (error) {
      openNotification(
        error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))
      );
    }

    if (data) {
      router.push('/');
    }
  }, [data, error]);

  const TopicItems = TOPICS.map((title, index) => {
    return (
      <TopicItem
        key={index}
        title={title}
        onClick={(state) => handleClick(title, state)}
      />
    );
  });

  const handleConfirmTopics = (e) => {
    const categories = topics.map((topic, index) => {
      return { ID: index + 1, name: topic };
    });
    if (authUser) {
      updateUser({
        variables: {
          userinput: {
            userId: authUser.ID,
            email: authUser.email,
            parentCategories: categories,
          },
        },
      });
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      <Head>
        <title>Select Topics! / JuicyPie</title>
      </Head>
      <PageLayout leftComponents={<NavMenu />} hideNav>
        <PageContent>
          <PageTitle>Choose your topics</PageTitle>
          <TopicSelectBio>
            Your feed is almost ready. Choose at least 5 topics you’d like to
            discover
          </TopicSelectBio>
          <TopicsWrapper>{TopicItems}</TopicsWrapper>
        </PageContent>
        <Row align='center'>
          <ContinueButton
            type='primary'
            htmlType='submit'
            className='login-form-button'
            onClick={handleConfirmTopics}
            loading={loading}
            disabled={topics.length < 5}
          >
            Continue
          </ContinueButton>
        </Row>
      </PageLayout>
    </>
  );
};

const PageContent = styled.div`
  width: 100%;
  margin-top: 90px;
  @media only screen and (max-width: 451px) {
    margin-top: 74px;
  }
`;

const PageTitle = styled(Typography.Title)`
  font-weight: 800 !important;
  font-size: 23px !important;
  line-height: 150% !important;
  color: rgba(64, 73, 80, 0.95) !important;
  @media only screen and (max-width: 451px) {
    margin: 0 1rem;
  }
`;

const TopicSelectBio = styled(Typography.Paragraph)`
  font-size: 17px;
  line-height: 150%;
  color: #404950;
  @media only screen and (max-width: 451px) {
    margin: 0 1rem;
  }
`;

const TopicsWrapper = styled.div`
  display: block;
  padding-top: 20px;
  @media only screen and (max-width: 451px) {
    margin-left: 1rem;
  }
`;

const ContinueButton = styled(Button)`
  width: 350px;
  height: 40px;
  font-weight: bold;
  font-size: 15px;
  background: #0095f8;
  border-radius: 5px;
  margin-top: 10px;
  &:hover {
    background: #0095f8;
  }
  @media only screen and (max-width: 451px) {
    position: fixed;
    bottom: 1rem;
    width: calc(100vw - 2rem);
    left: 1rem;
  }
`;

export default compose(
  connect((state) => state),
  withApollo
)(TopicSelect);
