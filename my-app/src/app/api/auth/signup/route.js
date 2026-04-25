import db from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await db();
    const body = await request.json();
    const { username, email, password } = body;
    console.log("Received data:", { username, email, password });
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        {
          message: "User Already Exists",
        },
        { status: 400 },
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      return Response.json(
        {
          message: "User Created Successfully",
          data: newUser,
        },
        { status: 201 },
      );
    }
  } catch (error) {
    return Response.json(
      {
        message: "Error Creating User",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
