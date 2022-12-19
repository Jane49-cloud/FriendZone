import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedpassword,
    });
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).send({ message: "Invalid email address" });
    }

    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .send({
          message:
            "Password must be at least 8 characters long and contain at least one letter and one number",
        });
    }
    res.status(201).json(user);
    console.log(user);
  } catch (error) {
    console.log(error, "register failed...");
    res
      .status(500)
      .send({ message: "An error occurred while registering the user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(500).json({ message: `user does not exist` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(500).json({ message: `Invalid credentials` });
    }

    //create token

    const token = jwt.sign({ id: user._id }, process.env.SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `please check your email or password` });
  }
};
