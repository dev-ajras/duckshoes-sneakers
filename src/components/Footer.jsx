import whatsappIcon from '/assets/social/whatsappIcon.svg'
import instagramIcon from '/assets/social/instagramIcon.svg'
import facebookIcon from '/assets/social/facebookIcon.svg'
import twitterIcon from '/assets/social/twitterIcon.svg'

function Footer() {

  return (
    <div>
        <h4>
            We are Duck Shoes
        </h4>
        <ul className='flex flex gap-3 w-full'>
            <li className='bg-primary p-3'>
                <a className='w-full' href="https://www.whatsapp.com/">
                    <img src={whatsappIcon} alt="whatsappIcon" />
                </a>
            </li>
            <li className='bg-primary p-3'>
                <a href="https://www.instagram.com/">
                    <img src={instagramIcon} alt="instagramIcon" />
                </a>
            </li>
            <li className='bg-primary p-3'>
                <a href="https://www.facebook.com/">
                    <img src={facebookIcon} alt="facebookIcon" />
                </a>
            </li>
            <li className='bg-primary p-3'>
                <a href="https://www.twitter.com/">
                    <img src={twitterIcon} alt="twitterIcon" />
                </a>
            </li>
        </ul>
    </div>
  )
}

export default Footer