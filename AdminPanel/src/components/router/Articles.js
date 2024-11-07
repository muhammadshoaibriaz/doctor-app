import React, { useState, useEffect } from "react";
import VerticalCard from "../customstyles/VerticalCard";
import { Link, useNavigate, useHistory } from "react-router-dom";
import img from "../../assets/images/istockphoto-1145308900-612x612.jpeg";
import img1 from "../../assets/images/istockphoto-1479696462-612x612.jpeg";
export default function Articles() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [recentlyPosted, setRecentlyPosted] = useState([]);

  const currentDate = new Date().toDateString();
  // console.log("cuerrentData", currentDate);

  useEffect(() => {
    getArticles();
  }, []);
  const getArticles = async () => {
    try {
      await fetch("http://localhost:4000/api/doc/get_article")
        .then((res) => res.json())
        .then((data) => {
          console.log("article data is ", data);
          setArticles(data);
        });
    } catch (error) {
      alert("Error getting articles ", error.message);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="p-6 bg-white rounded-lg">
        <h1 className="text-xl border-b border-slate-100 pb-2">
          Recently Posted
        </h1>
        <div className="custom_card flex w-full overflow-x-scroll mt-4 pb-10">
          {articles.map((item, index) => {
            return (
              <VerticalCard
                onClick={() =>
                  navigate("/dashboard/view_article", { state: { item } })
                }
                key={index}
                title={item.title}
                description={item.description}
                image={item.bannerImage || item.url}
                likes={item.likes}
                views={item.views}
                date_posted={item.posting_date}
              />
            );
          })}
        </div>
        <h1 className="text-xl border-b border-slate-100 pb-2">Top Articles</h1>
        <div className="custom_card flex w-full overflow-x-scroll mt-4">
          {articles.map((item, index) => {
            console.log("item", item);
            return (
              <VerticalCard
                onClick={() =>
                  navigate("/dashboard/view_article", { state: { item } })
                }
                key={index}
                title={item.title}
                description={item.description}
                image={item.bannerImage || item.url}
                likes={item.likes}
                views={item.views}
                date_posted={item?.posting_date}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
