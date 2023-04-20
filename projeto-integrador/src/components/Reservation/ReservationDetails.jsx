import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../provider/auth";

import { CaretLeft } from "@phosphor-icons/react";

import { ReservationForm } from "./ReservationForm";
import { ReservationCalendar } from "./ReservationCalendar";
import { HostingDetails } from "./HostingDetails";
import { CheckInTime } from "./CheckInTime";
import { Policy } from "../ProductDetails/Policy";
import { HeadHelmet } from "../HeadHelmet/HeadHelmet";

export function ReservationDetails() {
  const navigate = useNavigate();
  const { productDetails, getProductById, setProductDetails } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProductById(id);
      if (localStorage.getItem("token")) {
        setProductDetails(data);
        setLoading(false);
      } else {
        navigate("/home/login");
      }
    }
    fetchProduct();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <HeadHelmet
        title={`Digital Booking | Reserva | ${productDetails.nome}`}
        url={window.location.href}
        image={productDetails.imagem_default}
        description={productDetails.descricao.slice(0, 200) + "..."}
      />
      <div className="w-full flex justify-between bg-dark-purple h-20 text-white font-bold">
        <div className="mx-7 mt-4 md:mx-10">
          <h2 className="text-xs"> {productDetails.categoria.qualificacao}</h2>
          <h1 className="text-2xl">{productDetails.nome}</h1>
        </div>
        <button onClick={() => navigate("/home")} className="mx-7 md:mx-10">
          <CaretLeft size={38} color="#f5f5f5" weight="bold" />
        </button>
      </div>

      <div className="bg-ice-white p-5 lg:p-0">
        <div className="container py-5 flex lg:flex-row flex-col justify-between m-auto gap-5">
          <div class="flex flex-col lg:w-9/12 w-full gap-5">
            <ReservationForm id={id} />

            <ReservationCalendar />

            <CheckInTime />
          </div>
          <HostingDetails product={productDetails} />
        </div>
      </div>

      <Policy />
    </div>
  );
}
