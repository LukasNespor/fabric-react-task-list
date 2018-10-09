import { ITaskModel } from './ITaskModel';

export interface IAppState {
  selectedView: string;
  tasks: ITaskModel[];
  taskName: string;
}