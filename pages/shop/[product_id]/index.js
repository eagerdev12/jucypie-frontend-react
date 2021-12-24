import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Row, Col, Divider, Button, Typography, Card, Tabs } from 'antd';
import {
  PageLayout,
  NavMenu,
  ProductDetail,
  ProfileCard,
} from '../../../src/components/views';
import { Toolkit, TopBar, VectorIcon } from '../../../src/components/atoms';

const ProductDetailsPage = () => {
  const [showTopbar, setShowTopbar] = useState(false);
  const tabRef = useRef();

  useEffect(() => {
    const isBottom = (el) => {
      return el && el.getBoundingClientRect().bottom <= window.innerHeight;
    };

    const handleScrollEvent = (e) => {
      setShowTopbar(isBottom(tabRef.current));
    };

    addEventListener('scroll', handleScrollEvent);
    return () => {
      removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Shop / JuicyPie</title>
      </Head>
      <PageLayout leftComponents={<NavMenu />}>
        <TopBar show={showTopbar ? 1 : 0}>
          <BackIconWrapper>
            <VectorIcon name='Back' width={19} height={15} />
          </BackIconWrapper>
          <StyledTabs defaultActiveKey='1' size='small' fill='#777B7C'>
            <Tabs.TabPane tab='Options' key='1' />
            <Tabs.TabPane tab='Overview' key='2' />
            <Tabs.TabPane tab='Reviews' key='3' />
          </StyledTabs>
        </TopBar>
        <Panel>
          <ProductDetail
            image='/images/temp/product-picture.png'
            price='US $4.95'
          />
          <OptionCard>
            <StyledTabs ref={tabRef} defaultActiveKey='1' size='small'>
              <Tabs.TabPane tab='Options' key='1'>
                <OptionsHeader>
                  <Col>
                    <Row>
                      <Title>Select options & shipping</Title>
                    </Row>
                    <Row>
                      <Text>Color, Size, Bundles</Text>
                    </Row>
                  </Col>
                  <PrimaryButton>Select</PrimaryButton>
                </OptionsHeader>
                <Divider />
                <Row>
                  <DescriptionText>
                    <b>Your Selection:</b> JuicyPie Essentials 3 Ply toilet
                    paper, White, 12 rolls, Monthly subscription, Flat rate
                    shipping from the U.S.
                  </DescriptionText>
                </Row>
                <ShippingTextLayout>
                  <DescriptionText>
                    <b>Shipping:</b> $4.95. Flat rate from the U.S.
                  </DescriptionText>
                </ShippingTextLayout>
                <SolderLayout>
                  <SoldBy>Sold By</SoldBy>
                  <ProfileCard
                    title='JuicyPie Essentials'
                    subtext='3.6K Followers'
                  />
                </SolderLayout>
              </Tabs.TabPane>
              <Tabs.TabPane tab='Overview' key='2'></Tabs.TabPane>
              <Tabs.TabPane tab='Reviews' key='3'></Tabs.TabPane>
            </StyledTabs>
            <Footer justify='space-between' align='middle'>
              <Toolkit
                icon={<VectorIcon name='Votes' width={30} height={30} />}
                title='10k'
              />
              <Toolkit
                icon={<VectorIcon name='Upload' width={30} height={30} />}
              />
              <Toolkit
                icon={
                  <VectorIcon name='Mark' width={30} height={30} noSpacing />
                }
              />
              <Toolkit icon={<VectorIcon name='More' height={5.4} />} />
            </Footer>
          </OptionCard>
        </Panel>
        <BottomMenu>
          <Row justify='space-between' align='middle'>
            <Col>
              <Toolkit
                icon={<VectorIcon name='Votes' width={30} height={30} />}
                title={0}
              />
            </Col>
            <Col>
              <Row>
                <AddToCartButton>Add to Cart</AddToCartButton>
                <Button type='primary'>Buy Now</Button>
              </Row>
            </Col>
          </Row>
        </BottomMenu>
      </PageLayout>
    </>
  );
};

const Panel = styled(Row)`
  display: flex;
  flex-direction: column;
  margin-top: 90px;
  margin-bottom: 68px;
`;

const OptionCard = styled(Card)`
  display: flex;
  margin: 2rem 0;
  margin-bottom: 66px;
  .ant-card-body {
    padding: 0;
    padding-bottom: 1rem;
  }
`;

const BackIconWrapper = styled.div`
  margin-right: 2rem;
  margin-left: 1rem;
  display: flex;
  align-items: center;
`;

const DescriptionText = styled(Typography.Text)`
  font-size: 17px;
`;

const Title = styled(Typography.Text)`
  font-weight: bold;
  font-size: 19px;
  line-height: 150%;
  color: black;
`;

const Text = styled(Typography.Text)`
  font-size: 15px;
`;

const Footer = styled(Row)`
  padding: 0 1rem;
  height: 30px;
  width: 100%;
`;

const PrimaryButton = styled(Button)`
  height: 30px;
  background: #ffffff;
  border: 1px solid #0095f8;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 15px;
  line-height: 15px;
  color: #0095f8;
`;

const OptionsHeader = styled(Row)`
  justify-content: space-between;
  margin-top: 30px;
`;

const BottomMenu = styled(Card)`
  width: 600px;
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 0;
  @media only screen and (max-width: 451px) {
    width: 100%;
    height: 45px;
    bottom: 64px;
    .ant-card-body {
      padding: 0 1rem;
    }
  }
`;

const AddToCartButton = styled(Button)`
  margin-right: 8px;
`;

const SolderLayout = styled(Row)`
  height: 103px;
  background: #f6f8f9;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  width: calc(100% + 2rem);
  transform: translateX(-16px);
  margin: 1rem 0;
`;

const ShippingTextLayout = styled(Row)`
  margin-top: 1rem;
`;

const SoldBy = styled(Typography.Text)`
  font-weight: bold;
  font-size: 13px;
  line-height: 13px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #788995;
  margin-bottom: 15px;
`;

const StyledTabs = styled(Tabs)`
  padding: 0 1rem !important;
  width: fit-content;
  .ant-tabs-nav {
    margin-bottom: 0;
    width: fit-content;
    ::before {
      border: none;
    }
  }
`;

export default ProductDetailsPage;
