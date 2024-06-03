import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"


export const fetchNotes = async () => {
    const notesCollection = await getDocs(collection(db, "notes"))
    return notesCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
}

export const addNote = async (note) => {
    await addDoc(collection(db, "notes"), {
        title: note.title,
        content: note.content,
    })
}

export const updateNote = async (note) => {
    const noteRef = doc(db, "notes", note.id);
    await updateDoc(noteRef, {
        title: note.title,
        content: note.content,
    })
}

export const deleteNote = async (noteId) => {
    const noteRef = doc(db, "notes", noteId);
    await deleteDoc(noteRef);
}