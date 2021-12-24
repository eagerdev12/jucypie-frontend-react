import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Row, Typography } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMutation } from "react-apollo";
import { timeSince } from "../../../utils";
import { VectorIcon, Toolkit } from "../../atoms";
import {
  CLAP_ARTICLE_MUTATION,
  BOOKMARK_ARTICLE_MUTATION,
} from "../../../graphql";
import ProfileCard from "../ProfileCard";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "../../../redux/actions";
import analytics from "../../../../helpers/analytics";
import browserSignature from "browser-signature";

const Article = ({
  ID,
  slug,
  featureImage,
  author,
  createdDate,
  title,
  subTitle,
  totalClapCount,
  isArticleLiked,
  isBookmark,
  authUser,
}) => {
  const [clapCount, setClapCount] = useState(
    totalClapCount ? parseInt(totalClapCount) : 0
  );

  const router = useRouter();
  const article_id = slug;
  const handlePostDetail = () => {
    const signature = browserSignature();
    analytics.track("articleTrackEvent", {
      category: {
        targetURL: `/story/${slug}`,
        user_id: authUser ? authUser.ID : 0,
        session_id: signature ? signature : "blocked",
      },
    });
    router.push(`/story/${slug}`);
  };

  const [toggleClapArticle, { data: clapData, error: clapError }] = useMutation(
    CLAP_ARTICLE_MUTATION
  );
  const [
    toggleBookmarkArticle,
    { data: bookmarkData, error: bookmarkError },
  ] = useMutation(BOOKMARK_ARTICLE_MUTATION);

  const dispatch = useDispatch();
  const closeModal = useCallback(() => dispatch(hideModal()), [dispatch]);
  const openModal = useCallback(() => dispatch(showModal()), [dispatch]);
  const handleAction = (action) => {
    const articleId = parseInt(ID);
    if (!authUser || !articleId) {
      openModal(action);
      return;
    }

    if (action === "clap") {
      toggleClapArticle({
        variables: {
          updateClapCount: {
            userID: authUser.ID,
            articleID: articleId,
          },
        },
      });
    } else if (action === "bookmark") {
      toggleBookmarkArticle({
        variables: {
          bookmark: {
            userID: authUser.ID,
            articleID: articleId,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (clapData && clapData.upsertArticleRating.status) {
      const clapTotal =
        clapData.upsertArticleRating.status === "1"
          ? clapCount + 1
          : clapCount > 0
          ? clapCount - 1
          : 0;
      setClapCount(clapTotal);
    }
    if (clapError) {
    }
    if (bookmarkError) {
    }
    if (bookmarkData) {
    }
  }, [clapData]);

  return (
    <>
      <PostCard>
        <PostHeader>
          <ProfileCard
            avatar={author && author[0] && author[0].avatar}
            title={author && author[0] && author[0].name}
            subtext={timeSince(createdDate)}
          />
        </PostHeader>
        <PostContent onClick={handlePostDetail}>
          {featureImage && <PostImage src={featureImage} />}
          <PostDetails>
            <PostTitle
              ellipsis={{ rows: 2, expandable: false, symbol: "Read more" }}
            >
              {title}
            </PostTitle>
            {/* <PostDescription ellipsis>{subTitle}</PostDescription> */}
          </PostDetails>
        </PostContent>
        <PostFooter>
          <Row>
            <Toolkit
              icon={
                <VectorIcon name="Like" width={30} height={30} fill="#BAC3C9" />
              }
              title={clapCount ? clapCount : 0}
              active={
                (isArticleLiked && !clapData) ||
                (clapData && clapData.upsertArticleRating.status === "1"
                  ? true
                  : false)
                  ? true
                  : false
              }
              onClick={(e) => handleAction("clap")}
            />
            <Toolkit
              icon={
                <VectorIcon
                  name="Upvote"
                  width={30}
                  height={30}
                  fill="#BAC3C9"
                />
              }
            />
          </Row>
          <Toolkit
            icon={
              <VectorIcon
                name="MarkOutlined"
                width={30}
                height={30}
                fill="#BAC3C9"
              />
            }
            active={
              (isBookmark && !bookmarkData) ||
              (bookmarkData && bookmarkData.upsertArticleBookmark.status === 1)
                ? true
                : false
                ? true
                : false
            }
            onClick={(e) => handleAction("bookmark")}
            noMargin={true}
          />
        </PostFooter>
      </PostCard>
    </>
  );
};

const PostCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  background: white;
  box-shadow: 0px 4px 7px rgba(237, 237, 237, 0.6);
  border-radius: 10px;
  @media only screen and (max-width: 451px) {
    border-radius: 0px;
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 375px;
  object-fit: cover;
  @media only screen and (max-width: 451px) {
    height: 300px;
  }
`;

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 15px;
  padding: 0 16px;
`;

const PostTitle = styled(Typography.Paragraph)`
  font-weight: bold;
  font-size: 17px;
  line-height: 150%;
  color: rgba(64, 73, 80, 0.95);
  @media only screen and (max-width: 451px) {
    margin-bottom: 0 !important;
    font-size: 15px;
  }
`;

const PostDescription = styled(Typography.Paragraph)`
  font-size: 15px;
  line-height: 150%;
  color: #404950;
  margin-bottom: 0 !important;
  @media only screen and (max-width: 451px) {
    display: none;
  }
`;

const PostHeader = styled.div`
  height: 70px;
  padding: 0 16px;
  display: flex;
  align-items: center;
`;

const PostContent = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const PostFooter = styled.div`
  min-height: 40px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`;

export default Article;
