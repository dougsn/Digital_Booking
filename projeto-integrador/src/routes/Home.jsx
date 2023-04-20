import { Body } from "../components/Body/Body";
import { CardsHome } from "../components/CardsHome/CardsHome";
import { Main } from "../components/Main/Main";
import { HeadHelmet } from "../components/HeadHelmet/HeadHelmet";
import og_image from "../assets/og_image.jpg";

export const Home = () => {
  return (
    <div div className="flex flex-1 flex-col">
      <HeadHelmet
        title="Digital Booking - Seu site de reservas"
        url={window.location.href}
        image={og_image}
        description="Bem vindo à DigitalBooking, seu site de reservas"
      />
      <Main />
      <Body>
        <CardsHome />
      </Body>
    </div>
  );
};
