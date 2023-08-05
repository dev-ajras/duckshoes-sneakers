import whatsappIcon from '/assets/social/whatsappIcon.svg';
import instagramIcon from '/assets/social/instagramIcon.svg';
import facebookIcon from '/assets/social/facebookIcon.svg';
import twitterIcon from '/assets/social/twitterIcon.svg';

import { HiLocationMarker } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white mt-3 w-full sm:mt-5">
      <div className="p-3 sm:p-5 flex justify-center">
        <div className="w-full lg:flex lg:py-8 lg:my-5 lg:gap-14 lg:max-w-6xl">
          <div className="my-3 mt-0 pt-4 sm:my-5 sm:pt-6 lg:pt-0 lg:m-0">
            <h4 className="font-bold text-4xl sm:text-5xl lg:text-4xl">
              We are <span className="text-primaryDark">Duck Shoes</span>
            </h4>
            <ul className="font-medium flex gap-2 sm:gap-3 sm:text-2xl sm:mt-2 lg:text-xl">
              <li>#Sneakers</li>
              <li>#Jordan</li>
              <li>#Nike</li>
              <li>#Hypebeast</li>
            </ul>
            <ul className="flex gap-3 mt-3 sm:gap-5 sm:mt-5">
              <li className="bg-primary p-2.5 w-10 rounded-full sm:w-16 sm:p-4 lg:w-14">
                <a
                  href="https://www.whatsapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="w-full"
                    src={whatsappIcon}
                    alt="whatsappIcon"
                  />
                </a>
              </li>
              <li className="bg-primary p-2.5 w-10 rounded-full sm:w-16 sm:p-4 lg:w-14">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="w-full"
                    src={instagramIcon}
                    alt="instagramIcon"
                  />
                </a>
              </li>
              <li className="bg-primary p-2.5 w-10 rounded-full sm:w-16 sm:p-4 lg:w-14">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="w-full"
                    src={facebookIcon}
                    alt="facebookIcon"
                  />
                </a>
              </li>
              <li className="bg-primary p-2.5 w-10 rounded-full sm:w-16 sm:p-4 lg:w-14">
                <a
                  href="https://www.twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="w-full" src={twitterIcon} alt="twitterIcon" />
                </a>
              </li>
            </ul>
          </div>
          <div className="my-3 sm:my-5 lg:m-0">
            <h4 className="text-lg font-medium mb-1 sm:text-2xl">Company</h4>
            <ul className="flex flex-col gap-1 opacity-80 sm:gap-2">
              <li className="flex items-center gap-2">
                <HiLocationMarker className="text-xl sm:text-3xl lg:text-2xl" />
                <p className="sm:text-2xl lg:text-xl">
                  397 Sneakers, Duck Shoes
                </p>
              </li>
              <li className="flex items-center gap-2">
                <MdEmail className="text-xl sm:text-3xl lg:text-2xl" />
                <p className="sm:text-2xl lg:text-xl">duckshoes@gmail.com</p>
              </li>
              <li className="flex items-center gap-2">
                <BsFillTelephoneFill className="text-xl sm:text-3xl lg:text-2xl" />
                <p className="sm:text-2xl lg:text-xl">+54 1234567890</p>
              </li>
            </ul>
          </div>
          <div className="my-3 sm:my-5 lg:m-0">
            <h4 className="text-xl font-medium mb-1 sm:text-2xl">Service</h4>
            <ul className="flex flex-col gap-0.5 opacity-80 sm:text-2xl sm:gap-1 lg:text-xl">
              <li>
                <Link to="/service/how-we-deliver">How we deliver</Link>
              </li>
              <li>
                <Link to="/service/how-to-buy">How to buy</Link>
              </li>
              <li>
                <Link to="/service/payment-methods">Payment methods</Link>
              </li>
            </ul>
          </div>
          <div className="my-3 sm:my-5 lg:m-0">
            <h4 className="text-xl font-medium mb-1 sm:text-2xl">Menu</h4>
            <ul className="flex flex-col gap-0.5 opacity-80 sm:text-2xl sm:gap-1 lg:text-xl">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/help">Help</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-background text-white flex justify-center w-full p-2 sm:p-3 sm:text-xl">
        Copyright © 2023 Duck Shoes
      </div>
    </footer>
  );
}

export default Footer;
