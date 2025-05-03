import jwt from "jsonwebtoken";

const sign = async (payload: { userId: number }) => {
  const token = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

export const jwtHelper = {
    sign
}