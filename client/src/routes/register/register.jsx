import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoaderIcon } from "lucide-react";

import "./register.scss";
import { useAuthStore } from "../../store/useAuthStore";
import axiosInstance from "../../lib/axios";

function Register() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { register, isRegistering } = useAuthStore();

  useEffect(() => {
    if (!formData.email) return;

    const timeout = setTimeout(async () => {
      try {
        const res = await axiosInstance.get("/auth/check-email", {
          params: { email: formData.email },
        });

        setMessage(res.data.exists ? "* email is already registered!" : "");
      } catch (error) {
        console.error("Check failed", error);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [formData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await register(formData);

    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="register">
      <div className="box">
        <div className="registerBox">
          <div className="leftSide">
            <div className="imgContainer">
              <img src="/house.jpg" alt="" />
            </div>
            <h1>rEAlEstate</h1>
          </div>
          <div className="rightSide">
            <div className="wrapper">
              <form onSubmit={handleSubmit}>
                <h1>Create an Account</h1>
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
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((prev) => ({ ...prev, email: val }));
                  }}
                  placeholder="Email"
                />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  placeholder="Enter your password"
                />

                <p>{message}</p>

                <button disabled={message || isRegistering}>
                  {isRegistering ? (
                    <LoaderIcon className="loader" />
                  ) : (
                    "Sign up"
                  )}
                </button>

                <Link to="/login">already have an account</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
