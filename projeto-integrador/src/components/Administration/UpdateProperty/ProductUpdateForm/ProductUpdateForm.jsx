import { useEffect, useState } from "react";
import Select from "react-select";
import {
  Star,
  WifiHigh,
  Snowflake,
  Television,
  Car,
  SwimmingPool,
  Tent,
  PawPrint,
  CookingPot,
  Wheelchair,
  Confetti,
} from "@phosphor-icons/react";
import { useContext } from "react";
import { AuthContext } from "../../../../provider/auth";


export function ProductUpdateForm() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const {
    getCategory,
    category,
    getCities,
    cities,
    getCharacteristics,
    characteristics,
    productCreated,
    setProductCreated,
  } = useContext(AuthContext);

  useEffect(() => {
    async function fetch() {
      getCategory();
      getCities();
      getCharacteristics();
      // console.log(characteristics);
    }
    fetch();
  }, []);

  const cityOptions = () => {
    const options = cities.map((data) => {
      return {
        value: data.nome,
        label: `${data.nome}, ${data.estado} `,
        id: data.id,
      };
    });
    return options;
  };

  const categoryOptions = () => {
    const options = category.map((data) => {
      return {
        value: data.qualificacao,
        label: data.qualificacao,
        id: data.id,
      };
    });
    return options;
  };





  const handleSelect = (Options) => {
    // console.log(Options);
    const values = Options.map((option) => option.id);
    setSelectedOptions(values);
    // console.log(selectedOptions)
    // console.log(values);
    const arrayId = values.map((id) => ({ id: id }));
    setProductCreated({ ...productCreated, caracteristicas: arrayId });
  };

  const formatOptionLabel = ({ value, label, icon }) => (
    <div className="flex flex-wrap items-center h-auto">
    {icon}
    <span className="ml-2 uppercase flex items-center justify-center">{label}</span>
  </div>
  );

  const formatOptionCategoryLabel = ({ value, label }) => (
    <div className="flex items-center">
      <span className="ml-2 text-dark-purple uppercase">{label}</span>
    </div>
  );

  const formatOptionCityLabel = ({ value, label }) => (
    <div className="flex items-center">
      <span className="ml-2 text-dark-purple uppercase">{label}</span>
    </div>
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductCreated({ ...productCreated, [name]: value });
  };

  const handleCategoryChange = (selectedOption) => {
    setProductCreated({
      ...productCreated,
      categoria: { id: selectedOption.id },
    });
  };

  const handleCityChange = (selectedOption) => {
    setProductCreated({ ...productCreated, cidade: { id: selectedOption.id } });
  };

  const iconTag = (icon) => {
    if (icon === "WifiHigh") {
      return <WifiHigh color="#383b58" />;
    } else if (icon === "SwimmingPool") {
      return <SwimmingPool color="#383b58" />;
    } else if (icon === "Star") {
      return <Star color="#1dbeb4" />;
    } else if (icon === "Car") {
      return <Car color="#383b58" />;
    } else if (icon === "Snowflake") {
      return <Snowflake color="#383b58" />;
    } else if (icon === "Television") {
      return <Television color="#383b58" />;
    } else if (icon === "Confetti") {
      return <Confetti color="#383b58" />;
    } else if (icon === "PawPrint") {
      return <PawPrint color="#383b58" />;
    } else if (icon === "Tent") {
      return <Tent color="#383b58" />;
    } else if (icon === "CookingPot") {
      return <CookingPot color="#383b58" />;
    } else if (icon === "Wheelchair") {
      return <Wheelchair color="#383b58" />;
    }
  };

  const options = () => {
    // console.log(characteristics)
    const options = characteristics.map((characteristic) => {
      return {
        value: characteristic.nome,
        label: characteristic.nome,
        icon: iconTag(characteristic.icone.nome_icone),
        id: characteristic.id,
      };
    });
    return options;
  };

  const currentCategories = () => {
      const options = productCreated.caracteristicas.map((characteristic) => {
        return {
        value: characteristic.nome,
        label: characteristic.nome,
        icon: iconTag(characteristic.icone.nome_icone),
        id: characteristic.id,
        };
      }
      );
      return options; 
  }


  const initialCategories = [
    { value: 'category1', label: 'Categoria 1' },
    { value: 'category2', label: 'Categoria 2' }
  ];

  const currentCategory = () => {
      return {
        value: productCreated.categoria.qualificacao,
        label: productCreated.categoria.qualificacao,
        id:   productCreated.categoria.id,
      };
  };

  const currentCity = () => {
      return {
        value: productCreated.cidade.nome,
        label: `${productCreated.cidade.nome}, ${productCreated.cidade.estado}`,
        id:   productCreated.cidade.id,
      };
  };  



  return (
    <div className="px-10 my-5">
      <h2 className="text-2xl font-bold text-dark-purple pl-10 pt-9 text-center">
          Editar propriedade
        </h2>
      <div className="flex flex-col items-center justify-center">
        <div className="text-dark-purple font-bold container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 my-5">
          <div>
            <div>
              <label htmlFor="name">Nome</label>
            </div>
            <div className="pt-2">
              <input
                value={productCreated.nome}
                onChange={handleChange}
                type="text"
                name="nome"
                id="name"
                placeholder="Hotel Hermirage"
                className="w-full h-10 pl-2 font-medium text-dark-purple rounded-md border border-dark-purple/20"
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="category">Categoria</label>
            </div>
            <div className="pt-2">
              <Select
                className="w-full  h-8 text-md text-dark-purple"
                placeholder="Categoria"
                menuPlacement="auto"
                options={categoryOptions()}
                formatOptionLabel={formatOptionCategoryLabel}
                onChange={handleCategoryChange}
                defaultValue={currentCategory()}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="address">Endereço</label>
            </div>
            <div className="pt-2">
              <input
                value={productCreated.endereco}
                onChange={handleChange}
                name="endereco"
                type="text"
                id="address"
                placeholder="Av Cólon 1643"
                className="w-full h-10 pl-2 font-medium text-dark-purple rounded-md border border-dark-purple/20"
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="city">Cidade</label>
            </div>
            <div className="pt-2">
              <Select
                className="w-full h-8 font-medium text-dark-purple"
                placeholder="Cidade"
                menuPlacement="auto"
                options={cityOptions()}
                formatOptionLabel={formatOptionCityLabel}
                onChange={handleCityChange}
                defaultValue={currentCity()}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <div>
              <label htmlFor="address">Descrição</label>
            </div>
            <div className="pt-2">
              <textarea
                value={productCreated.descricao}
                onChange={handleChange}
                name="descricao"
                cols="10"
                rows="10"
                placeholder="Escreva aqui"
                className="w-full resize-none rounded-md border border-dark-purple/20 font-medium text-dark-purple pl-2 pt-2"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <h2>Adiconar atributos</h2>
            <div className="pt-2">
              <Select
                isMulti
                options={options()}
                formatOptionLabel={formatOptionLabel}
                onChange={handleSelect}
                defaultValue={currentCategories}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
