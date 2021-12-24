import React from 'react';
import styled from 'styled-components';

const TabButton = ({ selected, width, img, title }) => {
  return (
    <ImageTabButton width={width} selected={selected}>
      <TabButtonTitle>{title}</TabButtonTitle>
      {img && <TabButtonImage src={img} />}
    </ImageTabButton>
  );
};

const ImageTabButton = styled.div`
  outline: none;
  border: none;
  width: 100%;
  text-align: center;
  justify-content: center;
  background: transparent;
  text-align: -webkit-center;
  padding: 7px 0px;
  width: ${(props) => props.width};
  ${(props) => props.selected && 'border-top: 1px solid #0095F8'};
`;

const TabButtonTitle = styled.label`
  text-align: center;
  margin: 0px auto;
  font-weight: bold;
  font-size: 14px;
  padding: 7px 0px;
  line-height: 150%;
  color: #0095f8;
  letter-spacing: 0.1em;
  @media (max-width: 375px) {
    display: ${(props) => (props.img ? 'none' : 'initial')};
  }
`;

const TabButtonImage = styled.img`
  width: 21px;
  height: 21px;
  display: none;
  @media (max-width: 375px) {
    display: block;
  }
`;

export default TabButton;
