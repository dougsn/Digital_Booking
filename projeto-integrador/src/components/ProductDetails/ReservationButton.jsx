import { useNavigate } from 'react-router';
import { AuthContext } from '../../provider/auth';
import { useContext } from 'react';
import { toast } from "react-toastify";
import { CommonButton } from "../CommonButton/CommonButton"
import "react-toastify/dist/ReactToastify.css";


export function ReservationButton(props) {
  const navigate = useNavigate();
  const { isLogged, setIsAuthenticated, IsAuthenticated, setLastPage} = useContext(AuthContext);

  return (
    <>
      <div className="w-80 md:96 bg-white rounded-md shadow-xl py-8 px-5 md:px-8 ml-5">
        <p className="font-semibold text-dark-purple pb-6 text-center">
          A data desejada não está reservada?
        </p>
        <CommonButton
          className="w-full"
          onClickBtn={() => {
            if (isLogged) {
              window.scrollTo(0, 0);
              setIsAuthenticated(true);
              navigate(`/home/product/${props.id}/reservation`);
            } else {
              const message =
                "Para fazer uma reserva, você precisa estar logado";
              toast.warn(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });

              setTimeout(() => {
                setLastPage(`/home/product/${props.id}/reservation`);
                navigate("/home/login");
              }, 3500);
            }
          }}
          text="Iniciar reserva"
          outline={false}
        />
      </div>
    </>
  );
}
