import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const firebaseLogout = (onSuccess, onError) => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
      if (onSuccess) onSuccess();
    })
    .catch((error) => {
      console.error("Logout error:", error);
      if (onError) onError(error);
    });
};

export default firebaseLogout;