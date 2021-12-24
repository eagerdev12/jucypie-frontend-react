import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import { withApollo, useMutation } from "react-apollo";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import { Typography } from "antd";
import analytics from "../../../helpers/analytics";
import browserSignature from "browser-signature";
import {
  getAllArticleList,
  getArticleBySlug,
  showModal,
} from "../../../src/redux/actions";
import { getAllArticleListWhenUser } from "../../../src/redux/actions/articles";

import {
  GET_ARTICLES_QUERY,
  CLAP_ARTICLE_MUTATION,
  BOOKMARK_ARTICLE_MUTATION,
} from "../../../src/graphql";
import {
  PageLayout,
  NavMenu,
  JoinCard,
  Story,
  ArticlesContainer,
} from "../../../src/components/views";
import { client } from "../../../src/config/configureClient";

import { parseCookies } from "../../../src/utils/parseCookies";
import { KEY_SESSION_USER } from "../../../src/utils/constants";

const ArticleDetails = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    query: { tranding },
  } = router;
  const isStories = tranding !== "watch";
  const handleClickTranding = (tranding) => {
    router.push({
      pathname: "/",
      query: { tranding },
    });
  };
  const {
    allArticles: { articles, story },
    authUser,
    isHuman,
    isBot,
    SplitId,
  } = props;

  const [clapCount, setClapCount] = useState(
    story && story.totalClapCount ? parseInt(story.totalClapCount) : 0
  );
  const [toggleClapArticle, { data: clapData, error: clapError }] = useMutation(
    CLAP_ARTICLE_MUTATION
  );
  const [startTime, setStartTime] = React.useState(new Date().getTime());
  const [
    toggleBookmarkArticle,
    { data: bookmarkData, error: bookmarkError },
  ] = useMutation(BOOKMARK_ARTICLE_MUTATION);

  const handleAction = (action) => {
    const storyId = parseInt(story.ID);

    if (!authUser || !storyId) {
      dispatch(showModal());
      return;
    }

    if (action === "clap") {
      toggleClapArticle({
        variables: {
          updateClapCount: {
            userID: authUser.ID,
            articleID: storyId,
          },
        },
      });
    } else if (action === "bookmark") {
      const variables = {
        variables: {
          bookmark: {
            userID: authUser.ID,
            articleID: storyId,
          },
        },
      };
      toggleBookmarkArticle(variables);
    }
  };

  useEffect(() => {
    window.onbeforeunload = function () {
      console.log("Time Event Tracked");
      trackUserTimeInteraction();
    };

    if (clapError) {
      console.log(clapError);
    }
    if (bookmarkError) {
      console.log(bookmarkError);
    }
    if (clapData && clapData.upsertArticleRating.status) {
      const clapTotal =
        clapData.upsertArticleRating.status === "1"
          ? clapCount + 1
          : clapCount > 0
          ? clapCount - 1
          : 0;
      setClapCount(clapTotal);
    }
    if (bookmarkData) {
    }
    return () => {
      trackUserTimeInteraction;
    };
  }, [clapData, clapError, bookmarkError]);

  const trackUserTimeInteraction = () => {
    var endTime = new Date().getTime();
    var timeSpent = endTime - startTime;
    const signature = browserSignature();
    console.log({
      time_on_page: timeSpent,
      user_id: authUser ? authUser.ID : 0,
      session_id: signature ? signature : "blocked",
    });
    analytics.track("userTimeSpentEvent", {
      category: {
        time_on_page: timeSpent,
        user_id: authUser ? authUser.ID : 0,
        session_id: signature ? signature : "blocked",
      },
    });
  };

  const discoverMore =
    articles && articles.filter((val) => val.ID !== story.ID);
  if (isHuman && SplitId) {
    discoverMore.splice(0, 2);
  }

  return (
    <>
      <Head>
        <title>See what's happening in the world! / Teal</title>
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
        {isHuman && SplitId ? (
          <>
            {articles.length > 0 && (
              <>
                <RelatedArticlesWrapper>
                  <Story
                    {...articles[0]}
                    clapCount={clapCount}
                    clapData={clapData}
                    hideLike={true}
                    fullStory={articles[0].internalArticle || false}
                    bookmarkData={bookmarkData}
                    onBookmark={(e) => handleAction("bookmark")}
                    onVote={(e) => handleAction("share")}
                    onClap={(e) => handleAction("clap")}
                    authUser={authUser}
                  />
                </RelatedArticlesWrapper>
                <RelatedArticlesWrapper2>
                  <Story
                    {...articles[1]}
                    clapCount={clapCount}
                    clapData={clapData}
                    fullStory={articles[1].internalArticle || false}
                    bookmarkData={bookmarkData}
                    onBookmark={(e) => handleAction("bookmark")}
                    onVote={(e) => handleAction("share")}
                    onClap={(e) => handleAction("clap")}
                    authUser={authUser}
                  />
                </RelatedArticlesWrapper2>
              </>
            )}
          </>
        ) : (
          <RelatedArticlesWrapper>
            <Story
              {...story}
              clapCount={clapCount}
              clapData={clapData}
              fullStory={story.internalArticle || false}
              bookmarkData={bookmarkData}
              onBookmark={(e) => handleAction("bookmark")}
              onVote={(e) => handleAction("share")}
              onClap={(e) => handleAction("clap")}
              authUser={authUser}
            />
          </RelatedArticlesWrapper>
        )}

        <DiscoverMoreTitle>Discover more</DiscoverMoreTitle>
        {discoverMore && (
          <ArticlesContainer articles={discoverMore} authUser={authUser} />
        )}
      </PageLayout>
    </>
  );
};

const RelatedArticlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 90px;
  @media only screen and (max-width: 451px) {
    padding-top: 0px;
  }
`;
const RelatedArticlesWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  @media only screen and (max-width: 451px) {
    padding-top: 0px;
  }
`;

const DiscoverMoreTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
  color: #000000;
  margin: 10px 0 30px;
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

ArticleDetails.getInitialProps = async ({
  store,
  apolloClient,
  query,
  req,
}) => {
  const articlesState = store.getState().allArticles;
  const { limit, page } = articlesState;
  const userAgent = req && req.headers["user-agent"];
  const humanAgents = [
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0",
  ];
  const botAgents = [
    "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
    "facebookexternalhit/1.1",
  ];
  // const isHuman = humanAgents.includes(userAgent);

  const isBot = botAgents.includes(userAgent);
  const isHuman = !isBot;

  const cookies = parseCookies(req);
  const authUser =
    cookies[KEY_SESSION_USER] && JSON.parse(cookies[KEY_SESSION_USER]);

  if (true && query.split_id) {
    return await store
      .dispatch(
        getAllArticleListWhenUser(
          apolloClient,
          parseInt(query.split_id),
          limit,
          page,
          query.article_id,
          authUser && authUser.ID
        )
      )
      .then((value) => {
        if (value == false) {
          if (!store.getState().allArticles.story[query.article_id] && query) {
            return store
              .dispatch(
                getArticleBySlug(
                  apolloClient,
                  query.article_id,
                  authUser && authUser.ID
                )
              )
              .then((value) => {
                return {
                  custom: store.getState().allArticles,
                  slug: query.slug,
                  id: query.id,
                  isHuman: false,
                  isBot: isBot,
                  SplitId: false,
                };
              });
          }
        }
        return {
          custom: store.getState().allArticles,
          slug: query.slug,
          id: query.id,
          isHuman: isHuman,
          isBot: isBot,
          SplitId: query.split_id,
        };
      });
  } else {
    return await store
      .dispatch(getAllArticleList(apolloClient, limit, page))
      .then((data) => {
        if (!store.getState().allArticles.story[query.article_id] && query) {
          return store
            .dispatch(
              getArticleBySlug(
                apolloClient,
                query.article_id,
                authUser && authUser.ID
              )
            )
            .then((value) => {
              return {
                custom: store.getState().allArticles,
                slug: query.slug,
                id: query.id,
                isHuman: isHuman,
                isBot: isBot,
                SplitId: query.split_id,
              };
            });
        }
      });
  }
};

export default compose(
  connect((state) => state, {}),
  withApollo
)(ArticleDetails);
