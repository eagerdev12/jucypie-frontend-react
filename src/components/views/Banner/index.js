import React from 'react';
import styled from 'styled-components';
import { Row, Typography, Image } from 'antd';

const Banner = ({
    desktopTitle1,
    desktopTitle2,
    mobileTitle1,
    mobileTitle2,
    noUnderline=false,
    desktopUnderlineWidth,
    mobileUnderlineWidth,
    desktopUnderlinePos,
    mobileUnderlinePos,
    backgroundColor,
    imageSrc,
    marginTop,
    deskMarginTop
}) => {
  return (
    <Row>
      <ArticlesHeader deskMarginTop={deskMarginTop} margin_top={marginTop} background_color={backgroundColor}>
        <HeaderTitleContainer>
          <HeaderTitle>{desktopTitle1}</HeaderTitle>
          <HeaderTitle>{desktopTitle2}</HeaderTitle>
          <MobileHeaderTitle>{mobileTitle1}</MobileHeaderTitle>
          <MobileHeaderTitle>{mobileTitle2}</MobileHeaderTitle>
          {!noUnderline && <TitleLine mobilePos={mobileUnderlinePos} mobileWidth={mobileUnderlineWidth} desktopPos={desktopUnderlinePos} desktopWidth={desktopUnderlineWidth} />}
        </HeaderTitleContainer>
        <ArticleHeaderLogo src={imageSrc} />
      </ArticlesHeader>
    </Row>
  )
};


const HeaderTitleContainer = styled(Row)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ArticleHeaderLogo = styled(Image)`
  float: right;
  width: 198px;
  height: 198px;
  display: flex;
`;

const HeaderTitle = styled(Typography.Text)`
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 150%;
  margin: 0 !important;
  padding: 0;
  color: #fbfbfb;
  display: none;
  @media only screen and (min-width: 450px) {
    display: flex;
  }
`;

const MobileHeaderTitle = styled(Typography.Text)`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 150%;
  margin: 0 !important;
  padding: 0;
  color: #fbfbfb;
  display: none;
  @media only screen and (max-width: 451px) {
    display: flex;
  }
`;

const TitleLine = styled.span`
  border-bottom: 4px solid #ffffff;
  width: ${props => props.desktopWidth }px;
  transform: translateY(${props => props.desktopPos }%);
  @media only screen and (min-width: 450px) {
    margin: 0 auto;
    width: ${props => props.mobileWidth }px;
    transform: translateY(${props => props.mobilePos }%);
  }
`;

const ArticlesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 200px;
  width: 100%;
  background: ${props => props.background_color || 'black'};
  margin-top: ${props => props.margin_top >= 0 ? props.margin_top : '44'}px;
  padding: 0 12px;
  @media only screen and (min-width: 450px) {
    margin-top: ${props => props.deskMarginTop >= 0 ? props.deskMarginTop : '0'}px;
    border-radius: 10px;
    padding: 0 2rem;
  }
`;

export default Banner;
