import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import ImageUploadWidget from "../../components/imageUploadWidget/imageUploadWidget";
import "./newPostPage.scss";
import axiosInstance from "../../lib/axios";
import { useNavigate } from "react-router-dom";

const postUploadConfig = {
  cloudName: "alphaMale",
  uploadPreset: "rEAlEstate",
  multiple: true,
  folder: "posts",
};

function NewPostPage() {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleUpload = (url) => {
    setImages((prev) => [...prev, url]);
  };

  const navigate = useNavigate();

  const handleContentChange = (value) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = value;

    let plainText = tempDiv.textContent || tempDiv.innerText || "";

    // optional: clean extra spaces
    plainText = plainText.replace(/\s+/g, " ").trim();

    setContent(plainText);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const postData = {
        title: inputs.title,
        price: parseInt(inputs.price),
        address: inputs.address,
        city: inputs.city,
        bed: parseInt(inputs.bedroom),
        bath: parseInt(inputs.bathroom),
        latitude: inputs.latitude,
        longitude: inputs.longitude,
        type: inputs.type,
        property: inputs.property,
        images,
      };

      const postDetail = {
        desc: content,
        utilities: inputs.utilities,
        pet: inputs.pet,
        income: inputs.income,
        size: parseInt(inputs.size),
        school: parseInt(inputs.school),
        bus: parseInt(inputs.bus),
        restaurant: parseInt(inputs.restaurant),
      };

      const res = await axiosInstance.post("/posts", {
        postData,
        postDetail,
      });

      navigate("/" + res.data.id);
    } catch (error) {
      console.log(error);
      setError(error);
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
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input min={100} id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <div className="quill-wrapper">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={handleContentChange}
                />
              </div>
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton">Update</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        <div className="wrapper">
          <div className="image">
            {images.map((image, index) => (
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
