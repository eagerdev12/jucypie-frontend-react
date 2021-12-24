import React from 'react';
import styled from 'styled-components';
import { LockFilled } from '@ant-design/icons';
import { Typography, Row } from 'antd';
import {
  BackNavigationHeader,
  InputText,
} from '../../../../src/components/atoms';
import {
  SettingsPageLayout,
  AddressForm,
} from '../../../../src/components/views';

const UpdatePayment = () => {
  return (
    <SettingsPageLayout>
      <BackNavigationHeader title='Add a card' backable />
      <SecureAlertWrapper justify='center' align='middle'>
        <LockFilled />
        <SecureAlertText>
          Your information is secure & confidential
        </SecureAlertText>
      </SecureAlertWrapper>
      <FormWrapper>
        <InputText placeholder='Card Number' />
        <AddressForm title='Billing Address' />
      </FormWrapper>
    </SettingsPageLayout>
  );
};

const FormWrapper = styled(Row)`
  padding: 0 16px;
`;

const SecureAlertWrapper = styled(Row)`
  height: 31px;
  margin-bottom: 30px;
`;

const SecureAlertText = styled(Typography.Text)`
  font-size: 14px;
  line-height: 16px;
  margin-left: 8px;
  color: rgba(64, 73, 80, 0.5);
`;

export default UpdatePayment;
