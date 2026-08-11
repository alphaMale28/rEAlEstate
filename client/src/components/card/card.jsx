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
import axiosInstance from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";
import { usePostStore } from "../../store/usePostStore";

function Card({ item }) {
  const { userAuth } = useAuthStore();
  const { savePost } = usePostStore();

  const check = item.savedPost?.some((saved) => saved.userId === userAuth.id);
  // const userID = item?.savedPost?.map((saved) => saved.userId);

  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState(check);

  const handleSavedPost = async () => {
    if (!userAuth) {
      navigate("/login");
      return;
    }

    const postId = item.id;
    await savePost({ postId });

    const previousStatus = isSaved;
    setIsSaved(!previousStatus);
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
            {item.savedPost && (
              <button
                className={`icon ${isSaved ? "saved" : ""}`}
                onClick={handleSavedPost}
              >
                <BookmarkIcon />
              </button>
            )}
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
