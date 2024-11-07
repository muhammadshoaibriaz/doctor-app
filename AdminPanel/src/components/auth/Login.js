import React, { useEffect, useState } from "react";
import img from "../../assets/images/logo.png";
import { LuEye } from "react-icons/lu";
import { FaSignInAlt } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!details.email || !details.password) {
      alert("Please enter your login credential to proceed!");
    } else {
      const response = await axios.post("http://localhost:4000/admin_login", {
        email: details.email,
        password: details.password,
      });
      if (response.status === 200) {
        navigate("/dashboard");
      } else {
        console.log("Invalid password!");
      }
    }
  };

  const [visible, setVisible] = useState(true);
  const togglePass = () => {
    setVisible(!visible);
  };

  useEffect(() => {}, []);
  return (
    <div className="flex w-full min-h-screen bg-slate-100 items-center justify-center absolute top-0 left-0 right-0 z-20">
      <div className="p-4 bg-white rounded-md w-2/6">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <img src={img} alt="not found" className="size-16 object-contain" />
            <h1 className="font-bold text-3xl text-slate-700">HotDoc</h1>
          </div>
          <h1 className="font-semibold text-slate-600">Welcome to HotDoc</h1>
          <p className="font-medium text-slate-500 mt-2 text-center">
            Enter your login credential to continue!{" "}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full mt-5 p-6">
          <label className="w-full bg-red-100 h-6">
            <p className="font-semibold text-slate-700">Email</p>
            <input
              placeholder="Enter you email"
              type="text"
              name="email"
              onChange={handleChange}
              className="w-full h-12 pl-3 border border-slate-200 rounded-md mt-2 mb-4 font-medium"
            />
          </label>
          <label className="w-full bg-red-100 h-6">
            <p className="font-semibold text-slate-700">Password</p>
            <div className="flex items-center overflow-hidden w-full h-12 border border-slate-200 rounded-md mt-2 mb-4">
              <input
                placeholder="Enter you password"
                name="password"
                type={visible ? "password" : "text"}
                onChange={handleChange}
                className="flex-1 pl-3 h-full rounded-lg font-medium outline-none"
              />
              <LuEye
                size={22}
                onClick={togglePass}
                className="mr-2 cursor-pointer text-slate-400 transition-all duration-500 hover:text-slate-600"
              />
            </div>
          </label>
          <button
            type="submit"
            className="flex items-center w-full bg-blue-950 rounded-md justify-center h-10"
          >
            <FaSignInAlt className="text-white" />{" "}
            <h3 className="font-semibold text-white ml-2">Login</h3>
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;

//
