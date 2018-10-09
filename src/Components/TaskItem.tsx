import * as React from 'react';
import { ActivityItem, IActivityItemProps, Link, Checkbox } from "office-ui-fabric-react";
import { ITaskModel } from '../Models/ITaskModel';
import * as moment from 'moment';

export interface ITaskItemProps extends ITaskModel {
  onChange: (id: number) => void;
}

export default class TaskItem extends React.Component<ITaskItemProps, any> {
  constructor(props: ITaskItemProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
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
            <div className="ms-Grid-col ms-sm11">
              <ActivityItem {...options} />
            </div>
            <div className="ms-Grid-col ms-sm1">
              <Checkbox onChange={this.onClick} checked={this.props.completed} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onClick(): void {
    this.props.onChange(this.props.id);
  }
}
