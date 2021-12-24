import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import { Layout } from 'antd';
import { TLogo } from '../../atoms';
import { NavMenu, TopMenu } from '../../views';
import { LoginModal } from '../Modal';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../../redux/actions';
import AppPageLoader from '../../atoms/AppPageLoader';

const PageLayout = ({
  children,
  topComponents,
  leftComponents,
  rightComponents,
  hideNav,
  width,
  rightToMain,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const show_modal = useSelector(state => state.ui.show_modal);
  const dispatch = useDispatch();
  const closeModal = useCallback(() => dispatch(hideModal()), [dispatch]);

  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      if (!url.includes('login') && !url.includes('signup')) {
        setIsLoading(true);
      }
    });

    Router.events.on('routeChangeComplete', (url) => {
      setIsLoading(false);
    });

    Router.events.on('routeChangeError', (url) => {
      setIsLoading(false);
    });
  }, []);

  return (
    <StyledLayout theme='light'>
      <MobileHeader>
        <TLogo />
      </MobileHeader>
      <CenteredContainer>
        <LeftSection>{leftComponents}</LeftSection>
        {topComponents && <TopMenu>{topComponents}</TopMenu>}
        <ScrollPanel>
          <MainSection width={width} hideOnMobile={rightToMain}>
            { isLoading
                ? <AppPageLoader loading={isLoading} />
                : children
            }
          </MainSection>
          <RightSection hideOnMobile={!rightToMain}>
            {rightComponents}
          </RightSection>
        </ScrollPanel>
      </CenteredContainer>
      {!hideNav && (
        <MobileToolBar>
          <NavMenu mobile />
        </MobileToolBar>
      )}
      <LoginModal visible={show_modal} onCancel={closeModal}/>
    </StyledLayout>
  );
};

const ScrollPanel = styled.div`
  display: flex;
  max-height: 100%;
  @media only screen and (max-width: 451px) {
    padding-bottom: 64px;
    width: 100%;
  }
`;

const CenteredContainer = styled.div`
  position: relative;
  display: flex;
  width: 1210px;
  margin: 0 auto;
  height: 100%;
  @media only screen and (max-width: 451px) {
    width: 100%;
  }
`;

const StyledLayout = styled(Layout)`
  display: flex;
  min-height: 100vh;
`;

const MobileHeader = styled.div`
  position: fixed;
  align-items: center;
  background: white;
  width: 100%;
  height: 44px;
  display: none;
  z-index: 99;
  @media (max-width: 451px) {
    display: flex;
  }
`;

const MobileToolBar = styled.div`
  position: fixed;
  justify-content: center;
  align-items: center;
  background: white;
  width: 100%;
  height: 44px;
  display: none;
  bottom: 0;
  z-index: 99;
  @media (max-width: 451px) {
    display: flex;
  }
`;

const MainSection = styled.div`
  position: relative;
  width: ${(props) =>
    props.width && props.width === 'xs' ? '400px' : '600px'};
  margin: 0 50px;
  @media (max-width: 451px) {
    margin: 0px;
    width: 100%;
    display: ${(props) => (props.hideOnMobile ? 'none' : 'initial')};
  }
`;

const LeftSection = styled.div`
  width: 210px;
  position: relative;
  @media only screen and (max-width: 451px) {
    display: none;
  }
`;

const RightSection = styled.div`
  position: relative;
  @media only screen and (max-width: 1054px) {
    display: ${(props) => (props.hideOnMobile ? 'none' : 'initial')};
    padding-top: 44px;
    width: 100%;
  }
`;

export default PageLayout;
