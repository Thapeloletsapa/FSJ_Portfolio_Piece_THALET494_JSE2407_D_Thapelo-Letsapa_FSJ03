import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../src/firebaseConfig";

const auth = getAuth(app);

function signInUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Signed in:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error signing in:", error);
    });
}