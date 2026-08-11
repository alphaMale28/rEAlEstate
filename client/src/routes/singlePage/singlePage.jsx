import { useContext, useState } from "react";
import Map from "../../components/map/map";
import Slider from "../../components/slider/slider";
import axiosInstance from "../../lib/axios";
import "./singlePage.scss";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { usePostStore } from "../../store/usePostStore";

const SinglePage = () => {
  const post = useLoaderData();

  const [isSaved, setIsSaved] = useState(!!post.isSaved);
  const { userAuth } = useAuthStore();
  const { savePost } = usePostStore();

  const navigate = useNavigate();

  const handleSavedPost = async () => {
    if (!userAuth) {
      navigate("/login");
      return;
    }

    const postId = post.id;

    savePost({ postId });

    const previousStatus = isSaved;
    setIsSaved(!previousStatus);
  };

  return (
    <div className="singlePage">
      {/* LEFT SECTION */}
      <div className="details">
        <div className="property">
          <div className="imageContainer">
            <Slider images={post.images} />
          </div>

          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <p className="location">{post.address}</p>

                <span className="price">$ {post.price}</span>
              </div>

              <div className="agentCard">
                <img src={post.user.avatar || "/avatar.jpg"} alt="agent" />
                <h3>{post.user.username}</h3>
                <p>Real Estate Agent</p>
              </div>
            </div>

            <div className="bottom">
              <p className="description">{post.postDetail.desc}</p>
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
                  <p>{post.postDetail.utilities} is responsible</p>
                </div>
              </div>

              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Pet Policy</span>
                  <p>Pets {post.postDetail.pet}</p>
                </div>
              </div>

              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Income Policy</span>
                  <p>{post.postDetail.income}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="title">
            <p>Sizes</p>
            <div className="sizes">
              <div className="size">
                <img src="/size.png" alt="" />
                <span>{post.postDetail.size} sqft</span>
              </div>

              <div className="size">
                <img src="/bed.png" alt="" />
                <span>{post.bed} bedrooms</span>
              </div>

              <div className="size">
                <img src="/bath.png" alt="" />
                <span>{post.bath} bathrooms</span>
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
                  <p>{post.postDetail.school}m away</p>
                </div>
              </div>

              <div className="feature">
                <img src="/bus.png" alt="" />
                <div className="featureText">
                  <span>Bus Stop</span>
                  <p>{post.postDetail.bus}m away</p>
                </div>
              </div>

              <div className="feature">
                <img src="/restaurant.png" alt="" />
                <div className="featureText">
                  <span>Restaurant</span>
                  <p>{post.postDetail.restaurant}m away</p>
                </div>
              </div>
            </div>
          </div>

          <div className="title">
            <p>Location</p>
            <div className="mapContainer">
              <Map items={[post]} />
            </div>
          </div>

          <div className="buttons">
            <button className="savePost">
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button
              className={`savePost ${isSaved ? "saved" : ""}`}
              onClick={handleSavedPost}
              // style={{ backgroundColor: isSaved ? "#fece51" : "#1c77b0" }}
            >
              <img src="/save.png" alt="" />
              {isSaved ? "Place is saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SinglePage;
