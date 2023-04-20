import { CaretLeft } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/auth";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../ProductCard/ProductCard";
import ReactPaginate from "react-paginate";
import { HeadHelmet } from "../../components/HeadHelmet/HeadHelmet";
import og_image from "../../assets/og_image.jpg";

export function Products() {
  const { getProducts } = useContext(AuthContext);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 8;
  const pagesVisited = pageNumber * productsPerPage;
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPage() {
      const response = await getProducts();
      if (response) {
        setFilteredProduct(response);
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
        title="Digital Booking - Listagem de Produtos"
        url={window.location.href}
        image={og_image}
        description="Digital Booking - Listagem de Produtos"
      />
      <div className="flex flex-col flex-1 w-full justify-between">
        <div>
          <div className="flex justify-between bg-dark-purple w-full h-20 text-white font-bold">
            <div className="mx-7 mt-4 md:mx-10">
              <h2 className="text-xs">Pesquisa</h2>
              <h1 className="text-xl">Listagem de produtos</h1>
            </div>
            <button onClick={() => navigate("/home")} className="mx-7 md:mx-10">
              <CaretLeft size={38} color="#f5f5f5" weight="bold" />
            </button>
          </div>
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
