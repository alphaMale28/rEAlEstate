import { MenuIcon } from "lucide-react";
import "./Navbar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const user = true;

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  console.log(toTitleCase("emma martin"));

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
        <Link to="">About</Link>
        <Link to="">Contact</Link>
        <Link to="">Agents</Link>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              alt=""
            />
            {/* <span> Emma Martin</span> */}
            <span> {toTitleCase("emma martin")}</span>
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
          <Link to="">About</Link>
          <Link to="">Contact</Link>
          <Link to="">Agents</Link>
          <Link to="">Sign in</Link>
          <Link to="">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
