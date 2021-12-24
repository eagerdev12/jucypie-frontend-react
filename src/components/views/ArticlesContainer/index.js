import React, { useEffect } from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, connect, useSelector } from 'react-redux';
import { withApollo } from 'react-apollo';
import { Spin, Row } from 'antd';
import {
  getAllArticleList, prefetchArticles,
} from '../../../redux/actions';
import Article from '../Article';

const LoadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SCROLL_BOTTOM_OFFEST = 200;
const SCROLL_PREFETCH_OFFSET = 600;

const ArticlesContainer = ({ articles, client, authUser }) => {
  const dispatch = useDispatch();
  const mainContentRef = React.createRef();
  const {
    loading, perfetching,
  } = useSelector((state) => state.allArticles);
  const { limit, page } = useSelector((state) => state.allArticles);

  useEffect(() => {
    const isBottom = (el) => {
      const bottom = el && el.getBoundingClientRect().bottom;
      return bottom && (bottom <= window.innerHeight + SCROLL_BOTTOM_OFFEST);
    };

    const isPrefetching = (el) => {
      const bottom = el && el.getBoundingClientRect().bottom;
      return bottom && (bottom <= window.innerHeight + SCROLL_PREFETCH_OFFSET);
    }

    const handleScroll = () => {
      if (isBottom(mainContentRef.current) && !loading) {
        dispatch(getAllArticleList(client, limit, page));
      }

      if (isPrefetching(mainContentRef.current) && !perfetching) {
        dispatch(prefetchArticles(client, limit, page + 1));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <ArticlesWrapper ref={mainContentRef}>
      {articles && articles.map((article, index) => {
        return <Article key={index} {...article} authUser={authUser} />;
      })}
      <SpinWrapper align='middle' justify='center'>
        {loading && <Spin indicator={LoadingIcon} />}
      </SpinWrapper>
    </ArticlesWrapper>
  );
};

const ArticlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 400px;
`;

const SpinWrapper = styled(Row)`
  width: 100%;
  padding: 8px;
`;

export default compose(
  connect((state) => state, {}),
  withApollo
)(ArticlesContainer);
