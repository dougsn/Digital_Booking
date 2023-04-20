import { Star, Trash } from "@phosphor-icons/react";
import api from "../../../../services/api";
import { useContext } from "react";
import { AuthContext } from "../../../../provider/auth";
import { toast } from "react-toastify";

export const PropertyImage = ({ images, image_default }) => {
  const { setProductCreated, productCreated } =
    useContext(AuthContext);

  return (
    <div className="p-10">
      <h1 className="text-xl text-dark-purple font-bold pb-3">
        Imagens Cadastradas
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.isArray(images)
          ? images.map((image, index) => {
              return (
                <div id={index} key={index} className="grid-col-1 relative">
                  <img
                    src={image.url}
                    className="h-full w-full object-fit rounded-lg"
                  />
                  <button
                    className="absolute top-0 p-4 bg-white rounded-br-lg rounded-tl-lg bg-opacity-40 backdrop-blur-sm transition-all ease-in-out duration-300 hover:bg-opacity-80"
                    onClick={() => {
                      const url = image.url;
                      setProductCreated({
                        ...productCreated,
                        imagem_default: `${url}`,
                      });
                      toast.success("Imagem padrão definida com sucesso.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                    }}
                  >
                    {image_default === image.url ? (
                      <Star weight="fill" size={24} />
                    ) : (
                      <Star weight="regular" size={24} />
                    )}
                  </button>

                  <button
                    className="absolute top-0 right-0 p-4 bg-red-600 rounded-tr-lg rounded-bl-lg bg-opacity-40 backdrop-blur-sm transition-all ease-in-out duration-300 hover:bg-opacity-100"
                    onClick={async () => {
                      const response = await api.delete(
                        `/imagem/delete/${image.id}`,
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                        }
                      );

                      if (response.status === 200) {
                        toast.warn("Imagem removida com sucesso.", {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });

                        images.splice(index, 1);
                        setProductCreated({
                          ...productCreated,
                          imagens: images,
                        });
                      }
                    }}
                  >
                    <Trash size={24} />
                  </button>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
