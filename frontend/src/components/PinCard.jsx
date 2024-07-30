import React from "react";
import { Link } from "react-router-dom";

const PinCard = ({ pin }) => {
  return (
    <div className="relative rounded-lg overflow-hidden border border-gray-300 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
      <img
        src={pin.image.url}
        alt={pin.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white font-semibold">
       
       <div className="bg-black w-max rounded-lg opacity-75 p-1"> <p className="text-lg z-10 ">{pin.title}</p></div>
        <Link
          to={`/pin/${pin._id}`}
          className="inline-block mt-2 px-4 py-2 bg-[#E9311A] text-white rounded-full text-sm font-medium hover:bg-[#ED6335]"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default PinCard;
