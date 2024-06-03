import { useEffect, useState } from "react";
import { addNote, deleteNote, fetchNotes, updateNote } from "../services/noteServices";
import {
  Button,
  Card,
  Dialog,
  Paragraph,
  Portal,
  Provider,
  Surface,
  TextInput,
} from "react-native-paper";
import { styles } from "../config/styles";
import { FlatList, View } from "react-native";

export default function NoteScreen() {
  const [notes, setNotes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    id: null,
    title: "",
    content: "",
  });

  useEffect(() => {
    loadNotes();
  }, []);

  const showDialog = (note = { id: null, title: "", content: "" }) => {
    setCurrentNote(note);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    loadNotes();
  };

  const handleSave = async () => {
    if (currentNote.id) {
      await updateNote(currentNote);
    } else {
      await addNote(currentNote);
    }
    loadNotes();
    setVisible(false);
  };

  const loadNotes = async () => {
    const notesLoaded = await fetchNotes();
    setNotes(notesLoaded);
  };

  return (
    <Provider>
      <Surface style={styles.container}>
        <View style={styles.innerContainer}>
          <FlatList
            style={{ flex: 1, width: "100%" }}
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card style={{ marginBottom: 10 }}>
                <Card.Title title={item.title} />
                <Card.Content>
                  <Paragraph>{item.content}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => showDialog(item)}>Editar</Button>
                  <Button onPress={() => handleDelete(item.id)}>Excluir</Button>
                </Card.Actions>
              </Card>
            )}
          />
          <Button onPress={() => showDialog()}>Adicionar Nota</Button>
          <NoteDialog
            visible={visible}
            hideDialog={() => setVisible(false)}
            note={currentNote}
            setNote={setCurrentNote}
            onSave={handleSave}
          />
        </View>
      </Surface>
    </Provider>
  );
}

const NoteDialog = ({ visible, hideDialog, note, setNote, onSave }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>
          {note.id ? "Editando a nota" : "Adicionando uma nota"}
        </Dialog.Title>
        <Dialog.Content>
          <TextInput
            label={"Título"}
            value={note.title}
            onChangeText={(text) =>
              setNote((notaAntiga) => ({
                ...notaAntiga,
                title: text,
              }))
            }
          />
          <TextInput
            label="Conteúdo"
            value={note.content}
            onChangeText={(text) =>
              setNote((notaAntiga) => ({
                ...notaAntiga,
                content: text,
              }))
            }
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancelar</Button>
          <Button onPress={onSave}>{note.id ? "Atualizar" : "Salvar"}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
