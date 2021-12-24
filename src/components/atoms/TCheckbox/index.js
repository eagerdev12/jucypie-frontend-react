import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography, Checkbox, Row } from 'antd';

const TCheckbox = ({ label, onChange }) => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
    onChange && onChange();
  };

  return (
    <Row align='middle'>
      <Checkbox checked={checked} onChange={handleChange} />
      <StyledLabel>{label}</StyledLabel>
    </Row>
  );
};

const StyledLabel = styled(Typography.Text)`
  font-size: 15px;
  line-height: 17px;
  margin-left: 10px;
`;

export default TCheckbox;
