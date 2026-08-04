import { useContext, useState } from "react";

import { AuthContext } from "../../context/auth.context";
import "./profileUpdatePage.scss";
import axiosInstance from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import ImageUploadWidget from "../../components/imageUploadWidget/imageUploadWidget";
import { useAuthStore } from "../../store/useAuthStore";

const avatarUploadConfig = {
  cloudName: "alphaMale",
  uploadPreset: "rEAlEstate",
  multiple: false,
  maxImageFileSize: 2000000,
  folder: "avatars",
};

function ProfileUpdatePage() {
  const { userAuth, updateProfile } = useAuthStore();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    userName: userAuth?.username || "",
    email: userAuth?.email || "",
    password: "",
    avatar: "",
  });

  const navigate = useNavigate();

  const handleUpload = (url) => {
    const newFormData = { ...formData, avatar: url };
    setFormData(newFormData);

    updateProfile(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = updateProfile(formData);

    if (success) {
      navigate("/profile");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.target);

  //   const { username, email, password } = Object.fromEntries(formData);

  //   try {
  //     const res = await axiosInstance.put(`/users/${userAuth.id}`, {
  //       username,
  //       email,
  //       password,
  //       avatar,
  //     });
  //     updateUser(res.data);
  //     navigate("/profile");
  //   } catch (error) {
  //     console.log(error);
  //     setError(error.response.data.message);
  //   }
  // };

  return (
    <div className="profileupdate">
      <div className="formContainer">
        <div className="title">
          <h1>Update Profile</h1>
        </div>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="username">Username</label>
              <input
                // id="username"
                // name="username"
                type="text"
                value={formData.userName}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev) => ({ ...prev, userName: val }));
                }}
              />
            </div>
            <div className="item">
              <label htmlFor="email">Email</label>
              <input
                // id="email"
                // name="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev) => ({ ...prev, email: val }));
                }}
              />
            </div>
            <div className="item">
              <label htmlFor="password">Password</label>
              <input
                // id="password"
                // name="password"
                type="password"
                value={formData.password}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev) => ({ ...prev, password: val }));
                }}
              />
            </div>
            <button>
              <span>Update</span>
            </button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        <img
          src={formData.avatar || userAuth.avatar || "/avatar.jpg"}
          alt=""
          className="avatar"
        />

        <ImageUploadWidget
          uwConfig={avatarUploadConfig}
          onUpload={handleUpload}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
