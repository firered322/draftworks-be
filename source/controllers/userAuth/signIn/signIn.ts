import { Request, Response, NextFunction } from "express";
import { SignIn } from "./signIn.Interface";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";

//Sign In Function
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDetails: SignIn = {
      email: req.body.email,
      password: req.body.password,
    };

    const userSignIn = await signInWithEmailAndPassword(
      auth,
      userDetails.email,
      userDetails.password
    );

    console.log("userSignIn", userSignIn);
  } catch (error) {
    console.log(error);
  }
};

export default { signIn };
