import React, { useReducer } from "react";
import { SET_ALERT, REMOVE_ALERT } from "../types";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
  const initialState = {
    alert: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      default:
        return { ...state };
      case SET_ALERT:
        return { ...state, alert: action.payload };
      case REMOVE_ALERT:
        return { ...state, alert: null };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  //Set alert if nothing is given
  const setAlert = (msg, type) => {
    dispatch({ type: SET_ALERT, payload: { msg, type } });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ alert: state.alert, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
