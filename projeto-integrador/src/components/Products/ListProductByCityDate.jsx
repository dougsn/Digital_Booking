import {
  ArrowFatDown,
  ArrowFatUp,
  CaretCircleDoubleLeft,
  CaretCircleDoubleRight,
  CaretDoubleRight,
  CaretLeft,
  DotsSixVertical,
} from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/auth";
import { useNavigate, useParams } from "react-router-dom";
import { ProductCard } from "../ProductCard/ProductCard";
import { PageSubtitle } from "../PageSubtitle/PageSubtitle";
import ReactPaginate from "react-paginate";
import { HeadHelmet } from "../../components/HeadHelmet/HeadHelmet";
import og_image from "../../assets/og_image.jpg";


export function ListProductByCityDate() {
  const { getProductCityDate } = useContext(AuthContext);
  const { cidade, categoria, dataInicial, dataFinal } = useParams();
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 8;
  const pagesVisited = pageNumber * productsPerPage;

  const navigate = useNavigate();

  useEffect(() => {
    async function loadPage() {
      const response = await getProductCityDate(cidade, dataInicial, dataFinal);

      if (response) {
        let dataArray = [];
        response.filter((produto) => {
          produto.categoria.qualificacao === categoria
            ? dataArray.push(produto)
            : "";
        });
        setFilteredProduct([...dataArray]);
      }
    }

    loadPage();
  }, []);

  const displayProducts = filteredProduct
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((product) => <ProductCard product={product} key={product.id} />);

  const pageCount = Math.ceil(filteredProduct.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <HeadHelmet
        title={`Digital Booking - ${categoria} em ${cidade} de ${dataInicial} à ${dataFinal}`}
        url={window.location.href}
        image={og_image}
        description={`Digital Booking - ${categoria} em ${cidade} de ${dataInicial} à ${dataFinal}`}
      />
      <div className="flex flex-col flex-1 w-full justify-between">
        <div>
          <PageSubtitle
            categoria={categoria}
            dataInicial={dataFinal}
            dataFinal={dataFinal}
            cidade={cidade}
            title="Pesquisa"
          />

          <div className="container mx-auto p-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
            {displayProducts}
          </div>
        </div>

        <div className="flex justify-center items-center m-4">
          <ReactPaginate
            previousLabel={<CaretCircleDoubleLeft size={25} />}
            nextLabel={<CaretCircleDoubleRight size={25} />}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={
              "paginationBttns flex justify-center items-center gap-3 font-bold text-white text-md bg-green text-center w-auto p-2  rounded-lg"
            }
            pageClassName={"page-item"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive  text-dark-purple underline "}
          />
        </div>
      </div>
    </>
  );
}
