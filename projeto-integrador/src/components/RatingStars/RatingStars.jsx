import { Star } from "@phosphor-icons/react";

export const RatingStars = ({ rate = 0 }) => {
  const showStart = (classificacao) => {
    let dataArray = [];

    for (let i = 1; i <= 5; i++) {
      i <= classificacao
        ? dataArray.push(<Star weight="fill" color="#1dbeb4" key={i} />)
        : dataArray.push(<Star color="#1dbeb4" key={i} />);
    }

    return dataArray;
  };

  return showStart(rate).map((star) => star);
};
