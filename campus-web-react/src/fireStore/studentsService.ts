import { Student } from "../types/Student";
import { firestore } from "./config";
import { collection, addDoc } from "firebase/firestore";
const studentsCollection = collection(firestore, "students");

export async function addStudent(student: Student) {
    await addDoc(studentsCollection, student);
}
