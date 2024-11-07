import React, { useState } from "react";
import img from "../../assets/images/istockphoto-1145308900-612x612.jpeg";
import { LuEye, LuHeart, LuHeartPulse } from "react-icons/lu";
import { color } from "./Theme";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";
import { HiMiniHeart } from "react-icons/hi2";
import { IoHeartOutline } from "react-icons/io5";
const para =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat quaerat maiores similique totam sunt cumque rerum, assumenda praesentium unde blanditiis itaque! Fuga,";
export default function VerticalCard({
  title,
  description,
  image,
  likes,
  views,
  date_posted,
  className,
  onClick,
}) {
  const [liked, setLiked] = useState(false);
  return (
    <div
      // onDrag={() => alert("why are you dragging me?")}
      className={
        "min-w-52 max-w-52 p-2 rounded-md bg-slate-50 cursor-pointer mr-5 hover:shadow-lg transition-all duration-700 relative h-80"
      }
    >
      <img
        src={image}
        alt="not found"
        style={{ width: "100%", borderRadius: 6, height: 130 }}
      />
      <div
        className="absolute right-3 top-3 rounded-full flex items-center justify-center w-6 h-6"
        onClick={() => setLiked(!liked)}
      >
        <IoHeartOutline color={liked ? "teal" : "#fff"} size={20} />
      </div>
      <div className="p-2" onClick={onClick}>
        <h1 className="text-slate-800 font-semibold mt-1 mb-1">
          {title.length > 36 ? title.slice(0, 36) + "..." : title}
        </h1>
        <p className="text-slate-600 text-sm">
          {description.slice(0, 80) + "..."}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <LuEye size={16} color={color.light_color} />
            <p className="text-sm ml-1 text-slate-500">{views}</p>
          </div>
          <p className="text-sm ml-1 text-slate-500">{date_posted}</p>
        </div>
      </div>
    </div>
  );
}
