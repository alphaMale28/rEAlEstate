import Searchbar from "../../components/searchbar/Searchbar";
import "./homepage.scss";

function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="appName">rEAlEstate</h1>
          <h1 className="title">
            Your dream home starts here — <br />
            find the best real estate
          </h1>
          <p>
            Discover a wide range of properties tailored to your lifestyle and
            budget. Whether you're looking for a modern apartment, a family
            home, or an investment opportunity, we help you find the perfect
            place with ease and confidence.
          </p>

          <Searchbar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>1200+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imageContainer">
        <img src="bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
