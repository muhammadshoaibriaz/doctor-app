import React, { useState, useEffect } from "react";
import axios from "axios";
export default function AddNewDoctor() {
  const [specialist, setSpecialist] = useState([]);
  const [department, setDepartment] = useState("Neurologist");
  const [gender1, setGender1] = useState("");
  // console.log(department);
  const date = new Date();
  const joining_date = date.toDateString();
  useEffect(() => {
    getSpecialist();
  }, []);

  const onChangeGender = (event) => {
    setGender1(event.target.value);
    // console.log(event.target.value)
  };
  const onChangeDepartment = (event) => {
    setDepartment(event.target.value);
  };
  const getSpecialist = async () => {
    await fetch("http://localhost:4000/specialist")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setSpecialist(data);
      });
  };

  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone_number: "",
    specialist: "",
    degree: "",
    workingSince: "",
    department: department,
    image: "",
    videoCallFee: "",
    city: "",
    gender: gender1,
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setDetails((pre) => {
      return { ...pre, gender: gender1, joining_date, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/doc/sign_up",
        details
      );
      if (response.status === 200) {
        console.log("Doctor created successfully!");
      }
      response.status(500).send({ message: "Error creating doctor!" });
    } catch (error) {
      console.log("Error while creating doctor account ", error.message);
    }
  };

  return (
    <div className="bg-slate-20 p-5 w-full relative">
      <form onSubmit={handleSubmit}>
        <div className="px-5 py-5 bg-white rounded-lg">
          <div className="border-slate-200 min-h-12 flex items-center h-10 border-b">
            <h1 className="text-2xl font-normal">Personal Information</h1>
          </div>

          <div className="flex items-center justify-between w-full flex-wrap">
            <label className="w-33 mt-3">
              <h1 className="font-medium text-sm mb-2">Dr Name</h1>
              <input
                name="name"
                type="text"
                onChange={handleInput}
                placeholder="Shabii"
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33 mt-3">
              <h1 className="font-medium text-sm mb-2">Specialization</h1>
              <input
                name="specialist"
                onChange={handleInput}
                type="text"
                placeholder="Dentist"
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33 mt-3">
              <h1 className="font-medium text-sm mb-2">City</h1>
              <input
                name="city"
                onChange={handleInput}
                placeholder="Lahore"
                type="text"
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33">
              <h1 className="font-medium text-sm mb-2">Gender</h1>
              <select
                name="gender"
                value={gender1}
                onChange={onChangeGender}
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              >
                <option value={"Male"}>Male</option>
                <option value={"FeMale"}>FeMale</option>
                <option value={"Other"}>Other</option>
              </select>
            </label>
            <label className="w-33">
              <h1 className="font-medium text-sm mb-2">Degree</h1>
              <input
                name="degree"
                onChange={handleInput}
                placeholder="M.B.B.S"
                type="text"
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33">
              <h1 className="font-medium text-sm mb-2">Experience</h1>
              <input
                name="workingSince"
                placeholder="3+ years"
                onChange={handleInput}
                type="text"
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33">
              <h1 className="font-medium text-sm mb-2">Department</h1>
              <select
                value={department}
                onChange={onChangeDepartment}
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              >
                {specialist.map((item, index) => (
                  <option value={`${item.specialist}`}>
                    {item?.specialist}
                  </option>
                ))}
              </select>
            </label>
            <label className="w-33">
              <h1 className="font-medium text-sm mb-2">Appointment Fees</h1>
              <input
                name="videoCallFee"
                onChange={handleInput}
                placeholder="2500/2000 etc"
                type="number"
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-33">
              <h1 className="font-medium text-sm mb-2">Profile image</h1>
              <input
                // name="image"
                placeholder="Profile image"
                type="file"
                // onChange={handleInput}
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
          </div>
          <div className="flex w-1/5 items-center justify-between">
            <button type="button" className="save_btn">
              Save
            </button>
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
              <h1 className="text-2xl font-normal">Doctor Account Info </h1>
            </div>
            <div className="flex items-center justify-between w-full flex-wrap">
              <label className="w-full mt-3">
                <h1 className="font-medium text-sm mb-2">Email</h1>
                <input
                  type="text"
                  name="email"
                  onChange={handleInput}
                  placeholder="shoaibriaze@gmail.com"
                  className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
                />
              </label>
              <label className="w-full mt-3">
                <h1 className="font-medium text-sm mb-2">Phone</h1>
                <input
                  type="text"
                  name="phone_number"
                  onChange={handleInput}
                  placeholder="+92 324 8052718"
                  className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
                />
              </label>
              <label className="w-full mt-3">
                <h1 className="font-medium text-sm mb-2">Password</h1>
                <input
                  placeholder="Password"
                  type="password"
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
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="save_btn"
              >
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
                Doctor Social Media Info{" "}
                <p className="text-slate-400 text-sm ml-2">(Optional)</p>
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
                  type="password"
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
              <button type="button" className="save_btn">
                Save
              </button>
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
