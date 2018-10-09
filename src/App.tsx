import * as React from 'react';
import "./App.css";

import { FluentCustomizations } from '@uifabric/experiments/lib/components/fluent/FluentCustomizations';
import { FontSizes } from '@uifabric/experiments/lib/components/fluent/FluentType';
import { Customizer, Fabric, Pivot, PivotItem, ProgressIndicator, TextField, PrimaryButton } from "office-ui-fabric-react";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";

import axios from "axios";
import update from "immutability-helper";
import * as moment from "moment";

import TaskItem from './Components/TaskItem';
import { IAppState } from './Models/IAppState';
import { ITaskModel } from './Models/ITaskModel';

initializeIcons();

class App extends React.Component<{}, IAppState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      selectedView: "0",
      tasks: [],
      taskName: ""
    };

    this.onTaskNameChange = this.onTaskNameChange.bind(this);
    this.onTaskChange = this.onTaskChange.bind(this);
    this.onPivotClick = this.onPivotClick.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  public render() {
    return (
      <Customizer {...FluentCustomizations}>
        <Fabric>
          <div className="app">
            {this.renderHeader()}
            {this.renderContent()}
            {this.renderFooter()}
          </div>
        </Fabric>
      </Customizer>
    );
  }

  public renderHeader(): JSX.Element {
    return (
      <div className="header">
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
              <div style={{ fontSize: FontSizes.size16 }}>Task list</div>
              <div><small>Display list of tasks for you team</small></div>
              <br />
            </div>
          </div>

          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm9">
              <TextField placeholder="Task name"
                value={this.state.taskName}
                onChange={this.onTaskNameChange} />
            </div>
            <div className="ms-Grid-col ms-sm3">
              <PrimaryButton text="Add task"
                disabled={!this.state.taskName}
                onClick={this.addTask} />
            </div>
          </div>
        </div>

        <Pivot onLinkClick={this.onPivotClick}>
          <PivotItem headerText="Active" itemKey="0" />
          <PivotItem headerText="Completed" itemKey="1" />
          <PivotItem headerText="All Tasks" itemKey="2" />
        </Pivot>
      </div>
    );
  }

  public renderContent(): JSX.Element {
    let tasks: ITaskModel[] = [];
    if (this.state.selectedView === "0") {
      tasks = this.state.tasks.filter(x => !x.completed);
    } else if (this.state.selectedView === "1") {
      tasks = this.state.tasks.filter(x => x.completed);
    } else {
      tasks = this.state.tasks;
    }

    return (
      <div className="content">
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
              {tasks.map(task =>
                <TaskItem
                  key={task.id}
                  {...task}
                  onChange={this.onTaskChange} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  public renderFooter(): JSX.Element {
    const count: number = this.state.tasks.length;
    const completed: number = this.state.tasks.filter(x => x.completed).length;

    return (
      <div className="footer">
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
              <ProgressIndicator
                percentComplete={completed / count}
                description={`${completed} of ${count} task${count > 0 ? "s" : ""} finished`} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  public componentWillMount(): void {
    const items: ITaskModel[] = [];

    axios.get("https://randomuser.me/api/?results=5&exc=login,location&noinfo").then((response: any) => {
      let index: number = 1;
      response.data.results.forEach((user: any) => {
        items.push({
          id: index,
          user: this.parseName(`${user.name.first} ${user.name.last}`),
          completed: false,
          date: moment().add(-user.registered.age, "d").toDate(),
          taskName: "Some task name",
          userPhotoUrl: user.picture.thumbnail
        });

        index++;
      });

      this.setState({ tasks: items });
    });
  }

  private addTask() {
    const { tasks } = this.state;
    const task: ITaskModel = {
      taskName: this.state.taskName,
      completed: false,
      date: new Date(),
      user: "John Doe",
      userPhotoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg",
      id: tasks.length + 1
    };
    const updated = update(tasks, { $push: [task] });
    this.setState({ tasks: updated, taskName: "" });
  }

  private onTaskNameChange(e: any): void {
    this.setState({ taskName: e.target.value });
  }

  private onTaskChange(taskId: number): void {
    const { tasks } = this.state;
    const found: ITaskModel | undefined = tasks.find(x => x.id === taskId);
    if (found) {
      const index: number = tasks.indexOf(found);
      const updated: ITaskModel[] = update(tasks, { [index]: { completed: { $apply: (val: boolean) => !val } } });
      this.setState({ tasks: updated });
    }
  }

  private onPivotClick(e: any): void {
    this.setState({ selectedView: e.props.itemKey })
  }

  private parseName(value: string): string {
    const names: string[] = value.split(" ");
    const parsed: string[] = [];

    names.forEach(name => {
      const firstLetter: string = name.substring(0, 1).toUpperCase();
      parsed.push(`${firstLetter}${name.substring(1, name.length)}`);
    });

    return parsed.join(" ");
  }
}

export default App;
