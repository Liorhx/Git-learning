import React, { useEffect, useState } from "react";

const ShowBlogs = ({ data }) => {
  const [editBlog, setEditBlog] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [updatedData, setUpdatedData] = useState(data);
  const [activateIndex, setActivateIndex] = useState(null);
  useEffect(() => {
    setUpdatedData(data);
  }, [data]);
  const handleDelete = (index) => {
    console.log("index", index);
    setUpdatedData(updatedData.filter((i) => i !== data[index]));
  };
  console.log("updatedData", updatedData);
  const handleSubmit = (index) => {
    setShowInput(true);
    setUpdatedData(
      updatedData.map((i) => {
        if (i === data[index]) {
          return editBlog;
        } else {
          return i;
        }
      }),
    );
  };
  return (
    <div>
      {updatedData.map((blog, index) => (
        <div key={index} className="border p-4 mt-5 w-3/4 m-auto">
          {activateIndex === index && !showInput && (
            <input
              type="text"
              defaultValue={blog}
              disabled={showInput}
              className="showInput ? '': border p-2 mb-4 text-xl w-full"
              onChange={(e) => setEditBlog(e.target.value)}
            />
          )}
          <p className="mb-4 text-xl from-neutral-950">{blog}</p>
          <button
            onClick={() => {
              setShowInput(false);
              setActivateIndex(index);
            }}
            className="font-semibold text-xl bg-cyan-300 py-2 px-8 rounded-2xl cursor-pointer"
          >
            Edit
          </button>
          {!showInput && (
            <button
              onClick={() => handleSubmit(index)}
              disabled={showInput}
              className="font-semibold ml-2 text-xl bg-lime-300 py-2 px-8 rounded-2xl cursor-pointer"
            >
              Submit
            </button>
          )}
          <button
            onClick={() => handleDelete(index)}
            className="font-semibold ml-2 text-xl bg-red-300 py-2 px-8 rounded-2xl cursor-pointer"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShowBlogs;
