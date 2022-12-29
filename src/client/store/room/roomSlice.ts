import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayer, IRoom } from "../../../shared/Room";
import type { RootState } from "../store";

interface RoomState {
  value: IRoom | null;
}

const initialState: RoomState = {
  value: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<IRoom | null>) => {
      state.value = action.payload;
    },
    setPlaylist: (state, action: PayloadAction<string[]>) => {
      if (state.value) state.value.playlist = action.payload;
    },
    setPlayer: (state, action: PayloadAction<IPlayer>) => {
      if (state.value) state.value.player = action.payload;
    },
    setSelected: (state, action: PayloadAction<string>) => {
      if (state.value) state.value.selected = action.payload;
    },
  },
});

export const { setRoom, setPlaylist, setPlayer, setSelected } = roomSlice.actions;
export const selectRoom = (state: RootState) => state.room.value;
export default roomSlice.reducer;
