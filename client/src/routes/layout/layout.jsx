import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

import Navbar from "../../components/navbar/navbar";
import { AuthContext } from "../../context/auth.context";
import "./layout.scss";
import { useAuthStore } from "../../store/useAuthStore";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <div className="layout">
      <Toaster />
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function RequiredAuth() {
  const { userAuth } = useAuthStore();
  // const { currentUser } = useContext(AuthContext);

  return !userAuth ? (
    <Navigate to="/login" />
  ) : (
    <div className="layout">
      {/* <Toaster /> */}
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
  // return !currentUser ? (
  //   <Navigate to="/login" />
  // ) : (
  //   <div className="layout">
  //     <div className="navbar">
  //       <Navbar />
  //     </div>
  //     <div className="content">
  //       <Outlet />
  //     </div>
  //   </div>
  // );
}

export { Layout, RequiredAuth };
