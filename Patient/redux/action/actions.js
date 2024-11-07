import { FAV_DOC, REM_DOC } from "../actionTypes";

export const addToFav = (data) => ({
  type: FAV_DOC,
  payload: data,
});

export const remFromFav = (index) => ({
  type: REM_DOC,
  payload: index,
});
