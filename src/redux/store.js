import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './slice/countrySlice';

const store = configureStore({
  reducer: {
    country: countryReducer,
  },
});

export default store;
