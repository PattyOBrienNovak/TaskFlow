import React, { useMemo } from 'react';
import { TaskItem } from './TaskItem';
import { Task, Category, FilterOptions } from '../types';
import { Sparkles } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  filters: FilterOptions;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  categories,
  filters,
  onToggleTask,
  onDeleteTask,
  onUpdateTask,
}) => {
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(task => task.category === filters.category);
    }

    // Apply priority filter
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(task =>
        filters.status === 'completed' ? task.completed : !task.completed
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        
        case 'created':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [tasks, filters]);

  const getCategoryById = (id: string) => {
    return categories.find(cat => cat.id === id) || categories[0];
  };

  if (filteredAndSortedTasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6 shadow-lg">
          <Sparkles size={36} className="text-purple-400" />
        </div>
        <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          {tasks.length === 0 ? 'Ready for magic!' : 'No matching tasks'}
        </h3>
        <p className="text-white/80 font-medium">
          {tasks.length === 0 
            ? 'Add your first task and watch the magic happen! ✨' 
            : 'Try adjusting your search or filters to find what you\'re looking for 🔍'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredAndSortedTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          category={getCategoryById(task.category)}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          onUpdate={onUpdateTask}
        />
      ))}
    </div>
  );
};