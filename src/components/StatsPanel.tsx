import React from 'react';
import { CheckCircle, Circle, TrendingUp, Calendar } from 'lucide-react';
import { Task } from '../types';

interface StatsPanelProps {
  tasks: Task[];
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const tasksDueToday = tasks.filter(task => 
    task.dueDate === todayString && !task.completed
  ).length;

  const overdueTasks = tasks.filter(task => 
    task.dueDate && 
    new Date(task.dueDate) < today && 
    !task.completed
  ).length;

  const thisWeekCompleted = tasks.filter(task => {
    if (!task.completedAt) return false;
    const completedDate = new Date(task.completedAt);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return completedDate >= weekAgo;
  }).length;

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: Circle,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-100 to-pink-100',
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100',
    },
    {
      label: 'Active',
      value: activeTasks,
      icon: Circle,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
    },
    {
      label: 'This Week',
      value: thisWeekCompleted,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-100 to-yellow-100',
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 p-6 mb-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Progress Overview
        </h2>
        <div className="text-sm font-medium bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          {completionRate.toFixed(0)}% Complete
        </div>
      </div>

      {/* Rainbow Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-green-500 to-yellow-500 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${completionRate}%` }}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${stat.bgColor} mb-3 shadow-lg`}>
              <stat.icon size={22} className={stat.color} />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {(tasksDueToday > 0 || overdueTasks > 0) && (
        <div className="space-y-2">
          {tasksDueToday > 0 && (
            <div className="flex items-center gap-2 text-sm text-amber-800 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-3 rounded-xl border border-yellow-200">
              <Calendar size={16} />
              <span className="font-medium">{tasksDueToday} task{tasksDueToday > 1 ? 's' : ''} due today</span>
            </div>
          )}
          {overdueTasks > 0 && (
            <div className="flex items-center gap-2 text-sm text-red-800 bg-gradient-to-r from-red-100 to-pink-100 px-4 py-3 rounded-xl border border-red-200">
              <Calendar size={16} />
              <span className="font-medium">{overdueTasks} overdue task{overdueTasks > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};