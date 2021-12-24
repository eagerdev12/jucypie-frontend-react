import React from 'react';
import styled from 'styled-components';
import { GoogleLogin } from 'react-google-login';
import { Button } from 'antd';

import { GOOGLE_KEY } from '../../../config/config';

const ButtonWithGoogle = (props) => {
  const { autoLoad, onSuccess, onFailure, title } = props;
  return (
    <GoogleLogin
      clientId={GOOGLE_KEY}
      autoLoad={autoLoad}
      render={(renderProps) => (
        <ButtonCustom
          block
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <IconButton src='/images/google.svg' alt='' />
          <TextButton>{title}</TextButton>
        </ButtonCustom>
      )}
      buttonText='Login'
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
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
  &[disabled] {
    box-shadow: 0 2px 14px rgb(0 0 0 / 7%);
  }
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

export default ButtonWithGoogle;
