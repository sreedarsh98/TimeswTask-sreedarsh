import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountriesByFilter = createAsyncThunk(
  'country/fetchByFilter',
  async (filter) => {
    let url = '';
    if (filter === 'Asia') {
      url = 'https://restcountries.com/v2/region/asia?fields=name,region,flag';
    } else if (filter === 'Europe') {
      url = 'https://restcountries.com/v2/region/europe?fields=name,region,flag';
    } else {
      url = 'https://restcountries.com/v2/all?fields=name,region,flag';
    }
    const response = await axios.get(url);
    return response.data;
  }
);

const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countries: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesByFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountriesByFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountriesByFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default countrySlice.reducer;
