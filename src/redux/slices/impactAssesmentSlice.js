import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 impact_process:[],
 impact_product:[],
 impact_practice:[],
 impact_compliance:[]
};

const impactAssesmentSlice = createSlice({
  name: 'impact assesment',
  initialState,
  reducers: {
    updateProductField: (state, action) => {
      const { question, answer } = action.payload;
      const index = state.impact_product.findIndex(item => item?.question === question);

      if (index !== -1) {
        // Update the existing entry
        state.impact_product[index]["answer"] = answer;
      } else {
        // Add a new entry
        state.impact_product.push(action.payload);
      }
    },
    updateProcessField: (state, action) => {
        const { question, answer } = action.payload;
        const index = state.impact_process.findIndex(item => item?.question === question);
  
        if (index !== -1) {
          // Update the existing entry
          state.impact_process[index]["answer"] = answer;
        } else {
          // Add a new entry
          state.impact_process.push(action.payload);
        }
      },
      updatePracticeField: (state, action) => {
        const { question, answer } = action.payload;
        const index = state.impact_practice.findIndex(item => item?.question === question);
  
        if (index !== -1) {
          // Update the existing entry
          state.impact_practice[index]["answer"] = answer;
        } else {
          // Add a new entry
          state.impact_practice.push(action.payload);
        }
      },
      updateComplainceField: (state, action) => {
        const { question, answer } = action.payload;
        const index = state.impact_compliance.findIndex(item => item?.question === question);
  
        if (index !== -1) {
          // Update the existing entry
          state.impact_compliance[index]["answer"] = answer;
        } else {
          // Add a new entry
          state.impact_compliance.push(action.payload);
        }
      },
      updateAll: (state, action) => {
        state.impact_compliance = action.payload.impact_compliance
        state.impact_process = action.payload.impact_process
        state.impact_practice = action.payload.impact_practice
        state.impact_product = action.payload.impact_product
      }
  },
});

export const { updateComplainceField,updatePracticeField,updateProcessField,updateProductField,updateAll } = impactAssesmentSlice.actions;
export default impactAssesmentSlice.reducer;
