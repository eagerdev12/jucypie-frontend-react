import React from 'react';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Row } from 'antd';

const LoadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AppPageLoader = ({ loading }) => (
  <StyledLoader align='middle' justify='center'>
    {loading && <Spin indicator={LoadingIcon} />}
  </StyledLoader>
);

const StyledLoader = styled(Row)`
  width: 50px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default AppPageLoader;
