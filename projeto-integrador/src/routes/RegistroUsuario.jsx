import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";
import { HeadHelmet } from "../components/HeadHelmet/HeadHelmet";
import og_image from "../assets/og_image.jpg";

export const RegistroUsuario = () => {
  return (
    <>
      <HeadHelmet
        title="Digital Booking - Cadastro de usuário"
        url={window.location.href}
        image={og_image}
        description="Bem vindo à DigitalBooking, seu site de reservas"
      />
      <RegistrationForm />
    </>
  );
};
