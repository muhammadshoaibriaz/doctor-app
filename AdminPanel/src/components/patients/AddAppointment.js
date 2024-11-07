import React from "react";
export default function AddAppointment() {
  return (
    <div className="bg-slate-20 p-5 w-full relative">
      <div className="px-5 py-5 bg-white rounded-lg">
        <div className="border-slate-200 min-h-12 flex items-center h-10 border-b">
          <h1 className="text-2xl font-normal">Personal Information</h1>
        </div>
        <div className="flex items-center justify-between w-full flex-wrap">
          <label className="w-33 mt-3">
            <h1 className="font-medium text-sm mb-2">Patient name</h1>
            <input
              type="text"
              placeholder="First Name"
              className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
            />
          </label>
          <label className="w-33 mt-3">
            <h1 className="font-medium text-sm mb-2">Last Name</h1>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
            />
          </label>
          <label className="w-33 mt-3">
            <h1 className="font-medium text-sm mb-2">Date Of Birth</h1>
            <input
              placeholder="Date of birth"
              type="date"
              className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
            />
          </label>
          <label className="w-33">
            <h1 className="font-medium text-sm mb-2">Gender</h1>
            <select
              value={"Male"}
              className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
            >
              <option value={"Male"}>Male</option>
              <option value={"FeMale"}>FeMale</option>
              <option value={"Other"}>Other</option>
            </select>
          </label>
          <label className="w-33">
            <h1 className="font-medium text-sm mb-2">Profile image</h1>
            <input
              placeholder="Date of birth"
              type="file"
              className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
            />
          </label>
          <label className="w-33">
            <h1 className="font-medium text-sm mb-2">Education</h1>
            <input
              placeholder="Enter education"
              type="text"
              className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
            />
          </label>
          <label className="w-33">
            <h1 className="font-medium text-sm mb-2">Designation</h1>
            <select
              value={"Male"}
              className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
            >
              <option value={"Male"}>Male</option>
              <option value={"FeMale"}>FeMale</option>
              <option value={"Other"}>Other</option>
            </select>
          </label>
          <label className="w-33">
            <h1 className="font-medium text-sm mb-2">Department</h1>
            <select
              value={"Male"}
              className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
            >
              <option value={"Male"}>Male</option>
              <option value={"FeMale"}>FeMale</option>
              <option value={"Other"}>Other</option>
            </select>
          </label>
          <label className="w-33">
            <h1 className="font-medium text-sm mb-2">Website url</h1>
            <input
              placeholder="Date of birth"
              type="file"
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
            <h1 className="text-2xl font-normal">Doctor Account Info</h1>
          </div>
          <div className="flex items-center justify-between w-full flex-wrap">
            <label className="w-full mt-3">
              <h1 className="font-medium text-sm mb-2">Email</h1>
              <input
                type="text"
                placeholder="shoaibriaze@gmail.com"
                className="w-full h-10 rounded-md text-sm mb-3 pl-2 border border-slate-200"
              />
            </label>
            <label className="w-full mt-3">
              <h1 className="font-medium text-sm mb-2">Phone</h1>
              <input
                type="text"
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
            <button className="save_btn">Save</button>
            <button className="cancel_btn">Cancel</button>
          </div>
        </div>
        <div
          className="px-5 py-5 bg-white rounded-lg mt-6"
          style={{ width: "49%" }}
        >
          <div className="border-slate-200 min-h-12 flex items-center h-10 border-b">
            <h1 className="text-2xl font-normal">Doctor Social Media Info</h1>
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
            <button className="save_btn">Save</button>
            <button className="cancel_btn">Cancel</button>
          </div>
        </div>
      </div>
      <div className="flex bottom-0 items-center justify-center w-full h-12 mt-5">
        Copyright 2024-25 © HotDoc All rights reserved.
      </div>
    </div>
  );
}
