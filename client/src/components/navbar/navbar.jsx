import { MenuIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./navbar.scss";
import { useAuthStore } from "../../store/useAuthStore";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { userAuth } = useAuthStore();

  function toTitleCase(str) {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <nav>
      <div className="left">
        <div className="logo">
          <Link to="/">
            <img src="logo.png" alt="" />
            <span>rEAlEstate</span>
          </Link>
        </div>
        <Link to="/">Home</Link>
        <Link to="#">About</Link>
        <Link to="#">Contact</Link>
        <Link to="#">Agents</Link>
      </div>
      <div className="right">
        {userAuth ? (
          <div className="user">
            <img src={userAuth.avatar || "/avatar.jpg"} alt="" />
            {/* <span> Emma Martin</span> */}
            <span>{toTitleCase(userAuth.username) || ""}</span>
            <Link to="/profile" className="btn">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/register">
              <span>Sign up</span>
            </Link>
            <Link to="/login" className="btn">
              <span>Sign in</span>
            </Link>
          </>
        )}

        <div className="menuicon" onClick={() => setOpen((prev) => !prev)}>
          <MenuIcon />
        </div>

        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="#">About</Link>
          <Link to="#">Contact</Link>
          <Link to="#">Agents</Link>
          <Link to="/register">Sign up</Link>
          <Link to="login">Sign in</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
