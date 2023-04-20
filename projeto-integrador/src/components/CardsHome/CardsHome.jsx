import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../provider/auth";
import { ProductCard } from "../ProductCard/ProductCard";

export function CardsHome() {
  const {
    getProducts,
    dateSearch,
    setDateSearch,
    filteredProductQnt,
    filteredProduct,
    selectedOption,
    setSelectedOption,
    isSearch,
    setIsSearch,
    products,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const showInfoToast = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const orderProductsByRate = () => {
    const data = products.sort((a, b) =>
      a.mediaClassificacao > b.mediaClassificacao
        ? -1
        : a.mediaClassificacao === b.mediaClassificacao
        ? a.mediaClassificacao > b.mediaClassificacao
          ? -1
          : 1
        : 1
    );

    return data.slice(0, 6);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const searchProductCategory = (event) => {
    if (isSearch === true) {
      if (
        selectedOption === null &&
        new Date(dateSearch.endDate) < new Date()
      ) {
        //TODO: colocar bloqueio para dropdown ou data, aqui temos bloqueio somente por local
        showInfoToast("Selecione uma cidade ou data");
      } else if (
        filteredProduct.filter(
          (products) =>
            products.categoria.qualificacao === event.currentTarget.id
        ).length === 0
      ) {
        showInfoToast(
          `Não há acomadações no momento no tipo ${event.currentTarget.id} para essa cidade`
        );
      } else {
        // searchCategory(selectedOption, event.currentTarget.id);
        const categoria = event.currentTarget.id;

        window.scrollTo(0, 0);
        if (
          selectedOption === null &&
          new Date(dateSearch.endDate) > new Date()
        ) {
          navigate(
            `/home/products/${categoria}/${dateSearch.startDate}/${dateSearch.endDate}`
          );
        } else if (
          selectedOption !== null &&
          new Date(dateSearch.endDate) > new Date()
        ) {
          navigate(
            `/home/products/${selectedOption.value}/${categoria}/${dateSearch.startDate}/${dateSearch.endDate}`
          );
        } else {
          navigate(`/home/products/${selectedOption.value}/${categoria}`);
        }
        setSelectedOption(null);
        setDateSearch({ startDate: new Date(), endDate: new Date(1) });
        setIsSearch(false);
      }
    } else {
      const categoria = event.currentTarget.id;
      window.scrollTo(0, 0);

      navigate(`/home/products/${categoria}`);

      setSelectedOption(null);
      setDateSearch({ startDate: new Date(), endDate: new Date(1) });
      setIsSearch(false);
    }
  };

  return (
    <>
      <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-5">
        <h1 className="col-span-1 md:col-span-4 lg:col-span-4 font-bold text-dark-purple">
          Buscar por tipo de acomodação
        </h1>
        <div
          id="HOTEL"
          onClick={(event) => searchProductCategory(event)}
          className="col-span-4 md:col-span-2 lg:col-span-1 rounded-lg bg-white shadow-md cursor-pointer transition-all ease-in-out duration-300 hover:shadow-2xl"
        >
          <div>
            <div
              className={
                filteredProductQnt.hotel > 0 ? "greyscale-0" : "greyscale"
              }
            >
              <img
                src={
                  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                }
                alt=""
                className={
                  filteredProductQnt.hotel > 0
                    ? "transition-all grayscale-0 rounded-t-lg w-full"
                    : "transition-all grayscale rounded-t-lg w-full"
                }
              />
            </div>
            <div>
              <h2 className="text-dark-purple font-bold m-2">Hotéis</h2>
            </div>
            <div>
              <h3 className="text-xs text-bold m-2 text-dark-purple">
                {
                  filteredProduct.filter(
                    (hotel) => hotel.categoria.qualificacao === "HOTEL"
                  ).length
                }{" "}
                Hotéis
              </h3>
            </div>
          </div>
        </div>
        <div
          id="HOSTEL"
          onClick={(event) => searchProductCategory(event)}
          className="col-span-4 md:col-span-2 lg:col-span-1 rounded-lg bg-white  shadow-lg cursor-pointer transition-all ease-in-out duration-300 hover:shadow-2xl"
        >
          <div>
            <div
              className={
                filteredProductQnt.hostel > 0 ? "greyscale-0" : "greyscale"
              }
            >
              <img
                src={
                  "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                }
                alt=""
                className={
                  filteredProductQnt.hostel > 0
                    ? "transition-all grayscale-0 rounded-t-lg w-full"
                    : "transition-all grayscale rounded-t-lg w-full"
                }
              />
            </div>
            <div>
              <h2 className="text-dark-purple font-bold m-2">Hostels</h2>
            </div>
            <div>
              <h3 className="text-xs text-bold m-2 text-dark-purple">
                {
                  filteredProduct.filter(
                    (hotel) => hotel.categoria.qualificacao === "HOSTEL"
                  ).length
                }{" "}
                Hostels
              </h3>
            </div>
          </div>
        </div>
        <div
          id="APARTAMENTO"
          onClick={(event) => searchProductCategory(event)}
          className="col-span-4 md:col-span-2 lg:col-span-1 rounded-lg bg-white  shadow-lg cursor-pointer transition-all ease-in-out duration-300 hover:shadow-2xl"
        >
          <div>
            <div>
              <img
                src={
                  "https://images.unsplash.com/photo-1594563703937-fdc640497dcd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
                }
                alt=""
                className={
                  filteredProductQnt.apartamento > 0
                    ? "transition-all grayscale-0 rounded-t-lg w-full"
                    : "transition-all grayscale rounded-t-lg w-full"
                }
              />
            </div>
            <div>
              <h2 className="text-dark-purple font-bold m-2">Apartamentos</h2>
            </div>
            <div>
              <h3 className="text-xs text-bold m-2 text-dark-purple">
                {
                  filteredProduct.filter(
                    (hotel) => hotel.categoria.qualificacao === "APARTAMENTO"
                  ).length
                }{" "}
                Apartamentos
              </h3>
            </div>
          </div>
        </div>
        <div
          id="POUSADA"
          onClick={(event) => searchProductCategory(event)}
          className="col-span-4 md:col-span-2 lg:col-span-1 rounded-lg bg-white  shadow-lg cursor-pointer transition-all ease-in-out duration-300 hover:shadow-2xl"
        >
          <div>
            <div>
              <img
                src={
                  "https://images.unsplash.com/photo-1605346576608-92f1346b67d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                }
                alt=""
                className={
                  filteredProductQnt.pousada > 0
                    ? "transition-all grayscale-0 rounded-t-lg w-full"
                    : "transition-all grayscale rounded-t-lg w-full"
                }
              />
            </div>
            <div>
              <h2 className="text-dark-purple font-bold m-2">Pousadas</h2>
            </div>
            <div>
              <h3 className="text-xs text-bold m-2 text-dark-purple">
                {
                  filteredProduct.filter(
                    (hotel) => hotel.categoria.qualificacao === "POUSADA"
                  ).length
                }{" "}
                Pousadas
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
        <h1 className="col-span-2 md:col-span-4 lg:col-span-4 font-bold text-dark-purple">
          Recomendações
        </h1>

        {orderProductsByRate().map((produto) => (
          <ProductCard product={produto} key={produto.id} />
        ))}
      </div>
    </>
  );
}
