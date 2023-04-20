import {
  CaretCircleDoubleLeft,
  CaretCircleDoubleRight,
  CaretDoubleRight,
  CaretLeft,
} from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/auth";
import { useNavigate, useParams } from "react-router-dom";
import { ProductCard } from "../ProductCard/ProductCard";
import ReactPaginate from "react-paginate";
import { PageSubtitle } from "../PageSubtitle/PageSubtitle";
import { HeadHelmet } from "../../components/HeadHelmet/HeadHelmet";
import og_image from "../../assets/og_image.jpg";

export function ListProductByCity() {
  const { getProducts } = useContext(AuthContext);
  const { cidade, categoria } = useParams();
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 8;
  const pagesVisited = pageNumber * productsPerPage;

  const navigate = useNavigate();

  useEffect(() => {
    async function loadPage() {
      const response = await getProducts();
      if (response) {
        const city = response.filter(
          (product) =>
            product.cidade.nome === cidade &&
            product.categoria.qualificacao === categoria
        );
        setFilteredProduct(city);
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
        title={`Digital Booking - ${categoria} em ${cidade}`}
        url={window.location.href}
        image={og_image}
        description={`Digital Booking - ${categoria} em ${cidade}`}
      />
      <div className="flex flex-col flex-1 w-full justify-between gap-5">
        <div>
          <PageSubtitle
            title="Pesquisa"
            categoria={categoria}
            cidade={cidade}
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
