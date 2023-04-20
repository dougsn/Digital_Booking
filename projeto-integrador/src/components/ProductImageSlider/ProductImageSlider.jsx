import { X } from "@phosphor-icons/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const ProductImageSlider = ({ images, viewMore, setViewMore }) => {
  const data = images.map((image) => (
    <div key={image.title}>
      <img src={image.url} alt={image.title} />
    </div>
  ));

  return (
    <>
      {viewMore ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="relative" key="image-slider">
            <Carousel
              autoPlay
              transitionTime={3000}
              showArrows={true}
              infiniteLoop={true}
              className="carousel-container"
            >
              {data}
            </Carousel>
          </div>
          <div className="bg-green absolute top-[-25px] right-[-45px] rounded-full w-10 h-10 flex justify-center items-center">
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                setViewMore(false);
              }}
              className="font-bold mx-2 text-white text-3xl"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
