import { createSlice } from "@reduxjs/toolkit";
const doctorSlice = createSlice({
  name: "doctor",
  initialState: [],
  reducers: {
    addDoctorToFavorite(state, action) {
      const exist = state.some((doctor) => doctor.id === action.payload.id);
      if (!exist) {
        state.push(action.payload);
      } else {
        alert("Doctor already exist");
      }
    },
    removeDoctorFromFavorite(state, action) {},
  },
});

export default doctorSlice.reducer;
export const { addDoctorToFavorite, removeDoctorFromFavorite } =
  doctorSlice.actions;
