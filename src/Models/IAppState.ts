import { ITaskModel } from './ITaskModel';

export interface IAppState {
  confirmDialogHidden: boolean;
  selectedView?: string;
  taskIdToDelete: number,
  taskName: string;
  tasks: ITaskModel[];
}