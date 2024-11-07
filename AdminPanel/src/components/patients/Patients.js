import React, { useEffect, useState } from "react";
import "../../App.css";
import { LuSearch } from "react-icons/lu";
import { color } from "../customstyles/Theme";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { FaEye, FaEyeSlash, FaUserEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import img from "../../assets/images/img.png";
export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [item, setItem] = useState(null);
  // console.log("item", item);
  useEffect(() => {
    fetchItems();
  }, []);
  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/users_profile"
      );
      setPatients(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const deletePatient = async (patientId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/user/${patientId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patients),
        }
      );
      if (response.status === 200) {
        console.log("Doctor deleted successfully!");
        fetchItems();
      }
    } catch (err) {
      console.log("Error deleting patient", err.message);
    }
  };

  const [viewDetails, setViewDetails] = useState(false);
  return (
    <div className="bg-slate-20 p-5 w-full">
      {viewDetails && (
        <div className="fixed w-3/5 rounded-sm shadow-2xl  bg-white p-6">
          <CgClose
            size={20}
            className="cursor-pointer absolute right-6 top-6 hover:text-slate-400"
            onClick={() => setViewDetails(false)}
          />
          <div className="border-b border-slate-100 h-10 flex items-center">
            <h1 className="font-medium mb-4 text-slate-600">
              Patient details!
            </h1>
          </div>
          <div className="flex items-center mt-2 h-20 ">
            <img
              src={item?.avatar}
              alt="not found"
              className="w-14 h-14 rounded-full"
            />
            <div className="ml-3">
              <h3 className="font-medium text-slate-600">
                Patient Name : {item?.username}
              </h3>
              <h3 className="font-medium text-slate-600">
                Email : {item?.email}{" "}
              </h3>
            </div>
          </div>
          <div className="flex item-center mt-3 flex-wrap">
            <h3 className="font-medium text-slate-600 w-1/2">
              Age: {item?.age}{" "}
            </h3>
            <h3 className="font-medium text-slate-600 w-1/2">
              Date of birth: {item?.chosenDate}{" "}
            </h3>
            <h3 className="font-medium text-slate-600 w-1/2">
              City: {item?.city}
            </h3>
            <h3 className="font-medium text-slate-600 w-1/2">
              Disease: {item?.disease}
            </h3>
            <h3 className="font-medium text-slate-600 w-1/2">
              Gender : {item?.gender}
            </h3>
            <h3 className="font-medium text-slate-600 w-1/2">
              Phone No : {item?.phone_number}
            </h3>
            <h3 className="font-medium text-slate-600 w-1/2">
              Joined : {item?.joined}
            </h3>
          </div>
        </div>
      )}
      {deleteModal && (
        <div className="fixed w-33 bg-white shadow-2xl rounded-md py-8 px-6 flex flex-col items-center justify-center">
          <RiDeleteBin6Line size={50} className="text-slate-500" />
          <h2 className="font-medium text-xl mb-4 mt-6">Delete patient?</h2>
          <p className="font-medium text-slate-600 text-center text-sm">
            Are you sure you want to delete this patient account. By confirming
            yes this patient will not be able to login again and he will loss
            all his data like prescription, appointments etc.
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
                deletePatient(item?._id);
                setDeleteModal(false);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      )}
      <div class="p-6 bg-white rounded-xl">
        <Link to={"/dashboard/add_patient"}>
          <div className="flex items-center float-end justify-center w-32 h-10 bg-blue-900 rounded cursor-pointer">
            <h1 className="text-white font-medium">Add Patient</h1>
          </div>
        </Link>
        <div className="flex items-center overflow-hidden border-b-gray-100 border-b-2 w-1/3 h-10 mb-4">
          <input
            placeholder="Search..."
            onChange={(text) => {
              const pt = patients.filter((pat) =>
                pat.username
                  .toLowerCase()
                  .includes(text.target.value.toLowerCase().trim())
              );
              setFilteredPatients(pt);
            }}
            className="w-11/12 outline-none border-none font-medium text-sm h-full text-slate-700"
          />
          <LuSearch color={color.light_color} />
        </div>
        <table className="table">
          <thead>
            <tr className="border">
              <th className="border-l-1 border-l-slate-300">Name</th>
              <th className="border-l-1 border-l-slate-300">Birth date</th>
              <th className="border-l-1 border-l-slate-300">Age</th>
              <th className="border-l-1 border-l-slate-300">Gender</th>
              <th className="border-l-1 border-l-slate-300">Blood Group</th>
              <th className="border-l-1 border-l-slate-300">Phone no</th>
              <th className="border-l-1 border-l-slate-300">Email</th>
              <th className="border-l-1 border-l-slate-300">Status</th>
              <th className="border-l-1 border-l-slate-300">Action</th>
            </tr>
          </thead>
          {filteredPatients.length > 0
            ? filteredPatients.map((item, index) => (
                <tbody>
                  <tr>
                    <td className="flex items-center pl-2">
                      <img
                        alt="not found"
                        src={item?.avatar}
                        className="w-10 h-10 rounded-full"
                      />
                      <h1
                        className="ml-2"
                        // style={{ color: item?.username ? "darkblue" : "black" }}
                      >
                        {item?.username}
                      </h1>
                    </td>
                    <td>{item?.chosenDate}</td>
                    <td>{item?.age}</td>
                    <td>{item?.gender}</td>
                    <td>{item?.blood}</td>
                    <td>{item?.phone_number}</td>
                    <td>{item?.email}</td>
                    <td className="px-2">
                      <p className="ph-1 py-1 w-auto bg-orange-50 text-xs text-orange-500 hover:text-white hover:bg-orange-500 transition-all duration-700">
                        {item?.status}
                      </p>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <FaEyeSlash
                          onClick={() => {
                            setItem(item);
                            setViewDetails(true);
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
            : patients.map((item, index) => (
                <tbody>
                  <tr>
                    <td className="flex items-center pl-2">
                      <img
                        alt="not found"
                        src={item?.avatar}
                        className="w-10 h-10 rounded-full"
                      />
                      <h1 className="ml-2">{item?.username}</h1>
                    </td>
                    <td>{item?.chosenDate}</td>
                    <td>{item?.age}</td>
                    <td>{item?.gender}</td>
                    <td>{item?.blood}</td>
                    <td>{item?.phone_number}</td>
                    <td>{item?.email}</td>
                    <td className="px-2">
                      <p className="ph-1 py-1 w-auto bg-orange-50 text-xs text-orange-500 hover:text-white hover:bg-orange-500 transition-all duration-700">
                        {item?.status}
                      </p>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <FaEyeSlash
                          onClick={() => {
                            setItem(item);
                            setViewDetails(true);
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
        <h1 className="mt-4 text-sm">Showing {patients.length}</h1>
      </div>
    </div>
  );
}
