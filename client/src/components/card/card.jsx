import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
  BathIcon,
  BedDoubleIcon,
  BookmarkIcon,
  MapPinIcon,
  MessageSquareTextIcon,
} from "lucide-react";

import "./card.scss";
import { AuthContext } from "../../context/auth.context";
import axiosInstance from "../../lib/axios";

function Card({ item }) {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState(item.savedPost.length > 0);
  // const [isSaved, setIsSaved] = useState(!!item.savedPost);
  const [loading, setLoading] = useState(false);

  const handleSavedPost = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (loading) return;

    setLoading(true);
    const previousStatus = isSaved;
    setIsSaved(!previousStatus);

    try {
      await axiosInstance.post("/users/save", { postId: item.id });
    } catch (error) {
      console.log(error);
      setIsSaved(previousStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
        <div className="overlay"></div>
        <div className="vertical-text">
          <span className="big">{item.city}</span>
          <span className="small">
            {item.property} for {item.type}
          </span>
        </div>
      </Link>

      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <MapPinIcon />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <BedDoubleIcon />
              <span>{item.bed} bedroom</span>
            </div>
            <div className="feature">
              <BathIcon />
              <span>{item.bath} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <button
              className={`icon ${isSaved ? "saved" : ""}`}
              onClick={handleSavedPost}
            >
              <BookmarkIcon />
            </button>
            <button className="icon">
              <MessageSquareTextIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
