import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";

export async function PUT(request, context) {
  const { params } = context;
  const { id } = await params;
  try {
    await dbConnect();
    // console.log("PUT API HIT", id);
    const body = await request.json();
    const { title, content } = body;
    // console.log("body", body);
    const token = request.headers.get("authorization")?.split(" ")[1];
    console.log("token", token);
    if (!token) {
      console.log("No token found, please log in.");
      return Response.json(
        {
          message: "No token found, please log in.",
        },
        { status: 401 },
      );
    }
    const decode = jwt.verify(token, "secretkey");
    if (!decode) {
      return Response.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }
    //find id
    const blog = await Blog.findById(id);
    if (!blog) {
      return Response.json({ message: "Blog not found" }, { status: 404 });
    } else if (blog.user.toString() !== decode.id) {
      return Response.json({
        message: "You are not authorized to update this blog",
      });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true },
    );

    return Response.json({
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    return Response.json(
      {
        message: "Error updating blog",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, context) {
  const { params } = context;
  const { id } = await params;
  try {
    await dbConnect();
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      console.log("No token found, please log in.");
      return Response.json(
        {
          message: "No token found, please log in.",
        },
        { status: 401 },
      );
    }
    const decode = jwt.verify(token, "secretkey");
    if (!decode) {
      return Response.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      return Response.json({ message: "Blog not found" }, { status: 404 });
    } else if (blog.user.toString() !== decode.id) {
      return Response.json({
        message: "You are not authorized to delete this blog",
      });
    }
    await Blog.findByIdAndDelete(id);
    return Response.json({
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Error Deleteing Blog",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
