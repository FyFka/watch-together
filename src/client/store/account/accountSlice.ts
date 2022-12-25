import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccount } from "../../../shared/Account";
import type { RootState } from "../store";

interface CounterState {
  value: IAccount | null;
}

const initialState: CounterState = {
  value: null,
};

export const counterSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<IAccount | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setAccount } = counterSlice.actions;
export const selectAccount = (state: RootState) => state.account.value;
export default counterSlice.reducer;
