import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Typography, Row, Button, notification } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withApollo, useMutation } from 'react-apollo';
import { SAVE_USER_MUTATION } from '../../../graphql';
import { TOPICS } from '../../../utils/constants';
import { TopicItem } from '../../atoms';

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
    <PageContent>
      <PageTitle>Choose your topics</PageTitle>
      <TopicsWrapper>{TopicItems}</TopicsWrapper>
    </PageContent>
  );
};

const PageContent = styled.div`
  width: 100%;
  margin-top: 2rem;
  @media (max-width: 451px) {
    margin-top: 0px;
  }
`;

const PageTitle = styled(Typography.Text)`
  font-weight: 800 !important;
  font-size: 23px !important;
  line-height: 150% !important;
  color: rgba(64, 73, 80, 0.95) !important;
  @media (max-width: 451px) {
    margin: 0 1rem;
  }
`;

const TopicsWrapper = styled.div`
  display: block;
  padding-top: 20px;
  @media (max-width: 451px) {
    margin-left: 1rem;
  }
`;

export default compose(
  connect((state) => state),
  withApollo
)(TopicSelect);
