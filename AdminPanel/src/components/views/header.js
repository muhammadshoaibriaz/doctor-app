import "../../App.css";
import user_img from "../../assets/images/img.png";
import { FcSearch, FcMenu } from "react-icons/fc";
import { FiBell, FiHelpCircle, FiMail, FiMenu, FiSearch } from "react-icons/fi";
import { color } from "../customstyles/Theme";
import { LuBell, LuFocus, LuLogOut, LuMail } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Button } from "../customstyles/IconBtn";
import { TfiHelpAlt, TfiSettings } from "react-icons/tfi";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Header({ toggleSidebar }) {
  const [notification, setNotification] = useState([...Array(20)]);
  const [mail, setMail] = useState([...Array(7)]);
  // console.log(count);
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState();

  const getUser = async () => {
    await fetch("http://localhost:4000/api/users_profile")
      .then((res) => res.json())
      .then((data) => {
        // console.log("users are ", data);
        setUser(data.reverse());
      });
  };

  // const getDoctors = async () => {
  //   await fetch("http://localhost:4000/api/doc/get_doctors")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log("users are f", data);
  //     });
  // };

  return (
    <div className="header_container flex justify-between items-center w-auto shadow-md shadow-slate-100 bg-white px-5 sticky top-0 left-0 right-0  z-10">
      <div class="header_left flex justify-between items-center w-1/3">
        <Button
          icon={<FiMenu color={color.light_color} size={18} />}
          onClick={toggleSidebar}
        />
        <div className="flex items-center bg-slate-100 rounded-full overflow-hidden w-10/12">
          <input
            placeholder="Search here..."
            className="flex-1 pl-4 h-10 outline-none bg-transparent"
          />
          <Button
            icon={<FiSearch color={color.light_color} size={18} />}
            onClick={() => alert("ok hai")}
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-1/6">
        <ul class="ul_list">
          <li>
            <Button
              icon={<LuBell color={color.light_color} size={18} />}
              onMouseEnter={() => {
                getUser();
              }}
            />
            <div class="notification">
              <div class="flex h-14 items-center justify-between px-4 bg-blue-900">
                <h3 className="text-white font-semibold">Notifications</h3>
                <p className="text-white font-semibold">
                  {user?.length < 10 ? "0" + user?.length : user?.length}
                </p>
              </div>
              <ul class="dropdown_content">
                {user?.map((item, index) => (
                  <div
                    class="item w-full"
                    key={index}
                    onClick={() =>
                      alert("Notifications are only readable by developer!")
                    }
                  >
                    <img
                      src={item?.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="w-11/12 pl-3">
                      <div className="w-full flex items-center justify-between">
                        <h3>{item?.username}</h3>
                        <p>Created account</p>
                      </div>
                      <p>{item?.joined}</p>
                    </div>
                  </div>
                ))}
              </ul>
              <div class="flex items-center justify-center h-12 border-t border-slate-200 bg-white absolute bottom-0 w-full">
                <h3>See all notifications</h3>
              </div>
            </div>
          </li>
          <li>
            <Button
              icon={<LuMail color={color.light_color} onClick={() => {}} />}
            ></Button>
            <div class="mail">
              <div class="flex h-14 items-center justify-between px-4 bg-blue-900">
                <h3 className="text-white font-semibold">Notifications</h3>
                <p className="text-white font-semibold">
                  {mail.length < 10 ? "0" + mail.length : mail.length}
                </p>
              </div>
              <ul class="dropdown_content">
                {mail.map(() => (
                  <div class="item">
                    <img
                      src={user_img}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <div className="flex items-center ">
                        <h3>Tolga mendi!</h3>
                        <p style={{ fontWeight: 600, marginLeft: 6 }}>
                          {" "}
                          - 20 mins ago
                        </p>
                      </div>
                      <p style={{ fontWeight: 600 }}>
                        Successful paid invoice #43354!
                      </p>
                    </div>
                  </div>
                ))}
              </ul>
              <div className="flex items-center justify-center h-12 border-t border-slate-200 bg-white absolute bottom-0 w-full">
                <h3>See all notifications</h3>
              </div>
            </div>
          </li>
          <li>
            <img
              src={user_img}
              onClick={() => alert("image clicked")}
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
            <ul class="profile_drop_down" style={{ fontWeight: "500" }}>
              <Link to={"/help"}>
                <li>
                  <TfiHelpAlt color={color.light_color} />
                  <a href="">Help</a>
                </li>
              </Link>
              <li>
                <TfiSettings color={color.light_color} />
                <a href="">Setting</a>
              </li>
              <Link to={"/"}>
                <li>
                  <LuLogOut color={color.light_color} />
                  <a href="">Log out</a>
                </li>
              </Link>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
