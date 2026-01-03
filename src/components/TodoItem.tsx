import type { Todo } from '../types/todo';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const handleDoubleClick = () => {
    const newText = prompt('Edit todo:', todo.text);
    if (newText !== null && newText.trim() !== '') {
      onEdit(todo.id, newText.trim());
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      <span
        className="todo-text"
        onDoubleClick={handleDoubleClick}
        title="Double-click to edit"
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="todo-delete"
        aria-label="Delete todo"
      >
        ×
      </button>
    </li>
  );
}
