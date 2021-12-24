import React from "react";
import { RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Link from "next/link";
import { Typography, Row } from "antd";
import { useRouter } from "next/router";
import { ProfileCard } from "../index";
import { SETTING_ROUTES } from "../../../utils/Routes";

const SettingMenus = ({ title, userName }) => {
  console.log("objectdasdas", userName);
  const router = useRouter();

  const { pathname } = router;
  const handleClickMenu = (settingMenu) => {
    router.push("/settings" + settingMenu.path, undefined, {
      shallow: true,
    });
  };

  const SettingList = SETTING_ROUTES.map((settingMenu, index) => {
    const isAccountSetting = settingMenu.path.endsWith("/account");
    return (
      <NavigationWrapper
        key={index}
        onClick={(e) => handleClickMenu(settingMenu)}
        active={pathname.includes(settingMenu.path) ? 1 : 0}
        height={isAccountSetting ? 80 : 50}
      >
        {isAccountSetting ? (
          <ProfileCard
            title={userName}
            subtext="Account & Security"
            avatar="/images/temp/profile_model.svg"
          />
        ) : (
          <SubTitle>{settingMenu.title}</SubTitle>
        )}
        <RightOutlined color="#404950" />
      </NavigationWrapper>
    );
  });

  return (
    <>
      <PageTitle>{title}</PageTitle>
      <MenusWrapper>{SettingList}</MenusWrapper>
    </>
  );
};

const PageTitle = styled(Typography.Paragraph)`
  margin: 20px 0px 45px 0px !important;
  font-weight: bold;
  font-size: 19px;
  line-height: 150%;
  @media only screen and (max-width: 451px) {
    display: none;
  }
`;

const NavigationWrapper = styled(Row)`
  border-radius: 5px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
  justify-content: space-between;
  height: ${(props) => (props.height ? props.height + "px" : "50px")};
  background: ${(props) => (props.active ? "#ffffff" : "transparent")};
  box-shadow: ${(props) =>
    props.active ? "0px 4px 20px rgba(228, 234, 238, 0.8)" : "none"};
`;

const MenusWrapper = styled(Row)`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 451px) {
    margin-top: 74px;
  }
`;

const SubTitle = styled(Typography.Text)`
  font-size: 17px;
  line-height: 150%;
`;

export default SettingMenus;
