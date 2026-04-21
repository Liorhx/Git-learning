"use client";
import React, { useState } from "react";
import ShowBlogs from "./../components/ShowBlogs";

const page = () => {
  const [blog, setBlog] = useState("");
  const [data, setData] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (blog.trim() === "") return;
    // console.log("formData:", blog);
    setData([blog, ...data]);
    setBlog("");
  };
  // console.log("data:");

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  items-center gap-4 mt-4"
      >
        <label className="flex text-3xl font-semibold flex-col items-center  gap-2">
          <textarea
            value={blog}
            onChange={(e) => setBlog(e.target.value)}
            className="p-4 text-start w-200 h-50 bg-gray-300 rounded-3xl "
            name="blog"
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
