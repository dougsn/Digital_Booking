import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import imgNotFound from "../../assets/img_not_found.jpg";

export const ProductImageGrid = ({ images, setViewMore }) => {
  const data = images.map((image) => (
    <div key={image.title}>
      <img src={image.url} alt={image.title} />
    </div>
  ));

  return (
    <>
      <div className="hidden lg:block">
        <div className="grid grid-cols-2 mx-8 my-2 gap-5">
          <div className="col-span-1">
            <div className="h-full">
              <img
                src={images[0] ? images[0].url : imgNotFound}
                alt={images[0] ? images[0].titulo : "Imagem não disponível"}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          </div>

          <div className="col-span-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="">
                <img
                  src={images[1] ? images[1].url : imgNotFound}
                  alt={images[1] ? images[1].titulo : "Imagem não disponível"}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
              <div className="">
                <img
                  src={images[2] ? images[2].url : imgNotFound}
                  alt={images[2] ? images[2].titulo : "Imagem não disponível"}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
              <div className="">
                <img
                  src={images[3] ? images[3].url : imgNotFound}
                  alt={images[3] ? images[3].titulo : "Imagem não disponível"}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
              <div className="relative">
                <img
                  src={images[4] ? images[4].url : imgNotFound}
                  alt={images[4] ? images[4].titulo : "Imagem não disponível"}
                  className="w-full h-full rounded-lg object-cover"
                />
                <button
                  onClick={() => {
                    window.scrollTo(0, 100);
                    setViewMore(true);
                  }}
                  className="absolute bottom-0 right-0  text-white font-bold py-2 px-4 rounded-lg underline"
                >
                  Ver Mais
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <Carousel
          showIndicators={false}
          showThumbs={false}
          autoPlay
          transitionTime={3000}
        >
          {data}
        </Carousel>
      </div>
    </>
  );
};
