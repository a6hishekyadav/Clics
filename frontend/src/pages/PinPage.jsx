import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const PinPage = ({ user }) => {
  const params = useParams();
  const {
    loading,
    fetchPin,
    pin,
    updatePin,
    addComment,
    deleteComment,
    deletePin,
  } = PinData();

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [pinValue, setPinValue] = useState("");

  const editHandler = () => {
    setTitle(pin.title);
    setPinValue(pin.pin);
    setEdit(!edit);
  };

  const updateHandler = () => {
    updatePin(pin._id, title, pinValue, setEdit);
  };

  const [comment, setComment] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    addComment(pin._id, comment, setComment);
  };

  const deleteCommentHander = (id) => {
    if (window.confirm("Are you sure you want to delete this comment"))
      deleteComment(pin._id, id);
  };

  const navigate = useNavigate();

  const deletePinHandler = () => {
    if (window.confirm("Are you sure you want to delete this pin"))
      deletePin(pin._id, navigate);
  };

  useEffect(() => {
    fetchPin(params.id);
  }, [params.id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-8DB4AD p-4">
      {pin && (
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
          {loading ? (
            <Loading />
          ) : (
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2">
                {pin.image && (
                  <img
                    src={pin.image.url}
                    alt=""
                    className="object-cover w-full h-96 rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  />
                )}
              </div>

              <div className="w-full md:w-1/2 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  {edit ? (
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="border border-gray-300 rounded-lg p-2 w-full max-w-xs"
                      placeholder="Enter Title"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold text-026C80">{pin.title}</h1>
                  )}

                  {pin.owner && pin.owner._id === user._id && (
                    <div className="flex gap-2">
                      <button
                        onClick={editHandler}
                        className="text-ED6335 hover:text-E9311A transition-colors duration-300"
                      >
                        <FaEdit size={20} />
                      </button>

                      <button
                        onClick={deletePinHandler}
                        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  )}
                </div>

                {edit ? (
                  <textarea
                    value={pinValue}
                    onChange={(e) => setPinValue(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                    placeholder="Enter Description"
                    rows={5}
                  />
                ) : (
                  <p className="mb-6 text-gray-700">{pin.pin}</p>
                )}

                {edit && (
                  <button
                    onClick={updateHandler}
                    className="bg-026C80 text-white py-2 px-4 rounded-md hover:bg-064C72 transition-colors duration-300"
                  >
                    Update
                  </button>
                )}

                {pin.owner && (
                  <div className="flex items-center border-t border-gray-300 pt-4 mt-4">
                    <Link to={`/user/${pin.owner._id}`} className="flex items-center">
                      <div className="rounded-full h-16 w-16 bg-gray-300 flex items-center justify-center text-white text-2xl font-bold">
                        {pin.owner.name.slice(0, 1)}
                      </div>
                      <div className="ml-4">
                        <h2 className="text-xl font-semibold text-026C80">
                          {pin.owner.name}
                        </h2>
                        <p className="text-gray-500">
                          {pin.owner.followers.length} Followers
                        </p>
                      </div>
                    </Link>
                  </div>
                )}

                <div className="flex items-center mt-4">
                  <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center mr-4 text-white text-xl font-bold">
                    {pin.owner && pin.owner.name.slice(0, 1)}
                  </div>

                  <form className="flex-1 flex" onSubmit={submitHandler}>
                    <input
                      type="text"
                      placeholder="Enter Comment"
                      className="flex-1 border border-gray-300 rounded-lg p-2"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />

                    <button
                      type="submit"
                      className="ml-2 bg-026C80 px-4 py-2 rounded-md text-white hover:bg-064C72 transition-colors duration-300"
                    >
                      Add+
                    </button>
                  </form>
                </div>

                <hr className="my-4 border-gray-300" />

                <div className="overflow-y-auto max-h-64">
                  {pin.comments && pin.comments.length > 0 ? (
                    pin.comments.map((e) => (
                      <div className="flex items-center justify-between mb-4" key={e._id}>
                        <div className="flex items-center gap-3">
                          <Link to={`/user/${e.user}`}>
                            <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center text-white text-xl font-bold">
                              {e.name.slice(0, 1)}
                            </div>
                          </Link>

                          <div>
                            <h2 className="text-lg font-semibold text-026C80">
                              {e.name}
                            </h2>
                            <p className="text-gray-700">{e.comment}</p>
                          </div>
                        </div>

                        {e.user === user._id && (
                          <button
                            onClick={() => deleteCommentHander(e._id)}
                            className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition-colors duration-300"
                          >
                            <MdDelete size={16} />
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Be the first one to add a comment</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PinPage;
