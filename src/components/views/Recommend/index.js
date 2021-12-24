import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const Recommend = ({ image, title, children }) => {
  return (
    <Panel>
      <CardImage src={image} />
      <RecommendBody>
        <StyledText>{title}</StyledText>
        {children}
      </RecommendBody>
    </Panel>
  );
};

const Panel = styled.div`
  background: white;
  border-radius: 10px;
`;

const StyledText = styled(Typography.Text)`
  font-size: 16px;
  line-height: 145%;
  text-align: center;
  color: rgba(64, 73, 80, 0.95);
`;

const RecommendBody = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
`;

const CardImage = styled.img`
  height: 150px;
`;

export default Recommend;
