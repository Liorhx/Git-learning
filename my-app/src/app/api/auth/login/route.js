import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json(
        {
          message: "User Not found",
        },
        { status: 404 },
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return Response.json(
        {
          message: "Invalid Password",
        },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      "secretkey",
      { expiresIn: "1d" },
    );
    return Response.json({
      message: "Loggin successful",
      token,
    });
  } catch (error) {
    return Response.json(
      {
        message: "Error in Loggin",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
