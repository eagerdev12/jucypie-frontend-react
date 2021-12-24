import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { Typography } from 'antd';

const ProfileCard = ({
  title,
  subtext,
  avatar,
  showLink,
  align = 'center',
}) => {
  return (
    <Container align={align}>
      <Avatar size={40} url={avatar} />
      <DetailsWrapper>
        <Title>{title}</Title>
        {showLink && (
          <Link href='/profile'>
            <ViewProfileLink>View Profile</ViewProfileLink>
          </Link>
        )}
        <SubText>{subtext}</SubText>
      </DetailsWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: ${(props) => (props.align === 'top' ? 'initial' : props.align)};
`;

const ViewProfileLink = styled.a`
  font-size: 15px;
  line-height: 17px;
  padding-bottom: 5px;
  color: #0095f8;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

const Title = styled(Typography.Text)`
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  margin-bottom: 5px;
  color: #404950;
`;

const SubText = styled(Typography.Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 14px;
`;

export default ProfileCard;
