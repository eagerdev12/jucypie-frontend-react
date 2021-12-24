import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { compose } from "redux";
import { useDispatch, connect } from "react-redux";
import { withApollo, useMutation, useLazyQuery } from "react-apollo";
import { Button, Form, Row, notification, Typography } from "antd";
import { setUserEmail, setUserUniqueId } from "../../src/redux/actions";
import { InputText } from "../../src/components/atoms";
import { validateEmail } from "../../src/utils";
import ButtonWithGoogle from "../../src/components/atoms/ButtonWithGoogle";
import ButtonFacebook from "../../src/components/atoms/ButtonFacebook";
import PhoneInput from "react-phone-number-input";
import { GET_USERLIST_QUERY } from "../../src/graphql";

import { LOGIN_USER_QUERY, SOCIAL_LOGIN_USER_QUERY } from "../../src/graphql";
import Cookie from "js-cookie";
import { KEY_SESSION_USER } from "../../src/utils/constants";
import { setUserDataSuccess } from "../../src/redux/actions";
import { setSessionItem } from "../../src/services";

const openNotification = (errorMessage) => {
  notification.error({
    message: "Error",
    description: <div>{errorMessage}</div>,
  });
};

const InputEmailForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [socialAuthUser, { loading, data, error }] = useLazyQuery(
    SOCIAL_LOGIN_USER_QUERY
  );

  const [isMyAccount, setIsMyAccount] = useState(false);
  const [provider, setProvider] = useState("email");
  const [mobileNo, setMobileNo] = useState();
  const [getUsersWithFilter, usersData] = useLazyQuery(GET_USERLIST_QUERY);
  const [isLoading, setIsLoading] = useState(false);
  const [submitable, setSubmitable] = useState(false);
  const [useid, setUserid] = useState("");

  useEffect(() => {
    if (provider == "email" && useid) {
      if (validateEmail(useid)) {
        setSubmitable(true);
      } else {
        setSubmitable(false);
      }
    } else {
      if (mobileNo) {
        setSubmitable(true);
      } else {
        setSubmitable(false);
      }
    }
  }, [useid, mobileNo, provider]);

  useEffect(() => {
    if (error) {
      openNotification(
        error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))
      );
    }

    if (data) {
      Cookie.set(KEY_SESSION_USER, JSON.stringify(data.socialAuth), {
        expires: 1,
      });
      dispatch(setUserDataSuccess(data.socialAuth));
      setSessionItem("Auth", data.socialAuth);
      const topics = data.socialAuth.parentCategories;
      if (topics.length) {
        router.push("/topics");
      } else {
        router.push("/");
      }
    }
  }, [error, data]);

  useEffect(() => {
    setIsLoading(false);
    const { data } = usersData;
    if (!data) {
      return;
    }
    console.log("fetch data: ", data);
    const isExistUser = data && data.users && data.users.length > 0;
    if (isExistUser) {
      const uniqueID = data.users[0].uniqueID;
      console.log("user data uniqueID: ", uniqueID);
      dispatch(setUserUniqueId(uniqueID));
      router.push("/login/password");
    } else {
      openNotification("Incorrect username or password.");
    }
  }, [usersData]);

  const onFinish = async (values) => {
    if (provider === "email") {
      getUsersWithFilter({
        variables: {
          filters: {
            email: useid,
          },
        },
      });
      dispatch(setUserEmail(values.email));
    } else {
      getUsersWithFilter({
        variables: {
          filters: {
            mobileNo: mobileNo,
          },
        },
      });
    }
    setIsLoading(true);
  };

  const responseGoogle = (response) => {
    console.log(response);
    socialAuthUser({
      variables: {
        email: response.profileObj.email,
        signUpMethod: "Google",
      },
    });
  };

  const responseFacebook = (response) => {
    console.log(response);
    socialAuthUser({
      variables: {
        email: response.authResponse.email,
        signUpMethod: "Facebook",
      },
    });
  };

  return (
    <Pannel>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <FormContent>
          <LogoStyle href="/">
            <ImgLogo src="./images/logo-login.svg" alt="" />
          </LogoStyle>
          <Title>Access JuicyPie</Title>
          <Description>Discover endless content</Description>

          {!isMyAccount ? (
            <>
              <ButtonCustom
                type="default"
                block
                onClick={() => setIsMyAccount(true)}
              >
                <IconButton src="./images/user.svg" alt="" />
                <TextButton>Use Phone / Email / Username</TextButton>
              </ButtonCustom>

              <ButtonFacebook
                title="Log in with Facebook"
                callback={responseFacebook}
              />

              <ButtonWithGoogle
                title="Log in with Google"
                autoLoad={false}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />

              <CenteredRow>
                No account?
                <Link href="/signup">
                  <SignupLinkText>Sign up</SignupLinkText>
                </Link>
              </CenteredRow>
            </>
          ) : (
            <>
              {provider === "email" ? (
                <Form.Item
                  name="email"
                  className="custom-form-item"
                  rules={[
                    { required: true, message: "Please input your Username!" },
                  ]}
                >
                  <InputText
                    placeholder="Email or username"
                    value={useid}
                    onChange={(e) => setUserid(e.target.value)}
                  />
                </Form.Item>
              ) : (
                <PhoneInput
                  placeholder="Enter phone number"
                  className="phone-input-customize"
                  value={mobileNo}
                  onChange={setMobileNo}
                  country="US"
                />
              )}
              <Form.Item className="custom-form-item">
                {/* <TextPhone href='#'>Use phone</TextPhone> */}
                {provider === "email" ? (
                  <UsePhone onClick={() => setProvider("mobile")}>
                    Use phone
                  </UsePhone>
                ) : (
                  <UsePhone onClick={() => setProvider("email")}>
                    Use Email
                  </UsePhone>
                )}
              </Form.Item>

              <Form.Item className="custom-form-item">
                <ContinuButton
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={isLoading}
                  disabled={!submitable}
                >
                  Continue
                </ContinuButton>
              </Form.Item>
            </>
          )}
        </FormContent>
      </Form>
      <CenteredRow>
        <AppLinkButton>
          <ButtonIcon src="/images/icon_ios.svg" />
        </AppLinkButton>
        <AppLinkButton>
          <ButtonIcon src="/images/icon_android.svg" />
        </AppLinkButton>
      </CenteredRow>
      <style js="true">{`
        .PhoneInputInput {
          font-family: Proxima Nova;
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 17px;
          padding: 8px 16px;
          height: 45px;
          color: #788995;
          border: none !important;
          margin-left: 15px;
        }
        .phone-input-customize {
          margin-bottom: 14px;
        }
        .custom-form-item {
          max-height: 45px !important;
          margin-bottom: 14px !important;
        }
        .phone-input-customize input::placeholder {
          color: #c9d0d5;
        }
        .custom-form-item input {
          height: 45px !important;
        }
        .change-method {
          max-height: 12px !important;
        }
      `}</style>
    </Pannel>
  );
};

const ButtonCustom = styled(Button)`
  background: #ffffff !important;
  border-radius: 5px !important;
  border: none !important;
  margin-bottom: 15px !important;
  padding: 12px 16px !important;
  height: auto !important;
`;

const IconButton = styled.img`
  float: left;
`;

const TextButton = styled.span`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 21px;
  text-align: center;

  color: #404950;
`;

const TextPhone = styled.a`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 17px;
  display: flex;
  align-items: center;
  text-align: right;
  color: #0095f8;
  margin: 15px 0 20px 0;
`;

const FormContent = styled.div`
  text-align: center;
`;

const LogoStyle = styled.a`
  display: inline-block;
  margin-bottom: 15px;
`;
const ImgLogo = styled.img`
  width: 100%;
`;

const Title = styled.h3`
  font-style: normal;
  font-weight: bold;
  font-size: 23px;
  line-height: 23px;

  text-align: center;

  color: #404950;
  margin-bottom: 5px;
`;

const Description = styled.p`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 17px;

  align-items: center;
  text-align: center;

  color: #788995;
  margin-bottom: 30px;
`;

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

const CenteredRow = styled(AdjustRow)`
  justify-content: center;
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

const UsePhone = styled.a`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 17px;
  display: inline-block;
  text-align: right;
  color: #0095f8;
  float: left;
`;

export default compose(
  connect((state) => state, {}),
  withApollo
)(InputEmailForm);
