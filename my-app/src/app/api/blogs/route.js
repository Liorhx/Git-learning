// app/api/users/route.js
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET() {
  await dbConnect();
  return Response.json({ message: "Hello World" });

  // const blogs = await Blog.find({});
  // return Response.json({ blogs });
}
