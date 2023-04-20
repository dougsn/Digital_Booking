import { useContext } from "react";
import { AuthContext } from "../../provider/auth";

export function Policy() {
   const { productDetails } = useContext(AuthContext);

  return (
    <>
      <div className="w-full bg-white">
        <h1 className="text-2xl font-bold text-dark-purple pl-11 pt-11">
          O que você precisa saber:
        </h1>

        <hr className="h-px mt-6 bg-green border-0" />

        <div className="pl-11 py-11">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <h1 className="text-xl font-bold text-dark-purple pb-8">
                Regras da Casa
              </h1>
              <p className="font-medium text-dark-purple pb-5">
                {productDetails.regras_da_casa}
              </p>
            </div>

            <div>
              <h1 className="text-xl font-bold text-dark-purple pb-8">
                Saúde e segurança
              </h1>
              <p className="font-medium text-dark-purple pb-5">
                {productDetails.saude_e_seguranca}
              </p>
            </div>

            <div>
              <h1 className="text-xl font-bold text-dark-purple pb-8">
                Política de cancelamento
              </h1>
              <p className="font-medium text-dark-purple">
                {productDetails.politica_de_cancelamento}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
