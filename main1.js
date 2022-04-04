let plusButton = document.getElementById("plus-button");
let inputBox = document.getElementById("input-box");
let taskList = [];
let taskArea = document.getElementById("task-area");
let line = false;
let taskHTML = "";
let doneList = [];
let notDoneList = [];
let button = "All";
let allList = [];

const addTask = () => {
  let task = {
    id: "_" + Math.random().toString(36).substr(2, 9),
    inputValue: inputBox.value,
    line: false,
  };
  taskList.push(task);
  allList = taskList;
  render();
};

const render = () => {
  taskHTML = "";

  taskList.map((task) => {
    taskHTML += `<div>
        <span id="${task.id}">${task.inputValue}</span>
        <span onclick="checkButton('${task.id}')">
          <i class="fa-solid fa-check"></i>
        </span>
        <span onclick="deleteButton('${task.id}')">
          <i class="fa-solid fa-trash-can"></i>
        </span>
      </div>`;
  });
  taskArea.innerHTML = taskHTML;
};

const deleteButton = (id) => {
  taskList.map((task, index) => {
    if (task.id == id) {
      taskList.splice(index, 1);
      return;
    }
  });
  render();
};

const checkButton = (id) => {
  taskList.map((task) => {
    if (task.id == id) {
      task.line = !task.line;
    }
  });
  console.log(taskList);
  makeLine();
};

const makeLine = () => {
  taskList.map((task) => {
    if (task.line != false) {
      document.getElementById(task.id).style.textDecoration = "line-through";
      task.line = true;
    } else {
      document.getElementById(task.id).style.textDecoration = "none";
      task.line = false;
    }
  });
};

const notDoneButton = () => {
  filter();
  taskList = notDoneList;
  render();
  makeLine();
};

const doneButton = () => {
  filter();
  taskList = doneList;
  render();
  makeLine();
};

const allButton = () => {
    taskList = allList;
    render();
    makeLine();
};

const filter = () => {
  taskList.map((task) => {
    if (task.line == true) {
      doneList.push(task);
    } else {
      notDoneList.push(task);
    }
  });
  doneList = [...new Set(doneList)];
  notDoneList = [...new Set(notDoneList)];
};
