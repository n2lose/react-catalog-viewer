import React, { Fragment, useState, useEffect } from "react";
import "h8k-components";
import { Thumbs, Viewer } from "./components";
import { image1, image2, image3, image4 } from "./assets/images";

const title = "Catalog Viewer";

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1,
    },
    {
      thumb: image2,
      image: image2,
    },
    {
      thumb: image3,
      image: image3,
    },
    {
      thumb: image4,
      image: image4,
    },
  ];

  const [catalogs] = useState([...catalogsList]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideTimer, setSlideTimer] = useState(null);
  const [slideDuration] = useState(3000);
  const [slideShowEnabled, setSlideShowEnabled] = useState(false);

  useEffect(() => {
    if (slideShowEnabled) {
      const timer = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === catalogs.length - 1 ? 0 : prevIndex + 1
        );
      }, slideDuration);
      setSlideTimer(timer);

      return () => {
        clearInterval(timer);
      };
    } else {
      clearInterval(slideTimer);
    }
  }, [slideShowEnabled, catalogs.length, slideDuration]);

  const handleThumbClick = (index) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? catalogs.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === catalogs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleSlideShowToggle = () => {
    setSlideShowEnabled((prevSlideShowEnabled) => !prevSlideShowEnabled);
  };

  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center mt-75">
        <div className="layout-row justify-content-center">
          <div className="card pt-25">
            <Viewer catalogImage={catalogs[activeIndex].image} />
            <div className="layout-row justify-content-center align-items-center mt-20">
              <button
                className="icon-only outlined"
                onClick={handlePrev}
                data-testid="prev-slide-btn"
              >
                <i className="material-icons">arrow_back</i>
              </button>
              <Thumbs
                items={catalogs}
                currentIndex={activeIndex}
                onClick={handleThumbClick}
              />
              <button
                className="icon-only outlined"
                onClick={handleNext}
                data-testid="next-slide-btn"
              >
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className="layout-row justify-content-center mt-25">
          <input
            type="checkbox"
            checked={slideShowEnabled}
            onChange={handleSlideShowToggle}
            data-testid="toggle-slide-show-button"
          />
          <label className="ml-6">Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
