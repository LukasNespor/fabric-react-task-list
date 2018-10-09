import * as React from 'react';
import { ActivityItem, IActivityItemProps, Link, Checkbox, IconButton } from "office-ui-fabric-react";
import { ITaskModel } from '../Models/ITaskModel';
import * as moment from 'moment';

export interface ITaskItemProps extends ITaskModel {
  onChange: (id: number) => void;
  onDelete: (id: number) => void;
}

export default class TaskItem extends React.Component<ITaskItemProps, any> {
  constructor(props: ITaskItemProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  public render() {
    const options: IActivityItemProps = {
      activityDescription: [
        <strong key="1">{this.props.taskName}</strong>,
        " by ",
        <Link key="2">{this.props.user}</Link>
      ],
      activityPersonas: [
        {
          imageUrl: this.props.userPhotoUrl
        }
      ],
      timeStamp: moment(this.props.date).fromNow()
    };

    return (
      <div className="taskItem">
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm10">
              <ActivityItem {...options} />
            </div>
            <div className="ms-Grid-col ms-sm2">
              <div className="ms-Grid-row actions">
                <div className="ms-Grid-col ms-sm6">
                  <IconButton iconProps={{ iconName: "Trash" }}
                    disabled={this.props.completed}
                    onClick={this.onDelete} />
                </div>
                <div className="ms-Grid-col ms-sm6">
                  <Checkbox onChange={this.onClick} checked={this.props.completed} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onClick(): void {
    this.props.onChange(this.props.id);
  }

  private onDelete(): void {
    this.props.onDelete(this.props.id);
  }
}
