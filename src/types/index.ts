export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface FilterOptions {
  search: string;
  category: string;
  priority: string;
  status: 'all' | 'active' | 'completed';
  sortBy: 'dueDate' | 'priority' | 'created' | 'alphabetical';
}