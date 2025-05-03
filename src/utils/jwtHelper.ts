import jwt from "jsonwebtoken";

const sign = async (payload: { userId: number }, secret: string) => {
  const token = jwt.sign(payload, secret as string, {
    expiresIn: "1d",
  });
  return token;
};

export const jwtHelper = {
  sign,
};
