import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import bookSlice from "./slices/bookSlice"
import reviewSlice from "./slices/reviewSlice";

export const store = configureStore({
    reducer: {
        allBooks: bookSlice,
        allReviews: reviewSlice
    }
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;