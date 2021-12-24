import gql from "graphql-tag";

export const GET_USERLIST_QUERY = gql`
  query LoginUser($filters: UserFilters) {
    users(filters: $filters) {
      uniqueID
      email
      mobileNo
    }
  }
`;

export const LOGIN_USER_QUERY = gql`
  query auth($uniqueID: String, $password: String) {
    auth(uniqueID: $uniqueID, password: $password) {
      ID
      token
      refreshToken
      creativeToken
      userName
      avatar
      status
      isVerified
      isFollowing
      email
      password
      parentCategories {
        name
      }
    }
  }
`;

export const SOCIAL_LOGIN_USER_QUERY = gql`
  query socialAuth($email: String, $signUpMethod: String) {
    socialAuth(email: $email, signUpMethod: $signUpMethod) {
      ID
      token
      refreshToken
      creativeToken
      userName
      avatar
      status
      isVerified
      isFollowing
      email
      password
      parentCategories {
        name
      }
    }
  }
`;

export const SAVE_USER_MUTATION = gql`
  mutation upsertAuth($userinput: UserInput) {
    upsertAuth(auth: $userinput) {
      ID
      token
      refreshToken
      creativeToken
      name
      userName
      email
      description
      status
      password
      avatar
      isVerified
      signUpMethod
      userCounter
      isPaidSubscription
      paidSubscription {
        subscriptionID
        status
      }
      following
      follower
      freeArticles {
        slug
        description
        title
      }
      ipAddress
    }
  }
`;

export const SEND_VERIFY_CODE = gql`
  mutation sendEmailVerifyCode($email: String) {
    sendEmailVerifyCode(email: $email)
  }
`;

export const SEND_MOBILE_VERIFY_CODE = gql`
  mutation sendMobileVerifyCode($mobileNo: String) {
    sendMobileVerifyCode(mobileNo: $mobileNo)
  }
`;

export const VERIFY_CODE = gql`
  mutation verifyCode($codeObject: VerifyCodeObject) {
    verifyCode(codeObject: $codeObject)
  }
`;

export const UPDATE_USER_SETTING_MUTATION = gql`
  mutation updateUserSetting($updateUserSetting: UserSettingInput) {
    upsertUserSetting(userSetting: $updateUserSetting) {
      account {
        name
        email
        userName
        avatar
      }
      privacy {
        isFollowersShow
        isFollowingShow
        isFollowButtonShow
        isSocialLinksShow
        isProfileBioShow
      }
      notification {
        trending {
          isEmail
          isPush
          button {
            isDaily
            isWeekly
            isOff
          }
        }
        recommended {
          isEmail
          isPush
          button {
            isDaily
            isWeekly
            isOff
          }
        }
        authorsLike {
          isEmail
          isPush
          button {
            isDaily
            isWeekly
            isOff
          }
        }
        authorsFollow {
          isEmail
          isPush
        }
        socialActivity {
          isEmail
          isPush
        }
      }
    }
  }
`;

export const GET_USER_QUERY = gql`
  query getUserSetting($userId: ID) {
    userSetting(userId: $userId) {
      account {
        name
        email
        userName
        ID
        description
      }
      privacy {
        isFollowersShow
        isFollowingShow
        isFollowButtonShow
        isSocialLinksShow
        isProfileBioShow
      }
      notification {
        trending {
          isEmail
          isPush
          button {
            isDaily
            isOff
            isWeekly
          }
        }
        recommended {
          isEmail
          isPush
          button {
            isDaily
            isOff
            isWeekly
          }
        }
        authorsLike {
          isEmail
          isPush
          button {
            isDaily
            isOff
            isWeekly
          }
        }
        authorsFollow {
          isEmail
          isPush
        }
        socialActivity {
          isEmail
          isPush
        }
      }
    }
  }
`;
