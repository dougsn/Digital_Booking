import axios from "axios";
import { useRef, useState, useContext, useEffect } from "react";
import {
  Trash,
  CloudArrowUp,
  PushPin,
  CircleNotch,
} from "@phosphor-icons/react";
import { AuthContext } from "../../../provider/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../services/api";
import { InsertPropertyButton } from "../InsertProperty/InsertPropertyButton";
import { useNavigate} from "react-router-dom";

export function UploadImages(props) {
  const { setProductCreated, productCreated, createImage } =
    useContext(AuthContext);
     const navigate = useNavigate();


  const [favorite, setIsFavorite] = useState(false);
  const [indexImage, setIndexImage] = useState(0);
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);

  const API_ENDPOINT =
    "https://aergi5fxma.execute-api.sa-east-1.amazonaws.com/default/getPresignedImageURL";

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFileList([...fileList, newFile]);
      // props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    // props.onFileChange(updatedList);
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
    if (fileList.length < 5) {
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

    let imageListUrl = [];
    let imageListObj = [];
    let urlFavoriteImage = null;

    if (validateProduct()) {
      await Promise.all(
        fileList.map(async (file, index) => {
          try {
            // Capturando a URL pré assinada
            const presignedUrl = await getPresignedURL();

            const urlUploadBucket = presignedUrl.uploadURL;
            const fileName = presignedUrl.Key;

            try {
              // Realizando upload para o bucket
              const result = await axios.put(urlUploadBucket, file, {
                headers: {
                  "Content-Type": "image/jpeg",
                },
              });

              // Sucesso no upload
              if (result.status == 200) {
                // Validação se a imagem foi favoritada
                if (favorite) {
                  if (index === indexImage) {
                    urlFavoriteImage = `https://bucket-dh-grupo7.s3.sa-east-1.amazonaws.com/${fileName}`;
                  }
                } else {
                  if (urlFavoriteImage === null) {
                    urlFavoriteImage = `https://bucket-dh-grupo7.s3.sa-east-1.amazonaws.com/${fileName}`;
                  }
                }

                // Adiciona a imagem com titulo no Array
                imageListUrl.push({
                  titulo: fileName,
                  url: `https://bucket-dh-grupo7.s3.sa-east-1.amazonaws.com/${fileName}`,
                });
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
        })
      );

      // Código funcionoso

      if (imageListUrl.length === fileList.length) {
        await Promise.all(
          imageListUrl.map(async (image) => {
            try {
              const imagem = await createImage(image);
              // console.log(imagem);
              imageListObj.push({ id: imagem.id });
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
          })
        );

        if (imageListObj.length === imageListUrl.length) {
          try {
            const data = {
              ...productCreated,
              imagem_default: urlFavoriteImage,
              imagens: imageListObj,
            };

            const response = await api.post("/produto/adicionar", data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            });
            if (response.status === 201) {
              toast.success("Produto criado com sucesso!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });

              setFileList([]);
              setProductCreated({
                nome: "",
                descricao: "",
                regras_da_casa: "",
                saude_e_seguranca: "",
                politica_de_cancelamento: "",
                endereco: "",
                categoria: "",
                cidade: "",
                caracteristicas: [],
                mediaClassificacao: 0,
              });
              setIsFavorite(false);
              setIndexImage(0);
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
        } else {
          toast.error(
            `Houve um erro no vinculo de alguma imagem ao produto. Tente novamente mais tarde`,
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
      } else {
        toast.error(
          `Houve um erro no upload de alguma imagem para nosso servidor. Tente novamente mais tarde`,
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

    setTimeout(() => {
      button.innerHTML = "Criar Produto";
      button.disabled = "";
      button.classList.remove("bg-slate-600");
    }, 2000);

    // fim do código funcionso
  };

  // const handleClick = (event) => {
  //   event.preventDefault();
  //   let newArray = fileList.current.files;
  //   for (let i = 0; i < newArray.length; i++) {
  //     handleSubmit(newArray[i]);
  //   }
  // };

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
                    Arraste suas imagens aqui
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

          {fileList.length > 0 ? (
            <div>
              <h1 className="text-xl text-dark-purple font-bold md:pt-8">
                Selecione uma imagem para capa
              </h1>
              <div className="mt-7">
                {fileList.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center justify-between p-4 rounded-xl mb-3 ${
                      indexImage === index && favorite == true
                        ? "bg-slate-400"
                        : "bg-slate-100"
                    }`}
                  >
                    <div className="text-md text-dark-purple font-medium">
                      <p>{item.name}</p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        className="bg-green w-10 h-10 rounded-full flex items-center justify-center  right-3 hover:opacity-80"
                        onClick={() => {
                          setIsFavorite(true);
                          setIndexImage(index);
                          // console.log(index);
                        }}
                      >
                        <PushPin
                          size={20}
                          className=" text-white"
                          weight="fill"
                        />
                      </button>
                      <button
                        className="bg-red-500 w-10 h-10 rounded-full flex items-center justify-center  right-3 hover:opacity-80"
                        onClick={() => fileRemove(item)}
                      >
                        <Trash size={20} className=" text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex justify-center items-center">
          <InsertPropertyButton onClick={handleSubmit} />
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
