import {
  CaretLeft,
  MapPin,
  Star,
  ArrowFatUp,
  ArrowFatDown,
  X,
  SmileySad,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../provider/auth";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import { RatingStars } from "../RatingStars/RatingStars";
import "react-toastify/dist/ReactToastify.css";
import { CommonButton } from "../CommonButton/CommonButton";
import { HeadHelmet } from "../../components/HeadHelmet/HeadHelmet";
import og_image from "../../assets/og_image.jpg";

export function MyReservations() {
  const [loading, setLoading] = useState(false);
  const [reservationEvaluated, setReservationEvaluated] = useState([
    {
      bookingId: null,
      productId: null,
    },
  ]);
  const {
    setIsAuthenticated,
    myReservations,
    getReservations,
    cancelReservation,
    evaluateBooking,
  } = useContext(AuthContext);

  const [isOpenRating, setIsOpen] = useState(false);
  const [isOpenReservationCancellation, setIsOpenReservationCancellation] =
    useState(false);
  const [rating, setRating] = useState(-1);
  const popupRef = useRef(null);

  const openPopup = () => setIsOpen(true);

  const closeRatingPopup = () => {
    setRating(-1);
    setIsOpen(false);
  };

  const closeReservationCancellationPopup = () => {
    // console.log("fechou");
    // console.log(isOpenReservationCancellation);

    setIsOpenReservationCancellation(false);
    // console.log(isOpenReservationCancellation);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    // console.log(`Rating: ${rating}`);
    // console.log(reservationEvaluated);
    if (
      evaluateBooking(
        reservationEvaluated.id,
        reservationEvaluated.produto,
        rating
      )
    ) {
      const message = "Avaliação enviada com sucesso!";
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
    } else {
      const message = "Erro ao enviar avaliação!";
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
    }

    closeRatingPopup();
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closeRatingPopup();
    }
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closeReservationCancellationPopup();
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReservations() {
      getReservations();
      setLoading(false);
    }
    fetchReservations();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
  //     <div className="flex flex-col flex-1 w-full items-center justify-center">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green border-solid"></div>
  //       <p className="mt-4 text-gray-600">Carregando...</p>
  //     </div>
  //     </div>
  //   );
  // }

  return (
    <>
      {loading ? (
        <>
          <div className="flex flex-1">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="flex flex-col flex-1 w-full items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green border-solid"></div>
                <p className="mt-4 text-gray-600">Carregando...</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <HeadHelmet
            title="Digital Booking - Minhas Reservas"
            url={window.location.href}
            image={og_image}
            description="Digital Booking - Minhas Reservas"
          />
          <div className="flex flex-col flex-1 w-full">
            <div
              className={`flex flex-col flex-1 w-full  ${
                isOpenRating || isOpenReservationCancellation ? "blur-sm" : null
              } `}
            >
              <div className="flex justify-between items-center bg-dark-purple w-full h-20 text-white font-bold">
                <div className="mx-7 md:mx-10">
                  <h1 className="text-3xl">Minhas Reservas</h1>
                </div>
                <button
                  onClick={() => navigate("/home")}
                  className="mx-7 md:mx-10"
                >
                  <CaretLeft size={38} color="#f5f5f5" weight="bold" />
                </button>
              </div>

              {myReservations.length !== 0 ? (
                myReservations
                  .sort((a, b) => a.id - b.id)
                  .map((myReservation) => (
                    <div
                      key={myReservation.id}
                      className="grid grid-cols-2 lg:grid-cols-3 m-5 gap-3"
                    >
                      <div className="text-dark-purple font-bold col-span-2 lg:col-span-3 text-lg">
                        <span>Reserva</span>
                        <span>{`#000${myReservation.id}`}</span>
                      </div>
                      <div className="w-full h-64 hidden lg:block">
                        <img
                          src={myReservation.produto.imagem_default}
                          alt=""
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-center gap-1">
                            <h2 className="text-dark-purple font-bold text-md">
                              {myReservation.produto.categoria.qualificacao}
                            </h2>
                          </div>
                          <div className="">
                            <div className="flex flex-wrap">
                              <div>
                                <h1 className="text-dark-purple font-bold text-lg">
                                  {myReservation.produto.nome}
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <RatingStars
                            rate={myReservation.produto.mediaClassificacao}
                          />
                        </div>
                        <div className="">
                          <div className="flex items-center gap-3 md:gap-1">
                            <div className="flex items-center gap-1 flex-nowrap">
                              <div>
                                <MapPin weight="fill" color="#383b58" />
                              </div>
                              <div>
                                <p className="text-md my-2  text-dark-purple font-bold whitespace-nowrap">
                                  {myReservation.produto.cidade.nome},{" "}
                                  {myReservation.produto.cidade.pais}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-col md:flex  gap-1  font-bold text-dark-purple">
                          <div className="flex gap-1 items-center text-sm">
                            <ArrowFatUp weight="fill" />
                            <span>Check in:</span>
                            <span className="m-1">
                              {myReservation.data_inicio_reserva}
                            </span>
                          </div>
                          <div className="flex gap-1 items-center text-sm">
                            <ArrowFatDown weight="fill" />
                            <span>Check out:</span>
                            <span className="m-1">
                              {myReservation.data_fim_reserva}
                            </span>
                          </div>
                        </div>

                        <div className="font-bold text-dark-purple">
                          <span>Status:</span>
                          <span className="mx-2">Confirmado</span>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center items-center gap-6 md:border-l-2">
                        {new Date(
                          myReservation.data_inicio_reserva
                        ).toLocaleDateString("pt-BR") <
                        new Date().toDateString("pt-BR") ? (
                          <CommonButton
                            id={`btn-cancel-${myReservation.produto.id}`}
                            outline={false}
                            onClickBtn={() => {
                              setIsOpenReservationCancellation(true);
                              setReservationEvaluated({
                                id: myReservation.id,
                                produto: myReservation.produto.id,
                              });
                            }}
                            text="Cancelar Reserva"
                            className="w-40  md:w-64"
                          />
                        ) : null}
                        {new Date(
                          myReservation.data_fim_reserva
                        ).toLocaleDateString("pt-BR") >=
                        new Date().toLocaleDateString("pt-BR") ? (
                          <CommonButton
                            id={`btn-rate-${myReservation.produto.id}`}
                            outline={false}
                            onClickBtn={() => {
                              openPopup();
                              setReservationEvaluated({
                                id: myReservation.id,
                                produto: myReservation.produto.id,
                              });
                            }}
                            text="Avaliar"
                            className="w-40  md:w-64"
                          />
                        ) : null}
                        <CommonButton
                          id={`btn-more-${myReservation.produto.id}`}
                          outline={false}
                          onClickBtn={() => {
                            window.scrollTo(0, 0);
                            window.scrollTo(0, 0);
                            navigate(
                              `/home/product/${myReservation.produto.id}`
                            );
                          }}
                          text="Ver mais"
                          className="w-40  md:w-64"
                        />
                        <CommonButton
                          id={`btn-help-${myReservation.produto.id}`}
                          outline={false}
                          onClickBtn={() => {
                            toast.warn(
                              "Help, I need somebody! Help, not just anybody! Help, you know I need a job, HEELP!",
                              {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                              }
                            );
                            // console.log(
                            //   "Help, I need somebody! Help, not just anybody!, Help, you know I need job, help!"
                            // );
                          }}
                          text="Ajuda"
                          className="w-40  md:w-64"
                        />
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex flex-col justify-center items-center h-full gap-5">
                  <SmileySad weight="fill" size={60} />
                  <span className="text-3xl text-dark-purple font-bold text-center flex flex-col items-center">
                    Você não tem reservas
                  </span>
                  <CommonButton
                    text="Que tal explorar por novas hospedagens"
                    onClickBtn={() => navigate(`/home`)}
                    outline={false}
                  />
                </div>
              )}
            </div>

            {isOpenRating && (
              <div className=" ">
                {isOpenRating && (
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border-2 border-gray-400 rounded-md flex flex-col items-center w-96">
                    <button
                      className="absolute top-0 right-0 p-2"
                      onClick={(e) => {
                        closeRatingPopup();
                      }}
                    >
                      <X size={20} />
                    </button>
                    <h2 className="text-xl font-semibold mb-4">
                      Avaliar Reserva
                    </h2>
                    <StarRatings
                      rating={rating}
                      starDimension="30px"
                      starSpacing="5px"
                      starHoverColor="#1dbeb4"
                      starEmptyColor="#e4e5e9"
                      starRatedColor="#1dbeb4"
                      changeRating={handleRatingChange}
                      numberOfStars={5}
                      name="rating"
                      starEmpty={<Star />}
                    />
                    <button
                      className="bg-green text-white font-bold  rounded w-64 mt-4"
                      onClick={handleSubmit}
                    >
                      Enviar Avaliação
                    </button>
                  </div>
                )}
              </div>
            )}

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
                          if (cancelReservation(reservationEvaluated.id)) {
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
                          } else {
                            const message =
                              "Não foi possível cancelar a reserva";
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
                          }
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
      )}
    </>
  );
}
