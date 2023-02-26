import { Request, Response, NextFunction } from "express";
import { SignUp } from "./signUp.Interface";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../../config/firebase";
import { FirebaseError } from "firebase/app";

//Sign Up function
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let response = {};

    const userDetails: SignUp = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );

      response = {
        success: 1,
        message: "User was able to sign up successfully.",
      };
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code == "auth/email-already-in-use") {
          response = {
            success: 0,
            error: "The provided email is already in use by an existing user.",
          };
        } else if (error.code == "auth/weak-password") {
          response = {
            success: 0,
            error:
              "The password is too weak. It should be at least 6 characters long.",
          };
        } else if (error.code == "auth/invalid-email") {
          response = {
            success: 0,
            error: "Please enter a valid email ID.",
          };
        } else {
          response = {
            success: 0,
            error: error.code,
          };
        }
      }
    }
    return res.send(response);
  } catch (error) {
    console.log(error);
    const response = {
      success: 0,
      error: error,
    };
    return res.send(response);
  }
};

export default { signUp };
