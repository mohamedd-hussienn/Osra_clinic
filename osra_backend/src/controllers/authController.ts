import { Request, Response } from "express";
import User from "../models/userModel";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
