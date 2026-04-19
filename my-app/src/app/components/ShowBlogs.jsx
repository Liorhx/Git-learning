import React, { useState } from "react";

const ShowBlogs = ({ data }) => {
  const [editIndex, setEditIndex] = useState("");
  const [showInput, setShowInput] = useState(true);
  const handleSubmit = (index) => {
    setShowInput(true);

    setEditIndex("");
  };
  return (
    <div>
      {data.map((blog, index) => (
        <div key={index} className="border p-4 mt-5 w-3/4 m-auto">
          <input type="text" defaultValue={blog} disabled={showInput} />
          {/* <p className="mb-4 text-xl from-neutral-950">{blog}</p> */}
          <button
            onClick={() => setShowInput(!showInput)}
            className="font-semibold text-xl bg-cyan-300 py-2 px-8 rounded-2xl cursor-pointer"
          >
            Edit
          </button>
          {!showInput && (
            <button
              disabled={showInput}
              className="font-semibold ml-2 text-xl bg-lime-300 py-2 px-8 rounded-2xl cursor-pointer"
            >
              Submit
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowBlogs;
