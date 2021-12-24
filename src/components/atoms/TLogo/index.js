import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import VectorIcon from '../VectorIcon';

const TLogo = () => {
  return (
    <Link href='/'>
      <LogoImage>
        <VectorIcon name="LogoIcon" />
      </LogoImage>
    </Link>
  );
};

const LogoImage = styled.a`
  display: inline-block;
  margin-top: 12px;
  margin-left: 5px;
  @media only screen and (min-width: 450px) {
    margin-top: 20px;
  }
`;

export default TLogo;
