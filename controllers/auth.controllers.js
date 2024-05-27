import prisma from "../lib/Prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


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

export const login = async(req, res) => {
  const {email, password} = req.body
  console.log(email);
  console.log(password);

  try {
    const user = await prisma.user.findUnique({where: {email}})
    console.log(user);
    if(!user) return res.status(401).json({message:"Email not found!"})
     const checkPass = await bcrypt.compare(password, user.password)
    if(!checkPass) return res.status(401).json({message:"Password is wrong!"})

    const age = 1000* 60 * 24 * 3

  const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: age})
  res.cookie("token", token, {httpOnly: true, maxAge: age}).status(200).json({message:"Login successfull"})
    
  } catch (error) {
    
   res.status(400).json(error)
  }
 
 
};


export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({message: "Logout successfull"})
};
