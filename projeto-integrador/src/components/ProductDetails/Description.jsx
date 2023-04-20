import { useContext } from "react";
import { AuthContext } from "../../provider/auth";

export function Description() {
  const { productDetails } = useContext(AuthContext);

  return (
    <>
      <div className="w-full bg-white pl-11">
        <h1 className="text-2xl font-bold text-dark-purple pt-11">
          Conheça mais sobre {productDetails.nome}
        </h1>
        <p className="pt-9 text-sm font-medium text-dark-purple">
          {productDetails.descricao}
        </p>
      </div>
    </>
  );
}
