import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <div>
      <div className="bg-[#f3eeedda] shadow-sm border-b-2 border-[#41625c]">
        <div className="mx-auto px-4 py-2 flex justify-between items-center">
          <Link to="/" className="flex items-center mr-5">
            <img
              src="/triangle.png"
              alt=""
              className="h-6 md:mr-2"
            />
            <span className="text-[#026C80] text-2xl font-bold">Clics</span>
          </Link>

          <div className="flex items-center space-x-4 w-[200px]">
            <Link to="/" className="text-[#07181c] hover:text-[#0f648fbe]">
              Home
            </Link>
            <Link to="/create" className="text-[#07181c] hover:text-[#0f648fbe]">
              Create
            </Link>
            <Link
              to="/account"
              className="w-8 h-8 rounded-full bg-[#8DB4AD] flex items-center justify-center text-xl text-white"
            >
              {user.name.slice(0, 1)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
