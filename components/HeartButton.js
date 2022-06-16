import { firestore, auth, increment } from "../lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";

export default function Heart({ postRef })
const heartRef = postRef.collection('hearts').doc(auth.currentUser.uid)
const [heartDoc] = useDocument(heartRef)