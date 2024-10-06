import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo1} alt="" className='w-[200px]' />
                <p>At QuickBite, we are passionate about bringing delicious meals straight to your doorstep. With a wide range of cuisines and local favorites, we strive to satisfy every craving. Our mission is to provide you with fast, reliable, and convenient food delivery services, ensuring that your dining experience is seamless and enjoyable. Thank you for choosing us as your go-to food delivery partner!</p>
                <div className='footer-social-icons flex'>
                    <a href='https://www.instagram.com/himank_kumar7108' target='_blank' rel='noopener noreferrer' className='mr-2'>
                        <FontAwesomeIcon icon={faInstagram} style={{ color: '#C13584', fontSize: '2rem' }} />
                    </a>
                    <a href='https://www.linkedin.com/in/himank-kumar-22039a253/' target='_blank' rel='noopener noreferrer' className='mr-2 ml-2' >
                        <FontAwesomeIcon icon={faLinkedin} style={{ color: '#0077B5', fontSize: '2rem' }} />
                    </a>
                    <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer' className='mr-2 ml-2'>
                        <FontAwesomeIcon icon={faFacebookF} style={{ color: '#1877F2', fontSize: '2rem' }} />
                    </a>
                    <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer' className='ml-2'>
                        <FontAwesomeIcon icon={faTwitter} style={{ color: '##1DA1F2', fontSize: '2rem' }} />
                    </a>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91XXXXXXXXXX</li>
                    <li>contactme@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright text-2xl text-orange-600'>Maintained and Developed by "Himank Kumar"</p>
        <p className='footer-copyright'>&copy; Copyright 2024. All Rights Reserved</p>
    </div>
  )
}

export default Footer