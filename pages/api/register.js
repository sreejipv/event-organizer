
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import connectDb from '../../db/config'


export default async (req, res) => {
  const { db } = await connectDb();
  const collection = db.collection("users");

  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await collection.insertOne({
      username,
      password: hashedPassword,
    });

    const user = result.ops[0];

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      })
    );

    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
