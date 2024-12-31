import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  establishmentSummary: [],

  compreHensiveSummary:null,
  reportText:'',
  reportSelected:false,
  researchLinks:[],
  selectedPapers:[],
  justifyContent:null
};

const establishmentSlice = createSlice({
  name: 'establishment',
  initialState,
  reducers: {
    updateEstablishmentField: (state, action) => {
      const { root_cause, field, value } = action.payload;
      const index = state.establishmentSummary.findIndex(item => item?.root_cause === root_cause);

      if (index !== -1) {
        // Update the existing entry
        state.establishmentSummary[index][field] = value;
      } else {
        // Add a new entry
        state.establishmentSummary.push(action.payload);
      }
    },
  },
});

export const { updateEstablishmentField } = establishmentSlice.actions;
export default establishmentSlice.reducer;
