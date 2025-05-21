// frontend/src/store/slices/contactSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

console.log(API_URL);

export const submitContact = createAsyncThunk(
  'contact/submit',
  async (formData) => {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    status: 'idle',
    error: null,
    submissions: []
  },
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.submissions.push(action.payload);
        state.error = null;
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to send message';
      });
  }
});

export const { resetStatus } = contactSlice.actions;
export default contactSlice.reducer; 