import { MapPin } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { ReservationContext } from "../../provider/reservation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../../services/api";
import { AuthContext } from "../../provider/auth";
import { useNavigate } from "react-router-dom";
import { RatingStars } from "../RatingStars/RatingStars";
import { CommonButton } from "../CommonButton/CommonButton";

export function HostingDetails({ product }) {
  const { token } = useContext(AuthContext);
  const { formData } = useContext(ReservationContext);
  const [statusForm, setStatusForm] = useState(false);
  const navigate = useNavigate();
  // console.log(product);

  useEffect(() => {
    const values = Object.values(formData);
    let checkState = true;

    values.forEach((value) => (value ? "" : (checkState = false)));
    setStatusForm(checkState);
  }, [formData]);

  async function handleSubmit(e) {
    e.preventDefault();
    const button = e.target;

    button.innerHTML =
      "<svg class='animate-spin h-5 w-5 mr-3' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'><rect width='256' height='256' fill='none'/><path d='M168,40a97,97,0,0,1,56,88,96,96,0,0,1-192,0A97,97,0,0,1,88,40' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='16'/></svg></svg> Reservando...";

    button.disabled = "true";
    button.classList.add("bg-slate-600");

    if (statusForm) {
      try {
        const dataForm = {
          hora_inicio: formData.hora_inicio,
          data_inicio_reserva:
            formData.data_inicio_reserva.toLocaleDateString("pt-BR"),
          data_fim_reserva:
            formData.data_fim_reserva.toLocaleDateString("pt-BR"),
          produto: {
            id: formData.produto.id,
          },
        };

        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const response = await Api.post("/reserva", JSON.stringify(dataForm), {
          ...header,
        });

        if (response.status === 201) {
          navigate(`/home/product/${formData.produto.id}/reservation/success`);
        }
      } catch (e) {
        // console.log(e);

        toast.error(`Desculpe, não foi possível realizar a reserva.`, {
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
      let emptyFields = [];
      Object.entries(formData).forEach((entry) => {
        const [key, value] = entry;
        if (key == "data_inicio_reserva" || key == "data_fim_reserva") {
          value < new Date() ? emptyFields.push(" data de reserva") : "";
        } else if (key == "city") {
          value ? "" : emptyFields.push(" cidade");
        } else if (key == "hora_inicio") {
          value ? "" : emptyFields.push(" horário de chegada");
        }
      });

      toast.error(`Favor, preencher todos os campos:${emptyFields}`, {
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

    setTimeout(() => {
      button.innerHTML = "Confirmar reserva";
      button.disabled = "";
      button.classList.remove("bg-slate-600");
    }, 2000);
  }

  return (
    <>
      <div className="bg-white py-5 lg:w-3/12 w-full rounded-md shadow-md flex flex-col gap-5">
        <div>
          <h1 className=" px-5 font-bold text-2xl text-dark-purple">
            Detalhe da reserva
          </h1>
        </div>
        <div>
          <img
            src={product.imagem_default}
            className="w-full h-full object-cover"
            alt={`Foto de ${product.name}`}
          />
        </div>

        <section className="infoProduto px-5 flex flex-col gap-5">
          <div>
            <h2 className="font-bold text-sm text-dark-purple capitalize">
              {product.categoria.qualificacao.toLowerCase()}
            </h2>
            <h1 className="font-bold text-2xl text-dark-purple">
              {product.nome}
            </h1>
            <div className="flex">
              <RatingStars rate={product.mediaClassificacao} />
            </div>
          </div>
          <p className="font-medium text-sm text-dark-purple">
            <MapPin
              weight="fill"
              color="#383b58"
              size={16}
              className="inline-block mr-2"
            />
            {product.endereco}, {product.cidade.nome} - {product.cidade.estado}
          </p>
        </section>
        <div>
          <hr className="h-px mt-6 bg-slate-400 border-0 mx-4" />
          <div className="flex items-center justify-between px-8 py-6">
            <h1>Check in</h1>
            <p>
              {formData.data_inicio_reserva > new Date()
                ? formData.data_inicio_reserva.toLocaleDateString("pt-BR")
                : "Escolha a data"}
            </p>
          </div>
          <hr className="h-px  bg-slate-400 border-0 mx-4" />
          <div className="flex items-center justify-between px-8 py-6">
            <h1>Check out</h1>
            <p>
              {formData.data_fim_reserva > new Date()
                ? formData.data_fim_reserva.toLocaleDateString("pt-BR")
                : "Escolha a data"}
            </p>
          </div>
          <hr className="h-px  bg-slate-400 border-0 mx-4" />
          <div className="flex items-center justify-between px-8 py-6">
            <h1>Hora de chegada</h1>
            <p>
              {formData.hora_inicio !== ""
                ? formData.hora_inicio
                : "Escolha a hora"}
            </p>
          </div>
          <hr className="h-px  bg-slate-400 border-0 mx-4" />
        </div>
        <div className="flex items-center justify-center pt-11">
          <CommonButton
            text="Confirmar reserva"
            onClickBtn={handleSubmit}
            outline={false}
            className={`text-white ${
              statusForm ? "bg-green" : "bg-gray-500 border-gray-500"
            } flex items-center`}
          />
        </div>
      </div>
    </>
  );
}
