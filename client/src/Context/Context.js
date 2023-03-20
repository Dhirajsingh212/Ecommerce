import React, { createContext } from "react";
import { useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  token: JSON.parse(localStorage.getItem("token")) || null,
  isadmin:JSON.parse(localStorage.getItem("admin")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(state.token));
  }, [state.token]);

  useEffect(()=>{
      localStorage.setItem("admin",JSON.stringify(state.isadmin))
  },[state.isadmin]);

  return (
    <Context.Provider
      value={{
        token: state.token,
        isadmin:state.isadmin,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
