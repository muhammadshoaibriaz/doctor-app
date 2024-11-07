import React, { useEffect, useState } from "react";
import "../../App.css";
import { FaUserEdit } from "react-icons/fa";
import { LuSearch, LuUserCheck } from "react-icons/lu";
import { color } from "../customstyles/Theme";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { Fa1 } from "react-icons/fa6";

export default function Doctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [pendingDoctor, setPendingDoctors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [viewPending, setViewPending] = useState(false);
  const [item, setItem] = useState(null);
  // console.log("filteredDoctors", filteredDoctors);
  const [data, setData] = useState({
    name: item?.name,
    specialist: item?.specialist,
    degree: item?.degree,
    phone_number: item?.phone_number,
    email: item?.email,
    city: item?.city,
    joining_date: item?.joining_date,
    dateOfBirth: item?.dateOfBirth,
    gender: item?.gender,
  });

  useEffect(() => {
    if (item) {
      setData({
        name: item?.name,
        specialist: item?.specialist,
        degree: item?.degree,
        phone_number: item?.phone_number,
        email: item?.email,
        city: item?.city,
        joining_date: item?.joining_date,
        dateOfBirth: item?.dateOfBirth,
        gender: item?.gender,
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSubmitData = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/doc/sign_up/${item?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        fetchItems();
      }
    } catch (error) {
      console.log("Error updating doctor!");
    }
  };

  useEffect(() => {
    fetchItems();
    getPendingDoctors();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/doc/get_doctors"
      );
      setDoctors(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleDelete = async (docId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/doc/sign_up/${docId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log("Doctor deleted successfully!");
        fetchItems();
      }
    } catch (err) {
      console.log("Error deleting doctor", err.message);
    }
  };

  const getPendingDoctors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/doc/pending_doctor",
        {
          params: { status: "pending" },
        }
      );
      setPendingDoctors(response.data);
      console.log("pending doctors are", response.data);
    } catch (error) {
      console.log("Error getting pending doctors request", error.message);
    }
  };

  const updateDoctorStatus = async (doctorId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/doc/sign_up/${doctorId}/status`,
        {
          status,
        }
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error while updating doctor approved  status ",
        error.message
      );
    }
  };

  return (
    <div className="bg-slate-20 p-5 w-full relative">
      {modalVisible && (
        <div className="fixed w-2/3 bg-white shadow-2xl rounded-md p-5">
          <div className="flex items-center h-10 ">
            <h2 className="font-medium text-xl mb-4">Edit doctor details</h2>
          </div>
          <div className="w-full flex flex-wrap justify-between">
            <label className="w-33 mt-3">
              <h1 className="font-medium text-sm mb-2">Name</h1>
              <input
                type="text"
                name="name"
                value={data.name}
                placeholder="Name"
                onChange={handleChange}
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33 mt-3">
              <h1 className="font-medium text-sm mb-2">Degree</h1>
              <input
                type="text"
                name="degree"
                value={data.degree}
                placeholder="M.B.B.S etc"
                onChange={handleChange}
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33 mt-3">
              <h1 className="font-medium text-sm mb-2">Phone No</h1>
              <input
                type="text"
                name="phone_number"
                value={data.phone_number}
                placeholder="+92 343 5465665"
                onChange={handleChange}
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33 mt-3">
              <h1 className="font-medium text-sm mb-2">Email</h1>
              <input
                type="email"
                name="email"
                value={data.email}
                placeholder="example@gmail.com"
                onChange={handleChange}
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33 mt-3">
              <h1 className="font-medium text-sm mb-2">City </h1>
              <input
                type="text"
                name="city"
                value={data.city}
                placeholder="City"
                onChange={handleChange}
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33 mt-3">
              <h1 className="font-medium text-sm mb-2">Joining Date</h1>
              <input
                type="text"
                name="joining_date"
                value={data.joining_date}
                onChange={handleChange}
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33 mt-3">
              <h1 className="font-medium text-sm mb-2">Gender</h1>
              <input
                type="text"
                name="gender"
                value={data.gender}
                placeholder="Male/Female/Other"
                onChange={handleChange}
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33 mt-3">
              <h1 className="font-medium text-sm mb-2">Date Of Birth</h1>
              <input
                type="date"
                name="dateOfBirth"
                value={data.dateOfBirth}
                placeholder="Feb 12 2001"
                onChange={handleChange}
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33 mt-3">
              <h1 className="font-medium text-sm mb-2">Other</h1>
              <input
                type="text"
                placeholder="Optional"
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
          </div>
          <div>
            <button
              className="save_btn"
              onClick={() => {
                handleSubmitData();
                setModalVisible(false);
              }}
            >
              Save
            </button>
            <button
              className="cancel_btn"
              onClick={() => setModalVisible(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {deleteModal && (
        <div className="fixed w-4/12 bg-white shadow-2xl rounded-md py-8 px-6 flex flex-col items-center justify-center">
          <RiDeleteBin6Line size={50} className="text-slate-500" />
          <h2 className="font-medium text-xl mb-4 mt-6">Delete doctor?</h2>
          <p className="font-medium text-slate-600 text-center text-sm">
            Are you sure you want to delete this doctor account. By confirming
            this doctor will not be able to login again and he will loss all his
            data like appointments, account balance etc.
          </p>
          <div className="flex w-1/2 justify-between mt-4">
            <button
              className="cancel_btn"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              className="save_btn"
              onClick={() => {
                handleDelete(item?._id);
                setDeleteModal(false);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      )}
      {viewPending && (
        <div className="fixed w-3/4 bg-white shadow-2xl rounded-md pb-6 px-6 z-10">
          <div className="flex items-center justify-between h-16 border-b border-slate-100 mb-4">
            <h1 className="float-start relative font-medium text-xl">
              Pending Request from doctors{" "}
            </h1>
            <CgClose
              size={20}
              onClick={() => setViewPending(false)}
              className="cursor-pointer duration-300 transition-all hover:text-slate-300"
            />
          </div>
          <table className="table">
            <thead>
              <tr className="border">
                <th className="border-l-1 border-l-slate-300">Name</th>
                <th className="border-l-1 border-l-slate-300">
                  Specialization
                </th>
                <th className="border-l-1 border-l-slate-300">Degree</th>
                <th className="border-l-1 border-l-slate-300">Mobile</th>
                <th className="border-l-1 border-l-slate-300">Email</th>
                <th className="border-l-1 border-l-slate-300">City</th>
                <th className="border-l-1 border-l-slate-300">Joining Date</th>
                <th className="border-l-1 border-l-slate-300">Action</th>
              </tr>
            </thead>
            {pendingDoctor
              ? pendingDoctor.map((item, index) => (
                  <tbody key={index}>
                    <tr>
                      <td
                        className="flex items-center pl-2"
                        onClick={() =>
                          navigate("/dashboard/doctor_details", {
                            state: { item },
                          })
                        }
                      >
                        <img
                          alt="not found"
                          src={`${item?.image}`}
                          className="w-10 h-10 rounded-full"
                        />
                        <h1 className="ml-2">{item?.name}</h1>
                      </td>
                      <td>{item?.specialist}</td>

                      <td>{item?.documents[0]?.title}</td>
                      <td>{item?.phone_number}</td>
                      <td>{item?.email}</td>
                      <td>{item?.city ? item?.city : "null"}</td>
                      <td>{item?.joining_date}</td>
                      <td>
                        <div className="flex items-center justify-center">
                          <button
                            className="text-xs px-2 py-1 bg-green-50 text-green-600 font-semibold rounded-sm hover:bg-green-600 hover:text-white transition-all duration-500"
                            onClick={() => {
                              updateDoctorStatus(item?._id, "accepted");
                              setViewPending(false);
                              getPendingDoctors();
                            }}
                          >
                            Approve
                          </button>
                          <button
                            className="text-xs px-2 py-1 bg-red-50 text-red-500 font-semibold ml-1 rounded-sm transition-all duration-500 hover:bg-red-600 hover:text-white"
                            onClick={() => {
                              updateDoctorStatus(item?._id, "rejected");
                              setViewPending(false);
                              getPendingDoctors();
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))
              : ""}
          </table>
        </div>
      )}
      <div className="bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center overflow-hidden border-b-gray-100 border-b-2 w-1/3 h-10 mb-4">
            <input
              placeholder="Search..."
              onChange={(text) => {
                const filtered = doctors.filter((doc) =>
                  doc.name
                    .toLowerCase()
                    .includes(text.target.value.toLowerCase())
                );
                setFilteredDoctors(filtered);
              }}
              className="w-11/12 outline-none border-none font-medium text-sm h-full text-slate-700"
            />
            <LuSearch color={color.light_color} />
          </div>
          <div className="flex items-center">
            <div
              className="w-10 h-10 relative rounded-full flex items-center justify-center mr-5 bg-slate-100 cursor-pointer"
              onClick={() =>
                pendingDoctor.length > 0 ? setViewPending(true) : null
              }
              style={{ display: pendingDoctor.length > 0 ? "flex" : "none" }}
            >
              <LuUserCheck size={20} style={{ color: color.light_color }} />
              <div className="flex items-center justify-center absolute w-5 -right-1 -top-1 h-5 rounded-full bg-blue-900">
                <p className="font-medium font-mono text-xs text-white">
                  {pendingDoctor?.length}
                </p>
              </div>
            </div>
            <Link to={"/dashboard/add_new_doctor"}>
              <div className="flex items-center float-end justify-center w-32 h-10 bg-blue-900 rounded cursor-pointer bottom-2">
                <h1 className="text-white font-medium">Add doctor</h1>
              </div>
            </Link>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr className="border">
              <th className="border-l-1 border-l-slate-300">Name</th>
              <th className="border-l-1 border-l-slate-300">Specialization</th>
              <th className="border-l-1 border-l-slate-300">Degree</th>
              <th className="border-l-1 border-l-slate-300">Mobile</th>
              <th className="border-l-1 border-l-slate-300">Email</th>
              <th className="border-l-1 border-l-slate-300">City</th>
              <th className="border-l-1 border-l-slate-300">Joining Date</th>
              <th className="border-l-1 border-l-slate-300">Action</th>
            </tr>
          </thead>
          {filteredDoctors.length > 0
            ? filteredDoctors.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td
                      className="flex items-center pl-2 cursor-pointer"
                      onClick={() =>
                        navigate("/dashboard/doctor_details", {
                          state: { item },
                        })
                      }
                    >
                      <img
                        alt="not found"
                        src={`${item?.image}`}
                        className="w-10 h-10 rounded-full"
                      />
                      <h1 className="ml-2">{item?.name}</h1>
                    </td>
                    <td>{item?.specialist}</td>

                    <td>{item?.documents[0]?.title}</td>
                    <td>{item?.phone_number}</td>
                    <td>{item?.email}</td>
                    <td>{item?.city ? item?.city : "null"}</td>
                    <td>{item?.joining_date}</td>
                    <td>
                      <div className="flex items-center justify-center">
                        <FaUserEdit
                          onClick={() => {
                            setItem(item);
                            setModalVisible(true);
                          }}
                          className="text-slate-400"
                          size={18}
                        />
                        <RiDeleteBin6Line
                          onClick={() => {
                            setItem(item);
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
            : doctors.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td
                      className="flex items-center pl-2 cursor-pointer"
                      onClick={() =>
                        navigate("/dashboard/doctor_details", {
                          state: { item },
                        })
                      }
                    >
                      <img
                        alt="not found"
                        src={`${item?.image}`}
                        className="w-10 h-10 rounded-full"
                      />
                      <h1 className="ml-2">{item?.name}</h1>
                    </td>
                    <td>{item?.specialist}</td>

                    <td>{item?.documents[0]?.title}</td>
                    <td>{item?.phone_number}</td>
                    <td>{item?.email}</td>
                    <td>{item?.city ? item?.city : "null"}</td>
                    <td>{item?.joining_date}</td>
                    <td>
                      <div className="flex items-center justify-center">
                        <FaUserEdit
                          onClick={() => {
                            setItem(item);
                            setModalVisible(true);
                          }}
                          className="text-slate-400"
                          size={18}
                        />
                        <RiDeleteBin6Line
                          onClick={() => {
                            setItem(item);
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
        <h1 className="mt-4 text-sm">Showing {doctors.length}</h1>
      </div>
    </div>
  );
}
