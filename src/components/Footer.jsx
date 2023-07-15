import whatsappIcon from '/assets/social/whatsappIcon.svg';
import instagramIcon from '/assets/social/instagramIcon.svg';
import facebookIcon from '/assets/social/facebookIcon.svg';
import twitterIcon from '/assets/social/twitterIcon.svg';

import { HiLocationMarker } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';

function Footer() {
  return (
    <footer className="bg-body">
      <h4>We are Duck Shoes</h4>
      <p>#Sneakers #Jordan #Nike #Hypebeast</p>
      <ul className="flex gap-3 m-3">
        <li className="bg-primary p-3 w-10 rounded-full">
          <a
            href="https://www.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-full" src={whatsappIcon} alt="whatsappIcon" />
          </a>
        </li>
        <li className="bg-primary p-3 w-10 rounded-full">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-full" src={instagramIcon} alt="instagramIcon" />
          </a>
        </li>
        <li className="bg-primary p-3 w-10 rounded-full">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-full" src={facebookIcon} alt="facebookIcon" />
          </a>
        </li>
        <li className="bg-primary p-3 w-10 rounded-full">
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
        <h4 className="font-semibold">Company</h4>
        <ul className="opacity-80">
          <li className="flex items-center gap-2">
            <HiLocationMarker />
            <p>397 Sneakers, Duck Shoes</p>
          </li>
          <li className="flex items-center gap-2">
            <MdEmail />
            <p>duckshoes@gmail.com</p>
          </li>
          <li className="flex items-center gap-2">
            <BsFillTelephoneFill />
            <p>+54 1234567890</p>
          </li>
        </ul>
      </div>
      <div className="m-3">
        <h4 className="font-semibold">Service</h4>
        <ul className="opacity-80">
          <li>How we deliver</li>
          <li>How to buy</li>
          <li>Payment methods</li>
        </ul>
      </div>
      <div className="m-3">
        <h4 className="font-semibold">Menu</h4>
        <ul className="opacity-80">
          <li>Home</li>
          <li>Products</li>
          <li>Favorites</li>
          <li>Cart</li>
          <li>Login</li>
          <li>Help</li>
        </ul>
      </div>
      <div className="bg-background text-white flex justify-center p-2">
        Copyright © 2023 Duck Shoes
      </div>
    </footer>
  );
}

export default Footer;
