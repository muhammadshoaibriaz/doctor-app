import React, { useEffect, useState } from "react";
import {
  FaBedPulse,
  FaUserDoctor,
  FaReceipt,
  FaCableCar,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa6";
import img from "../../assets/images/pexels-shkrabaanthony-5215024.jpeg";
import { Button } from "../customstyles/IconBtn";
import { color } from "../customstyles/Theme";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Chart from "apexcharts";
import { LineChart } from "recharts";
import { LiaUser, LiaUserCheckSolid } from "react-icons/lia";

export default function DashContent() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [recent, setRecent] = useState([]);
  // console.log("recent", recent);
  const current_date = new Date().toDateString();
  useEffect(() => {
    getDoctors();
    getPatient();
    getAppointments();
  }, []);

  const getDoctors = async () => {
    const response = await axios.get(
      "http://localhost:4000/api/doc/get_doctors"
    );
    setDoctors(response.data);
    // console.log(response.data);
  };
  const getPatient = async () => {
    const response = await axios.get("http://localhost:4000/api/users_profile");
    setPatients(response.data);
    // console.log(response.data);
    const patients = response.data;
    patients.filter((patient) =>
      patient?.joined === current_date ? setRecent(patient) : null
    );
  };
  const getAppointments = async () => {
    const response = await axios.get(
      "http://localhost:4000/api/get_appointments"
    );
    setAppointments(response.data);
    // console.log(response.data);
  };

  return (
    <div>
      <div className="w-full p-5 rounded-md">
        <div className="flex justify-between flex-wrap">
          <div class="welcome_container w-49 bg-blue-950 p-5 rounded-lg max-h-80">
            <h1 className="text-white font-semibold text-4xl mb-2">
              Welcome To HotDoc <span className="text-orange-600">Admin</span>{" "}
              Section
            </h1>
            <p className="text-white font-medium text-lg mb-2">
              You can manage user and doctor appointments edit or delete them.
              You can add patients, delete doctors, accept or reject patient
              appointments request.
            </p>
            <button className="w-32 h-10 bg-orange-600 font-medium rounded-md mt-2 text-white hover:brightness-110 focus:bg-red-500">
              Read more
            </button>
          </div>
          <div class="details_card w-49 flex justify-between flex-wrap">
            <div className="w-48 bg-white flex flex-col items-center justify-center rounded-xl h-40 mb-4">
              <div class="flex items-center justify-center w-16 h-16 rounded-full bg-red-400">
                <FaBedPulse color="#fff" size={30} />
              </div>
              <h2 className="card_title font-medium mt-2">
                {patients?.length} Patients
              </h2>
              <p className="card_text font-medium text-slate-500 text-sm">
                Total Patients
              </p>
            </div>
            <div className="w-48 bg-white flex flex-col items-center justify-center rounded-xl h-40 mb-4">
              <div class="flex items-center justify-center w-16 h-16 rounded-full bg-green-600">
                <FaUserDoctor color="#fff" size={30} />
              </div>
              <h2 className="card_title font-medium mt-2">
                {doctors?.length} Doctors{" "}
              </h2>
              <p className="card_text font-medium text-slate-500 text-sm">
                Available Doctors
              </p>
            </div>
            <div className="w-48 bg-white flex flex-col items-center justify-center rounded-xl h-40 mb-4">
              <div class="flex items-center justify-center w-16 h-16 rounded-full bg-orange-400">
                <FaReceipt color="#fff" size={30} />
              </div>
              <h2 className="card_title font-medium mt-2">
                {appointments?.length} total
              </h2>
              <p className="card_text font-medium text-slate-500 text-sm">
                Appointments booked
              </p>
            </div>
            <div className="w-48 bg-white flex flex-col items-center justify-center rounded-xl h-40 mb-4">
              <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-400">
                <LiaUserCheckSolid color="#fff" size={30} />
              </div>
              <h2 className="card_title font-medium mt-2">
                {patients?.length + doctors?.length} Users{" "}
              </h2>
              <p className="card_text font-medium text-slate-500 text-sm">
                Total user
              </p>
            </div>
          </div>
        </div>
        <div className="p-5 rounded-lg bg-white w-full -z-10">
          <h1 className="font-semibold text-2xl mb-5">Hospital Survay</h1>
        </div>
        <div className="flex justify-between flex-wrap w-full mt-5 dashboard_bottom">
          <div className="recent_patient w-40 bg-white rounded-lg">
            <div class="h-16 flex items-center px-6 border-b border-slate-200 ">
              <h1 className="font-medium text-xl">Recent Patient</h1>
            </div>
            <div class="max-h-96 overflow-scroll">
              {patients &&
                patients.reverse().map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full h-14 items-center px-5 border-b border-slate-100 hover:bg-slate-50"
                  >
                    <img
                      alt="not found"
                      src={item?.avatar}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        background: "#eee",
                        objectFit: "cover",
                      }}
                    ></img>
                    <div className="flex items-center justify-between flex-1 ml-2">
                      <div class="name">
                        <h1 className="font-medium text-sm">
                          {item?.username}
                        </h1>
                        <p className="text-xs">{item?.age} years old</p>
                      </div>
                      <button className="rounded-md bg-orange-100 px-3 py-1 font-medium text-xs text-orange-500 hover:bg-orange-400 transition-all duration-500 hover:text-white">
                        {item?.status}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="top_rated_doc w-58 bg-white rounded-lg relative">
            <div class="h-16 flex items-center border-b border-slate-200 pl-6">
              <h1 className="font-medium text-xl">Top Rated Doctors</h1>
            </div>
            <div className="flex items-center overflow-x-scroll px-10 py-5">
              {doctors.map((item, index) => (
                <div
                  onClick={() =>
                    navigate("/dashboard/doctor_details", { state: { item } })
                  }
                  key={index}
                  className="min-w-60 mr-4 p-3 flex flex-col items-center justify-center h-80 border border-slate-100 rounded-lg text-center"
                >
                  <img
                    src={item?.image}
                    alt="not found"
                    className="w-32 h-32 object-cover rounded-xl"
                  />
                  <h1 className="font-medium mt-2 ">{item?.name}</h1>
                  <h4 className="font-medium text-slate-500 text-sm">
                    {item?.specialist}
                  </h4>
                  <p className="font-medium text-xs mt-1 text-gray-400">
                    {item?.city} Street 7, Punjab Pakistan
                  </p>
                  <div class="w-2/3 mt-4 flex justify-between items-center">
                    <Button
                      icon={<FaFacebookF color={color.light_color} size={16} />}
                    ></Button>
                    <Button
                      icon={
                        <FaLinkedinIn color={color.light_color} size={16} />
                      }
                    ></Button>
                    <Button
                      icon={<FaTwitter color={color.light_color} size={16} />}
                    ></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
