import React, { useState } from 'react';
import { Input, Button, Flex } from 'antd';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingNote, setEditingNote] = useState(null);


  const addNote = () => {
    if (!noteInput.trim()) return;
    setLoading(true);
    setTimeout(() => {
    const newNote = {
      id: uuidv4(),
      text: noteInput,
      // Дополнительно, здесь можно добавить поля для категории или цвета
    };

    setNotes([...notes, newNote]);
    setNoteInput('');
    setLoading(false);
    }, 1000);
  };


  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Функция для редактирования заметки 
  const startEditing = (note) => {
    setEditingNote(note);
    setNoteInput(note.text);
  };

  return (
    <div className="App">
      <Flex gap="middle" style={{width: 500}}>
      <Input
        type="text"
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
        placeholder="Добавьте заметку"
      />
      <Button type="primary" loading={loading} onClick={() => addNote()}>{editingNote ? 'Сохранить' : 'Добавить'}</Button>
      </Flex>

      <Flex vertical>
        {notes.map((note) => (
          <div key={note.id}>
            {note.text}
            <button onClick={() => deleteNote(note.id)}>Удалить</button>
            <button onClick={() => startEditing(note)}>Редактировать</button>
          </div>
        ))}
      </Flex>
    </div>
  );
}

export default App;
