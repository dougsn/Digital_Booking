import {
  ArrowFatUp,
  ArrowFatDown,
  Clock,
  X,
  User,
  Envelope,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import { AdministrationHeader } from "../Header/AdministrationHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeadHelmet } from "../../../components/HeadHelmet/HeadHelmet";
import og_image from "../../../assets/og_image.jpg";

export function PropertyReservations() {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [isOpenReservationCancellation, setIsOpenReservationCancellation] =
    useState(false);
  const [reservationEvaluated, setReservationEvaluated] = useState([
    {
      bookingId: null,
      productId: null,
    },
  ]);
  const navigate = useNavigate();

  const { id } = useParams();
  const popupRef = useRef(null);

  const getReservationsById = async () => {
    try {
      const response = await api.get(`/produto/buscarReserva/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        const data = response.data;
        // console.log(data);
        setReservations(data);
        setLoading(false);

        return data;
      }
    } catch (error) {
      // console.log(error);
    }
    }

    const cancelReservationId = async (id) => {
      // console.log(id);
      try {
        const response = await api.delete(`/reserva/delete/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        // console.log(response.data);
        if (response.status === 200) {
          const message = "Reserva Cancelada!";
                      toast.success(message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
        getReservationsById();
        // console.log(response.data);
        // console.log(response.status);
          return true;
        }
      } catch (error) {
        // console.log(error);
        const message = "Não foi possível cancelar a reserva";
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        
        return false;
      }
    };


  useEffect(() => {
    const fetchData = async () => {
      // console.log(reservations)
      getReservationsById()
      
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const closeReservationCancellationPopup = () => {
    // console.log("fechou");
    // console.log(isOpenReservationCancellation);

    setIsOpenReservationCancellation(false);
    // console.log(isOpenReservationCancellation);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closeReservationCancellationPopup();
    }
  };

if (loading) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
    <div className="flex flex-col flex-1 w-full items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green border-solid"></div>
      <p className="mt-4 text-gray-600">Carregando...</p>
    </div>
    </div>
  );
}

  return (
    <>
      <HeadHelmet
        title="Digital Booking - Reservas do produto"
        url={window.location.href}
        image={og_image}
        description="Digital Booking - Reservas do produto"
      />
      {reservations.length > 0 ? (
        <>
          <div className="w-full  flex-col flex-1  bg-white relative">
            <AdministrationHeader />
            <div
              className={`flex flex-col flex-1 w-full  ${
                isOpenReservationCancellation ? "blur-sm" : null
              } `}
            >
              <p className="text-3xl font-bold text-center  text-dark-purple m-5">{`Reservas ${reservations[0].produto.nome} `}</p>
              <div className="flex items-center justify-center m-3">
                <div
                  className="h-80 w-full"
                  style={{
                    background: `url(${
                      reservations[0].produto.imagem_default === null
                        ? ""
                        : reservations[0].produto.imagem_default
                    }) no-repeat center center/cover`,
                  }}
                >
                  {/* <img src={reservations[0].produto.imagem_default} alt="" className="h-48 w-48 cover center" /> */}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 m-14">
                {reservations
                  .sort((a, b) => a.id - b.id)
                  .map((reservation) => (
                    <>
                      <div className="flex flex-col  items-center justify-center text-dark-purple text-lg font-bold border-2 border-gray-400 w-auto">
                        <div className="bg-dark-purple text-white w-full text-center">
                          <span>{`Reserva#000${reservation.id}`}</span>
                        </div>
                        <div className="flex  items-center">
                          <div className="m-2">
                            <Clock size={24} weight="regular" />
                          </div>
                          <span>Hora de inicio:</span>
                          <span className="m-2">{reservation.hora_inicio}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="m-2">
                            <ArrowFatUp size={24} weight="regular" />
                          </div>
                          <span>Check in:</span>
                          <span className="m-2">
                            {reservation.data_inicio_reserva}
                          </span>
                        </div>
                        <div className="flex  items-center">
                          <div className="m-2">
                            <ArrowFatDown size={24} weight="regular" />
                          </div>
                          <span>Check out:</span>
                          <span className="m-1">
                            {reservation.data_fim_reserva}
                          </span>
                        </div>
                        <div className="flex  items-center">
                          <div className="m-2">
                            <User size={24} weight="regular" />
                          </div>
                          <span>Cliente:</span>
                          <span className="m-1 capitalize">
                            {reservation.user.firstname}
                          </span>
                          <span className="m-1 capitalize">
                            {reservation.user.lastname}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="m-2">
                            <Envelope size={24} weight="regular" />
                          </div>
                          <span>Email:</span>
                          <span className="m-1 text-md  whitespace-pre-wrap">
                            {reservation.user.email}
                          </span>
                        </div>
                        <div className="w-full">
                          <button
                            className="bg-green w-full text-white"
                            onClick={() => {
                              setIsOpenReservationCancellation(true);
                              setReservationEvaluated({
                                id: reservation.id,
                                produto: reservation.produto.id,
                              });
                            }}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>

            {isOpenReservationCancellation && (
              <div className=" ">
                {isOpenReservationCancellation && (
                  <div className="fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border-2 border-gray-400 rounded-md flex flex-col items-center w-96">
                    <button
                      className="absolute top-0 right-0 p-2"
                      onClick={() => closeReservationCancellationPopup()}
                    >
                      <X size={20} />
                    </button>
                    <h2 className="text-md font-semibold mb-4">
                      Deseja realmente cancelar esta reserva?
                    </h2>

                    <div className="flex gap-4">
                      <button
                        className="bg-green text-white font-bold  rounded w-32 mt-4"
                        onClick={() => {
                          // console.log(reservationEvaluated.id);
                          cancelReservationId(reservationEvaluated.id);
                          closeReservationCancellationPopup();
                        }}
                      >
                        SIM
                      </button>
                      <button
                        className="bg-green text-white font-bold  rounded w-32 mt-4"
                        onClick={() => closeReservationCancellationPopup()}
                      >
                        NÃO
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        navigate("/home/administrator")
      )}
    </>
  );
}
