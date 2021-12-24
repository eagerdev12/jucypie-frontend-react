import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Col } from 'antd';
import { BackNavigationHeader } from '../../../src/components/atoms';
import {
  ShippingPaymentSettings,
  SettingsPageLayout,
} from '../../../src/components/views';

const ShippingPayments = () => {
  const router = useRouter();

  const handleUpdateAddress = (shippingAddress) => {
    router.push(`/settings/shpping_payments/update_shipping`, undefined, {
      shallow: true,
    });
  };

  const handleUpdateCard = (payment) => {
    router.push(`/settings/shpping_payments/update_payment`, undefined, {
      shallow: true,
    });
  };

  return (
    <SettingsPageLayout>
      <BackNavigationHeader title='Shipping & Payments' />
      <ShippingPaymentSettings
        onUpdateAddress={handleUpdateAddress}
        onUpdateCard={handleUpdateCard}
      />
    </SettingsPageLayout>
  );
};

export default ShippingPayments;
