import React, { useState } from 'react';
import { CheckSquare, Sparkles } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { FilterBar } from './components/FilterBar';
import { StatsPanel } from './components/StatsPanel';
import { FilterOptions } from './types';

function App() {
  const { tasks, categories, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: '',
    priority: '',
    status: 'all',
    sortBy: 'created',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 via-blue-500 via-green-400 via-yellow-400 to-red-500 animate-gradient-x">
      <div className="min-h-screen bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl text-white shadow-lg">
                <CheckSquare size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <div className="flex items-center gap-1 text-sm text-white/80">
                  <Sparkles size={14} />
                  <span>Bolt Hackathon 2025</span>
                </div>
              </div>
            </div>
            <p className="text-white/90 max-w-md mx-auto font-medium">
              Transform your productivity with beautiful task management that inspires action.
            </p>
          </div>

          {/* Stats Panel */}
          <StatsPanel tasks={tasks} />

          {/* Task Input */}
          <TaskInput categories={categories} onAddTask={addTask} />

          {/* Filter Bar */}
          <FilterBar 
            filters={filters} 
            categories={categories} 
            onFilterChange={setFilters} 
          />

          {/* Task List */}
          <TaskList
            tasks={tasks}
            categories={categories}
            filters={filters}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onUpdateTask={updateTask}
          />

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t border-white/20">
            <p className="text-sm text-white/70">
              Built with 🌈 for the Bolt Hackathon • Powered by React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;