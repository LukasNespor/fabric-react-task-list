export interface ITaskModel {
  id: number;
  taskName: string;
  user: string;
  userPhotoUrl: string;
  date: Date;
  completed: boolean;
}