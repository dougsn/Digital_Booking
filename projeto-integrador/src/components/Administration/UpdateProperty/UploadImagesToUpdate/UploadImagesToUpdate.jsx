import axios from "axios";
import { useRef, useContext } from "react";
import { CloudArrowUp } from "@phosphor-icons/react";
import { AuthContext } from "../../../../provider/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../services/api";
import { CommonButton } from "../../../CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";

export function UploadImagesToUpdate(props) {
  const { setProductCreated, productCreated, createImage } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const wrapperRef = useRef(null);

  const API_ENDPOINT =
    "https://aergi5fxma.execute-api.sa-east-1.amazonaws.com/default/getPresignedImageURL";

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = async (e) => {
    const newFile = e.target.files[0];

    try {
      const presignedUrl = await getPresignedURL();
      const urlUploadBucket = presignedUrl.uploadURL;
      const fileName = presignedUrl.Key;

      try {
        // Realizando upload para o bucket
        const result = await axios.put(urlUploadBucket, newFile, {
          headers: {
            "Content-Type": "image/jpeg",
          },
        });

        // Sucesso no upload
        if (result.status == 200) {
          try {
            const dataImage = {
              titulo: fileName,
              url: `https://bucket-dh-grupo7.s3.sa-east-1.amazonaws.com/${fileName}`,
            };
            const imagem = await createImage(dataImage);
            // console.log(imagem);
            const newImageArray = [...productCreated.imagens, { ...imagem }];
            // console.log(newImageArray);
            setProductCreated({
              ...productCreated,
              imagens: newImageArray,
            });
            // console.log(productCreated);
            setTimeout(
              () =>
                toast.success("Imagem adicionada!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                }),
              3000
            );
          } catch (e) {
            toast.error(
              `Houve um erro no vinculo das imagens com o produto. Tente novamente mais tarde`,
              {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              }
            );
          }
        }
      } catch (e) {
        toast.error(
          `Houve um erro no envio da imagem. Tente novamente mais tarde.`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
    } catch (e) {
      toast.error(
        `Houve um erro na captura da URL. Tente novamente mais tarde`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  const getPresignedURL = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: API_ENDPOINT,
      });

      if (response.status == 200) {
        return response.data;
      }
    } catch (e) {
      alert("Não foi possível pegar a URL do bucket");
    }
  };

  function changeNameProperty(value) {
    switch (value) {
      case "nome":
        return "Nome";
      case "descricao":
        return "Descrição";
      case "regras_da_casa":
        return "Regras da Casa";
      case "saude_e_seguranca":
        return "Saúde e Segurança";
      case "politica_de_cancelamento":
        return "Politica de Cancelamento";
      case "endereco":
        return "Endereço";
      case "categoria":
        return "Categoria";
      case "cidade":
        return "Cidade";
      case "caracteristicas":
        return "Características";
    }
  }

  const validateProduct = () => {
    let errosForm = [];
    // Validação das imagens
    if (productCreated.imagens.length < 5) {
      toast.error("Adicione pelo menos 5 imagens ao produto", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      errosForm.push("Fotos");
    }

    // Validação dos dados do produto
    Object.keys(productCreated).map((key) => {
      if (productCreated[key] !== "") {
        // console.log(productCreated[key]);
      } else {
        errosForm.push(changeNameProperty(key));
      }
    });

    if (errosForm.length > 0) {
      toast.error(
        `Houve erro nos seguintes pontos:${errosForm.map(
          (erro) => ` ${erro}`
        )}`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );

      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const button = e.target;

    button.innerHTML =
      "<svg class='animate-spin h-5 w-5 mr-3' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'><rect width='256' height='256' fill='none'/><path d='M168,40a97,97,0,0,1,56,88,96,96,0,0,1-192,0A97,97,0,0,1,88,40' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='16'/></svg></svg> Processando...";

    button.disabled = "true";
    button.classList.add("bg-slate-600");

    if (validateProduct()) {
      try {
        // console.log("Atualização do produto");
        // console.log(productCreated);
        const response = await api.put(
          `/produto/atualizar/${productCreated.id}`,
          productCreated,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          // console.log("Produto atualizado");
          // console.log(response.data);
          toast.success("Produto atualizado com sucesso!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/home/administrator");
        }
      } catch (error) {
        toast.error(
          `Houve um erro na criação do produto. Tente novamente mais tarde.`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }

      setTimeout(() => {
        button.innerHTML = "Atualizar Produto";
        button.disabled = "";
        button.classList.remove("bg-slate-600");
      }, 2000);
    }
  };

  return (
    <>
      <div className=" px-5 md:px-10 pt-10">
        <div className="grid lg:grid-cols-2 md:grid-cols-1">
          <div>
            <h1 className="text-xl text-dark-purple font-bold pb-4">
              Carregar Imagens
            </h1>
            <div className="flex justify-center items-center m-8">
              <div
                ref={wrapperRef}
                className="relative w-[220px] md:w-[400px] h-[200px] border-2 border-dashed rounded-[20px] border-pastel-purple flex items-center justify-center bg-slate-100 hover:opacity-60"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
                <div className="flex flex-col items-center justify-center">
                  <CloudArrowUp size={48} className="text-green" />

                  <p className="text-zinc-500 font-medium pt-4">
                    Arraste sua imagem aqui
                  </p>
                  <p className="text-zinc-500 font-medium">
                    ou clique para selecionar
                  </p>
                </div>
                <input
                  type="file"
                  id="fileUpload"
                  onChange={onFileDrop}
                  className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center p-10">
          <CommonButton
            text="Atualizar Produto"
            outline={false}
            className="flex justify-center items-center md:w-96"
            onClickBtn={handleSubmit}
          />
          {/* <InsertPropertyButton /> */}
        </div>

        {/*  <div className='flex items-center justify-center py-10'>
        <button
          className='py-3 px-32 bg-green rounded-md text-white font-bold'
          onClick={handleSubmit}
        >
          Criar
        </button>
      </div> */}
      </div>
    </>
  );
}
