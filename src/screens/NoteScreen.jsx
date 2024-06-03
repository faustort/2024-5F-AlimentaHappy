import React, { useEffect, useState } from "react"; // Importa React e hooks necessários
import { View, FlatList } from "react-native"; // Importa componentes básicos do React Native
import {
  Button,
  Card,
  Paragraph,
  Portal,
  Dialog,
  TextInput,
  Provider,
} from "react-native-paper"; // Importa componentes do React Native Paper
import { fetchNotes, addNote, updateNote, deleteNote } from "./../services/notesService"; // Importa funções de serviço para manipulação das notas

const NotesScreen = () => {
  const [notes, setNotes] = useState([]); // Define o estado para armazenar as notas
  const [visible, setVisible] = useState(false); // Define o estado para controlar a visibilidade do modal
  const [currentNote, setCurrentNote] = useState({
    id: null,
    title: "",
    content: "",
  }); // Define o estado para a nota atual sendo editada ou adicionada

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const notes = await fetchNotes(); // Busca as notas do Firestore
    setNotes(notes); // Atualiza o estado das notas
  };

  const handleSave = async () => {
    if (currentNote.id) {
      await updateNote(currentNote); // Atualiza a nota existente
    } else {
      await addNote(currentNote); // Adiciona uma nova nota
    }
    loadNotes(); // Atualiza a lista de notas
    setVisible(false); // Esconde o modal
  };

  const handleDelete = async (id) => {
    await deleteNote(id); // Exclui a nota
    loadNotes(); // Atualiza a lista de notas
  };

  const showDialog = (note = { id: null, title: "", content: "" }) => {
    setCurrentNote(note); // Define a nota atual
    setVisible(true); // Mostra o modal
  };

  return (
    <Provider>
      <View style={{ flex: 1, padding: 20 }}>
        <FlatList
          data={notes} // Fonte de dados para a lista
          keyExtractor={(item) => item.id} // Chave única para cada item
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 10 }}>
              <Card.Title title={item.title} />
              <Card.Content>
                <Paragraph>{item.content}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => showDialog(item)}>Edit</Button>
                <Button onPress={() => handleDelete(item.id)}>Delete</Button>
              </Card.Actions>
            </Card>
          )}
        />
        <Button onPress={() => showDialog()}>Add Note</Button>
        <NoteDialog
          visible={visible}
          hideDialog={() => setVisible(false)}
          note={currentNote}
          setNote={setCurrentNote}
          onSave={handleSave}
        />
      </View>
    </Provider>
  );
};

const NoteDialog = ({ visible, hideDialog, note, setNote, onSave }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{note.id ? "Edit Note" : "Add Note"}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Title"
            value={note.title}
            onChangeText={(text) =>
              setNote((prev) => ({ ...prev, title: text }))
            }
          />
          <TextInput
            label="Content"
            value={note.content}
            onChangeText={(text) =>
              setNote((prev) => ({ ...prev, content: text }))
            }
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={onSave}>{note.id ? "Update" : "Save"}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default NotesScreen;
