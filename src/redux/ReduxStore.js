import { createStore } from "redux";

const initialState = {
  token: "",
  valid: false,
};
const store = (state = initialState, action) => {
  let newstate = null;
  switch (action.type) {
    case "SET_TOKEN":
      newstate = {
        ...state,
        token: action.payload.token,
        valid: true,
      };
      return newstate;
    case "TOKEN_VALID":
      newstate = {
        ...state,
        valid: false,
      };
      return newstate;

    case "LOGOUT":
      newstate = {
        ...state,
        token: " ",
      };
      return newstate;
    case "SET_BLOG":
      newstate = {
        ...state,
        blog: action.payload.item,
      };
      return newstate;

    default:
      return state;
  }
};
const reduxstore = createStore(store);

export default reduxstore;
