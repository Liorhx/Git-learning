"use client";
import React from "react";

const page = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log("formData:", Object.fromEntries(formData.entries()));
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
  };
  return (
    <div className=" mx-auto  mt-10 items-center flex flex-col">
      <h1 className="text-3xl text-black font-bold  items-center">
        Signup Page
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  items-center gap-4 mt-4"
      >
        <label className="flex  text-3xl font-semibold  items-center  gap-2">
          <input
            type="text"
            name="username"
            placeholder="UserName"
            className="border p-2 mb-4 border-cyan-500 text-xl w-full"
          ></input>
        </label>
        <label className="flex  text-3xl font-semibold  items-center  gap-2">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 mb-4 border-cyan-500 text-xl w-full"
          ></input>
        </label>
        <label className="flex  text-3xl font-semibold  items-center  gap-2">
          <input
            type="password"
            name="password"
            placeholder=" Password"
            className="border p-2 mb-4 text-xl border-cyan-500 w-full"
          ></input>
        </label>
        <button
          type="submit"
          className="font-semibold hover:bg-lime-600 cursor-pointer rounded-2xl p-2 text-xl bg-lime-400 w-40"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
