import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DownOutlined } from "@ant-design/icons";
import { Input, Dropdown, Menu } from "antd";
import { TCheckOption } from "../";

const MultipleSelect = ({ options, onChange, selected = {}, defaultValues = [] }) => {
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState([]);

  const handleChange = (newState, label) => {
    const newValues = newState
      ? [...values, label]
      : values.filter((i) => i != label);
    setValues(newValues);
    onChange && onChange(newValues);
  };

  useEffect(() => {
    setValues(defaultValues)
    return () => {
    }
  }, [defaultValues])

  const optionList = (
    <Menu>
      {options &&
        options.map((option, index) => {
          return (
            <Menu.Item key={index}>
              <TCheckOption label={option} onChange={handleChange} isChecked={selected[option]} />
            </Menu.Item>
          );
        })}
    </Menu>
  );

  return (
    <Dropdown
      overlay={optionList}
      trigger={["click"]}
      visible={visible}
      placement="bottomCenter"
      onVisibleChange={(visible) => setVisible(visible)}
    >
      <StyledInput
        onClick={(e) => setVisible(true)}
        value={values.join()}
        suffix={<DownOutlined />}
      />
    </Dropdown>
  );
};

const StyledInput = styled(Input)`
  width: 198px;
  border: 1px solid #e4eaee;
  box-sizing: border-box;
  background: transparent;
  border-radius: 5px;
  input {
    background: transparent;
  }
  &:focus {
    border: 1px solid #0095f8;
  }
`;

export default MultipleSelect;
