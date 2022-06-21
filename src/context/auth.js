import { useLocalStorage } from "usehooks-ts";
import { createContext, useContext, useState } from "react";

const defaultState = {
  user: null,
  jwt: "logged_out",
  userLoading: "idle",
  setUser: () => {},
  setJwt: () => {},
  setUserLoading: () => {},
};

const authContext = createContext(defaultState);
export const useAuth = () => useContext(authContext);

const AuthProvider = (props) => {
  const [user, setUser] = useState(defaultState.user);
  const [userLoading, setUserLoading] = useState(defaultState.userLoading);
  const [jwt, setJwt] = useLocalStorage("jwt", defaultState.jwt);

  const setUserHandler = (new_user) => {
    setUser(new_user);
    return new_user;
  };

  const setJwtHandler = (new_jwt) => {
    setJwt(new_jwt);
    return new_jwt;
  };

  const setUserLoadingHandler = (loading_state) => {
    setUserLoading(loading_state);
    return loading_state;
  };

  const authContextValue = {
    user,
    jwt,
    userLoading,
    setUser: setUserHandler,
    setJwt: setJwtHandler,
    setUserLoading: setUserLoadingHandler,
  };

  return (
    <authContext.Provider value={authContextValue}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;
