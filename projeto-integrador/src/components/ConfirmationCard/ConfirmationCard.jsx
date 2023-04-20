import { useNavigate } from 'react-router-dom';

import SealCheck from '../../assets/seal-check.svg';

export function ConfirmationCard(props) {
  const navigate = useNavigate();

  return (
    /* paddings testados md:py-12 md:px-24 sm:py-[52px] sm:px-10 */
    <div className='bg-ice-white flex-1 flex items-center justify-center'>
      <div className='bg-white w-[638px] flex flex-col items-center justify-center rounded-lg shadow-lg'>
        <img src={SealCheck} color='#1dbeb4' className='pt-8 pb-5' />
        <h1 className='font-bold text-green text-2xl pt-2 pb-2'>
          Muito obrigado!
        </h1>
        <p className='font-bold text-dark-purple text-lg'>
          {props.cardMessage}
        </p>
        <div className='pt-7 pb-12'>
          <button
            className='text-white font-bold py-2 px-24 rounded-lg bg-green'
            onClick={() => {
              if (props.buttonTitle === 'Voltar') {
                window.scrollTo(0, 0);
                navigate('/home/administrator');
              } else {
                window.scrollTo(0, 0);
                navigate('/home/');
              }
            }}
          >
            {props.buttonTitle}
          </button>
        </div>
      </div>
    </div>
  );
}
