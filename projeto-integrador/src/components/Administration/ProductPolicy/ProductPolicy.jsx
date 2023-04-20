import { useContext } from "react";
import { AuthContext } from "../../../provider/auth";

export function ProductPolicy() {
  const { productCreated, setProductCreated } = useContext(AuthContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductCreated({ ...productCreated, [name]: value });
  };

  return (
    <div className="px-10">
      <h1 className="text-xl text-dark-purple font-bold pb-3">
        Políticas do Produto
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-1 justify-items-center md:justify-items-start md:px-10 py-5 border border-dark-purple/10 rounded-lg">
        <div>
          <h1 className="text-lg text-dark-purple font-bold  md:pt-8">
            Regras da Casa
          </h1>
          <textarea
            name="regras_da_casa"
            value={productCreated.regras_da_casa}
            onChange={handleChange}
            placeholder="Escreva aqui"
            className="lg:w-80 h-64 p-4 md:w-[600px] resize-none rounded-md shadow-lg text-dark-purple font-bold  border border-dark-purple/20"
          />
        </div>

        <div>
          <h1 className="text-lg text-dark-purple font-bold md:pt-8">
            Saúde e segurança
          </h1>
          <textarea
            name="saude_e_seguranca"
            value={productCreated.saude_e_seguranca}
            onChange={handleChange}
            placeholder="Escreva aqui"
            className="lg:w-80 h-64 p-4 md:w-[600px] resize-none rounded-md shadow-lg text-dark-purple  font-bold border border-dark-purple/20"
          />
        </div>

        <div>
          <h1 className="text-lg text-dark-purple font-semibold md:pt-8">
            Política de cancelamento
          </h1>
          <textarea
            name="politica_de_cancelamento"
            value={productCreated.politica_de_cancelamento}
            onChange={handleChange}
            placeholder="Escreva aqui"
            className="lg:w-80 h-64 p-4 md:w-[600px] resize-none rounded-md shadow-lg text-dark-purple font-bold  border border-dark-purple/20"
          />
        </div>
      </div>
    </div>
  );
}
