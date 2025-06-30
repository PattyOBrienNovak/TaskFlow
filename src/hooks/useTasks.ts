import { useState, useEffect } from 'react';
import { Task, Category } from '../types';

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'work', name: '💼 Work', color: 'bg-gradient-to-r from-blue-500 to-cyan-500', icon: 'briefcase' },
  { id: 'personal', name: '🌟 Personal', color: 'bg-gradient-to-r from-green-500 to-emerald-500', icon: 'user' },
  { id: 'shopping', name: '🛍️ Shopping', color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: 'shopping-cart' },
  { id: 'health', name: '❤️ Health', color: 'bg-gradient-to-r from-red-500 to-orange-500', icon: 'heart' },
];

const SAMPLE_TASKS: Task[] = [
  {
    id: 'sample-1',
    title: 'Finish Bolt Hackathon submission',
    description: 'Complete the rainbow to-do app with all features and deploy it for the hackathon',
    completed: false,
    priority: 'high',
    category: 'work',
    dueDate: '2025-01-20',
    createdAt: '2025-01-15T10:00:00.000Z',
  },
  {
    id: 'sample-2',
    title: 'Buy groceries for the week',
    description: 'Get fresh vegetables, fruits, and pantry essentials. Don\'t forget the rainbow sprinkles! 🌈',
    completed: false,
    priority: 'medium',
    category: 'shopping',
    dueDate: '2025-01-18',
    createdAt: '2025-01-15T09:30:00.000Z',
  },
  {
    id: 'sample-3',
    title: 'Morning yoga session',
    description: 'Start the day with 30 minutes of mindful yoga and meditation',
    completed: true,
    priority: 'low',
    category: 'health',
    createdAt: '2025-01-15T06:00:00.000Z',
    completedAt: '2025-01-15T07:00:00.000Z',
  },
  {
    id: 'sample-4',
    title: 'Plan weekend adventure',
    description: 'Research hiking trails and plan a fun outdoor adventure with friends',
    completed: false,
    priority: 'low',
    category: 'personal',
    dueDate: '2025-01-19',
    createdAt: '2025-01-14T20:00:00.000Z',
  },
  {
    id: 'sample-5',
    title: 'Team meeting preparation',
    description: 'Prepare slides and agenda for tomorrow\'s quarterly review meeting',
    completed: false,
    priority: 'high',
    category: 'work',
    dueDate: '2025-01-17',
    createdAt: '2025-01-14T15:00:00.000Z',
  },
  {
    id: 'sample-6',
    title: 'Call mom and dad',
    description: 'Catch up with parents and share updates about work and life',
    completed: true,
    priority: 'medium',
    category: 'personal',
    createdAt: '2025-01-13T18:00:00.000Z',
    completedAt: '2025-01-14T19:30:00.000Z',
  },
  {
    id: 'sample-7',
    title: 'Book dentist appointment',
    description: 'Schedule routine cleaning and checkup for next month',
    completed: false,
    priority: 'medium',
    category: 'health',
    dueDate: '2025-01-25',
    createdAt: '2025-01-13T12:00:00.000Z',
  },
  {
    id: 'sample-8',
    title: 'Order birthday gift for Sarah',
    description: 'Find the perfect gift for Sarah\'s birthday party next week',
    completed: false,
    priority: 'high',
    category: 'shopping',
    dueDate: '2025-01-22',
    createdAt: '2025-01-12T16:00:00.000Z',
  },
  {
    id: 'sample-9',
    title: 'Learn new recipe',
    description: 'Try making homemade pasta with rainbow vegetables for a colorful dinner',
    completed: false,
    priority: 'low',
    category: 'personal',
    createdAt: '2025-01-12T14:00:00.000Z',
  },
  {
    id: 'sample-10',
    title: 'Update portfolio website',
    description: 'Add recent projects and refresh the design with modern aesthetics',
    completed: true,
    priority: 'medium',
    category: 'work',
    createdAt: '2025-01-10T11:00:00.000Z',
    completedAt: '2025-01-11T16:45:00.000Z',
  },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

  // Load from localStorage on mount, but always start with sample tasks
  useEffect(() => {
    const savedTasks = localStorage.getItem('bolt-todo-tasks');
    const savedCategories = localStorage.getItem('bolt-todo-categories');
    
    // Only load from localStorage if it exists and has content
    if (savedTasks && savedTasks !== '[]') {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        if (parsedTasks.length > 0) {
          setTasks(parsedTasks);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
        // Keep sample tasks on error
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