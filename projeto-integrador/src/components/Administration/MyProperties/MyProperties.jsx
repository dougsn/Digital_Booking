import { MapPin, X, Buildings, SmileySad } from "@phosphor-icons/react";
import { RatingStars } from "../../RatingStars/RatingStars";
import { AuthContext } from "../../../provider/auth";
import { useContext, useState } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CommonButton } from "../../CommonButton/CommonButton";
import { HeadHelmet } from "../../../components/HeadHelmet/HeadHelmet";
import og_image from "../../../assets/og_image.jpg";

export function MyProperties() {
  const { myProperties, setMyProperties } = useContext(AuthContext);
  const [numberOfReservations, setNumberOfReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenpropertydeletion, setIsOpenReservationCancellation] =
    useState(false);
  const navigate = useNavigate();
  const [deletedPropertyId, setDeletedPropertyId] = useState([
    {
      id: null,
    },
  ]);
  const popupRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const closeReservationCancellationPopup = () => {
    setIsOpenReservationCancellation(false);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closeReservationCancellationPopup();
    }
  };

  const getMyProperties = async () => {
    try {
      setLoading(true);
      const myProperties = await api.get("/user/produtosCriados", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setMyProperties(myProperties.data);
      // console.log(myProperties);

      const promises = myProperties.data.map(async (myProperty) => {
        const response = await api.get(
          `/produto/buscarReserva/${myProperty.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return {
          id: myProperty.id,
          numberOfReservations: response.data.length,
        };
      });

      const results = await Promise.all(promises);
      setNumberOfReservations(results);

      // console.log(results);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      getMyProperties();
    };

    fetchData();
  }, []);

  const deleteProperty = async (id) => {
    try {
      const response = await api.delete(`/produto/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(response);
      if (response) {
        const message = "Propriedade excluida com Sucesso!";
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
        setTimeout(() => {
          getMyProperties();
        }, 6000);

        return true;
      }
    } catch (error) {
      // console.log(error);

      const message = "Não foi possível excluir essa propriedade!";
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

    return false;
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

  const getNumberOfReservationsById = (id) => {
    const result = numberOfReservations.find((item) => item.id === id);
    return result ? result.numberOfReservations : null;
  };

  return (
    <div
      className={`flex flex-col flex-1 w-full ${
        myProperties.length !== 0 ? "" : "h-full"
      }`}
    >
      <HeadHelmet
        title="Digital Booking - Meus Produtos"
        url={window.location.href}
        image={og_image}
        description="Digital Booking - Meus Produtos"
      />
      {myProperties.length !== 0 ? (
        <>
          <div
            className={`flex flex-col flex-1 w-full  ${
              isOpenpropertydeletion ? "blur-sm" : null
            }`}
          >
            <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-28 items-center my-10">
              <p className="text-3xl font-bold text-center text-dark-purple">
                Minhas Propriedades
              </p>
              <CommonButton
                text="Criar propriedade"
                onClickBtn={() =>
                  navigate("/home/administrator/createProperty")
                }
                outline={false}
                icon={<Buildings size={24} color="#f5f5f5" />}
                className="flex gap-2 h-16 px-7 font-bold uppercase"
              />
              {/* <button
                className="bg-green text-white font-bold my-7 h-16 rounded-md px-7 flex items-center gap-3"
                onClick={() => {
                  navigate("/home/administrator/createProperty");
                }}
              >
                <Buildings size={44} color="#f5f5f5" />
                Criar propriedade
              </button> */}
            </div>

            {myProperties
              .sort((a, b) => a.id - b.id)
              .map((myProperty, index) => (
                <div
                  className="grid grid-cols-2 lg:grid-cols-3 my-12 mx-8 md:my-4 gap-2"
                  key={index}
                >
                  <div className="text-dark-purple font-bold col-span-2 lg:col-span-3 text-lg"></div>
                  <div className="w-full h-64 hidden lg:block">
                    <img
                      src={myProperty.imagem_default}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="border-r-2 h-56">
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-1">
                          <h2 className="text-dark-purple font-bold text-md">
                            {/* {myReservation.produto.categoria.qualificacao} */}
                          </h2>
                        </div>
                        <div className="">
                          <div className="flex flex-wrap">
                            <div>
                              <h1 className="text-dark-purple font-bold text-lg">
                                {myProperty.nome}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <RatingStars rate={myProperty.mediaClassificacao} />
                      </div>
                      <div className="">
                        <div className="flex items-center  gap-3 md:gap-1">
                          <div className="flex items-center gap-1 flex-nowrap">
                            <div className="flex flex-col md:flex-row">
                              <div>
                                <div className="flex justify-center items-center">
                                  <MapPin weight="fill" color="#383b58" />
                                  <span className="text-md my-2  text-dark-purple font-bold whitespace-nowrap">
                                    {myProperty.cidade.nome},
                                  </span>
                                </div>
                              </div>
                              <span className="text-md my-2  text-dark-purple font-bold whitespace-nowrap">
                                {myProperty.cidade.estado}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="font-bold text-dark-purple">
                        <span>Quantidade de reservas:</span>
                        <span className="mx-2">
                          {getNumberOfReservationsById(myProperty.id)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center gap-8">
                    <CommonButton
                      text="Ver mais"
                      onClickBtn={() => {
                        window.scrollTo(0, 0);
                        window.scrollTo(0, 0);
                        navigate(`/home/product/${myProperty.id}`);
                      }}
                      id={myProperty.id}
                      className="w-40 md:w-64"
                      outline={false}
                    />

                    {getNumberOfReservationsById(myProperty.id) > 0 && (
                      <CommonButton
                        text="Reservas"
                        onClickBtn={() => {
                          window.scrollTo(0, 0);
                          navigate(
                            `/home/administrator/propertyUpdate/reservations/${myProperty.id}`
                          );
                        }}
                        id={`btn-reservation-number-${myProperty.id}`}
                        className="w-40 md:w-64"
                        outline={false}
                      />
                    )}

                    <CommonButton
                      text="Editar propriedade"
                      onClickBtn={() => {
                        window.scrollTo(0, 0);
                        navigate(
                          `/home/administrator/propertyUpdate/${myProperty.id}`
                        );
                      }}
                      id={`btn-edit-product-${myProperty.id}`}
                      className="w-40 md:w-64"
                      outline={false}
                    />

                    <CommonButton
                      text="Excluir propriedade"
                      onClickBtn={() => {
                        setIsOpenReservationCancellation(true);
                        setDeletedPropertyId({ id: myProperty.id });
                        // console.log(deletedPropertyId);
                      }}
                      id={`btn-edit-product-${myProperty.id}`}
                      className="w-40 md:w-64"
                      outline={false}
                    />
                  </div>
                </div>
              ))}
          </div>
          {isOpenpropertydeletion && (
            <div className=" ">
              {isOpenpropertydeletion && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border-2 border-gray-400 rounded-md flex flex-col items-center w-96 ">
                  <button
                    className="absolute top-0 right-0 p-2"
                    onClick={() => closeReservationCancellationPopup()}
                  >
                    <X size={20} />
                  </button>
                  <h2 className="text-md font-semibold mb-4">
                    Deseja excluir essa propriedade?
                  </h2>

                  <div className="flex gap-4">
                    <CommonButton
                      text="SIM"
                      onClickBtn={() => {
                        if (
                          getNumberOfReservationsById(deletedPropertyId.id) > 0
                        ) {
                          const message =
                            "Não é possível excluir uma propriedade com reservas";
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
                          closeReservationCancellationPopup();
                        } else {
                          deleteProperty(deletedPropertyId.id);
                          closeReservationCancellationPopup();
                        }
                      }}
                      id={`btn-delete-propertie`}
                      className="w-40 bg-red-600 border-red-600 hover:bg-red-900	hover:border-red-900"
                      outline={false}
                    />
                    <CommonButton
                      text="NÃO"
                      onClickBtn={closeReservationCancellationPopup}
                      id={`btn-deny-delete-property`}
                      className="w-40"
                      outline={false}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-full gap-5">
          <SmileySad weight="fill" className="text-dark-purple" size={60} />
          <span className="text-3xl text-dark-purple font-bold text-center flex flex-col items-center">
            Você não tem Propriedades
          </span>
          <CommonButton
            text="Criar propriedade"
            onClickBtn={() => navigate("/home/administrator/createProperty")}
            outline={false}
            icon={<Buildings size={24} color="#f5f5f5" />}
            className="flex gap-2 h-16 px-7 font-bold uppercase"
          />
        </div>
      )}
    </div>
  );
}
