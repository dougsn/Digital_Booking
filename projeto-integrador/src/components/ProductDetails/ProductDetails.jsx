import { Description } from "./Description";
import { Characteristics } from "./Characteristics";
import { Policy } from "./Policy";
import { Location } from "./Location";
import { AvailableDates } from "./AvailableDates";
import { Product } from "../ProductDetails/Product";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/auth";
import { ReservationContext } from "../../provider/reservation";
import { HeadHelmet } from "../HeadHelmet/HeadHelmet";

export function ProductDetails() {
  const { getProductById, setProductDetails, productDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { formData, setFormData } = useContext(ReservationContext);

  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProductById(id);
      setProductDetails(data);
      setLoading(false);
    }
    fetchProduct();

    setFormData({
      data_inicio_reserva: new Date(),
      data_fim_reserva: new Date(),
    });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="flex flex-col flex-1 w-full items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green border-solid"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
      </div>
    );
  }

  return (
    <>
      <HeadHelmet
        title={`Digital Booking - ${productDetails.nome}`}
        url={window.location.href}
        image={productDetails.imagem_default}
        description={productDetails.descricao.slice(0, 150)+'...'}
      />
      <Product id={id} />
      <Location local={productDetails.endereco} />
      <Description />
      <Characteristics />
      <Policy />
      <AvailableDates id={id} />
    </>
  );
}
