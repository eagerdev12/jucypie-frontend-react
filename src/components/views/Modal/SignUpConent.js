import { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Cookie from 'js-cookie';
import { compose } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { withApollo, useMutation, useLazyQuery } from 'react-apollo';
import {
  Form,
  Button,
  Row,
  notification,
  DatePicker,
  Select,
} from 'antd';


import { KEY_SESSION_USER } from '../../../../src/utils/constants';
import { InputText, VectorIcon } from '../../../../src/components/atoms';
import { GET_USERLIST_QUERY, SAVE_USER_MUTATION } from '../../../../src/graphql';
import { setUserDataSuccess } from '../../../../src/redux/actions';
import { validateEmail } from '../../../../src/utils';
import ButtonFacebook from '../../../../src/components/atoms/ButtonFacebook';
import ButtonWithGoogle from '../../../../src/components/atoms/ButtonWithGoogle';

const { Option } = Select;

const openNotification = (errorMessage) => {
  notification.error({
    message: 'Error',
    description: <div>{errorMessage}</div>,
  });
};

const SignupForm = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState();
  const [emailExist, setEmailExist] = useState(false);
  const [registerUser, { loading, data, error, called }] = useMutation(
    SAVE_USER_MUTATION
  );
  const [getUsersWithFilter, usersData] = useLazyQuery(GET_USERLIST_QUERY);
  const [stepForm, setStepForm] = useState(1);

  const onFinish = async (values) => {
    getUsersWithFilter({
      variables: {
        filters: {
          email: values.email,
        },
      },
    });
    setFormData(values);
  };

  useEffect(() => {
    const { data } = usersData;
    const isExistUser = data && data.users.length > 0;
    setEmailExist(isExistUser);

    if (formData && !isExistUser && !called) {
      const variables = { userinput: { ...formData, signUpMethod: 'Site' } };
      try {
        registerUser({ variables });
      } catch (e) {
        console.log(e);
      }
    }
  }, [usersData]);

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
      router.push('/topics');
    }
  }, [error, data]);

  const responseGoogle = (response) => {
    console.log(response);
  };

  const responseFacebook = (response) => {
    console.log(response);
  };

  const onChangeBirthday = (date, dateStr) => {
    console.log(date, dateStr);
  };

  return (
    <Pannel>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        {stepForm === 2 ? (
          <FormNormal>
            <LogoStyle>
              <VectorIcon name="Like" width={50} height={50} fill="#FD636B"/>
            </LogoStyle>
            <TitleNormal>Enter your birthday</TitleNormal>
            <DescriptionNormal>
              This will not be shown publicly.
            </DescriptionNormal>

            <Form.Item>
              <DatePickerStyle onChange={onChangeBirthday} />
            </Form.Item>

            <MTop25 />

            <TitleNormal>Gender</TitleNormal>
            <DescriptionNormal>
              We are a gender inclusive platform.
            </DescriptionNormal>

            <Form.Item>
              <SelectStyle placeholder='Select'>
                <Option value='male'>Male</Option>
                <Option value='female'>Female</Option>
              </SelectStyle>
            </Form.Item>

            <Form.Item
              name='name'
              rules={[
                { required: true, message: 'Please input your Full Name!' },
              ]}
            >
              <InputTextStyled placeholder='Full Name' />
            </Form.Item>

            <Form.Item>
              <ContinuButton
                type='primary'
                htmlType='button'
                className='login-form-button'
                // loading={loading}
                onClick={() => setStepForm(3)}
              >
                Continue
              </ContinuButton>
            </Form.Item>

            <SpaceBottom />
          </FormNormal>
        ) : stepForm === 3 ? (
          <FormStep3>
            <LogoStyle>
              <VectorIcon name="Like" width={50} height={50} fill="#FD636B"/>
            </LogoStyle>

            <FormLabel>
              Email
              <UsePhone>Use phone</UsePhone>
            </FormLabel>

            <Form.Item
              name='email'
              type='email'
              rules={[
                { required: true, message: 'Please input your Email Address!' },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    const isValideEmail = validateEmail(value);
                    if (!emailExist && isValideEmail) {
                      return Promise.resolve();
                    } else if (!isValideEmail) {
                      return Promise.reject('Please enter valid email!');
                    } else {
                      return Promise.reject('Email already exist!');
                    }
                  },
                }),
              ]}
            >
              <InputTextStyled
                placeholder='Email'
                onChange={() => setEmailExist(false)}
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <InputTextStyled type='password' placeholder='Password' />
            </Form.Item>

            <Form.Item>
              <ContinuButton
                type='primary'
                htmlType='submit'
                className='login-form-button'
                loading={loading}
              >
                Continue
              </ContinuButton>
            </Form.Item>
          </FormStep3>
        ) : (
          <FormContent>
            <LogoStyle>
              <VectorIcon name="Like" width={50} height={50} fill="#FD636B"/>
            </LogoStyle>
            <Title>Sign up</Title>
            <Description>Join Juicypie to interact with this post</Description>

            <ButtonCustom type='default' block onClick={() => setStepForm(2)}>
              <IconButton src='/images/user.svg' alt='' />
              <TextButton>Use Phone / Email</TextButton>
            </ButtonCustom>

            <ButtonFacebook
              title='Continue with Facebook'
              callback={responseFacebook}
            />

            <ButtonWithGoogle
              title='Continue with Google'
              autoLoad={false}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />

            <TextHaveAccount>
              Have an account?
              <Link href='/login'>
                <LoginLinkText>Log in</LoginLinkText>
              </Link>
            </TextHaveAccount>
          </FormContent>
        )}
      </Form>
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
  text-align: right;
  color: #0095f8;
  float: right;
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
  box-shadow: 0 2px 14px rgb(0 0 0 / 7%);
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

const LogoStyle = styled.div`
  display: inline-block;
  margin-bottom: 15px;
`;
const ImgLogo = styled.img`
  width: 100%;
`;

const TitleNormal = styled.h3`
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 17px;
  text-align: left;
  color: #404950;
  margin-bottom: 10px;
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
  padding-top: 20px;
  @media only screen and (max-width: 451px) {
    padding-top: 26px;
  }
`;

const LinkText = styled.a`
  font-size: ${(props) => (props.fontSize ? props.fontSize + 'px' : '15px')};
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
