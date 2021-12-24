import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import { KEY_SESSION_USER } from '../../../utils/constants';
import { Icon, MenuItem, TLogo } from '../../atoms';
import { APP_ROUTES } from '../../../utils/Routes';
import { getUserInfo } from '../../../utils';

const TOOLBAR_ITEM_COUNT = 4;

const NavMenu = ({ mobile }) => {
  const [authUser, setAuthUser] = useState();
  const { pathname } = useRouter();
  const loggedUser = getUserInfo()
  useEffect(() => {
    setAuthUser(Cookie.getJSON(KEY_SESSION_USER));
  }, []);

  const routeList = mobile
    ? APP_ROUTES.slice(0, TOOLBAR_ITEM_COUNT)
    : authUser
      ? APP_ROUTES
      : APP_ROUTES.slice(0, TOOLBAR_ITEM_COUNT);

  const MenuList = routeList.map((route, index) => {
    let title, path
    if (route.title === "Signup") {
      title = loggedUser !== null ? "Logout" : route.title
      path = loggedUser !== null ? "/" : route.path
    } else {
      title = route.title
      path = route.path
    }
    return (
      <MenuItem
        key={index}
        title={title}
        path={path}
        icon={
          <Icon
            active={pathname === path}
            name={route.title}
            width={20}
            height={20}
          />
        }
        active={pathname === path}
      />
    );
  });

  return (
    <StyledSider>
      {!mobile && <TLogo />}
      <MainMenu>{MenuList}</MainMenu>
    </StyledSider>
  );
};

const StyledSider = styled.div`
  position: fixed;
  width: 210px;
  padding: 0px;
  margin: 0 20px;
  @media only screen and (max-width: 451px) {
    width: 100%;
    background: white;
    margin: 0;
    bottom: 0;
  }
`;

const MainMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 23px;
  @media only screen and (max-width: 451px) {
    justify-content: space-around;
    flex-direction: row;
    margin: 0px;
  }
`;

export default NavMenu;
