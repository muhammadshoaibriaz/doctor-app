import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AddPatient() {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [details, setDetails] = useState({
    username: "",
    password: "",
    email: "",
    phone_number: "",
    avatar: "",
    city: "",
    blood: "",
    age: "",
    chosenDate: "",
    status: "pending",
  });

  const joined = new Date().toDateString();

  const handleOnChange = (event) => {
    setGender(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "avatar" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDetails((prevDetails) => ({
          ...prevDetails,
          avatar: reader.result,
          gender,
          joined,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setDetails((prevDetails) => {
        return { ...prevDetails, gender, joined, [name]: value };
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/user", details);

      if (res.status === 200) {
        alert("Patient added!");
        navigate("/dashboard/patients");
      }
    } catch (err) {
      console.log("Error creating user", err.message);
      alert("Error adding patient ", err.message);
    }
  };

  return (
    <div className="bg-slate-20 p-5 w-full relative">
      <form onSubmit={onSubmit}>
        <div className="px-5 py-5 bg-white rounded-lg">
          <div className="border-slate-200 min-h-12 flex items-center h-10 border-b">
            <h1 className="text-2xl font-normal">Personal Information</h1>
          </div>
          <div className="flex items-center justify-between w-full flex-wrap">
            <label className="w-33 mt-3">
              <h1 className="font-medium text-sm mb-2">Patient Name</h1>
              <input
                type="text"
                onChange={handleChange}
                name="username"
                placeholder="Emily Chen"
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33">
              <h1 className="font-medium text-sm mb-2">Age</h1>
              <input
                onChange={handleChange}
                name="age"
                placeholder="18"
                className="w-full h-10 rounded-md text-sm pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33 mt-3">
              <h1 className="font-medium text-sm mb-2">Date Of Birth</h1>
              <input
                type="date"
                onChange={handleChange}
                name="chosenDate"
                placeholder="Date of birth"
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33">
              <h1 className="font-medium text-sm mb-2">Gender</h1>
              <select
                value={gender}
                name="gender"
                onChange={handleOnChange}
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              >
                <option value="Male">Male</option>
                <option value="FeMale">FeMale</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="w-33">
              <h1 className="font-medium text-sm mb-2">Disease</h1>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Fever"
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33">
              <h1 className="font-medium text-sm mb-2">City</h1>
              <input
                type="text"
                placeholder="Khanewal"
                onChange={handleChange}
                name="city"
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33">
              <h1 className="font-medium text-sm mb-2">Blood Group</h1>
              <input
                placeholder="A+"
                name="blood"
                onChange={handleChange}
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />{" "}
            </label>
            <label className="w-33">
              <h1 className="font-medium text-sm mb-2">Joining date</h1>
              <input
                onClick={() => alert("This field is automatically updated!")}
                placeholder="Mar 12 2024"
                type="text"
                name="joined"
                onChange={handleChange}
                readOnly={true}
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33">
              <h1 className="font-medium text-sm mb-2">Profile image</h1>
              <input
                type="file"
                onChange={handleChange}
                name="avatar"
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
          </div>
          <div className="flex w-1/5 items-center justify-between">
            <button className="save_btn">Save</button>
            <button className="cancel_btn">Cancel</button>
          </div>
        </div>

        {/* Social links */}

        <div className="flex flex-wrap justify-between">
          <div
            className="px-5 py-5 bg-white rounded-lg mt-6"
            style={{ width: "49%" }}
          >
            <div className="border-slate-200 min-h-12 flex items-center h-10 border-b">
              <h1 className="text-2xl font-normal">Patient Account Info</h1>
            </div>
            <div className="flex items-center justify-between w-full flex-wrap">
              <label className="w-full mt-3">
                <h1 className="font-medium text-sm mb-2">Email</h1>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  placeholder="shoaibriaze@gmail.com"
                  className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
                />
              </label>
              <label className="w-full mt-3">
                <h1 className="font-medium text-sm mb-2">Phone</h1>
                <input
                  type="text"
                  name="phone_number"
                  onChange={handleChange}
                  placeholder="+92 324 8052718"
                  className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
                />
              </label>
              <label className="w-full mt-3">
                <h1 className="font-medium text-sm mb-2">Password</h1>
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
                />
              </label>
              <label className="w-full mt-3">
                <h1 className="font-medium text-sm mb-2">Confirm Password</h1>
                <input
                  placeholder="Confirm Password"
                  type="password"
                  className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
                />
              </label>
            </div>
            <div
              className="flex items-center justify-between"
              style={{ width: "43%" }}
            >
              <button type="submit" className="save_btn">
                Save
              </button>
              <button className="cancel_btn">Cancel</button>
            </div>
          </div>
          <div
            className="px-5 py-5 bg-white rounded-lg mt-6"
            style={{ width: "49%" }}
          >
            <div className="border-slate-200 min-h-12 flex items-center h-10 border-b">
              <h1 className="text-2xl font-normal flex items-center">
                Patient Social Media Info{" "}
                <p className="text-sm font-medium text-slate-400 ml-2">
                  (Optional)
                </p>{" "}
              </h1>
            </div>
            <div className="flex items-center justify-between w-full flex-wrap">
              <label className="w-full mt-3">
                <h1 className="font-medium text-sm mb-2">Facebook URL</h1>
                <input
                  type="text"
                  placeholder="http://www.facebook.com/"
                  className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
                />
              </label>
              <label className="w-full mt-3">
                <h1 className="font-medium text-sm mb-2">Twitter URL</h1>
                <input
                  type="text"
                  placeholder="http://www.twitter.com/"
                  className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
                />
              </label>
              <label className="w-full mt-3">
                <h1 className="font-medium text-sm mb-2">Instagram URL</h1>
                <input
                  placeholder="http://www.instagram.com/"
                  name="password"
                  className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
                />
              </label>
              <label className="w-full mt-3">
                <h1 className="font-medium text-sm mb-2">Google Plus URL</h1>
                <input
                  placeholder="http://www.plus.google.com"
                  type="password"
                  className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
                />
              </label>
            </div>
            <div
              className="flex items-center justify-between"
              style={{ width: "43%" }}
            >
              <button className="save_btn">Save</button>
              <button className="cancel_btn">Cancel</button>
            </div>
          </div>
        </div>
      </form>
      <div className="flex bottom-0 items-center justify-center w-full h-12 mt-5">
        Copyright 2024-25 © HotDoc All rights reserved.
      </div>
    </div>
  );
}
