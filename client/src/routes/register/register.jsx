import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./register.scss";
import axiosInstance from "../../lib/axios";

function Register() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!email) return;

    const timeout = setTimeout(async () => {
      try {
        const res = await axiosInstance.get("/auth/check-email", {
          params: { email },
        });

        setMessage(res.data.exists ? "* email is already registered!" : "");
      } catch (error) {
        console.error("Check failed", error);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
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
                  name="username"
                  type="text"
                  placeholder="User Name"
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />

                <p>{message}</p>

                <button disabled={message}>Sign up</button>

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
