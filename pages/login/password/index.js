import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { compose } from "redux";
import { withApollo, useLazyQuery } from "react-apollo";
import { connect, useDispatch } from "react-redux";
import { notification, Form, Typography, Button, Row } from "antd";
import { KEY_SESSION_USER } from "../../../src/utils/constants";
import { InputText, TLogo } from "../../../src/components/atoms";
import { LOGIN_USER_QUERY } from "../../../src/graphql";
import { setUserDataSuccess } from "../../../src/redux/actions";
import { setSessionItem } from "../../../src/services";

const openNotification = (errorMessage) => {
  notification.error({
    message: "Error",
    description: <div>{errorMessage}</div>,
  });
};

const InputPasswordForm = ({ user }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [authUser, { loading, data, error }] = useLazyQuery(LOGIN_USER_QUERY);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      openNotification(
        error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))
      );
    }

    if (data) {
      Cookie.set(KEY_SESSION_USER, JSON.stringify(data.auth), { expires: 1 });
      dispatch(setUserDataSuccess(data.auth));
      setSessionItem("Auth", data.auth);
      const topics = data.auth.parentCategories;
      if (topics.length) {
        router.push("/topics");
      } else {
        router.push("/");
      }
    }
  }, [error, data]);

  const onFinish = async (values) => {
    const { password } = values;
    console.log("credentials: ", password, user.uniqueID);
    authUser({ variables: { uniqueID: user.uniqueID, password } });
  };

  return (
    <Pannel>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: false }}
        onFinish={onFinish}
      >
        <TLogo />
        <AdjustRow>
          <LoginTitle>Welcome back!</LoginTitle>
          <Link href="/recover">
            <LinkText fontSize={13}>Log in issues?</LinkText>
          </Link>
        </AdjustRow>
        <Form.Item
          className="custom-form-item"
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <InputText
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item>
          <ContinuButton
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={password === ""}
            className="login-form-button"
          >
            Continue
          </ContinuButton>
        </Form.Item>
      </Form>
      <CenteredRow>
        <Link href="/signup">
          <SignupLinkText>Sign up</SignupLinkText>
        </Link>
        or continue with <LinkText>Phone</LinkText> /{" "}
        <LinkText>Facebook</LinkText> / <LinkText>Google</LinkText>
      </CenteredRow>
      <BottomSection></BottomSection>
      <CenteredRow>
        <AppLinkButton>
          <ButtonIcon src="/images/icon_ios.svg" />
        </AppLinkButton>
        <AppLinkButton>
          <ButtonIcon src="/images/icon_android.svg" />
        </AppLinkButton>
      </CenteredRow>
      <CenteredRow>
        By continuing, you agree to Teal’s{" "}
        <Link href="/terms">
          <LinkText>Terms & Privacy</LinkText>
        </Link>
      </CenteredRow>
      <style js="true">{`
        .custom-form-item {
          max-height: 45px !important;
          margin-bottom: 14px !important;
        }
        .custom-form-item input {
          height: 45px !important;
        }
      `}</style>
    </Pannel>
  );
};

const Pannel = styled.div`
  width: 350px;
  margin: 0 auto;
  padding-top: 235px;
  @media only screen and (max-width: 451px) {
    padding-top: 86px;
  }
`;

const LinkText = styled.a`
  font-size: ${(props) => (props.fontSize ? props.fontSize + "px" : "15px")};
  text-decorator: none;
  color: #788995;
  padding: 0 3px;
`;

const SignupLinkText = styled(LinkText)`
  color: #0095f8;
`;

const AdjustRow = styled(Row)`
  display: flex;
  margin: 10px 0 15px 0;
  justify-content: space-between;
  text-align: center;
  font-size: 15px;
  line-height: 145%;
  color: #788995;
`;

const LoginTitle = styled(Typography.Text)`
  font-weight: bold;
  font-size: 17px;
  line-height: 17px;
  color: rgba(64, 73, 80, 0.95);
`;

const CenteredRow = styled(AdjustRow)`
  justify-content: center;
`;

const BottomSection = styled.div`
  margin-top: 52px;
  @media only screen and (max-width: 451px) {
    margin-top: 159px;
  }
`;

const ContinuButton = styled(Button)`
  width: 100%;
  background: #80cafb !important;
  border: none;
  height: 40px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
`;

const AppLinkButton = styled.a`
  text-decorator: none;
  margin: 4px;
`;

const ButtonIcon = styled.img`
  object-fit: cover;
  height: 31px;
`;

export default compose(
  connect((state) => state),
  withApollo
)(InputPasswordForm);
