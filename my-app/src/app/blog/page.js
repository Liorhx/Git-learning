"use client";
import React, { useEffect, useState } from "react";
import ShowBlogs from "./../components/ShowBlogs";

const page = () => {
  // const [blog, setBlog] = useState("");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const getData = async () => {
    const res = await fetch("/api/blogs");
    const resData = await res.json();
    setData(resData.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (index) => {
    // console.log("index", index);
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, please log in.");
      return;
    }
    try {
      fetch(`/api/blogs/${data[index]._id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter((i) => i !== data[index]));
    } catch (error) {
      console.log("Error deleting blog:", error);
    }
  };

  const handleUpdate = (index, editBlog, setShowInput) => {
    // console.log("index", editBlog);
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, please log in.");
      return;
    }
    try {
      fetch(`/api/blogs/${data[index]._id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editBlog.title,
          content: editBlog.content,
        }),
      });

      setData(
        data.map((i) => {
          if (i === data[index]) {
            return editBlog;
          } else {
            return i;
          }
        }),
      );
      setShowInput(true);
    } catch (error) {
      console.log("Error updating blog:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, please log in.");
      return;
    }
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
      }),
    });
    getData();
    console.log("resData:", res.json());
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
