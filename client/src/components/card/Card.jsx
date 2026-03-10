import { Link } from "react-router-dom";

import "./Card.scss";
import {
  BathIcon,
  BedDoubleIcon,
  BookmarkIcon,
  MapPinIcon,
  MessageSquareTextIcon,
} from "lucide-react";

function Card({ item }) {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.img} alt="" />
        <div class="overlay"></div>

        <div class="vertical-text">
          <span class="big">{item.bedroom} bedroom</span>
          <span class="small">only 4 units left</span>
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
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <BathIcon />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <BookmarkIcon className="book" />
            </div>
            <div className="icon">
              <MessageSquareTextIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
