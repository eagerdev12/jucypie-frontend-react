import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Typography } from "antd";
import Avatar from "../Avatar";
import { removeAuth } from "../../../utils";
import { destroyToken } from "../../../config/configureClient";

const MenuItem = ({ path, title, icon, active }) => {
  const handleLogOut = (value) => {
    if (value === "Logout") {
      removeAuth();
      destroyToken();
    }
  };
  return (
    <Link href={path ? path : ""}>
      <LinkButton active={active}>
        {title !== "Profile" ? icon && icon : <Avatar size={30} />}
        <Div onClick={() => handleLogOut(title)}>
          <MenuTitle>{title}</MenuTitle>
        </Div>
      </LinkButton>
    </Link>
  );
};

const MenuTitle = styled(Typography.Text)`
  font-size: 18px;
  line-height: 20px;
  padding: 10px 18px;
`;

const Div = styled.div``;

const LinkButton = styled.a`
  color: #404950;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  svg {
    fill: ${(props) => (props.active ? "#0095F8" : "#BAC3C9")};
  }
  span {
    color: ${(props) => (props.active ? "#0095F8" : "#777E83")};
  }
  &:hover {
    color: #0095f8;
    span {
      color: #0095f8;
    }
    svg {
      fill: #0095f8;
    }
  }
  @media only screen and (max-width: 451px) {
    width: auto;
    span {
      display: none;
    }
  }
`;

export default MenuItem;
