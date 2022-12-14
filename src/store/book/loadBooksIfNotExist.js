import { bookSlice } from "./index";
import { prepareData } from "../utils";
import { selectBooks } from "./selectors";

export const loadBooksIfNotExist = (dispatch, getState) => {
  if (selectBooks(getState())?.length > 0) {
    return;
  }

  dispatch(bookSlice.actions.startLoading());
  fetch("http://localhost:3000/api/books")
    .then((response) => response.json())
    .then((books) => {
      dispatch(bookSlice.actions.successLoading(prepareData(books)));
    })
    .catch(() => {
      dispatch(bookSlice.actions.failLoading());
    });
};
