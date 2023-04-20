import {
  Gift,
  Car,
  Television,
  Snowflake,
  WifiHigh,
  PawPrint,
  SwimmingPool,
  Star,
  Confetti,
  Tent,
  CookingPot,
  Wheelchair 
} from "@phosphor-icons/react";
import { useContext } from "react";
import { AuthContext } from "../../provider/auth";

export function Characteristics() {
  const { productDetails } = useContext(AuthContext);

  const iconTag = (icon) => {
    if (icon === "WifiHigh") {
      return <WifiHigh color="#383b58" size={32} />;
    } else if (icon === "SwimmingPool") {
      return <SwimmingPool color="#383b58" size={32} />;
    } else if (icon === "Star") {
      return <Star color="#1dbeb4" size={32} />;
    } else if (icon === "Car") {
      return <Car color="#383b58" size={32} />;
    } else if (icon === "Snowflake") {
      return <Snowflake color="#383b58" size={32} />;
    } else if (icon === "Television") {
      return <Television color="#383b58" size={32} />;
    } else if (icon === "Confetti") {
      return <Confetti color="#383b58" size={32} />;
    } else if (icon === "PawPrint") {
      return <PawPrint color="#383b58" size={32} />;
    } else if (icon === "Tent") {
      return <Tent color="#383b58" size={32} />;
    } else if (icon === "CookingPot") {
      return <CookingPot color="#383b58" size={32} />;
    } else if (icon === "Wheelchair") {
      return <Wheelchair color="#383b58" size={32} />;
    }
  };

  return (
    <>
      <div className="w-full bg-white  ">
        <h1 className="text-2xl font-bold text-dark-purple pl-11 pt-11">
          O que esse lugar oferece?
        </h1>

        <hr className="h-px bg-green border-0 mt-6" />

        <div className="pl-11 py-11">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {productDetails?.caracteristicas?.map((characteristic, index) => (
              <div key={index} className="flex items-center ">
                {iconTag(characteristic.icone.nome_icone)}
                <p className="pl-4 font-medium text-dark-purple uppercase">
                  {characteristic.nome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
