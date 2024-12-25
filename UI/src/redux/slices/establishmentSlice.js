import { createSlice } from '@reduxjs/toolkit';
import Establishment from '../../componants/Establishment';

const initialState = {
  establishmentSummary: [],
};

const establishmentSlice = createSlice({
  name: 'establishment',
  initialState,
  reducers: {
    updateestablishmentField: (state, action) => {
      let ind = state["establishmentSummary"].findIndex(x => x.x.root_cause == action.payload.value.root_cause)
      if (ind != -1) {
        state["establishmentSummary"].map(x => {
          if (x.root_cause == action.payload.value.root_cause) {
            x.apprvoe = action.payload.value.approve;
          }
        });
      }
      else {
        state["establishmentSummary"].push(action.payload.value)
      }
    },
  },
});

export const { updateestablishmentField } = establishmentSlice.actions;
export default establishmentSlice.reducer;
