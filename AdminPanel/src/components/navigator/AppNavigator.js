import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Doctors from "../doctors/Doctors";
import AddNewDoctor from "../doctors/AddNewDoctor";
import Patients from "../patients/Patients";
import AddPatient from "../patients/AddPatient";
import Articles from "../router/Articles";
import Blogs from "../router/Blogs";
import Appointments from "../patients/Appointments";
import AddAppointment from "../patients/AddAppointment";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Dashboard from "../views/Dashboard";
import ViewArticle from "../router/ViewArticle";
import DoctorDetails from "../doctors/DoctorDetails";

function PageNotFound() {
  return (
    <div>
      <h1>Page not found</h1>
    </div>
  );
}

export default function AppNavigator() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/sign_up" element={<Signup />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="doctors" element={<Doctors />} />
          <Route path="add_new_doctor" element={<AddNewDoctor />} />
          <Route path="patients" element={<Patients />} />
          <Route path="add_patient" element={<AddPatient />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="add_appointment" element={<AddAppointment />} />
          <Route path="articles" element={<Articles />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="view_article" element={<ViewArticle />} />
          <Route path="doctor_details" element={<DoctorDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
