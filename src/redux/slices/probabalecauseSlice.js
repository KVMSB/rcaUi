import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  probable_cause_questions:null,
  probable_cause:null,
};

const probabalecauseSlice = createSlice({
  name: 'ProbableCause',
  initialState,
  reducers: {
    updateCauseField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const { updateCauseField } = probabalecauseSlice.actions;
export default probabalecauseSlice.reducer;
