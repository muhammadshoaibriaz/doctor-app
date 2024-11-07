import React, { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Doctors from "../doctors/Doctors";
import AddNewDoctor from "../doctors/AddNewDoctor";
import Patients from "../patients/Patients";
import AddPatient from "../patients/AddPatient";
import DashContent from "./DashContent";
import Articles from "../router/Articles";
import Blogs from "../router/Blogs";
import Appointments from "../patients/Appointments";
import AddAppointment from "../patients/AddAppointment";
import DoctorDetails from "../doctors/DoctorDetails";
import ViewArticle from "../router/ViewArticle";

export default function Dashboard() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <div className="w-full">
      <div className="flex w-full">
        <div
          className="w-1/5 transition-all ease-in-out"
          style={{
            width: sidebarVisible ? "20%" : "0%",
            overflow: sidebarVisible ? "visible" : "hidden",
          }}
        >
          <Sidebar />
        </div>
        <div
          style={{
            width: sidebarVisible ? "80%" : "100%",
          }}
          className="main_dashboard bg-slate-50 transition-all duration-500 w-4/5"
        >
          <Header toggleSidebar={toggleSidebar} />
          <Routes>
            <Route path="/" element={<DashContent />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/add_patient" element={<AddPatient />} />
            <Route path="/add_new_doctor" element={<AddNewDoctor />} />
            <Route path="/add_appointment" element={<AddAppointment />} />
            <Route path="/doctor_details" element={<DoctorDetails />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/view_article" element={<ViewArticle />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
