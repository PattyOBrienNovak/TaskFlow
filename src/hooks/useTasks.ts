import { useState, useEffect } from 'react';
import { Task, Category } from '../types';

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'work', name: '💼 Work', color: 'bg-gradient-to-r from-blue-500 to-cyan-500', icon: 'briefcase' },
  { id: 'personal', name: '🌟 Personal', color: 'bg-gradient-to-r from-green-500 to-emerald-500', icon: 'user' },
  { id: 'shopping', name: '🛍️ Shopping', color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: 'shopping-cart' },
  { id: 'health', name: '❤️ Health', color: 'bg-gradient-to-r from-red-500 to-orange-500', icon: 'heart' },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('bolt-todo-tasks');
    const savedCategories = localStorage.getItem('bolt-todo-categories');
    
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
    
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (error) {
        console.error('Error loading categories:', error);
        setCategories(DEFAULT_CATEGORIES);
      }
    }
  }, []);

  // Save to localStorage whenever tasks or categories change
  useEffect(() => {
    localStorage.setItem('bolt-todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('bolt-todo-categories', JSON.stringify(categories));
  }, [categories]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completed: false,
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : undefined
          }
        : task
    ));
  };

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: crypto.randomUUID(),
    };
    setCategories(prev => [...prev, newCategory]);
  };

  return {
    tasks,
    categories,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    addCategory,
  };
};