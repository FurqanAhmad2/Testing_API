const AuthReducer = (state, action) => {
  switch (action.type) {
    case "INITIAL_FETCH_DONE":
      return {
        ...state,
        initialFetching: false,
      };
    case "LOGIN_USER_START":
      return {
        ...state,
        token: null,
        type: null,
        profile: null,
        error: false,
        isFetching: true,
      };
    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        isFetching: false,
        type: action.payload.type,
        token: action.payload.token,
        error: false,
      };
    case "LOGIN_USER_FAILURE":
      return {
        ...state,
        token: null,
        type: null,
        profile: null,
        isFetching: false,
        error: action.payload,
      };
    case "LOGIN_USER_STOPFETCHING":
      return {
        ...state,
        isFetching: false,
      };
    case "USER_SIGNOUT":
      return {
        ...state,
        token: null,
        type: null,
        subscriptionDetails: null,
        profile: null,
        isFetching: false,
        error: null,
      };
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "SET_TYPE":
      return {
        ...state,
        type: action.payload,
      };
    case "SET_SUBSCRIPTION":
      return {
        ...state,
        subscriptionDetails: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
