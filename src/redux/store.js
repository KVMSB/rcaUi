import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './slices/eventSlice';
import probabalecauseReducer   from './slices/probabalecauseSlice';
import establishmentReducer   from './slices/establishmentSlice';
import impactAssesmentReducer   from './slices/impactAssesmentSlice';

export const store = configureStore({
  reducer: {
    event: eventReducer,
    probableCause: probabalecauseReducer,
    establishment: establishmentReducer,
    impactAssesment:impactAssesmentReducer
  },
});
