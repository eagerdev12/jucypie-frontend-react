import React from 'react';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Button } from 'antd';

import { FACEBOOK_KEY } from '../../../config/config';

const ButtonFacebook = (props) => {
  const { callback, title } = props;

  return (
    <FacebookLogin
      appId={FACEBOOK_KEY}
      callback={callback}
      render={(renderProps) => (
        <ButtonCustom onClick={renderProps.onClick} block>
          <IconButton src='/images/facebook.svg' alt='' />
          <TextButton>{title}</TextButton>
        </ButtonCustom>
      )}
    />
  );
};

const ButtonCustom = styled(Button)`
  background: #ffffff !important;
  border-radius: 5px !important;
  border: none !important;
  margin-bottom: 15px !important;
  padding: 12px 16px !important;
  height: auto !important;
  box-shadow: 0 2px 14px rgb(0 0 0 / 7%);
`;
const IconButton = styled.img`
  float: left !important;
`;

const TextButton = styled.span`
  font-family: Proxima Nova !important;
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 15px !important;
  line-height: 21px !important;
  text-align: center !important;

  color: #404950 !important;
`;

export default ButtonFacebook;
