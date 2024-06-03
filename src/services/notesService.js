import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"; // Importa funções do Firestore para manipulação de dados
import { db } from "./../config/firebase"; // Importa a configuração do Firestore

// Função para buscar notas do Firestore
export const fetchNotes = async () => {
  const notesCollection = await getDocs(collection(db, "notes"));
  return notesCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Função para adicionar uma nova nota
export const addNote = async (note) => {
  await addDoc(collection(db, "notes"), {
    title: note.title,
    content: note.content,
  });
};

// Função para atualizar uma nota existente
export const updateNote = async (note) => {
  const noteRef = doc(db, "notes", note.id);
  await updateDoc(noteRef, {
    title: note.title,
    content: note.content,
  });
};

// Função para excluir uma nota
export const deleteNote = async (id) => {
  const noteRef = doc(db, "notes", id);
  await deleteDoc(noteRef);
};
