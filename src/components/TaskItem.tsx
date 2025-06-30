import React, { useState } from 'react';
import { Check, Edit3, Calendar, Flag, Trash2 } from 'lucide-react';
import { Task, Category } from '../types';

interface TaskItemProps {
  task: Task;
  category: Category;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  category, 
  onToggle, 
  onDelete, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleEdit = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, { title: editTitle.trim() });
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  const priorityColors = {
    low: 'text-green-600',
    medium: 'text-orange-600',
    high: 'text-red-600',
  };

  const priorityEmojis = {
    low: '🟢',
    medium: '🟡',
    high: '🔴',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    return `${diffDays} days`;
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`group bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 p-5 hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            task.completed
              ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-400 text-white shadow-lg'
              : 'border-gray-300 hover:border-green-400 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50'
          }`}
        >
          {task.completed && <Check size={14} />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleEdit}
              onKeyPress={handleKeyPress}
              className="w-full text-sm font-medium bg-transparent border-b-2 border-purple-300 outline-none focus:border-purple-500 transition-colors duration-200"
              autoFocus
            />
          ) : (
            <h3 
              className={`text-sm font-medium transition-all duration-200 ${
                task.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-800 group-hover:text-gray-900'
              }`}
            >
              {task.title}
            </h3>
          )}

          {task.description && (
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-3 mt-3">
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white shadow-sm ${category.color}`}>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              {category.name}
            </div>

            <div className={`flex items-center gap-1 text-xs font-medium ${priorityColors[task.priority]}`}>
              <span>{priorityEmojis[task.priority]}</span>
              {task.priority}
            </div>

            {task.dueDate && (
              <div className={`flex items-center gap-1 text-xs font-medium ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
                <Calendar size={12} />
                {formatDate(task.dueDate)}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-all duration-200"
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};