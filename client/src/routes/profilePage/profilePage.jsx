import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { LoaderIcon } from "lucide-react";

import Chat from "../../components/chat/chat";
import List from "../../components/list/list";
import axiosInstance from "../../lib/axios";
import Card from "../../components/card/card";
import { useAuthStore } from "../../store/useAuthStore";

import "./profilePage.scss";

function ProfilePage() {
  const data = useLoaderData();

  console.log(data);

  const navigate = useNavigate();

  const { userAuth, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
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
              <img src={userAuth.avatar || "/avatar.jpg"} alt="" />
            </span>
            <span>
              Username: <b>{toTitleCase(userAuth.username)}</b>
            </span>
            <span>
              E-mail: <b>{userAuth.email}</b>
            </span>
            <button onClick={handleLogout}>Log Out</button>
          </div>
          <div className="title">
            <h1>List</h1>
            <Link to="/add">
              <button>Create New List</button>
            </Link>
          </div>
          <Suspense fallback={<LoaderIcon className="loader" />}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error Loading Posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>

          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<LoaderIcon className="loader" />}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error Loading Posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savePosts} />}
            </Await>
          </Suspense>
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
