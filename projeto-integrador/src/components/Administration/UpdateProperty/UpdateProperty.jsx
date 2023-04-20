import { useParams } from "react-router-dom";
import { ProductUpdateForm } from "./ProductUpdateForm/ProductUpdateForm";
import { useContext, useEffect, useState } from "react";
import { AdministrationHeader } from "../Header/AdministrationHeader";
import { AuthContext } from "../../../provider/auth";
import { ProductPolicy } from "../ProductPolicy/ProductPolicy";
import { PropertyImage } from "./PropertyImages/PropertyImage";
import { UploadImagesToUpdate } from "./UploadImagesToUpdate/UploadImagesToUpdate";
import { HeadHelmet } from "../../../components/HeadHelmet/HeadHelmet";
import og_image from "../../../assets/og_image.jpg";

export function UpdateProperty() {
  const { getProductById, productCreated, setProductCreated } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProductById(id);
      setProductCreated({
        ...productCreated,
        id: data.id,
        nome: data.nome,
        descricao: data.descricao,
        regras_da_casa: data.regras_da_casa,
        saude_e_seguranca: data.saude_e_seguranca,
        politica_de_cancelamento: data.politica_de_cancelamento,
        endereco: data.endereco,
        categoria: data.categoria,
        cidade: data.cidade,
        caracteristicas: data.caracteristicas,
        mediaClassificacao: data.mediaClassificacao,
        imagens: data.imagens,
        imagem_default: data.imagem_default,
      });
      // console.log(data);
      setLoading(false);
    }

    fetchProduct();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="w-full bg-ice-white pb-10">
      <HeadHelmet
        title="Digital Booking - Atualizar Produto"
        url={window.location.href}
        image={og_image}
        description="Digital Booking - Atualizar Produto"
      />
      <AdministrationHeader />
      <div className="bg-white mx-10 rounded-md outline outline-1 outline-dark-purple/10">
        <ProductUpdateForm />
        <ProductPolicy />
        <PropertyImage
          images={productCreated.imagens}
          image_default={productCreated.imagem_default}
        />
        <UploadImagesToUpdate />
      </div>
    </div>
  );
}
