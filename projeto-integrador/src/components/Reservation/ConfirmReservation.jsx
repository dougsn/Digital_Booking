import { ConfirmationCard } from '../ConfirmationCard/ConfirmationCard';
import { HeadHelmet } from "../../components/HeadHelmet/HeadHelmet";
import og_image from "../../assets/og_image.jpg";

export function ConfirmReservation() {
  return (
    <>
      <HeadHelmet
        title="Digital Booking - Reserva realizada com sucesso"
        url={window.location.href}
        image={og_image}
        description="Bem vindo à DigitalBooking, seu site de reservas"
      />
      <ConfirmationCard
        cardMessage="Sua reserva foi feita com sucesso"
        buttonTitle="Ok"
      />
    </>
  );
}
