import React from 'react';
import WorkInProgress from '../components/WorkInProgress';

function Login() {
  return (
    <section className='flex justify-center'>
      <div className='m-3 sm:m-5 max-w-6xl w-full'>
        <h3 className='font-bold text-lg mb-3 sm:mb-5 sm:text-3xl'>Login</h3>
        <WorkInProgress />
      </div>
    </section>
  );
}

export default Login;
