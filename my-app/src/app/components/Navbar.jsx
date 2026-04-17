import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex gap-20 text-3xl  text-white justify-center p-4 font-bold bg-red-500">
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/aboutus">AboutUs</Link>
    </div>
  );
};

export default Navbar;
