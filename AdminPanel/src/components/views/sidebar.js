import "../../App.css";
import logo from "../../assets/images/logo.png";
import ListItem from "../customstyles/ListItem";
import { FaUserDoctor, FaWheelchair } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import {
  BiCalendar,
  BiHome,
  BiNote,
  BiNotepad,
  BiReceipt,
} from "react-icons/bi";
import { useState } from "react";
import { HiUserAdd } from "react-icons/hi";

export default function Sidebar({ visible, style }) {
  const location = useLocation();
  const [doctorOpen, setDoctorOpen] = useState(false);
  return (
    <div className="w-full sticky top-0 left-0 transition-all duration-200 ease-in-out shadow-xl shadow-slate-300 min-h-screen">
      <div className="w-full h-20 flex items-center">
        <img src={logo} alt="not found" style={{ width: 80 }} />
        <h1 className="font-semibold text-2xl text-slate-500">HotDoc</h1>
      </div>
      <Link to="/dashboard">
        <ListItem
          style={{
            backgroundColor:
              location.pathname === "/dashboard" ||
              location.pathname === "/dashboard/doctor_details"
                ? "#f8fafc"
                : "",
          }}
          icon={<BiHome size={18} />}
          label={"Dashboard"}
        />
      </Link>
      <Link to="doctors">
        <ListItem
          style={{
            backgroundColor:
              location.pathname === "/dashboard/doctors" ||
              location.pathname === "/dashboard/add_new_doctor"
                ? "#f8fafc"
                : "",
          }}
          icon={<FaUserDoctor size={18} />}
          label={"Doctors"}
        />
      </Link>
      <Link to="patients">
        <ListItem
          style={{
            backgroundColor:
              location.pathname === "/dashboard/patients" ||
              location.pathname === "/dashboard/add_patient"
                ? "#f8fafc"
                : "",
          }}
          icon={<FaWheelchair size={18} />}
          label={"Patients"}
        />
      </Link>
      <Link to="appointments">
        <ListItem
          style={{
            backgroundColor:
              location.pathname === "/dashboard/appointments" ||
              location.pathname === "/dashboard/add_appointment"
                ? "#f8fafc"
                : "",
          }}
          icon={<BiCalendar size={18} />}
          label={"Appointments"}
        />
      </Link>
      <Link to="articles">
        <ListItem
          style={{
            backgroundColor:
              location.pathname === "/dashboard/articles" ||
              location.pathname === "/dashboard/view_article"
                ? "#f8fafc"
                : "",
          }}
          icon={<BiReceipt size={18} />}
          label={"Articles"}
        />
      </Link>
      <Link to="blogs">
        <ListItem
          style={{
            backgroundColor:
              location.pathname === "/dashboard/blogs" ? "#f8fafc" : "",
          }}
          icon={<BiNotepad size={18} />}
          label={"Read Blogs"}
        />
      </Link>
    </div>
  );
}
