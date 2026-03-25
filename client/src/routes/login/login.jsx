import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import "./login.scss";
import axiosInstance from "../../lib/axios";
import { AuthContext } from "../../context/auth.context";

function Login() {
  const [error, setError] = useState("");

  const { updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const formData = new FormData(e.target);

    const username = formData.get("username").toLowerCase();
    const password = formData.get("password");

    try {
      const res = await axiosInstance.post("/auth/login", {
        username,
        password,
      });

      // localStorage.setItem("user", JSON.stringify(res.data));
      updateUser(res.data);

      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="login">
      <div className="box">
        <div className="loginBox">
          <div className="leftSide">
            <div className="imgContainer">
              <img src="/house.jpg" alt="" />
            </div>
            <h1>rEAlEstate</h1>
          </div>
          <div className="rightSide">
            <div className="wrapper">
              <form onSubmit={handleSubmit}>
                <h1>Welcome back</h1>
                <input
                  name="username"
                  onChange={() => {
                    setError("");
                  }}
                  type="text"
                  placeholder="User Name"
                  required
                />
                <input
                  name="password"
                  onChange={() => {
                    setError("");
                  }}
                  type="password"
                  placeholder="Password"
                  required
                />
                <button>Sign in</button>
                <p>{error}</p>
                <Link to="/register">{"Don't"} you have an account?</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
