import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

import "./pin.scss";

function Pin({ item }) {
  return (
    <div>
      <Marker position={[item.latitude, item.longitude]}>
        <Popup className="property-popup">
          <div className="popup-card">
            <div className="popup-image">
              <img src={item.images[0]} alt="Property" />
              <span className="price">${item.price}</span>
            </div>

            <div className="popup-info">
              <h3>{item.title}</h3>
              <p>{item.address}</p>
              <Link to={`/${item.id}`} className="property-btn">
                View Details
              </Link>
            </div>
          </div>
        </Popup>
      </Marker>
    </div>
  );
}

export default Pin;
