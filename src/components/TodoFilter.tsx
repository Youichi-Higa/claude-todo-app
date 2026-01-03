import type { TodoFilter as FilterType } from '../types/todo';
import './TodoFilter.css';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todoCount: {
    all: number;
    active: number;
    completed: number;
  };
  onClearCompleted: () => void;
}

export function TodoFilter({
  currentFilter,
  onFilterChange,
  todoCount,
  onClearCompleted,
}: TodoFilterProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="todo-filter">
      <span className="todo-count">
        {todoCount.active} item{todoCount.active !== 1 ? 's' : ''} left
      </span>
      <div className="filter-buttons">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`filter-button ${currentFilter === filter.value ? 'active' : ''}`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      {todoCount.completed > 0 && (
        <button onClick={onClearCompleted} className="clear-completed">
          Clear completed
        </button>
      )}
    </div>
  );
}
