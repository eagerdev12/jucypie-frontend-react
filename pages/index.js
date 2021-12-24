import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Row, Col, Typography, Image } from "antd";
import { connect, useSelector } from "react-redux";
import { getAllArticleList } from "../src/redux/actions/articles";
import {
  PageLayout,
  NavMenu,
  JoinCard,
  ArticlesContainer,
  Topics,
  Article,
  Product,
  Banner,
} from "../src/components/views";

const Home = (props) => {
  const router = useRouter();
  const { limit, page } = useSelector((state) => state.allArticles);
  const {
    query: { tranding },
  } = router;
  const isStories = tranding !== "watch";

  const handleClickTranding = (tranding) => {
    router.push({
      ...router,
      query: { tranding },
    });
  };

  useEffect(() => {
    const userId = props.authUser && props.authUser.ID;
    if (props.articlesData && props.articlesData.length === 0) {
      props.getAllArticleList(limit, page, userId);
    }
  }, [props.articlesData]);

  return (
    <>
      <Head>
        <title>See what's happening in the world! / JuicyPie</title>
      </Head>
      <PageLayout
        topComponents={
          <TopComponentRow>
            <MenuButton
              onClick={(e) => handleClickTranding("watch")}
              selected={!isStories}
            >
              Watch
            </MenuButton>
            |
            <MenuButton
              onClick={(e) => handleClickTranding("stories")}
              selected={isStories}
            >
              Stories
            </MenuButton>
          </TopComponentRow>
        }
        leftComponents={<NavMenu />}
        rightComponents={<JoinCard />}
      >
        <Banner
          desktopTitle1="Discover"
          desktopTitle2="over a million stories"
          mobileTitle1="Discover"
          mobileTitle2="today's stories"
          desktopUnderlineWidth={75}
          mobileUnderlineWidth={60}
          desktopUnderlinePos={0}
          mobileUnderlinePos={-100}
          backgroundColor="black"
          imageSrc="/images/header_logo.svg"
          deskMarginTop={90}
        ></Banner>
        {isStories ? (
          <ArticlesWrapper>
            <Topics />
            <ArticlesContainer
              authUser={props.authUser}
              articles={props.articlesData}
            />
          </ArticlesWrapper>
        ) : (
          <WatchContents>
            <ShopHeaderWrapper>
              <ShopTitle>Shop</ShopTitle>
              <ShopHeadPost src="/images/e-commerce.svg" />
            </ShopHeaderWrapper>
            <PopularProducts>
              <ProductCol even={true} span={8} offset={30}>
                <Product
                  offPercent={80}
                  image="images/temp/product-picture.png"
                  price="US $4.95"
                />
              </ProductCol>
              <ProductCol even={false} span={8}>
                <Product
                  offPercent={70}
                  image="images/temp/product-picture3.png"
                  price="US $9.95 - $20.95"
                />
              </ProductCol>
              <ProductCol even={false} span={8}>
                <Product
                  offPercent={70}
                  image="images/temp/product-picture3.png"
                  price="US $9.95 - $20.95"
                />
              </ProductCol>
            </PopularProducts>
          </WatchContents>
        )}
      </PageLayout>
    </>
  );
};

const ArticlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  @media only screen and (max-width: 451px) {
    padding-top: 30px;
  }
`;

const WatchContents = styled(Row)`
  display: flex;
  flex-direction: column;
  padding: 48px 0;
`;

const ShopHeaderWrapper = styled(Row)`
  padding-left: 1rem;
  align-items: center;
  width: 350px;
  border-radius: 10px;
  filter: drop-shadow(10px 10px 24px rgba(228, 234, 238, 0.8));
  overflow: hidden;
  display: flex;
  background: linear-gradient(0deg, #ffffff, #ffffff);
  box-shadow: 0px 16px 60px rgba(78, 79, 114, 0.08);
  border-radius: 5px;
  justify-content: space-between;
  @media only screen and (max-width: 451px) {
    padding: 0 1rem;
    margin-top: 94px;
  }
`;

const ShopTitle = styled(Typography.Text)`
  font-weight: bold;
  font-size: 27px;
  line-height: 27px;
  color: black;
`;

const ShopHeadPost = styled.img`
  object-fit: cover;
  float: right;
  border-radius: 10px;
`;

const PopularProducts = styled(Row)`
  width: 100%;
  display: flex;
  padding-top: 30px;
`;

const ProductCol = styled(Col)`
  padding-${(props) => (props.even ? "right" : "left")}: 1rem;
  @media only screen and (max-width: 451px) {
    flex: none;
    max-width: 100%;
    padding: 1rem 0;
    margin: 0 auto;
    width: 285px;
  }
`;

const MenuButton = styled(Typography.Text)`
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  cursor: pointer;
  font-size: 17px;
  line-height: 19px;
  margin: 0 1rem;
`;

const TopComponentRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const mapStateToProps = (store) => {
  return {
    articlesData: store.articleReducer.articlesData,
    limit: store.articleReducer.limit,
    page: store.articleReducer.page,
  };
};

const mapDispatchToProps = {
  getAllArticleList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
