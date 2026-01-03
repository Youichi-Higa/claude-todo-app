import { useState, type FormEvent } from 'react';
import './AddTodo.css';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText) {
      onAdd(trimmedText);
      setText('');
    }
  };

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="add-todo-input"
        autoFocus
      />
      <button type="submit" className="add-todo-button">
        Add
      </button>
    </form>
  );
}
