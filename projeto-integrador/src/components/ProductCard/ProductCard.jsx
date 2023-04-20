import {
  Car,
  Confetti,
  CookingPot,
  Heart,
  MapPin,
  PawPrint,
  Snowflake,
  Star,
  SwimmingPool,
  Television,
  Tent,
  Wheelchair,
  WifiHigh,
} from "@phosphor-icons/react";
import { DetailButton } from "../DetailButton/DetailButton";
import { RatingStars } from "../RatingStars/RatingStars";
import imgNotFound from "../../assets/img_not_found.jpg";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../provider/auth";
import { Link } from "react-router-dom";
import { MapModal } from "../MapModal/MapModal";
import api from "../../services/api";

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

export const ProductCard = ({ product }) => {
  const { truncateDescription, token } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleOnClose = () => setShowModal(false);

  const iconTag = (icon) => {
    if (icon === "WifiHigh") {
      return <WifiHigh color="#383b58" size={20} />;
    } else if (icon === "SwimmingPool") {
      return <SwimmingPool color="#383b58" size={20} />;
    } else if (icon === "Star") {
      return <Star color="#1dbeb4" size={20} />;
    } else if (icon === "Car") {
      return <Car color="#383b58" size={20} />;
    } else if (icon === "Snowflake") {
      return <Snowflake color="#383b58" size={20} />;
    } else if (icon === "Television") {
      return <Television color="#383b58" size={20} />;
    } else if (icon === "Confetti") {
      return <Confetti color="#383b58" size={20} />;
    } else if (icon === "PawPrint") {
      return <PawPrint color="#383b58" size={20} />;
    } else if (icon === "Tent") {
      return <Tent color="#383b58" size={20} />;
    } else if (icon === "CookingPot") {
      return <CookingPot color="#383b58" size={20} />;
    } else if (icon === "Wheelchair") {
      return <Wheelchair color="#383b58" size={20} />;
    }
  };

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
          const request = await api.get(
            `/favorito/isFavorito/${product.id}`,
            header
          );
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
  }, []);

  return (
    <div
      id={`product-${product.id}`}
      key={product.id}
      className="col-span-4 lg:col-span-2 rounded-lg bg-white shadow-md mb-1 border transition-all ease-in-out duration-300 hover:shadow-2xl flex items-stretch"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 relative">
        <div
          className="col-span-1 relative rounded-bl-lg rounded-tl-lg md:h-auto h-80"
          style={{
            background: `url(${
              product.imagem_default === null
                ? imgNotFound
                : product.imagem_default
            }) no-repeat center center/cover`,
          }}
        >
          {token ? (
            isFavorited ? (
              <div className="absolute p-4 bg-white rounded-br-lg rounded-tl-lg bg-opacity-40 backdrop-blur-sm">
                <Heart size={32} color="#f64747" weight="fill" />
              </div>
            ) : null
          ) : null}
        </div>
        <div className="col-span-1 p-2">
          <div className="flex flex-col h-full justify-between md:gap-6 gap-4">
            {/* Titulo do Produto e Rating*/}
            <div className="flex justify-between gap-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <h2 className="text-dark-purple font-bold text-xs">
                    {product.categoria.qualificacao}
                  </h2>

                  <RatingStars rate={product.mediaClassificacao} />
                </div>

                <div className="w-fit">
                  <Link
                    to={`/home/product/${product.id}`}
                    id={`product-link-${product.id}`}
                    className="w-fit"
                  >
                    {product.nome}
                  </Link>
                </div>
              </div>

              {/* Pontuação */}
              <div className="flex flex-col items-center">
                <div className="bg-dark-purple rounded-full w-6 h-6 text-center">
                  <span className="text-white font-bold">
                    {product.mediaClassificacao}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-xs text-dark-purple font-bold">
                    {showTextClassification(product.mediaClassificacao)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-1">
              <div className="flex items-center gap-1 flex-nowrap">
                <MapPin weight="fill" color="#383b58" size={16} />
                <a
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className="text-xs whitespace-nowrap"
                  id={`product-map-btn-${product.id}`}
                >
                  {product.cidade.nome}, {product.cidade.estado}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {product.caracteristicas.map((caracteristica, index) => (
                <div key={`${index} + caracteristica`}>
                  {iconTag(caracteristica.icone.nome_icone)}
                </div>
              ))}
            </div>

            <p className="text-xs text-dark-purple font-bold h-14">
              {truncateDescription(product.descricao, 150)}
            </p>

            <DetailButton id={product.id} />
          </div>
        </div>
      </div>
      <MapModal
        local={product.endereco}
        onClose={handleOnClose}
        visible={showModal}
      />
    </div>
  );
};
