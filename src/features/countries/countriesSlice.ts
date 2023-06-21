import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchCountries as fetchCountriesApi } from './countriesApi';
import { ICountry } from './interfaces';

export interface CountryState {
  value: ICountry[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CountryState = {
  value: [],
  status: 'idle',
};


export const fetchCountries = createAsyncThunk(
  'countries/fetch',
  async () => {
    const countries = await fetchCountriesApi();
    return countries;
  }
);

export const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(fetchCountries.rejected, (state) => {
        state.status = 'failed';
      });
  },
});


export const selectCountries = (state: RootState) => state.countries.value;

export default countrySlice.reducer;
