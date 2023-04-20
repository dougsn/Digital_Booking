import {
  ArrowFatDown,
  ArrowFatUp,
  CaretDoubleRight,
  CaretLeft,
  DotsSixVertical,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export const PageSubtitle = ({
  categoria,
  cidade,
  dataInicial,
  dataFinal,
  title,
  subtitle,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between bg-dark-purple w-full text-white font-bold p-7 gap-10">
      <div>
        <h2 className="text-xs">{title}</h2>
        <h1 className="text-xl flex gap-2 items-center flex-wrap">
          <span className="capitalize">{categoria.toLowerCase()}</span>
          {subtitle ? subtitle : cidade ? (
            <>
              <CaretDoubleRight size={16} />
              {cidade}
            </>
          ) : null}

          {dataInicial ? (
            <>
              <CaretDoubleRight size={16} />
              <div className="flex gap-1">
                {new Date(dataInicial).toLocaleDateString("pt-BR")}
                <ArrowFatUp size={24} color="#87d37c" />
              </div>
              <DotsSixVertical size={16} />
              <div className="flex gap-1">
                {new Date(dataFinal).toLocaleDateString("pt-BR")}
                <ArrowFatDown size={24} color="red" />
              </div>
            </>
          ) : null}
        </h1>
      </div>
      <button onClick={() => navigate("/home")}>
        <CaretLeft size={38} color="#f5f5f5" weight="bold" />
      </button>
    </div>
  );
};
