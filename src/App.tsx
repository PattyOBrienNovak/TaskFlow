import React, { useState } from 'react';
import { CheckSquare, Sparkles, Zap } from 'lucide-react';
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
        {/* Bolt Hackathon Badge - Responsive positioning */}
        <div className="fixed top-4 right-4 z-50 md:top-6 md:right-6">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-full shadow-2xl border-2 border-white/30 backdrop-blur-md hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="p-0.5 md:p-1 bg-white/20 rounded-full">
                <Zap size={12} className="text-yellow-300 md:w-4 md:h-4" />
              </div>
              <div className="text-xs md:text-sm font-bold">
                <div className="flex items-center gap-1">
                  <span>Bolt</span>
                  <Sparkles size={10} className="text-yellow-300 animate-pulse md:w-3 md:h-3" />
                  <span className="hidden sm:inline">Hackathon</span>
                  <span className="sm:hidden">H</span>
                </div>
                <div className="text-xs text-white/80 font-medium leading-none">2025</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header - Added top padding to account for badge */}
          <div className="text-center mb-8 pt-4 md:pt-0">
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