import React from 'react';
import Head from 'next/head';
import { PageLayout, NavMenu } from '../../src/components/views';

const Search = () => {
  return (
    <>
      <Head>
        <title>Search / JuicyPie</title>
      </Head>
      <PageLayout leftComponents={<NavMenu />}></PageLayout>
    </>
  );
};

export default Search;
