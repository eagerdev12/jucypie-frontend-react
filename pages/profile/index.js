import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { compose } from 'redux';
import { Button, Empty, Row, Avatar } from 'antd';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { PageLayout, NavMenu } from '../../src/components/views';
import { TabButton } from '../../src/components/atoms';
import { useRouter } from 'next/router';
import { GET_ARTICLES_QUERY } from '../../src/graphql';
import { client } from '../../src/config/configureClient';
import Article from '../../src/components/views/Article';
import { useMutation, useQuery } from 'react-apollo';
import { GET_USER_QUERY } from '../../src/graphql';

const Profile = ({ authUser }) => {
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { userId: authUser.ID },
  });

  const [articles, setArticles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    client
      .query({
        query: GET_ARTICLES_QUERY,
        variables: {
          filters: {
            limit: 100,
            page: 1,
            authorId: authUser && authUser.ID,
          },
        },
      })
      .then((result) => {
        result && setArticles(result.data.articles);
      })
      .catch((err) => {
        console.log('response error:', err);
      });
  }, []);

  const handleClickFollow = () => {
    authUser && router.push('/settings');
  };

  const articleList =
    articles &&
    articles.map((article) => {
      return <Article key={article.ID} {...article} />;
    });

  return (
    <>
      <Head>
        <title>Profile / JuicyPie</title>
      </Head>
      <PageLayout leftComponents={<NavMenu />}>
        <Panel>
          <FlexDiv align='center' bottomSpace={0}>
            <ProfileContainer>
              <ProfileWrapper>
                <ProfileAvatar src={authUser && authUser.avatar} />
                <ProfileDetails>
                  <UserProfile>
                    <UserName>{data?.userSetting?.account?.name}</UserName>
                    <FollowButton type='primary' onClick={handleClickFollow}>
                      {authUser ? 'Settings' : 'Follow'}
                    </FollowButton>
                  </UserProfile>
                  <UserIdentifierLabel responsive>
                    @<b>{data?.userSetting?.account?.userName}</b>
                  </UserIdentifierLabel>
                  <FlexDiv>
                    <Label>
                      <b>10</b> Followers
                    </Label>
                    <FollowingCount>
                      <b>5</b> Following
                    </FollowingCount>
                  </FlexDiv>
                  <UserIdentifierLabel>
                    @<b>{data?.userSetting?.account?.userName}</b>
                  </UserIdentifierLabel>
                  <BioLabel>{data?.userSetting?.account?.description}</BioLabel>
                </ProfileDetails>
              </ProfileWrapper>
              <BioLabel responsive>
                {data?.userSetting?.account?.description}
              </BioLabel>
              <FollowButton
                type='primary'
                responsive='true'
                onClick={handleClickFollow}
              >
                {authUser ? 'Settings' : 'Follow'}
              </FollowButton>
            </ProfileContainer>
          </FlexDiv>
          <Seperator />
          <TabButtonWrapper>
            <TabButton title='POSTS' width='153px' selected />
          </TabButtonWrapper>
          <ArticlesWrapper>
            {!articles.length ? <Empty /> : articleList}
          </ArticlesWrapper>
        </Panel>
      </PageLayout>
    </>
  );
};

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0px auto;
  margin-top: 90px;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
`;

const ProfileAvatar = styled(Avatar)`
  width: 125px;
  height: 125px;
  border-radius: 50%;
  @media (max-width: 375px) {
    width: 100px;
    height: 100px;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 375px) {
    position: relative;
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  @media (max-width: 375px) {
    margin-left: 20px;
  }
`;

const UserProfile = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  @media (max-width: 375px) {
    margin-bottom: 0px;
  }
`;

const FlexDiv = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.align ? props.align : 'left')};
`;

const UserName = styled.label`
  font-weight: bold;
  font-size: 22px;
  margin-right: 30px;
  line-height: 37px;
  color: black;
  @media (max-width: 375px) {
    margin-right: 0px;
  }
`;

const FollowButton = styled(Button)`
  border-radius: 5px;
  outline: none;
  border: none;
  height: 30px;
  font-size: 14px;
  line-height: 170%;
  text-align: center;
  display: ${(props) => (!props.responsive ? 'block' : 'none')};
  @media (max-width: 375px) {
    display: ${(props) => (props.responsive ? 'block' : 'none')};
    width: ${(props) => props.responsive && '100%'};
  }
`;

const Label = styled.label`
  font-weight: normal;
  line-height: 20px;
  font-size: 15px;
  color: #404950;
  margin-right: 26px;
`;

const FollowingCount = styled.label`
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  color: #404950;
`;

const UserIdentifierLabel = styled.label`
  font-weight: 600;
  font-size: 16px;
  line-height: 27px;
  color: #404950;
  margin-right: 26px;
  display: ${(props) => (!props.responsive ? 'block' : 'none')};
  @media (max-width: 375px) {
    display: ${(props) => (props.responsive ? 'block' : 'none')};
  }
`;

const BioLabel = styled.label`
  font-weight: normal;
  font-size: 16px;
  color: #404950;
  margin-right: 26px;
  display: ${(props) => (!props.responsive ? 'block' : 'none')};
  @media (max-width: 375px) {
    margin-top: 15px;
    margin-bottom: 10px;
    display: ${(props) => (props.responsive ? 'block' : 'none')};
  }
`;

const Seperator = styled.div`
  height: 1px;
  margin-top: 35px;
  width: 600px;
  background-color: #e4eaee;
  width: 100%;
`;

const TabButtonWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArticlesWrapper = styled(Row)`
  display: flex;
  flex-direction: column;
`;

export default compose(
  connect((state) => state, {}),
  withApollo
)(Profile);
