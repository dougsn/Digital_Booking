import Calendar from "react-calendar";
import "./index.css";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../../services/api";
import { ReservationContext } from "../../provider/reservation";

export function CustomCalendar({ type = "reservation", showDoubleView} ) {
  const [reservationDate, setReservationDate] = useState([]);
  const { formData, setFormData } = useContext(ReservationContext);
  const { id } = useParams();

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  function getDatesFromObject(Obj) {
    let dateArray = new Array();
    const localObj = Object.values(Obj);

    localObj.forEach((reserva) => {
      const startDate = reserva.data_inicio_reserva.split("/");
      const endDate = reserva.data_fim_reserva.split("/");

      let currentDate = new Date(startDate[2], startDate[1] - 1, startDate[0]);
      while (currentDate <= new Date(endDate[2], endDate[1] - 1, endDate[0])) {
        dateArray.push(currentDate.toLocaleDateString("pt-BR"));
        currentDate = currentDate.addDays(1);
      }
    });
    return dateArray;
  }

  function getDatesArray(date) {
    let dateArray = new Array();

    let currentDate = date[0];
    const lastDate = date[1];

    while (currentDate <= lastDate) {
      dateArray.push(
        (currentDate.getDate() > 10
          ? currentDate.getDate()
          : "0" + currentDate.getDate()) +
          "/" +
          (currentDate.getMonth() > 10
            ? currentDate.getMonth() + 1
            : "0" + (currentDate.getMonth() + 1)) +
          "/" +
          currentDate.getFullYear()
      );
      currentDate = currentDate.addDays(1);
    }

    return dateArray;
  }

  useEffect(() => {
    async function getDateReservationProduct() {
      const response = await Api.get(`/produto/buscarReserva/${id}`);

      if (response.status === 200) {
        if (response.data) {
          setReservationDate(getDatesFromObject(response.data));
        }
      }
    }

    getDateReservationProduct();
  }, []);

  if (type == "reservation") {
    return (
      <>
        <Calendar
          showDoubleView={showDoubleView}
          locale="pt-BR"
          onChange={(value) => {
            const dateArray = getDatesArray(value);

            let dateReserved = { data: "", reserved: false };
            dateArray.forEach((date) => {
              if (reservationDate.includes(date)) {
                dateReserved.reserved = true;
                dateReserved.data = date;
              }
            });

            if (dateReserved.reserved) {
              toast.error(
                `A data ${dateReserved.data} já posssui reserva. Por favor, selecione outra data.`,
                {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                }
              );
            } else {
              setFormData({
                ...formData,
                data_inicio_reserva: value[0],
                data_fim_reserva: value[1],
              });
            }
          }}
          maxDate={new Date().addDays(365)}
          value={[formData.data_inicio_reserva, formData.data_fim_reserva]}
          selectRange={true}
          returnValue="range"
          minDate={new Date().addDays(1)}
          tileClassName={({ date }) => {
            if (reservationDate.includes(date.toLocaleDateString("pt-BR"))) {
              return "text-red-600/50";
            }
          }}
        />
      </>
    );
  }
  else{
    return (
      <>
        <Calendar
          showDoubleView={showDoubleView}
          locale="pt-BR"
          maxDate={new Date().addDays(365)}
          minDate={new Date().addDays(1)}
          tileClassName={({ date }) => {
            if (reservationDate.includes(date.toLocaleDateString("pt-BR"))) {
              return "text-red-600/50";
            }
          }}
        />
      </>
    );
  }
}
