import { useNavigate } from 'react-router-dom';
import { CommonButton } from '../CommonButton/CommonButton';

export function CreateAccount() {
  const navigate = useNavigate();
  return (
    <CommonButton
      onClickBtn={() => {
        window.scrollTo(0, 0);
        navigate("/home/registrationForm");
      }}
      text="Criar Conta"
      idButton="btn-criar-conta"
    />
  );
}
