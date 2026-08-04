import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import "./login.scss";
import axiosInstance from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";
import { LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";

function Login() {
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(formData);

    if (success) {
      navigate("/");
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
                  type="text"
                  required
                  value={formData.userName}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((prev) => ({ ...prev, userName: val }));
                  }}
                  placeholder="User Name"
                />

                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((prev) => ({ ...prev, password: val }));
                  }}
                  placeholder="Enter your password"
                />
                <button disabled={isLoggingIn}>
                  {isLoggingIn ? <LoaderIcon className="loader" /> : "Sign in"}
                </button>
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
