import { Request, Response, NextFunction } from "express";
import { SignUp } from "./signUp.Interface";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../../config/firebase";

//Sign Up function
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDetails: SignUp = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const user = await createUserWithEmailAndPassword(
      auth,
      userDetails.email,
      userDetails.password
    );
    console.log("user", user);
  } catch (error) {
    console.log(error);
  }
};

export default { signUp };
