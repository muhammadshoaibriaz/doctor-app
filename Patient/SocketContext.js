import { createContext, useContext, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [authUser, setAuthUser] = useContext(Auth);
};
