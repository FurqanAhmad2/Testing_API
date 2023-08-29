import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//Actual Initial State
//No user logged in
const INITIAL_STATE = {
  token: null,
  type: null,
  subscriptionDetails: null,
  profile: null,
  isFetching: false,
  error: false,
  initialFetching: true,
};

//For Testing
//Logged In As Candidate
// const INITIAL_STATE = {
//   token: 11,
//   type: "EMPLOYEE",
//   profile: null,
//   isFetching: false,
//   error: false,
// };

// Logged In As Employer
// const INITIAL_STATE = {
//   token: 11,
//   type: "EMPLOYER",
//   profile: null,
//   isFetching: false,
//   error: false,
//   initialFetching: true,
// };

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        type: state.type,
        subscriptionDetails: state.subscriptionDetails,
        profile: state.profile,
        isFetching: state.isFetching,
        error: state.error,
        initialFetching: state.initialFetching,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
