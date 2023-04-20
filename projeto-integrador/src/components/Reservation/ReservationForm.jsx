import { useEffect, useContext } from "react";
import { AuthContext } from "../../provider/auth";
import { ReservationContext } from "../../provider/reservation";
import { CommonInput } from "../CommonInput/CommonInput";

export function ReservationForm({ id }) {
  const { user } = useContext(AuthContext);
  const { formData, setFormData } = useContext(ReservationContext);

  useEffect(() => {
    setFormData({
      firstname: user.body.firstname,
      lastname: user.body.lastname,
      email: user.body.email,
      city: "",
      data_inicio_reserva: "",
      data_fim_reserva: "",
      hora_inicio: "",
      produto: {
        id: id,
      },
    });
  }, []);

  return (
    <div className="flex flex-col p-8 bg-white rounded-md shadow-md gap-5">
      <h1 className="text-dark-purple text-2xl font-bold">Criar Conta</h1>
      <hr className="h-px w-full bg-slate-400 border-0" />
      <form className="w-full h-auto">
        <div className="container grid md:grid-cols-2 ">
          <div>
            <div>
              <label htmlFor="name" className="font-medium">
                Nome
              </label>
            </div>
            <CommonInput
              name="name"
              id="name"
              className="bg-ice-white uppercase"
              placeholder="Bruno"
              value={formData.firstname ? formData.firstname : ""}
              readOnly={true}
            />
          </div>
          <div className="md:pl-6 pb-4">
            <div>
              <label htmlFor="lastName">Sobrenome</label>
            </div>
            <CommonInput
              name="lastName"
              id="lastName"
              className="bg-ice-white uppercase"
              placeholder="Rocha"
              value={formData.lastname ? formData.lastname : ""}
              readOnly={true}
            />
          </div>
          <div>
            <div>
              <label htmlFor="email">Email</label>
            </div>
            <CommonInput
              name="email"
              id="email"
              type="email"
              className="bg-ice-white"
              placeholder="brunorocha@gmail.com"
              value={formData.email ? formData.email : ""}
              readOnly={true}
            />
          </div>
          <div className="md:pl-6">
            <div>
              <label htmlFor="city">Cidade</label>
            </div>
            <CommonInput
              name="city"
              id="city"
              className="bg-ice-white uppercase"
              placeholder="Rosário, Santa Fe"
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              value={formData.city}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
