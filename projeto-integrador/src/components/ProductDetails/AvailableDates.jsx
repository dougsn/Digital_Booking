import { CustomCalendar } from '../Calendar/CustomCalendar';
import { ReservationButton } from './ReservationButton';

export function AvailableDates(props) { 
  return (
    <>

      <div className='w-full'>
        <h1 className='text-2xl font-bold text-dark-purple pl-11 pt-11'>
          Datas disponíveis
        </h1>
        <div className='flex justify-center items-center py-11 gap-4'>
          <div className='hidden  lg:block'>
          <CustomCalendar type="product" showDoubleView={true}/>
          </div>
          <div className='hidden  lg:block'>
          <ReservationButton id={props.id} />
          </div>
          <div className='block lg:hidden w-80'>
            <div className='flex flex-col justify-center items-center'>
              <div className='m-auto'><CustomCalendar type="product" showDoubleView={false} /></div>
              <div className=''><ReservationButton id={props.id} /></div> 
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
