import React from "react";
import { PiThumbsUpLight } from "react-icons/pi";
export default function ReviewsCard({
  image,
  review,
  senderName,
  recommended,
}) {
  return (
    <div className="flex w-full pr-2 mt-8">
      <img
        src={image}
        alt="not found"
        style={{
          width: 70,
          height: 70,
          borderRadius: 50,
          objectFit: "fill",
        }}
      />
      <div className="ml-4 w-10/12">
        <h2 className="font-medium">{senderName}</h2>
        <p className="text-sm text-slate-500">{review}</p>
        <div className="flex items-center mt-3 mb-2">
          <PiThumbsUpLight />
          <p className="text-sm text-slate-500 ml-2">{recommended}</p>
        </div>
        <div>☆☆☆☆☆</div>
      </div>
    </div>
  );
}
