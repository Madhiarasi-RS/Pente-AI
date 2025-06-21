export interface Task {
  _id?: string;
  title: string;
  description?: string;
  status: 'Open' | 'In Progress' | 'Done';
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface TaskFilters {
  status?: 'Open' | 'In Progress' | 'Done';
  page?: number;
  limit?: number;
}

export interface TaskResponse {
  tasks: Task[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}