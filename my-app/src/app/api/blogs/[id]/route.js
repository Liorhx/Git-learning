import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

export async function PUT(request, context) {
  const { params } = context;
  const { id } = await params;
  try {
    await dbConnect();
    // console.log("PUT API HIT", id);
    const body = await request.json();
    const { title, content } = body;
    console.log("body", body);
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
