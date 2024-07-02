import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { readFileSync } from "fs";
import { join } from "path";
import { User } from "../interfaces";
import { secretKey } from "../../env";

const users: User[] = JSON.parse(
  readFileSync(join(__dirname, "../data/staffs.json"), "utf-8")
);

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const token = jwt.sign({ email: user.email, role: user.role }, secretKey!, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
};

export const logout = (req: Request, res: Response) => {
  res.json({ message: "Logout successful" });
};
