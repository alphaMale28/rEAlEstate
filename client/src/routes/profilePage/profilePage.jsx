import { Link, useNavigate } from "react-router-dom";

import Chat from "../../components/chat/chat";
import List from "../../components/list/list";
import axiosInstance from "../../lib/axios";

import "./profilePage.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function ProfilePage() {
  const navigate = useNavigate();

  const { updateUser, currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      // localStorage.removeItem("user");
      updateUser(null);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "/avatar.jpg"} alt="" />
            </span>
            <span>
              Username: <b>{toTitleCase(currentUser.username)}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Log Out</button>
          </div>
          <div className="title">
            <h1>List</h1>
            <button>Create New List</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>

      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
