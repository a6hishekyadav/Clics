import React from "react";
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Account = ({ user }) => {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = UserData();
  
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      toast.success(data.message);
      navigate("/login");
      setIsAuth(false);
      setUser([]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { pins } = PinData();

  let userPins = pins ? pins.filter((pin) => pin.owner === user._id) : [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-3xl text-gray-700 font-bold">
              {user.name.slice(0, 1)}
            </span>
          </div>
        </div>

        <h1 className="text-center text-3xl font-bold text-gray-900 mb-2">
          {user.name}
        </h1>
        <p className="text-center text-gray-600 mb-4">{user.email}</p>

        <div className="flex justify-center mb-4">
          <button
            onClick={logoutHandler}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-300"
          >
            Logout
          </button>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Clics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {userPins.length > 0 ? (
              userPins.map((pin) => (
                <PinCard key={pin._id} pin={pin} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">
                No Clics Yet. Let create some😉
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
