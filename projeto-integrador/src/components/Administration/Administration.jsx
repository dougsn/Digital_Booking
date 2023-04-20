import { AdministrationHeader } from "./Header/AdministrationHeader";
import { MyProperties } from "./MyProperties/MyProperties";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../provider/auth";
import { HeadHelmet } from "../HeadHelmet/HeadHelmet";
import og_image from "../../assets/og_image.jpg";

export function Administration() {

  const { setProductCreated } = useContext(AuthContext);

useEffect(() => {
  setProductCreated({
    nome: "",
    descricao: "",
    regras_da_casa: "",
    saude_e_seguranca: "",
    politica_de_cancelamento: "",
    endereco: "",
    categoria: "",
    cidade: "",
    caracteristicas:[],
    mediaClassificacao: 0,
  });
}, []);
  

  return (
    <div className="w-full  flex-col flex-1  bg-white">
      <HeadHelmet
        title="Digital Booking - Administração"
        url={window.location.href}
        image={og_image}
        description="Digital Booking - Página de Administração"
      />
      <AdministrationHeader />
      <MyProperties />
    </div>
  );
}
