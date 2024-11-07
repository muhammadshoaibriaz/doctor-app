import { FAV_DOC, REM_DOC } from "../actionTypes";

export const Reducers = (state = [], action) => {
  switch (action.type) {
    case FAV_DOC:
      return [...state, action.payload];
    case REM_DOC:
      return state.filter((item, index) => index !== action.payload);
    default:
      return state;
  }
};
