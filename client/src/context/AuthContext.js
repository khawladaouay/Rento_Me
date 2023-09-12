import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  loading: false,
  error: null,
  isAuthenticated: localStorage.getItem("authed") === "true",
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("authed", "true");

      return {
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("authed");

      return {
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
