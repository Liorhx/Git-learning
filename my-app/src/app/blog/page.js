"use client";
import React, { useState } from "react";
import ShowBlogs from "./../components/ShowBlogs";

const page = () => {
  // const [blog, setBlog] = useState("");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const handleDelete = (index) => {
    console.log("index", index);
    setData(data.filter((i) => i !== data[index]));
  };

  const handleUpdate = (index, editBlog, setShowInput) => {
    setShowInput(true);
    setData(
      data.map((i) => {
        if (i === data[index]) {
          return editBlog;
        } else {
          return i;
        }
      }),
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("formData:", formData);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  items-center gap-4 mt-4"
      >
        <label className="flex  text-3xl font-semibold  items-center  gap-2">
          Blog Title
          <input
            type="text"
            className="p-2  bg-gray-300 rounded-lg w-80 mt-2"
            name="title"
            placeholder="Enter Blog Title"
            value={formData.title}
            onChange={handleChange}
          ></input>
        </label>
        <label className="flex text-3xl font-semibold flex-col items-center  gap-2">
          <textarea
            value={formData.content}
            onChange={handleChange}
            className="p-4 text-start w-200 h-50 bg-gray-300 rounded-3xl "
            name="content"
            rows="5"
            cols="33"
            placeholder="Write Your Blog ...."
          ></textarea>
        </label>
        <button
          type="submit"
          className="font-semibold hover:bg-lime-600 cursor-pointer rounded-2xl p-2 text-xl bg-lime-400 w-40"
        >
          Submit
        </button>
      </form>
      <ShowBlogs
        data={data}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default page;
