import React from 'react';
import styled from 'styled-components';

const Avatar = ({ size }) => {
  return <StyledImage src='/images/temp/profile_model.svg' width={size} />;
};

const StyledImage = styled.img`
  border-radius: 50%;
  object-fit: cover;
`;

export default Avatar;
