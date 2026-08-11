import { useState } from "react";
import ReactQuill from "react-quill-new";
import { useNavigate } from "react-router-dom";
import "react-quill-new/dist/quill.snow.css";

import ImageUploadWidget from "../../components/imageUploadWidget/imageUploadWidget";
import "./newPostPage.scss";
import axiosInstance from "../../lib/axios";
import { usePostStore } from "../../store/usePostStore";
import { useAuthStore } from "../../store/useAuthStore";

const postUploadConfig = {
  cloudName: "alphaMale",
  uploadPreset: "rEAlEstate",
  multiple: true,
  folder: "posts",
};

function NewPostPage() {
  const { addPost, isPostSaving } = usePostStore();
  const { userAuth } = useAuthStore();

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [postData, setPostData] = useState({
    title: "",
    price: "",
    address: "",
    city: "",
    bed: "",
    bath: "",
    latitude: "",
    longitude: "",
    type: "rent",
    property: "apartment",
    images: [],
  });

  const [postDetail, setPostDetail] = useState({
    desc: "",
    utilities: "",
    pet: "",
    income: "",
    size: "",
    school: "",
    bus: "",
    restaurant: "",
  });

  const handleUpload = (url) => {
    setPostData((prev) => ({ ...prev, images: [...prev.images, url] }));
  };

  const handleContentChange = (value) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = value;

    let plainText = tempDiv.textContent || tempDiv.innerText || "";

    // optional: clean extra spaces
    plainText = plainText.replace(/\s+/g, " ").trim();

    // setContent(plainText);
    setPostDetail((prev) => ({ ...prev, desc: plainText }));
  };

  const handlePostDataChange = (e) => {
    const { name, value } = e.target;

    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePostDetailChange = (e) => {
    const { name, value } = e.target;

    setPostDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedPostData = {
      ...postData,
      price: parseInt(postData.price, 10) || 0,
      bed: parseInt(postData.bed, 10) || 0,
      bath: parseInt(postData.bath, 10) || 0,
    };

    const formattedPostDetail = {
      ...postDetail,
      size: parseInt(postDetail.size, 10) || 0,
      school: parseInt(postDetail.school, 10) || 0,
      bus: parseInt(postDetail.bus, 10) || 0,
      restaurant: parseInt(postDetail.restaurant, 10) || 0,
    };

    const userId = userAuth.id;

    const newPost = await addPost(
      formattedPostData,
      formattedPostDetail,
      userId,
    );

    if (newPost) {
      navigate("/" + newPost.id);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <div className="title">
          <h1>Add New Post</h1>
        </div>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={postData.title}
                onChange={handlePostDataChange}
              />
            </div>

            <div className="item">
              <label htmlFor="price">Price</label>
              <input
                min={100}
                type="number"
                name="price"
                value={postData.price}
                onChange={handlePostDataChange}
              />
            </div>

            <div className="item">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                value={postData.address}
                onChange={handlePostDataChange}
              />
            </div>

            {/* TODO FIX ReactQuill */}
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <div className="quill-wrapper">
                <ReactQuill
                  theme="snow"
                  value={postDetail.desc}
                  onChange={handleContentChange}
                />
              </div>
            </div>

            <div className="item">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                name="city"
                value={postData.city}
                onChange={handlePostDataChange}
              />
            </div>

            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input
                min={1}
                type="number"
                name="bed"
                value={postData.bed}
                onChange={handlePostDataChange}
              />
            </div>

            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input
                min={1}
                type="number"
                name="bath"
                value={postData.bath}
                onChange={handlePostDataChange}
              />
            </div>

            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                name="latitude"
                value={postData.latitude}
                onChange={handlePostDataChange}
              />
            </div>

            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="text"
                name="longitude"
                value={postData.longitude}
                onChange={handlePostDataChange}
              />
            </div>

            <div className="item">
              <label htmlFor="type">Type</label>
              <select
                name="type"
                value={postData.type}
                onChange={handlePostDataChange}
              >
                <option value="rent">Rent</option>
                <option value="sale">Buy</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="type">Property</label>
              <select
                name="property"
                value={postData.property}
                onChange={handlePostDataChange}
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select
                name="utilities"
                value={postDetail.utilities}
                onChange={handlePostDetailChange}
              >
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select
                name="pet"
                value={postDetail.pet}
                onChange={handlePostDetailChange}
              >
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                // id="income"
                name="income"
                type="text"
                value={postDetail.income}
                onChange={handlePostDetailChange}
                placeholder="Income Policy"
              />
            </div>

            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input
                min={0}
                // id="size"
                name="size"
                type="number"
                value={postDetail.size}
                onChange={handlePostDetailChange}
              />
            </div>

            <div className="item">
              <label htmlFor="school">School</label>
              <input
                min={0}
                // id="school"
                name="school"
                type="number"
                value={postDetail.school}
                onChange={handlePostDetailChange}
              />
            </div>

            <div className="item">
              <label htmlFor="bus">bus</label>
              <input
                min={0}
                // id="bus"
                name="bus"
                type="number"
                value={postDetail.bus}
                onChange={handlePostDetailChange}
              />
            </div>

            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input
                min={0}
                // id="restaurant"
                name="restaurant"
                type="number"
                value={postDetail.restaurant}
                onChange={handlePostDetailChange}
              />
            </div>

            <button className="sendButton" type="submit">
              {isPostSaving ? "Saving..." : "Add Post"}
            </button>
            {error && <span>{error}</span>}
            {/* {error && <div className="errorNotification">{error}</div>} */}
          </form>
        </div>
      </div>

      <div className="sideContainer">
        <h2>Upload Images</h2>
        <div className="wrapper">
          <div className="image">
            {postData.images.map((image, index) => (
              <img key={index} src={image} alt="" />
            ))}
          </div>

          <ImageUploadWidget
            uwConfig={postUploadConfig}
            onUpload={handleUpload}
          />
        </div>
      </div>
    </div>
  );
}

export default NewPostPage;
