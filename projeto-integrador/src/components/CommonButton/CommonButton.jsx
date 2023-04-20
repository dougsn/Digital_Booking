import styles from './CommonButton.module.css';

export const CommonButton = ({ text, onClickBtn, outline=true, className, icon, idButton, type='button'}) => {
    return (
      <>
        <button
          className={`${styles.btn} ${
            outline
              ? `text-darker-green hover:text-white hover:bg-green`
              : `bg-darker-green text-white hover:bg-green`
          } border-2 border-darker-green hover:border-green border-solid px-4 rounded-md mr-2 transition ease duration-300 flex items-center justify-center ${className} h-10 shadow-md hover:shadow-xl`}
          onClick={onClickBtn ? onClickBtn : null}
          id={idButton}
          type={type}
        >
          {icon ? icon : ""} {text}
        </button>
      </>
    );
};
