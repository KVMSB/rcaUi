import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  eventNo: '',
  instrument_number: '',
  analyst:'',
  product_name:'',
  event_description:'',
  immediate_actions:'',
  description_of_incident:'',
  detail_visual_symptoms:'',
  instrument_name:'',
  test_name:'',
  incident_type:'',
  probable_cause_questions:null,
  probable_cause:null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const { updateField } = eventSlice.actions;
export default eventSlice.reducer;
