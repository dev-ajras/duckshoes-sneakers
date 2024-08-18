import whatsappIcon from '/assets/social/whatsappIcon.svg';
import instagramIcon from '/assets/social/instagramIcon.svg';
import facebookIcon from '/assets/social/facebookIcon.svg';

import { MdEmail } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import GrvityLogo from './icons/GravityLogo';

function Footer() {
  const { user } = useContext(AppContext);

  return (
    <footer className='bg-background mt-3 w-full sm:mt-5 text-white'>
      <div className='p-3 sm:p-5 flex justify-center'>
        <div className='w-full lg:flex lg:py-8 lg:my-5 lg:gap-20 xl:gap-32 lg:max-w-6xl'>
          <div className='my-3 mt-0 pt-4 sm:my-5 sm:pt-6 lg:pt-0 lg:m-0'>
            <h4 className='font-semibold text-4xl sm:text-5xl lg:text-4xl'>
              Somos <span className='text-primary'>Duck Shoes</span>
            </h4>
            <ul className='font-normal flex gap-2 sm:gap-3 sm:text-2xl sm:mt-2 lg:text-xl opacity-90'>
              <li>#Zapatillas</li>
              <li>#Botas</li>
              <li>#Borcegos</li>
            </ul>
            <div className='flex gap-3 mt-3 sm:gap-5 sm:mt-5'>
              <a
                className='bg-white md:hover:bg-rose-100 md:transition-colors p-2.5 w-10 rounded-full sm:w-16 sm:p-4 lg:w-14'
                href='https://api.whatsapp.com/send?phone=541153761179'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img className='w-full' src={whatsappIcon} alt='whatsappIcon' />
              </a>
              <a
                className='bg-white md:hover:bg-rose-100 md:transition-colors p-2.5 w-10 rounded-full sm:w-16 sm:p-4 lg:w-14'
                href='https://www.facebook.com/tomaspatrizio/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img className='w-full' src={facebookIcon} alt='facebookIcon' />
              </a>
              <a
                className='bg-white md:hover:bg-rose-100 md:transition-colors p-2.5 w-10 rounded-full sm:w-16 sm:p-4 lg:w-14'
                href='https://www.instagram.com/duckshoes.com.ar/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  className='w-full'
                  src={instagramIcon}
                  alt='instagramIcon'
                />
              </a>
            </div>
          </div>
          <div className='my-3 sm:my-5 lg:m-0 font-normal'>
            <h4 className='text-lg mb-1 sm:text-2xl'>Empresa</h4>
            <ul className='flex flex-col gap-1 opacity-90 sm:gap-2'>
              <li className='flex items-center gap-2'>
                <MdEmail className='text-xl sm:text-3xl lg:text-2xl' />
                <p className='sm:text-2xl lg:text-xl'>
                  soportduckshoes@gmail.com
                </p>
              </li>
              <li className='flex items-center gap-2'>
                <BsFillTelephoneFill className='text-xl sm:text-3xl lg:text-2xl' />
                <p className='sm:text-2xl lg:text-xl'>+54 9 1153761179</p>
              </li>
            </ul>
          </div>
          <div className='my-3 sm:my-5 lg:m-0 font-normal'>
            <h4 className='text-xl mb-1 sm:text-2xl'>Menu</h4>
            <ul className='flex flex-col gap-0.5 opacity-90 sm:text-2xl sm:gap-1 lg:text-xl'>
              <li>
                <Link
                  to='/'
                  className='md:hover:text-primaryLight transition-colors'
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to='/products'
                  className='md:hover:text-primaryLight transition-colors'
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  to='/favorites'
                  className='md:hover:text-primaryLight transition-colors'
                >
                  Favoritos
                </Link>
              </li>
              <li>
                <Link
                  to='/cart'
                  className='md:hover:text-primaryLight transition-colors'
                >
                  Carrito
                </Link>
              </li>
              {!user.role && (
                <li>
                  <Link
                    to='/login'
                    className='md:hover:text-primaryLight transition-colors'
                  >
                    Ingresar
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <section className='flex justify-center w-full pb-16 pt-8 border-t-2 border-primary sm:text-2xl md:text-xl sm:gap-1'>
        <article className='flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-5 w-full max-w-6xl mx-6 sm:mx-8 md:mx-10'>
          <div className='flex items-center gap-1 sm:gap-2 text-color-text-light'>
            <span>© Copyright 2024</span>
            <span>-</span>
            <span>Duck Shoes</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-color-text-light'>Desarrollado por:</span>
            <a
              href='https://www.agenciagrvity.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GrvityLogo className='w-32 text-white hover:text-[#D1FA2D] transition-colors' />
            </a>
          </div>
        </article>
      </section>
    </footer>
  );
}

export default Footer;
