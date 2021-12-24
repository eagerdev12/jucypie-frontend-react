import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

const InputText = (props) => {
  return <StyledInput {...props} bordered={false} />;
};

const StyledInput = styled(Input)`
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  box-shadow: none;
  outline: none;
  border-radius: 5px;
  padding: 16px 20px;
  font-size: 16px;
  line-height: 20px;
  height: 50px;
  &:focus {
    background: #ffffff;
    border: none;
    box-shadow: 10px 10px 25px rgba(228, 234, 238, 0.8);
    outline: none;
  }
  &:hover {
    background: #ffffff;
    border: none;
  }
  @media (max-width: 375px) {
    border-top-style: initial;
  }
`;

export default InputText;
