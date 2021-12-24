import {
  SET_USERDATA_BEGIN,
  SET_USERDATA_SUCCESS,
  SET_USERDATA_FAILURE,
  CLEAR_USERDATA,
  SET_USER_EMAIL,
  SET_USERID_EXIST,
  SET_TOKEN,
  SET_USER_SETTING,
  SET_USER_UNIQEID,
} from "../action-types";

const initialState = {
  sessionUser: {},
  email: "",
  loading: false,
  error: null,
  token: "",
  refreshToken: "",
  exist: false,
  uniqueID: ""
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERDATA_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SET_USER_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SET_USER_UNIQEID:
      return {
        ...state,
        uniqueID: action.payload,
      };
    case SET_USERID_EXIST:
      return {
        ...state,
        exist: action.payload,
      };
    case SET_USERDATA_SUCCESS: {
      return {
        ...state,
        sessionUser: action.payload,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        loading: false,
      };
    }
    case SET_TOKEN: {
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        loading: false,
      };
    }
    case SET_USERDATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_USERDATA:
      return {
        ...state,
        loading: false,
        sessionUser: {},
        token: null,
        refreshToken: null,
      };
    case SET_USER_SETTING:
      return {
        ...state,
      };
    default:
      return state;
  }
};
