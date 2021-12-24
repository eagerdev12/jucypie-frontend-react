import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography, Checkbox, Row } from 'antd';

const TCheckOption = ({ label, onChange, isChecked = false }) => {
  const [checked, setChecked] = useState(isChecked);
  const toggleChecked = () => {
    const newState = !checked;
    setChecked(newState);
    onChange && onChange(newState, label);
  };

  return (
    <Row justify='space-between' onClick={toggleChecked}>
      <OptionTitle>{label}</OptionTitle>
      <Checkbox checked={checked} />
    </Row>
  );
};

const OptionTitle = styled(Typography.Text)``;

export default TCheckOption;
