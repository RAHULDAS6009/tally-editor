import { Block, PartialBlock } from "@blocknote/core";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Blocks {
  blocks: PartialBlock[];
}

const initialState: Blocks = {
  blocks: [],
};

export const blockSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlock: (state, action: PayloadAction<PartialBlock[]>) => {
      state.blocks = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBlock } = blockSlice.actions;

export default blockSlice.reducer;
