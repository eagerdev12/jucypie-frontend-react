import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import {
  PageLayout,
  NavMenu,
  JoinCard,
  Story,
  Article,
} from '../../src/components/views';

const ArticleDetails = () => {
  const articleInfo = {
    id: '00001',
    url: '/images/temp/product-picture.png',
    title:
      'The Caramel Apple Pumpkin Spice Drink Is Starbucks’ Best Kept Secret For The Summer',
    description:
      "can't speak fully objectively, but from a subjective perspective what I want to see when I'm reading job descriptions is.. descriptions of the job. I don't want to see jazzy funky stuff just for the sake of it. I'm looking at it because I want to get the information about the job. Would you say that applications résumé / CVs are uninteresting because they only have text and headings",
    poster: {
      url: '/images/temp/profile_model.svg',
      name: 'The Atlantic',
    },
    votes: '230K',
    created_at: '5hr ago',
  };

  const relatedArticles = [
    {
      id: '00001',
      url: '/images/temp/product-picture.png',
      title:
        'The Caramel Apple Pumpkin Spice Drink Is Starbucks’ Best Kept Secret For The Summer',
      description:
        'Sure, you can’t apparate to your next vacation destination, but you can at least',
      poster: {
        url: '/images/temp/profile_model.svg',
        name: 'The Atlantic',
      },
      votes: '230K',
      created_at: '5hr ago',
    },
    {
      id: '00002',
      url: '/images/temp/product-picture1.png',
      title: 'In Quarantine, Cameo Fills a Void of Connection',
      description:
        'The celebrity video messaging platform has taken on new life—and top talent like actor Brian Baumgartner are receiving unprecedented requests.',
      poster: {
        url: '/images/temp/profile_model.svg',
        name: 'The Atlantic',
      },
      votes: '230K',
      created_at: '5hr ago',
    },
  ];

  const moreArticles = relatedArticles.map((article) => {
    return <Article key={article.id} {...article} />;
  });

  return (
    <>
      <Head>
        <title>See what's happening in the world! / JuicyPie</title>
      </Head>
      <PageLayout leftComponents={<NavMenu />} rightComponents={<JoinCard />}>
        <RelatedArticlesWrapper>
          <Story {...articleInfo} />
        </RelatedArticlesWrapper>

        {relatedArticles.length && (
          <>
            <DiscoverMoreTitle>Discover more</DiscoverMoreTitle>
            {moreArticles}
          </>
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

const DiscoverMoreTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
  color: #000000;
  margin: 10px 0 30px;
`;

export default ArticleDetails;
