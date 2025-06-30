import React from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';
import { FilterOptions, Category } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  categories: Category[];
  onFilterChange: (filters: FilterOptions) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, categories, onFilterChange }) => {
  const updateFilter = (key: keyof FilterOptions, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const statusOptions = [
    { value: 'all', label: '🌈 All Tasks' },
    { value: 'active', label: '⚡ Active' },
    { value: 'completed', label: '✅ Completed' },
  ];

  const priorityOptions = [
    { value: '', label: '🎯 All Priorities' },
    { value: 'high', label: '🔴 High Priority' },
    { value: 'medium', label: '🟡 Medium Priority' },
    { value: 'low', label: '🟢 Low Priority' },
  ];

  const sortOptions = [
    { value: 'created', label: '🆕 Recently Added' },
    { value: 'dueDate', label: '📅 Due Date' },
    { value: 'priority', label: '⭐ Priority' },
    { value: 'alphabetical', label: '🔤 Alphabetical' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 p-4 mb-6 shadow-lg">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="Search your magical tasks... ✨"
            className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-white/80 to-purple-50/80 border border-purple-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 text-sm transition-all duration-200"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-pink-500" />
            <select
              value={filters.status}
              onChange={(e) => updateFilter('status', e.target.value)}
              className="text-sm px-4 py-3 bg-gradient-to-r from-white/80 to-pink-50/80 border border-pink-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500/30 transition-all duration-200"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="text-sm px-4 py-3 bg-gradient-to-r from-white/80 to-blue-50/80 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-200"
          >
            <option value="">🏷️ All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={filters.priority}
            onChange={(e) => updateFilter('priority', e.target.value)}
            className="text-sm px-4 py-3 bg-gradient-to-r from-white/80 to-green-50/80 border border-green-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500/30 transition-all duration-200"
          >
            {priorityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <SortAsc size={16} className="text-orange-500" />
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              className="text-sm px-4 py-3 bg-gradient-to-r from-white/80 to-orange-50/80 border border-orange-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-200"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};