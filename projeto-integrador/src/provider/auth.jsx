import { createContext, useState } from "react";
import Api from "../services/api";
export const AuthContext = createContext({});
export const AuthProvider = (props) => {
  const [dateReservation, setDateReservation] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cities, setCities] = useState([]);
  const [quantityHotels, setQuantityHotels] = useState(0);
  const [isFilter, setIsFilter] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [productID, setProductID] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredProductQnt, setFilteredProductQnt] = useState({
    hotel: 0,
    apartamento: 0,
    hostel: 0,
    pousada: 0,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dateSearch, setDateSearch] = useState({
    startDate: new Date(),
    endDate: new Date(1),
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [myFavorites, setMyFavorites] = useState([]);
  const [myReservations, setMyReservations] = useState([]);
  const [lastPage, setLastPage] = useState(null);
  const [characteristics, setCharacteristics] = useState([]);
  const [productCreated, setProductCreated] = useState({
    nome: "",
    descricao:"",
    regras_da_casa: "",
    saude_e_seguranca: "",
    politica_de_cancelamento: "",
    endereco: "",
    categoria: "",
    cidade: "",
    caracteristicas: "",
    mediaClassificacao: 0,
  });


  

  const [ myProperties, setMyProperties ] = useState([])
  const [ numberOfReservations, setNumberOfReservations ] = useState(0)


  const getTokenLocalStorage = () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      setToken(token);
    }
  };

  const setTokenLocalStorage = (token) => localStorage.setItem("token", token);
  const setTokenGoogleLocalStorage = (token) =>
    localStorage.setItem("tokenGoogle", token);

  const getCategory = async () => {
    const response = await Api.get("/categoria");
    setCategory(response.data);
  };

  const getCities = async () => {
    try {
      const response = await Api.get("/cidade");
      setCities(response.data);
    } catch (error) {
      alert("Erro ao carregar as cidades");
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await Api.get(`/produto/${id}`);
      return response.data;
    } catch (error) {
      alert("Erro ao carregar o produto");
    }
  };

  const getProducts = async () => {
    try {
      const response = await Api.get("/produto");
      const data = response.data;
      setProducts(data);
      setFilteredProduct(data);
      setFilteredProductQnt({
        hotel: data.filter(
          (produto) => produto.categoria.qualificacao === "HOTEL"
        ).length,
        hostel: data.filter(
          (produto) => produto.categoria.qualificacao === "HOSTEL"
        ).length,
        apartamento: data.filter(
          (produto) => produto.categoria.qualificacao === "APARTAMENTO"
        ).length,
        pousada: data.filter(
          (produto) => produto.categoria.qualificacao === "POUSADA"
        ).length,
      });
      return data;
    } catch (error) {
      alert("Erro ao carregar os produtos");
    }
  };

  const cancelReservation = async (id) => {
    // console.log(id);
    try {
      const response = await Api.delete(`/reserva/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // console.log(response.data);
      if (response.status === 200) {
        getReservations();
      // console.log(response.data);
      // console.log(response.status);
        return true;
      }
    } catch (error) {
      // console.log(error);
      return false;
    }
  };

  const cancelReservationId = async (id) => {
    // console.log(id);
    try {
      const response = await Api.delete(`/reserva/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // console.log(response.data);
      if (response.status === 200) {
      getReservationsById(id);
      // console.log(response.data);
      // console.log(response.status);
        return true;
      }
    } catch (error) {
      // console.log(error);
      return false;
    }
  };




  const getProductCityDate = async (cidade, startDate, endDate) => {
    const inicio = new Date(startDate);
    const fim = new Date(endDate);

    const data = {
      dataInicio: inicio.toLocaleDateString("pt-BR"),
      dataFim: fim.toLocaleDateString("pt-BR"),
    };

    try {
      const response = await Api.get(
        `/reserva/consultaReservaDataCidade?cidade=${cidade}&dataInicio=${data.dataInicio}&dataFim=${data.dataFim}`
      );

      if (response.status === 200) {
        const data = response.data;
        setProducts(data);
        setFilteredProduct(data);
        setFilteredProductQnt({
          hotel: data.filter(
            (produto) => produto.categoria.qualificacao === "HOTEL"
          ).length,
          hostel: data.filter(
            (produto) => produto.categoria.qualificacao === "HOSTEL"
          ).length,
          apartamento: data.filter(
            (produto) => produto.categoria.qualificacao === "APARTAMENTO"
          ).length,
          pousada: data.filter(
            (produto) => produto.categoria.qualificacao === "POUSADA"
          ).length,
        });
        return data;
      }
    } catch (e) {
      if (e.request.status >= 400) {
        // console.log(e.message);
        return false;
      }
    }
  };

  const getProductDate = async (startDate, endDate) => {
    const inicio = new Date(startDate);
    const fim = new Date(endDate);

    const data = {
      dataInicio: inicio.toLocaleDateString("pt-BR"),
      dataFim: fim.toLocaleDateString("pt-BR"),
    };

    try {
      const response = await Api.get(
        `/reserva/consultaReservaData?dataInicio=${data.dataInicio}&dataFim=${data.dataFim}`
      );

      if (response.status === 200) {
        const data = response.data;
        setProducts(data);
        setFilteredProduct(data);
        setFilteredProductQnt({
          hotel: data.filter(
            (produto) => produto.categoria.qualificacao === "HOTEL"
          ).length,
          hostel: data.filter(
            (produto) => produto.categoria.qualificacao === "HOSTEL"
          ).length,
          apartamento: data.filter(
            (produto) => produto.categoria.qualificacao === "APARTAMENTO"
          ).length,
          pousada: data.filter(
            (produto) => produto.categoria.qualificacao === "POUSADA"
          ).length,
        });
        return data;
      }
      return false;
    } catch (e) {
      if (e.request.status >= 400) {
        // console.log(e.message);
        return false;
      }
    }
  };

  const getUserByToken = async () => {
    try {
      const response = await Api.get("/authentication/validate", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      // console.log(response.data);
      if (response.status === 200) {
        const data = await response.data;
        setIsAuthenticated(true);
        setUser(data);
        setIsLogged(true);
        setLoading(false);
        // console.log(response.data);
        if (response.data.body.funcoes.id === 2) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        return true;
      }
      setIsAuthenticated(false);
      setIsLogged(false);
      setIsAdmin(false);
      return false;
    } catch (error) {
      // console.log(error);
      setIsAuthenticated(false);
      setIsLogged(false);
      setIsAdmin(false);
      localStorage.removeItem("token");
      return false;
    }
  };

  const searchProductCity = async (selectedOption) => {
    try {
      const response = await Api.get("/produto");
      const data = response.data;
      setProducts(data);

      const city = data.filter(
        (product) => product.cidade.nome === selectedOption.value
      );
      setFilteredProduct(city);

      setFilteredProductQnt({
        hotel: city.filter(
          (produto) => produto.categoria.qualificacao === "HOTEL"
        ).length,
        hostel: city.filter(
          (produto) => produto.categoria.qualificacao === "HOSTEL"
        ).length,
        apartamento: city.filter(
          (produto) => produto.categoria.qualificacao === "APARTAMENTO"
        ).length,
        pousada: city.filter(
          (produto) => produto.categoria.qualificacao === "POUSADA"
        ).length,
      });

      return city;
    } catch (err) {
      if (e.request.status >= 400) {
        // console.log(e.message);
        return false;
      }
    }
  };

  const deleteFavorite = async (id) => {
    const body = {
      produto: {
        id: id,
      },
    };
    try {
      const response = await Api.delete(`/favorito`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: { ...body },
      });
      if (response.status === 200) {
        // console.log(`removido com sucesso`);
        alert("Removido com sucesso");
        getMyFavorites();
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const getMyFavorites = async () => {
    try {
      const response = await Api.get("/favorito/favoritoUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = response.data;
        // console.log(data);
        setMyFavorites(data);
        return data;
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const getReservations = async () => {
    try {
      const response = await Api.get("/reserva/reservaUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = response.data;
        setMyReservations(data);
        // console.log(myReservations);
        // console.log(" reservas", data);
        return data;
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const evaluateBooking = async (bookingId, productId, grade) => {
    const body = {
      id: bookingId,
      produto: {
        id: productId,
      },
      pontuacao: grade,
    };
    try {
      const response = await Api.post(`/classificacao`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response) {
        const data = response.data;
        // console.log(data);
        getReservations();
        return data;
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const getCharacteristics = async () => {
    try {
      const response = await Api.get("/caracteristica", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response) {
        const data = response.data;
        setCharacteristics(data);
        return data;
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const createProduct = async () => {
    // console.log("Estado do Produto");
    // console.log(productCreated);

    try {
      const response = await Api.post("/produto/adicionar", productCreated, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        const data = response.data;
        // console.log(data);
        return true;
      }
    } catch (error) {
      // console.log(error);
      return false;
    }
  };

  const createImage = async (imagem) => {
    try {
      const response = await Api.post(`/imagem`, imagem, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status == 201) {
        return response.data;
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const getMyProperties = async () => {
    try {
      const response = await Api.get("/user/produtosCriados", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response) {
        const data = response.data;
        // console.log(data);
        setMyProperties(data);

        return data;
      }
    } catch (error) {
      // console.log(error);
    }
  };


  

  const getReservationsById = async (id) => {
    try {
      const response = await Api.get(`/produto/buscarReserva/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      }); 
      if (response) {
        const data = response.data;
        // console.log(String(data.length));
        setNumberOfReservations(data.length);

        return data.length; }
      } catch (error) {
        // console.log(error);
      }
    
  };
    



  const searchCategory = (selectedOption, category) => {
    const city = products.filter(
      (product) =>
        product.cidade.nome === selectedOption.value &&
        product.categoria.qualificacao === category
    );
    setFilteredProduct(city);
    return city;
  };

  function truncateDescription(texto, limite) {
    return texto.length > limite ? `${texto.slice(0, limite)}...` : texto;
  }

  return (
    <AuthContext.Provider
      value={{
        products,
        getProducts,
        category,
        getCategory,
        cities,
        getCities,
        isFilter,
        setIsFilter,
        quantityHotels,
        setQuantityHotels,
        searchProductCity,
        filteredProduct,
        setFilteredProduct,
        selectedOption,
        setSelectedOption,
        searchCategory,
        setIsSearch,
        isSearch,
        productDetails,
        setProductDetails,
        getProductById,
        productID,
        setProductID,
        token,
        setToken,
        getTokenLocalStorage,
        setTokenLocalStorage,
        user,
        setUser,
        getUserByToken,
        isLogged,
        setIsLogged,
        getProductCityDate,
        getProductDate,
        loading,
        setLoading,
        filteredProductQnt,
        setDateReservation,
        dateReservation,
        isAuthenticated,
        setIsAuthenticated,
        dateSearch,
        setDateSearch,
        isAdmin,
        setIsAdmin,
        truncateDescription,
        deleteFavorite,
        getMyFavorites,
        myFavorites,
        setMyFavorites,
        getReservations,
        myReservations,
        cancelReservation,
        evaluateBooking,
        lastPage,
        setLastPage,
        setTokenGoogleLocalStorage,
        getCharacteristics,
        characteristics,
        setCharacteristics,
        productCreated,
        setProductCreated,
        createProduct,
        createImage,
        getMyProperties,
        myProperties,
        setMyProperties,
        getReservationsById,
        cancelReservationId
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
