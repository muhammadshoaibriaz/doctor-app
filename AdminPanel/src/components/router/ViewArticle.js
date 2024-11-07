import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import img1 from "../../assets/images/istockphoto-1479696462-612x612.jpeg";
export default function ViewArticle() {
  const location = useLocation();
  const { state } = location;
  // console.log(state.item);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);
  const getComments = async () => {
    try {
      const response = fetch(
        `http://localhost:4000/api/comments/${state.item?._id}`
      );
      const data = await (await response).json();
      // console.log("data", data);
      setComments(data);
    } catch (error) {
      console.log("Error getting comments", error.message);
    }
  };

  return (
    <div className="bg-slate-50 p-6">
      <div className="bg-white rounded-lg p-4">
        <img
          src={state.item.bannerImage || state.item.url}
          className="w-full h-auto rounded-lg"
          alt="not found"
        />
        <h1 className="text-3xl font-medium bottom-14 relative ml-4 text-white">
          {state.item.title}
        </h1>
        <h1 className="relative ml-2 text-slate-600">
          {state.item.description}
        </h1>
        <h1 className="text-lg font-medium relative ml-2 text-slate-800 mt-4">
          Comments
        </h1>
        <div>
          <div className="flex items-center mt-5 justify-between flex-wrap">
            {comments.map((item, index) => {
              return (
                <div className="rounded-lg bg-slate-50 w-33 p-5 h-auto mb-2">
                  <p className="font-medium text-slate-500 text-sm">
                    {item?.comment}
                  </p>
                  <div className="flex items-center mt-6">
                    <img
                      src={item?.authorImg}
                      className="w-10 h-10 rounded-full object-cover"
                      alt="not found"
                    />
                    <div className="ml-3">
                      <h2 className="text-sm font-medium text-slate-500">
                        {item?.authorName}
                      </h2>
                      <p className="text-sm font-medium text-slate-500">
                        email@email.com
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
