import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#C30E59] text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 APC Bal Mandal - All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          {/* <a href="#" className="hover:text-[#F2AE66] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#F2AE66] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#F2AE66] transition-colors">Contact Us</a> */}
          <Link to="#" className="hover:text-[#F2AE66] transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-[#F2AE66] transition-colors">Terms of Service</Link>
          <Link to="#" className="hover:text-[#F2AE66] transition-colors">Contact Us</Link>
          <Link to="/about" className="hover:text-[#F2AE66] transition-colors">About Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
