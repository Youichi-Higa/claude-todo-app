import { useMemo } from 'react';
import type { Todo, TodoFilter as FilterType } from './types/todo';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import './App.css';

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useLocalStorage<FilterType>('todoFilter', 'all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const todoCount = useMemo(
    () => ({
      all: todos.length,
      active: todos.filter((todo) => !todo.completed).length,
      completed: todos.filter((todo) => todo.completed).length,
    }),
    [todos]
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo App</h1>
      </header>
      <main className="app-main">
        <AddTodo onAdd={addTodo} />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
        {todos.length > 0 && (
          <TodoFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            todoCount={todoCount}
            onClearCompleted={clearCompleted}
          />
        )}
      </main>
    </div>
  );
}

export default App;
