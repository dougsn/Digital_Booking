import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";


export function AdministrationHeader() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center bg-dark-purple w-full h-20 text-white font-bold">
      <div className="mx-7 md:mx-10">
        <h1 className="text-3xl">Administração</h1>
      </div>
      <button onClick={() => navigate("/home")} className="mx-7 md:mx-10">
        <CaretLeft size={38} color="#f5f5f5" weight="bold" />
      </button>
    </div>
  );
}
