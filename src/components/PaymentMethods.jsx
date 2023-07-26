import WorkInProgress from './WorkInProgress';

function PaymentMethods() {
  return (
    <div className='flex justify-center'>
      <div className='m-3 sm:m-5 max-w-6xl w-full'>
        <h3 className='font-bold text-lg mb-3 sm:mb-5 sm:text-3xl'>
          Payment methods
        </h3>
        <WorkInProgress />
      </div>
    </div>
  );
}

export default PaymentMethods;
