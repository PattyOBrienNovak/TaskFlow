import React, { useState } from 'react';
import { Plus, Calendar, Flag, Folder } from 'lucide-react';
import { Category } from '../types';

interface TaskInputProps {
  categories: Category[];
  onAddTask: (task: {
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    category: string;
    dueDate?: string;
  }) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ categories, onAddTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('personal');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      category,
      dueDate: dueDate || undefined,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('personal');
    setDueDate('');
    setIsExpanded(false);
  };

  const priorityColors = {
    low: 'text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 border-green-300',
    medium: 'text-orange-700 bg-gradient-to-r from-yellow-100 to-orange-100 border-orange-300',
    high: 'text-red-700 bg-gradient-to-r from-red-100 to-pink-100 border-red-300',
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-white/40 shadow-2xl p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="What magical task awaits? ✨"
              className="w-full text-lg font-medium bg-transparent border-none outline-none placeholder-gray-500"
            />
          </div>
          <button
            type="submit"
            disabled={!title.trim()}
            className="p-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Plus size={20} />
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add some magical details... (optional) 🌟"
              rows={2}
              className="w-full text-sm bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 resize-none transition-all duration-200"
            />

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Flag size={16} className="text-purple-500" />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className={`text-xs font-medium px-4 py-2 rounded-full border outline-none transition-all duration-200 ${priorityColors[priority]}`}
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Folder size={16} className="text-blue-500" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="text-xs font-medium px-4 py-2 rounded-full border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-200"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-green-500" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="text-xs px-4 py-2 rounded-full border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 outline-none focus:ring-2 focus:ring-green-500/30 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};