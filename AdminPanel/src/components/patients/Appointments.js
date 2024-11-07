import React, { useEffect, useState } from "react";
import "../../App.css";
import { FaUserEdit } from "react-icons/fa";
import { LuCross, LuSearch } from "react-icons/lu";
import { color } from "../customstyles/Theme";
import { RiDeleteBin6Line, RiDeleteBin7Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import img from "../../assets/images/img.png";
import { CgClose } from "react-icons/cg";
import { FaEye } from "react-icons/fa6";
import { MdDelete, MdDeleteForever, MdDeleteSweep } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  // console.log("filteredAppointments", filteredAppointments);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/get_appointments"
      );
      setAppointments(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/appointments/${appointmentId}/status`,
        {
          status,
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating appointment status:", error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/appointments/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Appointment deleted successfully!");
      } else {
        console.log("Appointment not deleted successfully!");
      }
    } catch (error) {
      console.log("Error deleting appointment : ", error);
    }
  };

  return (
    <div className="bg-slate-20 p-5 w-full">
      {modalVisible && (
        <div className="fixed w-3/5 rounded-sm shadow-2xl  bg-white p-6">
          <CgClose
            size={20}
            className="cursor-pointer absolute right-6 top-6 hover:text-slate-400"
            onClick={() => setModalVisible(false)}
          />
          <div className="border-b border-slate-100 h-10 flex items-center">
            <h1 className="font-medium mb-4 text-slate-600">
              Appointment details!
            </h1>
          </div>
          <div className="flex items-center mt-2 h-20 ">
            <img
              src={appointmentDetails?.patient_image}
              alt="not found"
              className="w-14 h-14 rounded-full"
            />
            <div className="ml-3">
              <h3 className="font-medium text-slate-600">
                Patient Name : {appointmentDetails?.patient_name}
              </h3>
              <h3 className="font-medium text-slate-600">
                Disease : {appointmentDetails?.problem}{" "}
              </h3>
            </div>
          </div>
          <h3 className="font-medium text-slate-600 mt-3">
            Day: {appointmentDetails?.day}{" "}
          </h3>
          <h3 className="font-medium text-slate-600">
            Time: {appointmentDetails?.time}
          </h3>
          <h3 className="font-medium text-slate-600">
            Appointment with : {appointmentDetails?.doctor_name}
          </h3>
          <div className="w-80 justify-between flex mt-4">
            <button
              className="accepted px-6 py-1 bg-orange-200 rounded-sm"
              onClick={() => {
                updateAppointmentStatus(appointmentDetails?._id, "accepted");
                setModalVisible(false);
                fetchItems();
              }}
            >
              Accept
            </button>
            <button
              className="rejected px-6 py-1 bg-orange-200 rounded-sm"
              onClick={() => {
                updateAppointmentStatus(appointmentDetails?._id, "rejected");
                setModalVisible(false);
                fetchItems();
              }}
            >
              Reject
            </button>
            <button
              className="done px-6 py-1 bg-orange-200 rounded-sm"
              onClick={() => {
                updateAppointmentStatus(appointmentDetails?._id, "done");
                setModalVisible(false);
                fetchItems();
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
      {deleteModal && (
        <div className="fixed w-96 rounded-sm shadow-2xl  bg-white p-6">
          <h1 className="font-medium mb-4 text-slate-600">
            Delete appointment?
          </h1>
          <div className="flex items-center mt-2">
            <img
              src={appointmentDetails?.patient_image}
              alt="not found"
              className="w-14 h-14 rounded-full"
            />
            <div className="ml-3">
              <h3 className="font-medium text-slate-600">
                Patient Name : {appointmentDetails?.patient_name}
              </h3>
              <h3 className="font-medium text-slate-600">
                Disease : {appointmentDetails?.problem}{" "}
              </h3>
            </div>
          </div>
          <div className="w-1/5 justify-between flex mt-4">
            <button
              className="cancel_btn px-6 py-1 rounded-sm"
              onClick={() => {
                handleDelete(appointmentDetails?._id);
                fetchItems();
                setDeleteModal(false);
              }}
            >
              Delete
            </button>
            <button
              className="save_btn px-6 py-1 rounded-sm"
              onClick={() => {
                setDeleteModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div class="p-6 bg-white rounded-lg">
        <Link to={"/dashboard/add_appointment"}>
          <div className="flex items-center float-end justify-center w-44 h-10 bg-blue-900 rounded cursor-pointer">
            <h1 className="text-white font-medium">Add Appointment</h1>
          </div>
        </Link>
        <div className="flex items-center overflow-hidden border-b-gray-100 border-b-2 w-1/3 h-10 mb-4">
          <input
            placeholder="Search..."
            onChange={(text) => {
              const apt = appointments.filter((apt) =>
                apt.patient_name
                  .toLowerCase()
                  .includes(text.target.value.toLowerCase())
              );
              setFilteredAppointments(apt);
            }}
            className="w-11/12 outline-none border-none font-medium text-sm h-full text-slate-700"
          />
          <LuSearch
            color={color.light_color}
            onClick={() => setModalVisible(true)}
          />
        </div>
        <table className="table">
          <thead>
            <tr className="border">
              <th className="border-l-1 border-l-slate-300">Name</th>
              <th className="border-l-1 border-l-slate-300">Dr Assigned</th>
              <th className="border-l-1 border-l-slate-300">Phone No</th>
              <th className="border-l-1 border-l-slate-300">Email</th>
              <th className="border-l-1 border-l-slate-300">Date</th>
              <th className="border-l-1 border-l-slate-300">Time</th>
              <th className="border-l-1 border-l-slate-300">Status</th>
              <th className="border-l-1 border-l-slate-300">Action</th>
            </tr>
          </thead>
          {filteredAppointments.length > 0
            ? filteredAppointments.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td className="flex items-center pl-2">
                      <img
                        src={item?.patient_image}
                        alt="not found!"
                        className="w-10 h-10 rounded-full bg-red-300"
                      />
                      <h1 className="ml-2">{item?.patient_name}</h1>
                    </td>
                    <td>{item?.doctor_name}</td>
                    <td>{item?.phoneNumber}</td>
                    <td>{item?.email}</td>
                    <td>{item?.day}</td>
                    <td className="uppercase">{item?.time}</td>
                    <td>
                      <p
                        style={{
                          marginHorizontal: 20,
                          padding: 2,
                          margin: 10,
                          borderRadius: 4,
                          color:
                            item?.status === "accepted"
                              ? color.tomato
                              : item?.status === "rejected"
                              ? color.red
                              : item?.status === "done"
                              ? color.green
                              : item?.status === "pending"
                              ? color.blue
                              : "",
                          background:
                            item?.status === "accepted"
                              ? color.light_tomato
                              : item?.status === "rejected"
                              ? color.light_red
                              : item?.status === "done"
                              ? color.light_green
                              : color.light_tomato
                              ? color.light_blue
                              : "",
                        }}
                      >
                        {item?.status}
                      </p>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <FaEye
                          onClick={() => {
                            setAppointmentDetails(item);
                            setModalVisible(true);
                          }}
                          className="text-slate-400"
                          size={18}
                        />
                        <RiDeleteBin6Line
                          onClick={() => {
                            setAppointmentDetails(item);
                            setDeleteModal(true);
                          }}
                          className="text-red-500"
                          size={18}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))
            : appointments.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td className="flex items-center pl-2">
                      <img
                        src={item?.patient_image}
                        alt="not found!"
                        className="w-10 h-10 rounded-full bg-red-300"
                      />
                      <h1 className="ml-2">{item?.patient_name}</h1>
                    </td>
                    <td>{item?.doctor_name}</td>
                    <td>{item?.phoneNumber}</td>
                    <td>{item?.email}</td>
                    <td>{item?.day}</td>
                    <td className="uppercase">{item?.time}</td>
                    <td>
                      <p
                        style={{
                          marginHorizontal: 20,
                          padding: 2,
                          margin: 10,
                          borderRadius: 4,
                          color:
                            item?.status === "accepted"
                              ? color.tomato
                              : item?.status === "rejected"
                              ? color.red
                              : item?.status === "done"
                              ? color.green
                              : item?.status === "pending"
                              ? color.blue
                              : "",
                          background:
                            item?.status === "accepted"
                              ? color.light_tomato
                              : item?.status === "rejected"
                              ? color.light_red
                              : item?.status === "done"
                              ? color.light_green
                              : color.light_tomato
                              ? color.light_blue
                              : "",
                        }}
                      >
                        {item?.status}
                      </p>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <FaUserEdit
                          onClick={() => {
                            setAppointmentDetails(item);
                            setModalVisible(true);
                          }}
                          className="text-slate-400"
                          size={18}
                        />
                        <RiDeleteBin6Line
                          onClick={() => {
                            setAppointmentDetails(item);
                            setDeleteModal(true);
                          }}
                          className="text-red-500"
                          size={18}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
        </table>
        <h1 className="mt-4 text-sm">Showing {appointments.length}</h1>
      </div>
    </div>
  );
}
