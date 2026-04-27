// app/api/users/route.js
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";

export async function POST(request) {
  console.log("request", request);
  try {
    // 1. Connect DB
    await dbConnect();

    // 2. Get data from request
    const body = await request.json();
    const { title, content } = body;
    const token = request.headers.get("authorization")?.split(" ")[1];

    // console.log("token", token);
    const decode = jwt.verify(token, "secretkey");
    // console.log("decode", decode);
    if (!decode) {
      return Response.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }
    // 3. Create new blog
    const newBlog = new Blog({
      title,
      content,
      user: decode.id,
    });

    // 4. Save to DB
    const savedBlog = await newBlog.save();

    // 5. Return response
    return Response.json({
      message: "Blog created successfully",
      data: savedBlog,
    });
  } catch (error) {
    return Response.json(
      {
        message: "Error creating blog",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const blogs = await Blog.find();

    return Response.json({
      message: "Blogs fetched",
      data: blogs,
    });
  } catch (error) {
    return Response.json(
      {
        message: "Error fetching blogs",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
