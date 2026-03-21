import { SchoolIcon } from "lucide-react";
import Map from "../../components/map/Map";
import Slider from "../../components/slider/Slider";
import { singlePostData } from "../../lib/dummydata";
import "./singlepage.scss";

const SinglePage = () => {
  return (
    <div className="singlePage">
      {/* LEFT SECTION */}
      <div className="details">
        <div className="property">
          <div className="imageContainer">
            <Slider images={singlePostData.images} />
          </div>

          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <p className="location">{singlePostData.address}</p>

                <span className="price">$ {singlePostData.price}</span>
              </div>

              <div className="agentCard">
                <img src="/Sanil.png" alt="agent" />
                <h3>John Doe</h3>
                <p>Real Estate Agent</p>
              </div>
            </div>

            <div className="bottom">
              <p className="description">{singlePostData.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="features">
        <div className="wrapper">
          <div className="title">
            <p>General</p>
            <div className="listVertical">
              <div className="feature">
                <img src="/utility.png" alt="" />
                <div className="featureText">
                  <span>Utilities</span>
                  <p>Renter is responsible</p>
                </div>
              </div>

              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Pet Policy</span>
                  <p>Pets Allowed</p>
                </div>
              </div>

              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Property Fees</span>
                  <p>Must have 3x the rent in total household income</p>
                </div>
              </div>
            </div>
          </div>

          <div className="title">
            <p>Sizes</p>
            <div className="sizes">
              <div className="size">
                <img src="/size.png" alt="" />
                <span>{singlePostData.size} sqft</span>
              </div>

              <div className="size">
                <img src="/bed.png" alt="" />
                <span>{singlePostData.bedRooms} beds</span>
              </div>

              <div className="size">
                <img src="/bath.png" alt="" />
                <span>{singlePostData.bathroom} bathroom</span>
              </div>
            </div>
          </div>

          <div className="title">
            <p>Nearby Places</p>
            <div className="listHorizontal">
              <div className="feature">
                <img src="/school.png" alt="" />
                <div className="featureText">
                  <span>School</span>
                  <p>{singlePostData.school}m away</p>
                </div>
              </div>

              <div className="feature">
                <img src="/bus.png" alt="" />
                <div className="featureText">
                  <span>Bus Stop</span>
                  <p>{singlePostData.bus}m away</p>
                </div>
              </div>

              <div className="feature">
                <img src="/restaurant.png" alt="" />
                <div className="featureText">
                  <span>Restaurant</span>
                  <p>{singlePostData.restaurant}m away</p>
                </div>
              </div>
            </div>
          </div>

          <div className="title">
            <p>Location</p>
            <div className="mapContainer">
              <Map items={[singlePostData]} />
            </div>
          </div>

          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button>
              <img src="/save.png" alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SinglePage;
