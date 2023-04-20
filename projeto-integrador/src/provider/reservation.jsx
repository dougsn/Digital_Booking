import { createContext, useState } from "react";
import Api from "../services/api";
export const ReservationContext = createContext({});

export const ReservationProvider = (props) => {
  const [formData, setFormData] = useState({});

  return (
    <ReservationContext.Provider value={{
        formData,
        setFormData
    }}>
      {props.children}
    </ReservationContext.Provider>
  );
};
