import { useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import axiosInstance from "../../lib/axios";
import "./ProfilePage.scss";

function ProfilePage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      localStorage.removeItem("user");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                alt=""
              />
            </span>
            <span>
              Username: <b>Emma Martin</b>
            </span>
            <span>
              E-mail: <b>emmamartin@example.com</b>
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
