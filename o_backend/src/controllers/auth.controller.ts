import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import User from '../models/user.model';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'secret';

export const register = async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: 'Email already used' });
  }

  const hashed = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUNDS) || 10
  );

  const user = new User({
    email,
    password: hashed,
    name,
    role,
  });

  await user.save();

  return res.status(201).json({
    id: user._id,
    email: user.email,
    name: user.name,
  });
};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  // ✅ FIXED
  const token = jwt.sign(
  { id: user._id.toString(), role: user.role },
  process.env.JWT_SECRET as jwt.Secret,
  { expiresIn: process.env.JWT_EXPIRES_IN as string || '7d' }
);

  return res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
};
