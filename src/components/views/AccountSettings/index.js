import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Typography, Row, Button } from "antd";
import { NavigationItem, InputText } from "../../atoms";
import { withApollo, useMutation, useQuery } from "react-apollo";
import { UPDATE_USER_SETTING_MUTATION, GET_USER_QUERY } from "../../../graphql";

const AccountSettings = (props) => {
  const { userName, mobile, userId } = props;
  // const [fullName, setFullName] = useState("");
  // const [email, setEmail] = useState("");
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { userId: userId },
  });

  return (
    <Panel>
      <NavigationItem
        title="Full Name"
        route="edit_name"
        subtext={data?.userSetting?.account?.name}
      />
      <NavigationItem
        title="Email"
        route="edit_email"
        subtext={data?.userSetting?.account?.email}
      />

      <NavigationItem
        title="Username"
        route="edit_username"
        subtext={data?.userSetting?.account?.userName}
      />

      <SubjectTitle>Security</SubjectTitle>

      <NavigationItem
        title="Password"
        route="update_password"
        subtext="********"
      />

      <NavigationItem title="Phone" subtext={mobile} />

      <NavigationItem
        title="2Factor Authentication"
        subtext="Add an additional layer of protection to your account."
      />
    </Panel>
  );
};

AccountSettings.EditNameView = ({ userAccountData, updateSetting }) => {
  const [fullName, setFullName] = useState(userAccountData?.name);

  return (
    <Panel>
      <InputWrapper>
        <InputText
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </InputWrapper>
      <Row justify="end">
        <SaveButton
          type="primary"
          onClick={() => updateSetting({ account: { name: fullName } })}
        >
          Save
        </SaveButton>
      </Row>
    </Panel>
  );
};

AccountSettings.EditEmailView = ({ userAccountData, updateSetting }) => {
  const [newEmail, setEmail] = useState(userAccountData?.email);

  return (
    <Panel>
      <InputWrapper>
        <InputText
          value={newEmail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Row>
          <Description>
            This email is not confirmed.
            <SendVerificationEmailLink>
              Resend confirmation
            </SendVerificationEmailLink>
          </Description>
        </Row>
      </InputWrapper>
      <Row justify="end">
        <SaveButton
          type="primary"
          onClick={() => updateSetting({ account: { email: newEmail } })}
        >
          Save
        </SaveButton>
      </Row>
    </Panel>
  );
};

AccountSettings.EditUserNameView = ({ userAccountData, updateSetting }) => {
  const [oldUserName, setOldUserName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const updateUserName = () => {
    console.log(oldUserName, userAccountData?.userName);
    if (oldUserName == userAccountData?.userName)
      updateSetting({ account: { userName: newUserName } });
  };
  return (
    <Panel>
      <SubjectTitle>Current</SubjectTitle>
      <InputWrapper>
        <InputText
          placeholder={userAccountData?.userName}
          onChange={(e) => setOldUserName(e.target.value)}
        />
        <Row>
          <Description>
            Currretly usernames cannot be edited. You may request a new one
            below
          </Description>
        </Row>
      </InputWrapper>
      <SubjectTitle>Request a change</SubjectTitle>
      <InputWrapper>
        <InputText
          placeholder="Desired username"
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <Row>
          <Description>
            Username requests are given in the order they’re received. Although
            we cannot guarantee, we will give you the next best alternative.
          </Description>
        </Row>
      </InputWrapper>
      <Row justify="end">
        <SaveButton type="primary" onClick={updateUserName}>
          Save
        </SaveButton>
      </Row>
    </Panel>
  );
};

AccountSettings.UpdatePassword = ({ updateSetting }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePassword = () => {
    if (newPassword == confirmPassword)
      updateSetting({
        account: { oldPassword: oldPassword, newPassword: newPassword },
      });
  };
  return (
    <Panel>
      <InputWrapper>
        <InputText
          placeholder="Current password"
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <InputText
          placeholder="New password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <InputText
          placeholder="Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </InputWrapper>
      <Row justify="end">
        <SaveButton type="primary" onClick={updatePassword}>
          Save
        </SaveButton>
      </Row>
    </Panel>
  );
};

const Panel = styled(Row)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Description = styled(Typography.Text)`
  margin-top: 15px;
`;

const SendVerificationEmailLink = styled.a`
  font-size: 14px;
  line-height: 20px;
  color: #0095f8;
  padding: 0 8px;
`;

const SubjectTitle = styled(Typography.Paragraph)`
  font-weight: bold;
  font-size: 19px;
  line-height: 150%;
  color: #404950;
  padding: 0 16px;
`;

const InputWrapper = styled(Row)`
  padding-left: 16px;
  margin-bottom: 30px;
`;

const SaveButton = styled(Button)`
  width: 98px;
  height: 30px;
  border: none;
  background: #80cafb;
  border-radius: 5px;
`;

export default AccountSettings;
