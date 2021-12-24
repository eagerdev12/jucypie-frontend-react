import { LOGIN_USER_QUERY } from "../../graphql";
import {
  SET_USERDATA_BEGIN,
  SET_USERDATA_SUCCESS,
  SET_USERDATA_FAILURE,
  SET_TOKEN,
  CLEAR_USERDATA,
  SET_USER_EMAIL,
  SET_USERID_EXIST,
  SET_USER_SETTING,
  SET_USER_UNIQEID,
} from "../action-types";

export const setUserEmail = (payload) => ({
  type: SET_USER_EMAIL,
  payload,
});

export const setUserUniqueId = (payload) => ({
  type: SET_USER_UNIQEID,
  payload,
});

export const setUserSetting = (payload) => ({
  type: SET_USER_SETTING,
  payload,
});

export const setUserDataBegin = () => ({
  type: SET_USERDATA_BEGIN,
});

export const setUserToken = (data) => ({
  type: SET_TOKEN,
  payload: data,
});

export const setUserDataSuccess = (data) => ({
  type: SET_USERDATA_SUCCESS,
  payload: data,
});

export const setUserDataFailure = (data) => ({
  type: SET_USERDATA_FAILURE,
  payload: data,
});

export const clearUserData = () => ({
  type: CLEAR_USERDATA,
});

export const setUserExist = (exist) => {
  SET_USERID_EXIST, exist;
};

export const userAuthentication = (client, variables) => {
  return client.query({
    query: LOGIN_USER_QUERY,
    variables,
  });
};

export const setUserDataAction = (data) => {
  return (dispatch) => {
    dispatch(setUserDataBegin());
    try {
      return dispatch(setUserDataSuccess(data));
    } catch (error) {
      dispatch(setUserDataFailure(error));
    }
  };
};

export const setToken = (data) => {
  return (dispatch) => {
    dispatch(setUserDataBegin());
    try {
      console.log("action dispatch try");
      return dispatch(setUserToken(data));
    } catch (error) {
      dispatch(setUserDataFailure(error));
      console.log("token dispatch failure", error);
    }
  };
};
