import { useState, useRef, useEffect } from "react";
import "./App.css";
import AboutUs from "./components/AboutUs";
import ProductList from "./components/ProductList";

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, [showProductList]);

  const handleGetStarted = () => {
    setShowProductList(true);
  };

  return (
    <div className="app">
      {!showProductList ? (
        <div className="landing_page" id="home">
          <video
            ref={videoRef}
            className="background-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={`${import.meta.env.BASE_URL}videos/nursery-background.mp4`} type="video/mp4" />
          </video>
          <div className="left-side">
            <div className="main-title">
              <h1>
                <span className="welcome-text">Welcome To</span>
                <br />
                Paradise Nursery
              </h1>
            </div>
            <div className="title-line"></div>
            <p className="left-subtitle">Where Green Meets Serenity</p>
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
          <div className="right-side">
            <AboutUs />
          </div>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
