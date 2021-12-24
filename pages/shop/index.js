import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Row, Col, Typography } from 'antd';
import { PageLayout, NavMenu, Product, Banner } from '../../src/components/views';
import { BackNavigationHeader } from '../../src/components/atoms';

const Shop = () => {
  return (
    <>
      <Head>
        <title>Shop / JuicyPie</title>
      </Head>
      <PageLayout
        topComponents={
          <TopComponentRow>
            <MenuButton
              selected={true}
            >
              Shop
            </MenuButton>
          </TopComponentRow>
        } 
        leftComponents={<NavMenu />}
      >
        <TitleWrapper>
          <BackNavigationHeader title='Shop' backable='true' />
        </TitleWrapper>
        <Banner
          desktopTitle1="Great Deals"
          desktopTitle2="start here"
          mobileTitle1="Great Deals"
          mobileTitle2="start here"
          desktopUnderlineWidth={90}
          mobileUnderlineWidth={90}
          desktopUnderlinePos={-90}
          mobileUnderlinePos={-90}
          backgroundColor="#FD636B"
          imageSrc='/images/shop/shop_banner_image.svg'
        ></Banner>
        <SectionTitle>Popular</SectionTitle>
        <PopularProducts>
          <ProductCol>
            <Product
              offPercent={80}
              image='/images/shop/product1.png'
              price='US $8.95'
              badge="Same day shipping"
              title="Hi-Smile Toothpaste - Fresh product"
              sold="12k sold"
              like="360k"
              star="4.7"
            />
          </ProductCol>
          <ProductCol>
            <Product
              offPercent={70}
              image='/images/shop/product2.png'
              price='US $8.95'
              badge="Same day shipping"
              title="Hi-Smile Toothpaste - Fresh product"
              sold="12k sold"
              like="360k"
              star="4.7"
            />
          </ProductCol>
        </PopularProducts>
        <Banner
          desktopTitle1="Stay tuned for"
          desktopTitle2="more."
          mobileTitle1="Stay tuned for"
          mobileTitle2="more."
          noUnderline={true}
          backgroundColor="black"
          imageSrc='/images/shop/shop_image.svg'
          marginTop={0}
        ></Banner>
      </PageLayout>
    </>
  );
};

const TitleWrapper = styled(Row)`
  @media only screen and (max-width: 451px) {
    display: none;
  }
`;

const SectionTitle = styled(Typography.Title)`
  font-weight: 800 !important;
  font-size: 23px !important;
  line-height: 150% !important;
  color: rgba(64, 73, 80, 0.95) !important;
  margin-top: 30px;
  margin-bottom: 15px;
  margin-left: 1rem;
  padding: 0!important;
`;

const PopularProducts = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 451px) {
    justify-content: space-evenly;
  }
`;

const ProductCol = styled.div`
  margin-bottom: 30px;
  width: calc((100% - 30px) / 2);
  @media only screen and (max-width: 451px) {
    min-width: 170px;
    flex: none;
    max-width: 100%;
  }
`;

const MenuButton = styled(Typography.Text)`
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  cursor: pointer;
  font-size: 17px;
  line-height: 19px;
  margin: 0 1rem;
`;

const TopComponentRow = styled.div`
  display: none;
  flex-flow: row wrap;
  align-items: center;
  @media only screen and (max-width: 451px) {
    display: flex;
  }
`;

export default Shop;
