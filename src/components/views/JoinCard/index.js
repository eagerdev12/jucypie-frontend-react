import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import Recommend from '../Recommend';
import { getUserInfo } from '../../../utils';

const JoinCard = () => {
  let loggedUser = getUserInfo()
  return (
    <Panel>
      {
        loggedUser === null && <Recommend
          title={
            <>
              Discover better <b>stories</b> and <b>products</b>
            </>
          }
          image='/images/temp/product-picture1.png'
        >
          <Link href='/login'>
            <LoginButton color='primary'>Log in</LoginButton>
          </Link>
          <Link href='/signup'>
            <JoinButton type='primary'>Sign up</JoinButton>
          </Link>
        </Recommend>
      }
    </Panel>
  );
};

const Panel = styled.div`
  width: 300px;
  margin-top: 90px;
  position: fixed;
`;

const LoginButton = styled(Button)`
  height: 30px;
  margin-top: 15px;
`;

const JoinButton = styled(Button)`
  height: 30px;
  margin-top: 15px;
`;

export default JoinCard;
