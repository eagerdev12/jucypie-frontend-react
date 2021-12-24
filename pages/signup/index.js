import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Cookie from "js-cookie";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { withApollo, useMutation, useLazyQuery } from "react-apollo";
import { Form, Button, Row, notification, DatePicker, Select } from "antd";

import { KEY_SESSION_USER } from "../../src/utils/constants";
import { InputText } from "../../src/components/atoms";
import {
  GET_USERLIST_QUERY,
  SAVE_USER_MUTATION,
  SEND_VERIFY_CODE,
  VERIFY_CODE,
  SEND_MOBILE_VERIFY_CODE,
} from "../../src/graphql";
import { setUserDataSuccess } from "../../src/redux/actions";
import { validateEmail } from "../../src/utils";
import ButtonFacebook from "../../src/components/atoms/ButtonFacebook";
import ButtonWithGoogle from "../../src/components/atoms/ButtonWithGoogle";
import "react-phone-number-input";
import PhoneInput from "react-phone-number-input";
import { months, dayRange } from "../../src/config/config";
import { setSessionItem } from "../../src/services";

const { Option } = Select;

const openNotification = (errorMessage) => {
  notification.error({
    message: "Error",
    description: <div>{errorMessage}</div>,
  });
};

const SignupForm = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const [formData, setFormData] = useState();
  const [newUser, setNewUser] = useState();
  const [emailExist, setEmailExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sentCodeStatus, setSentCodeStatus] = useState(2);
  const [registerUser, { loading, data, error, called }] = useMutation(
    SAVE_USER_MUTATION
  );
  const [sendEmailVerifyCode, sentEmailResult] = useMutation(SEND_VERIFY_CODE);
  const [sendMobileVerifyCode, sentMobileResult] = useMutation(
    SEND_MOBILE_VERIFY_CODE
  );
  const [getUsersWithFilter, usersData] = useLazyQuery(GET_USERLIST_QUERY);
  const [verifyCode, verifyCodeResult] = useMutation(VERIFY_CODE);
  const [stepForm, setStepForm] = useState(1);
  const [provider, setProvider] = useState("email");
  const [mobileNo, setMobileNo] = useState();

  const [form1] = Form.useForm();

  useEffect(() => {
    setIsLoading(false);
    const { data } = usersData;

    if (!data) {
      return;
    }
    const isExistUser = data && data.users && data.users.length > 0;
    setEmailExist(isExistUser);
    if (newUser && !isExistUser && !called) {
      try {
        let newSiteUser = {};
        switch (provider) {
          case "email":
            sendEmailVerifyCode({ variables: { email: newUser.email } });
            newSiteUser = { ...newUser, signUpMethod: "Site" };
            break;
          case "mobile":
            sendMobileVerifyCode({ variables: { mobileNo: mobileNo } });
            newSiteUser = { ...newUser, signUpMethod: "Site" };
            break;
          case "google":
            setStepForm(4);
            newSiteUser = { ...newUser, signUpMethod: "Google" };
            break;
          case "facebook":
            setStepForm(4);
            newSiteUser = { ...newUser, signUpMethod: "Facebook" };
            break;
          default:
            break;
        }
        setNewUser(newSiteUser);
      } catch (e) {
        console.log(e);
      }
    } else if (isExistUser) {
      openNotification("This user exists");
    }
  }, [usersData]);

  useEffect(() => {
    if (provider === "email") {
      const { data } = sentEmailResult;
      if (!data) {
        return;
      }
      console.log("email sent result: ", data.sendEmailVerifyCode);
      if (data && data.sendEmailVerifyCode) {
        setStepForm(3);
      }
    } else if (provider === "mobile") {
      const { data } = sentMobileResult;
      if (!data) {
        return;
      }

      console.log(
        "sendMobileVerifyCode sent result: ",
        data.sendMobileVerifyCode
      );
      if (data && data.sendMobileVerifyCode) {
        setStepForm(3);
      }
    }
  }, [sentEmailResult, sentMobileResult]);

  useEffect(() => {
    if (error) {
      openNotification(
        error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))
      );
    }

    if (data) {
      Cookie.set(KEY_SESSION_USER, JSON.stringify(data.upsertAuth), {
        expires: 1,
      });
      dispatch(setUserDataSuccess(data.upsertAuth));
      setSessionItem("Auth", data.upsertAuth);
      router.push("/topics");
    }
  }, [error, data]);

  const responseGoogle = (response) => {
    console.log(response);
    const googleUserData = {
      name: response.profileObj.name,
      email: response.profileObj.email,
      avatar: response.profileObj.imageUrl,
      password: "",
    };
    getUsersWithFilter({
      variables: {
        filters: {
          email: googleUserData.email,
        },
      },
    });
    setNewUser(googleUserData);
    setProvider("google");
  };

  const responseFacebook = (response) => {
    console.log(response);
    const facebookUserData = {
      name: response.authResponse.name,
      email: response.authResponse.email,
      password: "",
    };
    getUsersWithFilter({
      variables: {
        filters: {
          email: facebookUserData.email,
        },
      },
    });
    setNewUser(facebookUserData);
    setProvider("facebook");
  };

  // step3 is to enter verification code and password for site sign up
  const goToStep3 = (values) => {
    const yearTimestamp = new Date(values.year);
    const dob =
      yearTimestamp.getFullYear() + "-" + values.month + "-" + values.day;
    delete values.year;
    delete values.month;
    delete values.day;

    console.log("dob: ", {
      ...values,
      dob: dob,
    });

    setNewUser(values);
    if (provider === "email") {
      getUsersWithFilter({
        variables: {
          filters: {
            email: values.email,
          },
        },
      });
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

  const submitProfile = (values) => {
    const finalUserData = {
      ...newUser,
      mobileNo: mobileNo ? mobileNo : "",
      password: values.password,
    };
    setNewUser(finalUserData);
    const variables = { userinput: { ...finalUserData } };
    registerUser({ variables });
  };

  const submitSocialProfile = (values) => {
    const yearTimestamp = new Date(values.year);
    const dob =
      yearTimestamp.getFullYear() + "-" + values.month + "-" + values.day;
    delete values.year;
    delete values.month;
    delete values.day;

    const finalUserData = {
      ...newUser,
      dob: dob,
      gender: values.gender,
    };
    setNewUser(finalUserData);
    const variables = { userinput: { ...finalUserData } };
    registerUser({ variables });
    console.log("social login final user: ", finalUserData);
  };

  useEffect(() => {
    const { data } = verifyCodeResult;
    if (!data) {
      return;
    }
    if (data.verifyCode) {
      setSentCodeStatus(1);
    } else {
      setSentCodeStatus(-1);
    }
  }, [verifyCodeResult]);

  const checkCode = (values) => {
    console.log("inputting code: ", typeof values);
    setSentCodeStatus(0);
    const variables = {
      codeObject: {
        email: newUser.email ? newUser.email : "",
        mobileNo: mobileNo ? mobileNo : "",
        provider: newUser.email ? "email" : "mobile",
        code: parseInt(values),
      },
    };
    console.log("submitprofile variables; ", variables);
    verifyCode({ variables });
  };

  return (
    <Pannel>
      {stepForm === 2 ? (
        <Form
          form={form1}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={goToStep3}
        >
          <FormNormal>
            <LogoStyle href="/">
              <ImgLogo src="./images/logo-login.svg" alt="" />
            </LogoStyle>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your Full Name!" },
              ]}
            >
              <InputTextStyled placeholder="Full Name" />
            </Form.Item>
            <MTop25 />
            <MTop25 />
            <TitleNormal className="pd-0">Enter your birthday</TitleNormal>
            <DescriptionNormal>
              This will not be shown publicly.
            </DescriptionNormal>

            <Form.Item
              name="month"
              className="month-select-custom"
              rules={[{ required: true, message: "Birthday Month" }]}
            >
              <Select placeholder="Month">
                {months.map((item) => (
                  <Option value={item.val}>{item.desc}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="day"
              className="day-select-custom"
              rules={[{ required: true, message: "Birthday Day" }]}
            >
              <Select placeholder="Day">
                {dayRange.map((item) => (
                  <Option value={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="year"
              className="year-select-custom"
              rules={[{ required: true, message: "Birthday Year" }]}
            >
              <DatePickerStyle
                mode="year"
                picker="year"
                format="YYYY"
                placeholder="Year"
              />
            </Form.Item>

            <Form.Item
              name="gender"
              className="gender-custom"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <SelectStyle placeholder="How do you identify?">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </SelectStyle>
            </Form.Item>
            {provider === "email" ? (
              <Form.Item
                name="email"
                type="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email Address!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      const isValideEmail = validateEmail(value);
                      if (emailExist)
                        return Promise.reject("Email already exist!");
                      if (!emailExist && isValideEmail) {
                        return Promise.resolve();
                      } else if (!isValideEmail) {
                        return Promise.reject("Please enter valid email!");
                      }
                    },
                  }),
                ]}
              >
                <InputTextStyled
                  placeholder="Email"
                  onChange={() => setEmailExist(false)}
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
            <FormLabel className="pd-0">
              {provider === "email" ? (
                <UsePhone onClick={() => setProvider("mobile")}>
                  Use phone
                </UsePhone>
              ) : (
                <UsePhone onClick={() => setProvider("email")}>
                  Use Email
                </UsePhone>
              )}
            </FormLabel>

            <MTop10 />
            <Form.Item>
              <ContinuButton
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={isLoading}
              >
                Continue
              </ContinuButton>
            </Form.Item>
            <SpaceBottom />
          </FormNormal>
        </Form>
      ) : stepForm === 3 ? (
        // step3
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={submitProfile}
        >
          <FormStep3>
            <LogoStyle href="/">
              <ImgLogo src="./images/logo-login.svg" alt="" />
            </LogoStyle>

            <TitleNormal className="pd-0">
              Enter verification code sent to your
              {provider === "email" ? " email" : " Mobile"}
            </TitleNormal>
            <Form.Item
              name="verificationCode"
              hasFeedback
              validateStatus={
                sentCodeStatus === 0
                  ? "validating"
                  : sentCodeStatus === 1
                  ? "success"
                  : sentCodeStatus === -1
                  ? "error"
                  : ""
              }
              rules={[
                { required: true, message: "Please input verification code!" },
                { max: 6, message: "max length 6!" },
              ]}
            >
              <InputTextStyled
                placeholder="Verification Code"
                onChange={(e) => checkCode(e.target.value)}
              />
            </Form.Item>
            <MTop25 />
            <TitleNormal className="pd-0">Create a strong password</TitleNormal>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <InputTextStyled type="password" placeholder="Password" />
            </Form.Item>
            <MTop25 />

            <Form.Item>
              <ContinuButton
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
                disabled={sentCodeStatus === 1 ? false : true}
              >
                Continue
              </ContinuButton>
            </Form.Item>
          </FormStep3>
        </Form>
      ) : stepForm === 4 ? (
        <Form
          name="social_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={submitSocialProfile}
        >
          <FormNormal>
            <LogoStyle href="/">
              <GoogleLogo src={newUser.avatar} alt="" />
            </LogoStyle>

            <TitleMedium>
              Hi {newUser.name}, let's complete your profile
            </TitleMedium>
            <TitleNormal className="pd-0">Enter your birthday</TitleNormal>
            <DescriptionNormal>
              This will not be shown publicly.
            </DescriptionNormal>

            <Form.Item
              name="month"
              className="month-select-custom"
              rules={[{ required: true, message: "Birthday Month" }]}
            >
              <Select placeholder="Month">
                {months.map((item) => (
                  <Option value={item.val}>{item.desc}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="day"
              className="day-select-custom"
              rules={[{ required: true, message: "Birthday Day" }]}
            >
              <Select placeholder="Day">
                {dayRange.map((item) => (
                  <Option value={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="year"
              className="year-select-custom"
              rules={[{ required: true, message: "Birthday Year" }]}
            >
              <DatePickerStyle
                mode="year"
                picker="year"
                format="YYYY"
                placeholder="Year"
              />
            </Form.Item>

            <Form.Item
              name="gender"
              className="gender-custom"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <SelectStyle placeholder="How do you identify?">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </SelectStyle>
            </Form.Item>

            <MTop25 />
            <Form.Item>
              <ContinuButton
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={isLoading}
              >
                Continue
              </ContinuButton>
            </Form.Item>

            <SpaceBottom />
          </FormNormal>
        </Form>
      ) : (
        <FormContent>
          <LogoStyle href="/">
            <ImgLogo src="./images/logo-login.svg" alt="" />
          </LogoStyle>
          <Title>Sign up</Title>
          <Description>Discover endless content</Description>

          <ButtonCustom type="default" block onClick={() => setStepForm(2)}>
            <IconButton src="./images/user.svg" alt="" />
            <TextButton>Use Phone / Email</TextButton>
          </ButtonCustom>

          <ButtonFacebook
            title="Continue with Facebook"
            callback={responseFacebook}
          />

          <ButtonWithGoogle
            title="Continue with Google"
            autoLoad={false}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />

          <TextHaveAccount>
            Have an account?
            <Link href="/login">
              <LoginLinkText>Log in</LoginLinkText>
            </Link>
          </TextHaveAccount>

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
        </FormContent>
      )}
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
          margin-bottom: 12px;
        }
        .phone-input-customize input::placeholder {
          color: #c9d0d5;
        }
        .year-select-custom {
          width: 26%;
        }
        .month-select-custom {
          width: 44%;
          float: left;
          margin-right: 10px;
        }
        .day-select-custom {
          width: 24%;
          float: left;
          margin-right: 10px;
        }
        .ant-form-item {
          margin-bottom: 12px !important;
        }
        .gender-custom {
          width: 100%;
        }
        .pd-0 {
          padding: 0px !important;
        }
        .custom-shadow {

        }
      `}</style>
    </Pannel>
  );
};

const InputTextStyled = styled(InputText)`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 17px;
  padding: 8px 16px;
  height: 45px;
  color: #788995;
`;

const FormLabel = styled.h3`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 17px;
  /* identical to box height */

  display: inline-block;
  width: 100%;
  align-items: center;
  overflow: hidden;

  color: #404950;
`;
const UsePhone = styled.a`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 17px;
  display: inline-block;
  color: #0095f8;
  float: left;
`;

const Back = styled.a`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 17px;
  display: inline-block;
  color: #404950;
`;

const FormStep3 = styled.div``;

const SpaceBottom = styled.div`
  margin-bottom: 60px;
`;

const SelectStyle = styled(Select)``;

const FormNormal = styled.div`
  text-align: left;
`;

const DatePickerStyle = styled(DatePicker)`
  width: 100%;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 17px;
  color: #788995;
  border: none;
`;

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

const GoogleLogo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const TitleNormal = styled.h3`
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 17px;
  text-align: left;
  color: #404950;
  margin: 20px 0px;
`;

const TitleMedium = styled.h2`
  font-weight: 700;
  font-size: 23px;
  line-height: 34.5px;
  padding: 0px !important;
  color: #404950;
  margin: 0px 0px 20px 0px;
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

const MTop25 = styled.div`
  margin-top: 25px;
`;
const MTop15 = styled.div`
  margin-top: 15px;
`;
const MTop10 = styled.div`
  margin-top: 10px;
`;

const DescriptionNormal = styled.p`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 17px;

  text-align: left;

  color: #788995;
  margin-bottom: 15px;
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
  padding-top: 142px;
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

const LoginLinkText = styled(LinkText)`
  color: #0095f8;
  font-weight: 600;
  font-size: 15px;
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
  margin: 0 0 30px;
`;
const TextHaveAccount = styled(AdjustRow)`
  justify-content: center;
  margin: 14px 0 31px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 145%;
  /* identical to box height, or 22px */

  text-align: center;

  color: #404950;
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
  height: auto !important;
  padding: 16px;
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
)(SignupForm);
