import { CaretLeft, Heart, MapPin } from "@phosphor-icons/react";
import { useContext, useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { AuthContext } from "../../provider/auth";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShareSocialButton } from "../ShareSocialMedia/ShareSocialButton";
import { RatingStars } from "../RatingStars/RatingStars";
import { ProductImageGrid } from "../ProductImageGrid/ProductImageGrid";
import { ProductImageSlider } from "../ProductImageSlider/ProductImageSlider";

export function Product({ id }) {
  const [viewMore, setViewMore] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { productDetails, token, setIsLogged } = useContext(AuthContext);

  const navigate = useNavigate();

  const showTextClassification = (classificacao) => {
    switch (classificacao) {
      case 1:
        return "Ruim";
      case 2:
        return "Regular";
      case 3:
        return "Bom";
      case 4:
        return "Muito Bom";
      case 5:
        return "Excelente";
      default:
        return "Sem avaliações";
    }
  };

  async function setFavoriteData() {
    if (token) {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const request = await api.get(`/favorito/isFavorito/${id}`, {
          ...header,
        });
        const status = request.status;

        if (status == 200) {
          // Validação dos dados pra saber qual status do favorito do produto
          // console.log(request.data);
          const data = await !request.data;
          setIsFavorited(data);

          const body = {
            produto: {
              id: id,
            },
          };

          if (data) {
            // se o cliente não favoritou o produto, agora o sistema vai favoritar
            try {
              const updateRequest = await api.post(
                `/favorito`,
                { ...body },
                {
                  ...header,
                }
              );
              // console.log(updateRequest);
              const updateStatus = updateRequest.status;
              if (updateStatus === 201) {
                const message = "Produto adicionado dos favoritos!";
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
              }
            } catch (e) {
              // console.log(e);
            }
          } else {
            // se o cliente favoritou o produto, agora o sistema vai desfavoritar
            try {
              const updateRequest = await api.delete(`/favorito`, {
                ...header,
                data: { ...body },
              });
              // console.log(updateRequest);
              const updateStatus = updateRequest.status;
              if (updateStatus === 200) {
                const message = "Produto removido dos favoritos!";
                toast.warn(message, {
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
            } catch (e) {
              // console.log(e);
            }
          }
        }
      } catch (e) {
        setIsLogged(false);
        const message =
          "Não é possível favoritar um produto sem estar logado no sistema.";
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
    } else {
      setIsLogged(false);
      const message =
        "Não é possível favoritar um produto sem estar logado no sistema.";
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
  }

  // useEffect(() => {

  //   setProductSlides([data])

  // }, [productDetails] )

  useEffect(() => {
    async function getFavoriteData() {
      if (token) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        try {
          const request = await api.get(`/favorito/isFavorito/${id}`, header);
          const status = request.status;
          if (status === 200) {
            const data = await request.data;

            setIsFavorited(data);
          }
        } catch (e) {
          // console.log("Erro ao realizar a requisição.");
        }
      } else {
        setIsFavorited(false);
      }
    }

    getFavoriteData();
    // console.log(productDetails);
  }, [token]);

  return (
    <>
      <div className="w-full bg-white relative">
        <div className={`w-full  ${viewMore ? "blur-sm" : null}`}>
          <div></div>
          <div className="flex justify-between items-center bg-dark-purple w-full h-26 p-2 md:h-20 text-white font-bold px-7 md:px-10">
            <div className="">
              <h2 className="text-xs">
                {productDetails.categoria.qualificacao}
              </h2>
              <h1 className="text-2xl">{productDetails.nome}</h1>
            </div>
            <button onClick={() => navigate("/home")}>
              <CaretLeft size={38} color="#f5f5f5" weight="bold" />
            </button>
          </div>
          <div className="flex justify-between  bg-gray-200 w-full px-7 md:px-10 ">
            <div className="flex flex-col h-20 md:h-12 justify-center text-dark-purple font-bold ">
              <div className="flex items-center">
                <span className="">
                  <MapPin size={14} weight="fill" />
                </span>
                <div className="text-xs flex flex-col md:flex-row">
                  <h2 className=" md:mx-1">{productDetails.cidade.nome},</h2>
                  <h2 className="md:mx-1">{productDetails.cidade.estado},</h2>
                  <h2> {productDetails.cidade.pais}</h2>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="">
                <div className="flex flex-col items-center justify-center font-bold">
                  <div>
                    <span className="text-xs text-dark-purple">
                      {showTextClassification(
                        productDetails.mediaClassificacao
                      )}
                    </span>
                  </div>

                  <div className="flex">
                    {<RatingStars rate={productDetails.mediaClassificacao} />}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-dark-purple text-center">
                <span className="text-white font-bold">
                  {productDetails.mediaClassificacao}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex gap-3 mx-8 my-3">
              <ShareSocialButton
                name={productDetails.nome}
                description={productDetails.descricao}
              />
              <button onClick={setFavoriteData}>
                <Heart
                  size={24}
                  color={isFavorited ? "#d91e18" : "#383b58"}
                  weight={isFavorited ? "fill" : "regular"}
                />
              </button>
            </div>
          </div>

          <ProductImageGrid
            images={productDetails.imagens}
            viewMore={viewMore}
            setViewMore={setViewMore}
          />
        </div>
        <ProductImageSlider
          images={productDetails.imagens}
          viewMore={viewMore}
          setViewMore={setViewMore}
        />
      </div>
    </>
  );
}
