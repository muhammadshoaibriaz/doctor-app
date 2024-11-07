import React, { useEffect, useState } from "react";
import user_img from "../../assets/images/img.png";
import { LiaUserInjuredSolid } from "react-icons/lia";
import { color } from "../customstyles/Theme";
import ReviewsCard from "../views/ReviewsCard";

import img from "../../assets/images/pexels-cottonbro-5722163.jpeg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BsReceiptCutoff } from "react-icons/bs";
import { MdOutlineReviews } from "react-icons/md";

export default function DoctorDetails() {
  const location = useLocation();
  const [reviews, setReviews] = useState([]);
  const [docAppointments, setDocAppointments] = useState([]);
  const { state } = location;
  // console.log(state);
  useEffect(() => {
    getReviews();
    getDocAppointments();
  }, []);

  const getReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/doc/reviews/${state.item._id}`
      );
      console.log(response.data);
      setReviews(response.data);
    } catch (error) {
      console.log("Error getting ", error.message);
    }
  };

  const getDocAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/doc/sign_up/${state.item._id}`
      );
      console.log("Doc appointments", response.data);
      setDocAppointments(response.data);
    } catch (err) {
      console.log("Error getting doctor appointments ", err.message);
    }
  };
  const currentDate = new Date().toDateString();
  // console.log(currentDate);

  return (
    <div className="w-full p-5 rounded-lg">
      <div className="w-full p-6 bg-white rounded-lg">
        <div className="flex items-center border-b border-b-slate-100 pb-6">
          <img
            alt="not found"
            src={state.item?.image}
            className="w-44 h-44 rounded-xl object-cover"
          />
          <div className="ml-6">
            <h4 className="font-medium">Hello I,</h4>
            <h2 className="font-semibold text-xl">{state.item.name}</h2>
            <p className="font-medium text-sm text-slate-500 mt-1 mb-1">
              {state.item.degree}
            </p>
            <p className="font-medium">
              {currentDate.slice(10, 15) - state.item.workingSince} years of
              overall
            </p>
            <div>☆☆☆☆☆</div>
            <p>{reviews.length} reviews</p>
          </div>
        </div>
        <div className="flex items-center w-full justify-between mt-6">
          <div
            className={
              "flex flex-col items-center justify-center w-33 h-60 bg-red-50 rounded-lg"
            }
          >
            <div className="w-24 h-24 flex items-center justify-center mb-3 rounded-full bg-red-200">
              <LiaUserInjuredSolid size={60} color={color.red} />
            </div>
            <h1 className="font-semibold text-2xl">{docAppointments.length}</h1>
            <p className="font-medium text-slate-500">Patients</p>
          </div>
          <div
            className={
              "flex flex-col items-center justify-center w-33 h-60 bg-green-50 rounded-lg"
            }
          >
            <div className="w-24 h-24 flex items-center justify-center mb-3 rounded-full bg-green-200">
              <BsReceiptCutoff size={40} color={color.green} />
            </div>
            <h1 className="font-semibold text-2xl">{docAppointments.length}</h1>
            <p className="font-medium text-slate-500">Appointments</p>
          </div>
          <div
            className={
              "flex flex-col items-center justify-center w-33 h-60 bg-orange-50 rounded-lg"
            }
          >
            <div className="w-24 h-24 flex items-center justify-center mb-3 rounded-full bg-orange-200">
              <MdOutlineReviews size={40} color={color.tomato} />
            </div>
            <h1 className="font-semibold text-2xl">{reviews.length}+</h1>
            <p className="font-medium text-slate-500">Reviews</p>
          </div>
        </div>
        <div className="flex mt-12">
          <div className="w-3/4 border-r border-slate-200">
            <div className="w-full pr-2">
              <h1 className="text-xl font-semibold">Biography</h1>
              <p className="text-slate-600 font-medium text-md mt-5">
                {state.item.bio}
              </p>
              <div className="flex items-center">
                <p className="text-slate-800 font-semibold text-md mt-5">
                  Specialized in{" "}
                </p>
                <p className="text-slate-600 font-medium text-sm mt-5 ml-1">
                  {" "}
                  {state.item.specialist}
                </p>
              </div>
            </div>
            <h1 className="text-xl font-semibold mt-14">
              Patient Reviews ({reviews.length}){" "}
            </h1>
            {reviews.map((item, index) => {
              console.log("item", item);
              return (
                <ReviewsCard
                  image={item?.patientImg}
                  recommended={"Recommended the doctor"}
                  senderName={item.patientName}
                  review={item.review}
                />
              );
            })}
          </div>
          <div className="w-1/4 p-3 bg-slate-50 border border-slate-100 max-h-fit ml-1">
            <div>
              <h4 className="font-medium mb-3">Days Available</h4>
              {state.item.availability.map((item, index) => {
                // console.log(item);
                return (
                  <p className="text-slate-600 text-sm mb-2">
                    {item} - {state.item.timing} to {state.item.ending}
                  </p>
                );
              })}
              {/* <p className="text-slate-600 text-sm mb-2">Tue - 08:AM to 10PM</p>
              <p className="text-slate-600 text-sm mb-2">Wed - 08:AM to 10PM</p>
              <p className="text-slate-600 text-sm mb-2">Thu - 08:AM to 10PM</p>
              <p className="text-slate-600 text-sm mb-2">Fri - 08:AM to 10PM</p>
              <p className="text-slate-600 text-sm mb-2">Sat - 08:AM to 10PM</p>
              <p className="text-slate-600 text-sm mb-2">Sun - 08:AM to 10PM</p> */}
            </div>
            <h4 className="font-medium mb-3 mt-8">Documents</h4>
            <div className="flex items-center flex-wrap w-full">
              {state.item.documents.map((item, index) => {
                console.log(item);
                return (
                  <div className="flex flex-col items-center justify-between overflow-hidden rounded-lg mb-2 w-1/2">
                    <img
                      src={item?.urlImage}
                      alt="not found"
                      className="w-11/12  object-cover mb-2 rounded-lg h-24"
                    />
                    <p>{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
