export function InsertPropertyButton({onClick}) {
  return (
    <div className='flex items-center justify-center py-10 w-60 md:w-80'>
      <button className={` h-20 bg-green rounded-md text-white font-bold flex w-72 justify-center items-center text-center`} onClick={onClick}>
        Criar Produto
      </button>
    </div>
  );
}
