import React from "react";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";
const Footer = () => {
  return (
    <div className="max-w-full mx-auto mt-20 py-16 px-10 grid lg:grid-cols-3 gap-8 text-black-300 bg-[#313035]">
      <div>
        <h1 className="text-3xl font-bold text-pink-500 w-full m-4">
          Kitaab & Co.
        </h1>
        <p className="py-4 text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          viverra aliquet mauris, sit amet gravida massa cursus eget. Nulla
          dignissim.
        </p>
        <div className="flex justify-between md:w-[75%] my-6 text-white">
          <FaFacebookSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
          <FaGithubSquare size={30} />
          <FaDribbbleSquare size={30} />
        </div>
      </div>
      <div className="lg:col-span-2 flex justify-between mx-20">
        <div>
          <h6 className="font-medium text-pink-500">Other Links</h6>
          <ul className="text-white">
            <li className="py-2 text-sm">Become a seller</li>
            <li className="py-2 text-sm">Support our cause</li>
            <li className="py-2 text-sm">About us-Who are we?</li>
            <li className="py-2 text-sm">Contribute-Donate</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-pink-500">Support</h6>
          <ul className="text-white">
            <li className="py-2 text-sm">Services</li>
            <li className="py-2 text-sm">Lorem Ipsum</li>
            <li className="py-2 text-sm">Lorem Ipsum</li>
            <li className="py-2 text-sm">Lorem Ipsum</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-pink-500">Company</h6>
          <ul className="text-white">
            <li className="py-2 text-sm">Lorem Ipsum</li>
            <li className="py-2 text-sm">Lorem Ipsum</li>
            <li className="py-2 text-sm">Lorem Ipsum</li>
            <li className="py-2 text-sm">Lorem Ipsum</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-pink-500">Legal</h6>
          <ul className="text-white">
            <li className="py-2 text-sm">Claim</li>
            <li className="py-2 text-sm">Policy</li>
            <li className="py-2 text-sm">Terms</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
