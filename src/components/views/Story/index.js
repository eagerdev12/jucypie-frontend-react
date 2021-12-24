import React from "react";
import styled from "styled-components";
import { Typography, Button, Row } from "antd";
import ProfileCard from "../ProfileCard";
import { Toolkit, Icon, VectorIcon } from "../../atoms";
import { timeSince } from "../../../utils";
import Head from "next/head";
import { useRouter } from "next/router";
import analytics from "../../../../helpers/analytics";
import browserSignature from "browser-signature";
const Story = ({
  featureImage,
  author,
  createdDate,
  title,
  urls,
  subTitle,
  description,
  onClap,
  onVote,
  clapCount,
  onBookmark,
  isArticleLiked,
  isBookmark,
  bookmarkData,
  clapData,
  hideLike,
  fullStory,
  article_SEO,
  metaRobots,
  authUser,
}) => {
  const router = useRouter();
  const url = `https://juicypie.com/${router.asPath}`;
  const SEO_Title = article_SEO
    ? article_SEO.length > 0
      ? article_SEO[0].metaTitle
      : title || ""
    : title;
  const SEO_Des = article_SEO
    ? article_SEO.length > 0
      ? article_SEO[0].metaDescription
      : subTitle || ""
    : subTitle;
  const SEO_Url = article_SEO
    ? article_SEO.length > 0
      ? article_SEO[0].conicalUrl
      : url
    : url;
  const SEO_keyboards = article_SEO
    ? article_SEO.length > 0
      ? article_SEO[0].keyPhrases.toString()
      : ""
    : "";
  return (
    <>
      <Head>
        <title>{SEO_Title} / JuicyPie</title>
        <meta property="og:title" content={SEO_Title || ""} />
        <meta property="og:description" content={SEO_Des || ""} />
        <meta property="og:url" content={SEO_Url} />
        <meta property="og:image" content={featureImage || ""} />
        <meta name="keyword" content={SEO_keyboards} />
        <meta name="robots" content={metaRobots || "index,follow"} />
        <meta name="description" content={subTitle || SEO_Des} />
      </Head>
      <StoryCard>
        <StoryContent>
          {featureImage && <StoryImage src={featureImage} />}
          <StoryDetails className="story-details">
            <StoryTitle>{title}</StoryTitle>
            <StoryDescription>
              {/* {subTitle} */}
              <FullStory
                className="full-story"
                dangerouslySetInnerHTML={{ __html: description }}
              ></FullStory>
              {!fullStory && (
                <button
                  onClick={() => {
                    const signature = browserSignature();
                    analytics.track("trackExternalArticleClick", {
                      category: {
                        targetURL: urls,
                        user_id: authUser ? authUser.ID : 0,
                        session_id: signature,
                      },
                    });

                    // analytics.track("selfdescribingevent", {
                    //   schema:
                    //     "iglu:com.acme_company/viewed_product/jsonschema/2-0-0",
                    //   data: {
                    //     productId: "ASO01043",
                    //     category: "Dresses",
                    //     brand: "ACME",
                    //     returning: true,
                    //     price: 49.95,
                    //     sizes: ["xs", "s", "l", "xl", "xxl"],
                    //     availableSince: new Date(2013, 3, 7),
                    //   },
                    // });
                  }}
                  style={{ display: "contents" }}
                >
                  <FullStoryA href={urls} target="_blank">
                    read full story →
                  </FullStoryA>
                </button>
              )}
            </StoryDescription>
          </StoryDetails>
        </StoryContent>
        {!hideLike && (
          <StoryPosterContainer>
            <Row>
              <PosterPanelTitle>Story By</PosterPanelTitle>
            </Row>
            <PosterWrapper justify="space-between">
              <ProfileCard
                avatar={author[0] && author[0].avatar}
                title={author[0] && author[0].name}
                subtext={timeSince(createdDate)}
              />
              <Button type="primary">Follow</Button>
            </PosterWrapper>
          </StoryPosterContainer>
        )}

        {!hideLike && (
          <StoryFooter>
            <Row>
              <Toolkit
                icon={<VectorIcon name="Like" width={30} height={30} />}
                title={clapCount}
                active={
                  (isArticleLiked && !clapData) ||
                  (clapData && clapData.upsertArticleRating.status === "1"
                    ? true
                    : false)
                    ? true
                    : false
                }
                onClick={onClap}
              />
              <Toolkit
                icon={<VectorIcon name="Upvote" width={30} height={30} />}
                onClick={onVote}
              />
            </Row>
            <Toolkit
              icon={<VectorIcon name="Mark" width={30} height={30} />}
              active={
                (isBookmark && !bookmarkData) ||
                (bookmarkData &&
                  bookmarkData.upsertArticleBookmark.status === 1)
                  ? true
                  : false
                  ? true
                  : false
              }
              onClick={onBookmark}
              noMargin={true}
            />
          </StoryFooter>
        )}
      </StoryCard>
    </>
  );
};

const FullStoryA = styled.a`
  padding: 0 16px !important;
`;

const FullStory = styled.pre`
  padding: 0 !important;
  white-space: initial !important;
  font-size: 17px;
  background: white !important;
  border: none !important;
  margin: 0px !important;
`;

const StoryCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  background: white;
  box-shadow: 0px 4px 7px rgba(237, 237, 237, 0.6);
  border-radius: 10px;
  @media only screen and (max-width: 451px) {
    border-radius: 0px;
  }
`;

const StoryImage = styled.img`
  width: 100%;
  height: 420px;
  object-fit: cover;
  margin-top: ${(props) => (props.marginTop ? props.marginTop + "px" : 0)};
  @media only screen and (max-width: 451px) {
    height: 350px;
  }
`;

const StoryDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 15px;
`;

const StoryTitle = styled(Typography.Paragraph)`
  font-weight: bold;
  font-size: 19px;
  line-height: 180%;
  color: rgba(64, 73, 80, 0.95);
  padding: 0 16px;
  margin-top: 10px !important;
  margin-bottom: 10px !important;
  @media only screen and (max-width: 451px) {
    margin-bottom: 10px !important;
  }
`;

const StoryDescription = styled(Typography.Paragraph)`
  font-size: 17px;
  line-height: 180%;
  color: #404950;
  margin-bottom: 0 !important;
`;

const PosterPanelTitle = styled(Typography.Text)`
  font-size: 13px;
  line-height: 18px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 15px;
  font-weight: bold;
  color: #bac3c9;
`;

const StoryPosterContainer = styled(Row)`
  padding: 15px;
  background: #f6f8f9;
`;

const PosterWrapper = styled(Row)`
  width: 100%;
`;

const StoryContent = styled.div`
  margin-bottom: 30px;
`;

const StoryFooter = styled.div`
  min-height: 40px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`;

const ProductCard = styled(Row)`
  position: relative;
  margin-top: 30px;
  padding: 15px;
  background: #f6f8f9;
  box-shadow: 0px 0px 25px #ededed;
  display: none;
  @media only screen and (max-width: 451px) {
    display: flex;
  }
`;

const ProductImage = styled.img`
  width: 53%;
  height: 160px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const ProductInformation = styled.div`
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background: white;
  padding: 14px 10px 10px 10px;
  width: 47%;
`;

const ProductTitle = styled(Typography.Paragraph)`
  font-size: 13px;
  line-height: 145%;
  color: #404950;
`;

const ProductDescription = styled(Typography.Paragraph)`
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  color: #404950;
  position: relative;
`;

const OrderButton = styled(Button)`
  width: 160px;
  height: 45px;
  background: #f86300;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  color: #ffffff;
`;

const ProductOrderInformation = styled(Row)`
  margin-top: 15px;
  justify-content: space-between;
`;

const FreeShippingBadge = styled(Row)`
  width: 77px;
  height: 20px;
  background: rgba(255, 156, 0, 0.15);
  border-radius: 3px;
  font-weight: bold;
  font-size: 11px;
  line-height: 11px;
  color: #dc8a0a;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 80px;
`;

const DiscountBadge = styled(Row)`
  width: 40px;
  height: 24px;
  background: #e93e09;
  border-radius: 29px;
  font-weight: bold;
  font-size: 11px;
  line-height: 11px;
  color: white;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 32px;
  left: 25px;
`;

export default Story;
