import { useNavigate } from 'react-router-dom';
import { CommonButton } from '../CommonButton/CommonButton';

export function Login() {
  const navigate = useNavigate();
  return (
    <CommonButton
      onClickBtn={() => {
        window.scrollTo(0, 0);
        navigate("/home/login");
      }}
      text="Iniciar Sessão"
      idButton="btn-login"
    />
  );
}
