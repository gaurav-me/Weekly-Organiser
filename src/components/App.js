import React from "react";
import "../styles/App.css";
import generateID from "./id-generator";
import { Input, Button } from "./functions-group-a";
import SingleTaskList from "./singleTaskList";

const days = {
  None: "None",
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Weekend: "Weekend"
};

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdated: "",
      value: "",
      valueTuesday: "",
      tasks: [
        { id: 1, text: "buy milk", isDone: false, day: days.Monday },
        { id: 2, text: "eat dinner", isDone: false, day: days.Monday },
        { id: 3, text: "nail javascript", isDone: false, day: days.Monday },
        { id: 4, text: "give feedback", isDone: false, day: days.Monday },
        { id: 5, text: "find nemo", isDone: false, day: days.Monday },
        { id: 6, text: "find my keys", isDone: false, day: days.Tuesday }
      ]
    };
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStrikethrough = this.handleStrikethrough.bind(this);
  }

  tasksPending = () => {
    const completedTasks = this.state.tasks.filter(t => {
      return t.isDone;
    });
    return this.state.tasks.length - completedTasks.length;
  };

  handleStrikethrough(event) {
    console.log("event.target.id is: ", event.target.id);
    const targetId = Number(event.target.id);

    this.setState(prevState => ({
      //synthetic event gets nullified in setState()
      tasks: prevState.tasks.map(obj =>
        obj.id === targetId
          ? Object.assign(
              obj,
              obj.isDone ? { isDone: false } : { isDone: true }
            )
          : obj
      )
    }));
  }

  handleNewInput = event => {
    this.setState({ value: event.target.value });
  };

  taskListUpdate = () => {
    this.state.tasks.push({
      id: generateID(),
      text: this.state.value,
      isDone: false,
      day: days.Monday
    });
    this.setState({ value: "" });
  };

  spanClickHandler = (event, id) => {
    let confirmation = window.confirm(
      "Are you sure you want to delete this task? You cannot undo this action."
    );
    if (!confirmation) {
      return;
    }
    let newArray = this.state.tasks.filter(task => {
      if (task.id === id) {
        task.isDone = true;
        task.day = days.None;
      }
      return task;
    });

    console.log("newArray", newArray);

    this.setState({
      ...this.state,
      newArray
    });
  };

  handleClick() {
    if (this.state.value === "") {
      return;
    }
    this.taskListUpdate();
  }

  handleEnterPress(event) {
    if (event.target.value === "") {
      return;
    }
    let enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) {
      this.taskListUpdate();
    }
  }

  dragOverHandler = event => {
    event.preventDefault();
  };

  onDragStartHandler = (event, id) => {
    console.log("id is ", id);
    event.dataTransfer.setData("text/plain", id);
  };

  onDropHandler = (event, imposition) => {
    console.log("imposition is", imposition);
    let idty = Number(event.dataTransfer.getData("text"));

    let newArray = this.state.tasks.filter(task => {
      if (task.id === idty) {
        task.day = imposition;
      }
      return task;
    });

    console.log("d", newArray);

    this.setState({
      ...this.state,
      newArray
    });
  };

  render() {
    const getTasksOfDay = listDay =>
      this.state.tasks.filter(task => task.day === listDay);

    // const daysKeys = Object.keys(days);

    // // const tasksForEachDay = daysKeys.filter(key => {
    // //   days[key] === "None";
    // // });

    // const getTasksofEachDay = () =>
    //   daysKeys.map(key => {
    //     if (days[key] !== "None") {
    //       return (
    //         <div
    //           className="taskList"
    //           onDrop={event => this.onDropHandler(event, days.Tuesday)}
    //           onDragOver={this.dragOverHandler}
    //         >
    //           <p>{days.Tuesday}</p>
    //           <SingleTaskList
    //             tasks={getTasksOfDay(days.Tuesday)}
    //             onDragStartHandler={this.onDragStartHandler}
    //             handleStrikethrough={this.handleStrikethrough}
    //             spanClickHandler={this.spanClickHandler}
    //           />
    //         </div>
    //       );
    //     }
    //   });

    return (
      <div id="container">
        <div className="form">
          <Input
            // id={generateID()}
            type="text"
            value={this.state.value}
            onKeyDown={this.handleEnterPress}
            placeholder="Enter task here..."
            onChange={this.handleNewInput}
          />
          <Button type="Button" onClick={this.handleClick} />
        </div>
        <div>
          <p className="info">Tasks pending: {this.tasksPending()}</p>
        </div>
        <div className="organiser-container">
          <div
            className="taskList"
            onDrop={event => this.onDropHandler(event, days.Monday)}
            onDragOver={this.dragOverHandler}
          >
            <p>{days.Monday}</p>
            <SingleTaskList
              tasks={getTasksOfDay(days.Monday)}
              onDragStartHandler={this.onDragStartHandler}
              handleStrikethrough={this.handleStrikethrough}
              spanClickHandler={this.spanClickHandler}
            />
          </div>
          <div
            className="taskList"
            onDrop={event => this.onDropHandler(event, days.Tuesday)}
            onDragOver={this.dragOverHandler}
          >
            <p>{days.Tuesday}</p>
            <SingleTaskList
              tasks={getTasksOfDay(days.Tuesday)}
              onDragStartHandler={this.onDragStartHandler}
              handleStrikethrough={this.handleStrikethrough}
              spanClickHandler={this.spanClickHandler}
            />
          </div>
          <div
            className="taskList"
            onDrop={event => this.onDropHandler(event, days.Wednesday)}
            onDragOver={this.dragOverHandler}
          >
            <p>{days.Wednesday}</p>
            <SingleTaskList
              tasks={getTasksOfDay(days.Wednesday)}
              onDragStartHandler={this.onDragStartHandler}
              handleStrikethrough={this.handleStrikethrough}
              spanClickHandler={this.spanClickHandler}
            />
          </div>
          <div
            className="taskList"
            onDrop={event => this.onDropHandler(event, days.Thursday)}
            onDragOver={this.dragOverHandler}
          >
            <p>{days.Thursday}</p>
            <SingleTaskList
              tasks={getTasksOfDay(days.Thursday)}
              onDragStartHandler={this.onDragStartHandler}
              handleStrikethrough={this.handleStrikethrough}
              spanClickHandler={this.spanClickHandler}
            />
          </div>
          <div
            className="taskList"
            onDrop={event => this.onDropHandler(event, days.Friday)}
            onDragOver={this.dragOverHandler}
          >
            <p>{days.Friday}</p>
            <SingleTaskList
              tasks={getTasksOfDay(days.Friday)}
              onDragStartHandler={this.onDragStartHandler}
              handleStrikethrough={this.handleStrikethrough}
              spanClickHandler={this.spanClickHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

function App() {
  return <ToDoList />;
}

export default App;