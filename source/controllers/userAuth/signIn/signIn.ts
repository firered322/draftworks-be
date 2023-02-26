import { Request, Response, NextFunction } from "express";
import { SignIn } from "./signIn.Interface";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { FirebaseError } from "firebase/app";

//Sign In Function
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let response = {};

    const userDetails: SignIn = {
      email: req.body.email,
      password: req.body.password,
    };
    
    try {
      const userSignIn = await signInWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );

      response = {
        success: 1,
        message: "User was able to log in successfully."
      }
    } catch (error) {
      console.log(error)

      if (error instanceof FirebaseError) {
        if (error.code == "auth/wrong-password") {
          response = {
            success: 0,
            error: "The entered password is a wrong password.",
          };
        } else if(error.code == "auth/user-not-found"){
            response = {
                success: 0,
                error: "The user with this email ID does not exist.",
            }
        } else if (error.code == "auth/invalid-email"){
            response = {
                success: 0,
                error: "Please enter a valid email ID."
            }
        } else{
            response = {
                success: 0,
                error: error.code,
            }
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

export default { signIn };
