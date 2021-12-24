import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { LeftOutlined } from '@ant-design/icons';
import { Row, Typography } from 'antd';

const BackNavigationHeader = ({ title, backable }) => {
  const router = useRouter();
  const handleBack = () => {
    if (backable) {
      router.back();
    }
  };

  return (
    <BackNavigationWrapper align='middle' backable={backable}>
      {backable && (
        <BackWrapper onClick={handleBack}>
          <LeftOutlined />
        </BackWrapper>
      )}
      <PageTitle>{title}</PageTitle>
    </BackNavigationWrapper>
  );
};

const BackWrapper = styled.div`
  margin-right: 12px;
`;

const BackNavigationWrapper = styled(Row)`
  padding: ${(props) => (props.backable ? '0' : '0 16px')};
  margin 20px 0 45px 0;
  @media only screen and (max-width: 451px) {
    padding: 0 16px;
  }
`;

const PageTitle = styled(Typography.Paragraph)`
  margin: 0px !important;
  font-weight: bold;
  font-size: 19px;
  line-height: 150%;
`;

export default BackNavigationHeader;
