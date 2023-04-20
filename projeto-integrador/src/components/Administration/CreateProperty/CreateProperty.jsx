import { AdministrationHeader } from "../Header/AdministrationHeader";
import { ProductCreationForm } from "../ProductCreationForm/ProductCreationForm";
import { ProductPolicy } from "../ProductPolicy/ProductPolicy";
import { UploadImages } from "../UploadImages/UploadImages";
import { HeadHelmet } from "../../../components/HeadHelmet/HeadHelmet";
import og_image from "../../../assets/og_image.jpg";


export function CreateProperty (){
  return (
    <>
      <HeadHelmet
        title="Digital Booking - Criar produto"
        url={window.location.href}
        image={og_image}
        description="Digital Booking - Criar produto"
      />
      <div>
        <AdministrationHeader />
      </div>
      <div className="bg-white mx-10 rounded-md outline outline-1 outline-dark-purple/10">
        <ProductCreationForm />
        <ProductPolicy />
        <UploadImages />
      </div>
    </>
  );

}