import prisma from "../lib/Prisma.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message:"User created successfullt"})
  } catch (error) {
    res.status(401).json(error)
  }
};

export const login = (req, res) => {
  console.log("Hello from login");
};

export const logout = (req, res) => {
  console.log("Hello from logout");
};
