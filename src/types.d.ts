export interface Task {
  id: string;
  title: string;
  status: boolean;
}

export type TaskMutation = Omit<Task, 'id'>;
export type ApiTask = Omit<Task, 'id'>;

export interface TaskList {
  [id: string]: ApiTask;
}