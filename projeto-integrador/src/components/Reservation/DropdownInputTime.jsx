import Select from "react-select";
import { useContext } from "react";
import { ReservationContext } from "../../provider/reservation";

export function DropdownInputTime() {
  const { formData, setFormData } = useContext(ReservationContext);

  const timeOptions = [];

  for (let i = 0; i <= 23; i++) {
    i < 10
      ? timeOptions.push({
          value: `0${i}:00`,
          label: `0${i}:00`,
        })
      : timeOptions.push({ value: `${i}:00`, label: `${i}:00` });
  }

  return (
    <div>
      <Select
        className="md:w-80"
        placeholder={
          <div className="flex items-center">
            Selecione a sua hora de chegada
          </div>
        }
        options={timeOptions}
        onChange={(e) => setFormData({ ...formData, hora_inicio: e.value })}
        menuPlacement="auto"
      />
    </div>
  );
}
