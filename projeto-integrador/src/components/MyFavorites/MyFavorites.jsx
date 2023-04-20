import { useContext, useEffect, useState } from "react";
import {
  ArrowFatDown,
  ArrowFatUp,
  CaretLeft,
  MapPin,
  Star,
  HeartBreak,
} from "@phosphor-icons/react";
import api from "../../services/api";
import { AuthContext } from "../../provider/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { RatingStars } from "../RatingStars/RatingStars";
import { CommonButton } from "../CommonButton/CommonButton";
import "react-toastify/dist/ReactToastify.css";
import { HeadHelmet } from "../../components/HeadHelmet/HeadHelmet";
import og_image from "../../assets/og_image.jpg";

export function MyFavorites() {
  const {
    setIsAuthenticated,
    truncateDescription,
    myFavorites,
    getMyFavorites,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyFavorites() {
      getMyFavorites();
    }
    fetchMyFavorites();
  }, []);

  // if (myFavorites.length === 0) {
  //   navigate("/home");
  // }

  const deleteFavorite = async (id) => {
    const body = {
      produto: {
        id: id,
      },
    };
    try {
      const response = await api.delete(`/favorito`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: { ...body },
      });
      if (response.status === 200) {
        // console.log(`removido com sucesso`);
        const message = "Removido com sucesso";
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
        getMyFavorites();
      }
    } catch (error) {
      // console.log(error);
      const message = "Não foi possível remover o produto dos favoritos";
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
  };

  return (
    <div className="flex flex-col flex-1 w-full">
      <HeadHelmet
        title="Digital Booking - Minhas Reservas"
        url={window.location.href}
        image={og_image}
        description="Digital Booking - Minhas Reservas"
      />
      <div className="flex justify-between items-center bg-dark-purple w-full h-20 text-white font-bold">
        <div className="mx-7 md:mx-10">
          <h1 className="text-3xl">Meus Favoritos</h1>
        </div>
        <button
          className="mx-7 md:mx-10"
          onClick={() => {
            window.scrollTo(0, 0);
            navigate(`/home`);
          }}
        >
          <CaretLeft size={38} color="#f5f5f5" weight="bold" />
        </button>
      </div>
      {myFavorites.length !== 0 ? (
        <div className="">
          <div className="grid grid-cols-2 lg:grid-cols-3 m-5 gap-5">
            {myFavorites
              .sort((a, b) => a.id - b.id)
              .map((myfavorite) => (
                <>
                  <div
                    key={myfavorite.id}
                    className="w-full h-64 hidden lg:block"
                  >
                    <img
                      src={myfavorite.imagem_default}
                      alt=""
                      className="w-full h-64 hidden lg:block rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col justify-between h-full gap-6">
                    <div>
                      <div className="flex items-center gap-1">
                        <h2 className="text-dark-purple font-bold text-md">
                          {myfavorite.categoria.qualificacao}
                        </h2>
                      </div>
                      <div className="">
                        <div className="flex flex-wrap">
                          <div>
                            <h1 className="text-dark-purple font-bold text-lg">
                              {myfavorite.nome}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <RatingStars rate={myfavorite.mediaClassificacao} />
                    </div>

                    <div className="">
                      <p className="text-xs text-dark-purple font-bold">
                        {truncateDescription(myfavorite.descricao, 150)}
                      </p>
                    </div>
                    <div className="">
                      <div className="flex items-center gap-3 md:gap-1">
                        <div className="flex items-center gap-1 flex-nowrap">
                          <div>
                            <MapPin weight="fill" color="#383b58" />
                          </div>
                          <div>
                            <p className="text-xs my-2  text-dark-purple font-bold whitespace-nowrap">
                              São Paulo, Brasil
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center gap-6  border-l-2">
                    <CommonButton
                      outline={false}
                      text="Remover dos favoritos"
                      className="w-40 p-3 md:w-64 "
                      onClickBtn={() => deleteFavorite(myfavorite.id)}
                    />
                    {/* <button
                    className="bg-green text-white font-bold rounded-md w-64"
                    onClick={() => deleteFavorite(myfavorite.id)}
                  >
                    Remover dos Favoritos
                  </button> */}

                    <CommonButton
                      id={`btn-more-${myfavorite.id}`}
                      outline={false}
                      onClickBtn={() => {
                        window.scrollTo(0, 0);
                        window.scrollTo(0, 0);
                        navigate(`/home/product/${myfavorite.id}`);
                      }}
                      text="Ver mais"
                      className="w-40 md:w-64"
                    />
                  </div>
                </>
              ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full gap-5">
          <HeartBreak weight="fill" size={60} />
          <span className="text-3xl text-dark-purple font-bold text-center flex flex-col items-center">
            {" "}
            Você não tem favoritos
          </span>
          <CommonButton
            onClickBtn={() => navigate(`/home`)}
            text="Que tal explorar por novas hospedagens"
            outline={false}
          />
        </div>
      )}
    </div>
  );
}

export default MyFavorites;
