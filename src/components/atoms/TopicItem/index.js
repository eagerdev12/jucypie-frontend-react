import React, { useState } from 'react';
import styled from 'styled-components';

const TopicItem = ({ title, onClick }) => {
  const [selected, setSelected] = useState(false);
  const handleToggle = (e) => {
    const updateState = !selected;
    onClick && onClick(updateState);
    setSelected(updateState);
  };

  return (
    <StyledButton selected={selected} onClick={handleToggle}>
      {title}
    </StyledButton>
  );
};

const StyledButton = styled.span`
  height: 50px;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 68px;
  color: #404950;
  font-weight: bold;
  font-size: 20px;
  padding: 13px;
  cursor: pointer;
  display: inline-table;
  white-space: nowrap;
  margin: 0 20px 20px 0;
  border: ${(props) =>
    props.selected
      ? '1.5px solid #0095F8'
      : '0.5px solid rgba(228, 234, 238, 0.8)'};
  filter: drop-shadow(0px 4px 20px rgba(228, 234, 238, 0.8));
  &:hover {
    color: #404950;
    background-color: white;
  }
  &:focus {
    color: #404950;
    background-color: white;
  }
  @media (max-width: 451px) {
    margin: 0 20px 20px 0;
    font-size: 15px;
  }
`;

export default TopicItem;
