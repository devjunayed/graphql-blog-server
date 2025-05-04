import jwt from "jsonwebtoken";

const sign = async (payload: { userId: number }, secret: string) => {
  const token = jwt.sign(payload, secret as string, {
    expiresIn: "1d",
  });
  return token;
};

const verify = async(token: string, secret: string) =>{
  try {
    const userData = jwt.verify(token , secret) as {userId: number};
    return userData.userId
  } catch (error) {
      return null;
  }
  
}

export const jwtHelper = {
  sign,
  verify
};
