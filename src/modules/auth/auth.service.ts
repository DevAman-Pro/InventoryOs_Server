import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User} from "./user.model"
import type {LoginInput,registerInput} from "./auth.validation"
import { email } from "zod";
import id from "zod/v4/locales/id.js";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters");
  }

  return secret;
}
export async function registerUser(input: registerInput){
const existingUser  = await User.findOne({email:input.email});

if(existingUser){
    throw new Error("User as already exist");
}

const passwordHash  = await bcrypt.hash(input.password,12);

const user = await User.create({
    name: input.name,
    email : input.email,
    passwordHash,
    role: "cashier"
});


return {id:user.id,
    name:user.name,
    email:user.email,
}
}


export async function loginUser(input: LoginInput) {
  const user = await User.findOne({ email: input.email })
    .select("+passwordHash");

  if (!user || !user.isActive) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isPasswordValid = await bcrypt.compare(
    input.password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    { sub: user.id },
    getJwtSecret(),
    { expiresIn: "1h", algorithm: "HS256" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
