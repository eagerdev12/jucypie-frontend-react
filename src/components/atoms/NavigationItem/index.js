import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { RightOutlined } from '@ant-design/icons';
import { Typography, Row, Col } from 'antd';

const NavigationItem = ({ title, subtext, route }) => {
  const router = useRouter();
  const handleNavigate = (route) => {
    router.push(`?edit=${route}`, undefined, { shallow: true });
  };

  return (
    <MenuWrapper justify='space-between' align='middle'>
      <Col>
        <Row>
          <SubTitle>{title}</SubTitle>
        </Row>
        <Row>
          <SubText>{subtext}</SubText>
        </Row>
      </Col>
      <Col>
        {route && (
          <RightOutlined
            onClick={(e) => handleNavigate(route)}
            color='#404950'
          />
        )}
      </Col>
    </MenuWrapper>
  );
};

const MenuWrapper = styled(Row)`
  margin-bottom: 30px;
`;

const SubTitle = styled(Typography.Text)`
  padding: 0 16px;
  font-size: 17px;
  line-height: 150%;
`;

const SubText = styled(Typography.Text)`
  padding: 0 16px;
  font-size: 15px;
  line-height: 150%;
  max-width: 324px;
  color: #777e83;
`;

export default NavigationItem;
