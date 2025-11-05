import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import qrCode from '../../assets/QRCode.png'; // Replace with actual path
import googlePlay from '../../assets/googleplay.png'; // Replace with actual path
import appStore from '../../assets/appstore.png'; // Replace with actual path

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Exclusive Section */}
        <div className="flex flex-col space-y-3">
          <h2 className="text-2xl font-bold">Exclusive</h2>
          <p className="text-gray-400">Subscribe & Support</p>
        </div>

        {/* Account Section */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-xl font-semibold">Account</h3>
          <p className="text-gray-400">Get 10% off your first order</p>
          <p className="text-gray-400">111 Bijoy Sarani, Delhi, DH 1515, India</p>
          <p className="text-gray-400">exclusive@gmail.com</p>
          <p className="text-gray-400">+88015-88888-9999</p>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">My Account</a></li>
            <li><a href="#" className="hover:text-gray-300">Login / Register</a></li>
            <li><a href="#" className="hover:text-gray-300">Our Products</a></li>
            <li><a href="#" className="hover:text-gray-300">Categories</a></li>
            <li><a href="#" className="hover:text-gray-300">Terms Of Use</a></li>
          </ul>
        </div>

        {/* Download App Section */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-xl font-semibold">Download App</h3>
          <p className="text-gray-400">Save $3 with App New User Only</p>
          <div className="flex items-center justify-center md:justify-start space-x-4">
            <img src={qrCode} alt="QR Code" className="w-16 h-16" />
            <div className="flex flex-col space-y-2">
              <img src={googlePlay} alt="Google Play" className="w-32" />
              <img src={appStore} alt="App Store" className="w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Links */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-gray-400">
        <a href="#" className="hover:text-white">FAQ</a>
        <a href="#" className="hover:text-white">Contact</a>
        <a href="#" className="hover:text-white">Cart</a>
        <a href="#" className="hover:text-white">Wishlist</a>
        <a href="#" className="hover:text-white">Shop</a>
      </div>

      {/* Social Media Links */}
      <div className="mt-8 flex justify-center space-x-6 text-gray-400 text-xl">
        <a href="#" className="hover:text-white"><FaFacebookF /></a>
        <a href="#" className="hover:text-white"><FaTwitter /></a>
        <a href="#" className="hover:text-white"><FaInstagram /></a>
        <a href="#" className="hover:text-white"><FaLinkedin /></a>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center text-gray-500 border-t border-gray-700 pt-4">
        <p>&copy; {new Date().getFullYear()} Exclusive. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
