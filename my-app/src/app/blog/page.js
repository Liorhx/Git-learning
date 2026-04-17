"use client";
import React, { useState } from "react";

const page = () => {
  const [blog, setBlog] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlog([...blog, e.target.blog.value]);
    console.log("blogs:", blog);
  };

  return (
    <div>
      <form className="flex flex-col  items-center gap-4 mt-4">
        <label className="flex text-3xl font-semibold flex-col items-center  gap-2">
          <textarea
            id="story"
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
          onSubmit={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
