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
    <footer className="bg-body">
      <div className="m-3 mt-0 pt-3">
        <h4 className="font-bold text-4xl">
          We are <span className="text-primaryDark">Duck Shoes</span>
        </h4>
        <ul className="font-semibold flex gap-2">
          <li>#Sneakers</li>
          <li>#Jordan</li>
          <li>#Nike</li>
          <li>#Hypebeast</li>
        </ul>
      </div>
      <ul className="flex gap-3 m-3">
        <li className="bg-primary p-2.5 w-10 rounded-full">
          <a
            href="https://www.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-full" src={whatsappIcon} alt="whatsappIcon" />
          </a>
        </li>
        <li className="bg-primary p-2.5 w-10 rounded-full">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-full" src={instagramIcon} alt="instagramIcon" />
          </a>
        </li>
        <li className="bg-primary p-2.5 w-10 rounded-full">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-full" src={facebookIcon} alt="facebookIcon" />
          </a>
        </li>
        <li className="bg-primary p-2.5 w-10 rounded-full">
          <a
            href="https://www.twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-full" src={twitterIcon} alt="twitterIcon" />
          </a>
        </li>
      </ul>
      <div className="m-3">
        <h4 className="text-lg font-semibold mb-1">Company</h4>
        <ul className="flex flex-col gap-1 opacity-80">
          <li className="flex items-center gap-2">
            <HiLocationMarker className="text-xl" />
            <p>397 Sneakers, Duck Shoes</p>
          </li>
          <li className="flex items-center gap-2">
            <MdEmail className="text-xl" />
            <p>duckshoes@gmail.com</p>
          </li>
          <li className="flex items-center gap-2">
            <BsFillTelephoneFill className="text-xl" />
            <p>+54 1234567890</p>
          </li>
        </ul>
      </div>
      <div className="m-3">
        <h4 className="text-xl font-semibold">Service</h4>
        <ul className="opacity-80">
          <li>How we deliver</li>
          <li>How to buy</li>
          <li>Payment methods</li>
        </ul>
      </div>
      <div className="m-3">
        <h4 className="text-xl font-semibold">Menu</h4>
        <ul className="opacity-80">
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
      <div className="bg-background text-white flex justify-center p-2">
        Copyright © 2023 Duck Shoes
      </div>
    </footer>
  );
}

export default Footer;
