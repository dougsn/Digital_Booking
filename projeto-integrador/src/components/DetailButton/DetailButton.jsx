import { ArrowRight } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import styles from "./DetailButton.module.css";

export function DetailButton(props) {
  const navigate = useNavigate();

  return (
    <div className="col-span-2 mt-auto flex justify-end uppercase text-xs">
      <a
        className={`${styles.btn}`}
        onClick={() => {
          window.scrollTo(0, 0);
          navigate(`/home/product/${props.id}`);
        }}
        id={`product-btn-${props.id}`}
      >
          Ver mais <ArrowRight size={16} />
      </a>
    </div>
  );
}
