import React, { useEffect, useState } from "react";
import VerticalCard from "../customstyles/VerticalCard";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/istockphoto-1145308900-612x612.jpeg";
export default function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    await fetch("http://localhost:4000/api/doc/get_blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        console.log(data);
      });
  };
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="p-6 bg-white rounded-lg">
        <h4 className="text-xl border-b border-slate-100 pb-2">
          Recently posted blogs
        </h4>
        <div className="custom_card flex w-full overflow-x-scroll mt-4 pb-10">
          {blogs.map((item, index) => {
            return (
              <VerticalCard
                onClick={() =>
                  navigate("/dashboard/view_article", { state: { item } })
                }
                key={index}
                title={item.title}
                description={item.description}
                image={item.url || item?.bannerImage}
                likes={item.likes}
                views={item.views}
                date_posted={item.posting_date}
              />
            );
          })}
        </div>
        <h1 className="text-xl border-b border-slate-100 pb-2">
          Top Rated blogs
        </h1>
        <div className="custom_card flex w-full overflow-x-scroll mt-4">
          {blogs.map((item, index) => {
            return (
              <VerticalCard
                onClick={() =>
                  navigate("/dashboard/view_article", { state: { item } })
                }
                key={index}
                title={item.title}
                description={item.description}
                image={item.url || item.bannerImage}
                likes={item.likes}
                views={item.views}
                date_posted={item.posting_date}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
