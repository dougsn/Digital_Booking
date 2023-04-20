import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import Select from "react-select";
import { MagnifyingGlass, MapPin } from "@phosphor-icons/react";
import { AuthContext } from "../../provider/auth";
import { CommonButton } from "../CommonButton/CommonButton";

export function Main() {
  const {
    getCities,
    cities,
    searchProductCity,
    selectedOption,
    setSelectedOption,
    setIsSearch,
    getProductDate,
    getProductCityDate,
    dateSearch,
    setDateSearch,
  } = useContext(AuthContext);

  useEffect(() => {
    getCities();
  }, []);

  function handleChange(selected) {
    setSelectedOption(selected);
  }

  const searchQuery = async () => {
    if (new Date(dateSearch.endDate) > Date.now() && selectedOption) {
      await getProductCityDate(
        selectedOption.value,
        dateSearch.startDate,
        dateSearch.endDate
      );
      setIsSearch(true);
    } else if (new Date(dateSearch.endDate) > Date.now() && !selectedOption) {
      await getProductDate(dateSearch.startDate, dateSearch.endDate);
      setIsSearch(true);
    } else if (selectedOption) {
      searchProductCity(selectedOption);
      setIsSearch(true);
    } else {
      alert("Por favor, preencha algum dado para pesquisar");
    }
  };

  const handleValueChange = (newValue) => {
    setDateSearch(newValue);
  };

  const formatOptionLabel = ({ label }) => (
    <div className="flex items-center border-green border-b-2">
      <MapPin color="#383b58" size={20} className={"mr-3"} />
      <div className="flex flex-col">
        <div className="font-bold">{label}</div>
        <div className="text-sm text-dark-purple font-bold">Brasil</div>
      </div>
    </div>
  );

  const getOption = () => {
    const options = cities.map((city) => {
      return {
        value: city.nome,
        label: city.nome,
      };
    });
    return options;
  };

  return (
    <>
      <main className="w-full bg-dark-purple pt-24">
        <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-1 gap-5">
          <h1 className="text-white text-center text-2xl font-bold">
            Buscar ofertas em hotéis, casas e muito mais
          </h1>
          <div className="flex flex-col items-center justify-center gap-5 my-3 md:flex-row">
            <div>
              <Select
                className="w-full md:w-60"
                placeholder={
                  <div className="flex items-center gap-1 w-60">
                    {" "}
                    <MapPin />
                    <div></div> Onde Vamos?{" "}
                  </div>
                }
                options={getOption()}
                formatOptionLabel={formatOptionLabel}
                value={selectedOption}
                onChange={handleChange}
              />
            </div>
            <div className="rounded-none">
              <Datepicker
                placeholder={"Check in - Check out"}
                inputClassName="text-sm font-bold dark:bg-white rounded-md"
                startFrom={new Date()}
                value={dateSearch}
                displayFormat={"DD/MM/YYYY"}
                minDate={new Date()}
                onChange={handleValueChange}
                showShortcuts={true}
                classNames="w-60"
              />
            </div>
            <div>
              <CommonButton
                onClickBtn={searchQuery}
                outline={false}
                text="Buscar"
                className="w-60 h-10 flex justify-center items-center gap-2"
                icon={<MagnifyingGlass size={16} />}
                idButton="btn-buscar-produto"
              />
            </div>
          </div>
        </div>
      </main>

      <Outlet />
    </>
  );
}
