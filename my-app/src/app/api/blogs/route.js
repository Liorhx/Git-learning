// app/api/users/route.js
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

export async function POST(request) {
  try {
    // 1. Connect DB
    await dbConnect();

    // 2. Get data from request
    const body = await request.json();
    const { title, content } = body;

    // 3. Create new blog
    const newBlog = new Blog({
      title,
      content,
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
