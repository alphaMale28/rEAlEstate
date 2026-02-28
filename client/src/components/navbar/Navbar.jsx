import { MenuIcon } from "lucide-react";
import "./Navbar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

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
        <Link href="">
          <span>Sign in</span>
        </Link>
        <Link href="" className="register">
          <span>Sign up</span>
        </Link>

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
