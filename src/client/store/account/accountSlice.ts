import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccount } from "../../../shared/Account";
import type { RootState } from "../store";

interface AccountState {
  value: IAccount | null;
}

const initialState: AccountState = {
  value: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<IAccount | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setAccount } = accountSlice.actions;
export const selectAccount = (state: RootState) => state.account.value;
export default accountSlice.reducer;
