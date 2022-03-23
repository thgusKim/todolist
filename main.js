// 유저가 값을 입력한다
// + 버튼을 클릭하면 할일이 추가된다.
// delete 버튼을 누르면 할일이 삭제된다.
// check 버튼을 누르면 할일이 끝나면서 밑줄이 생긴다.
// 진행 중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝난 탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만 나타난다.
// 전체탭을 누르면 다시 전체 아이템으로 돌아온다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let tabUnderline = document.getElementById("tab-underline");
let taskList = [];
let filterList = [];
let mode = "all";

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => enterKey(e));
tabs.forEach((tab) => tab.addEventListener("click", (e) => moveUnderLine(e)));

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  render();
  taskInput.value="";
}

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
    console.log('taskList');
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
    console.log('filterList');
  }
  console.log(list);

  let resultHtml = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHtml += `
      <div class="task done-color">
        <div class="task-done"><span>${list[i].taskContent}</span></div>
        <div class="task-size">
          <button class="cancel-button" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
          <button class="delete-button" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
     </div>`;
    } else {
      resultHtml += `
      <div class="task">
        <div><span>${list[i].taskContent}</span></div>
        <div class="task-size">
          <button class="check-button" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
          <button class="delete-button" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHtml;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  mode = "all";
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9);
}

function deleteTask(id) {
  console.log(taskList)
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  mode = "all";
  console.log(taskList)
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  console.log("filter클릭", mode);
  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
  console.log(filterList);
}

function moveUnderLine(e) {
  tabUnderline.style.left = e.currentTarget.offsetLeft + "px";
  tabUnderline.style.width = e.currentTarget.offsetWidth + "px";
  tabUnderline.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

function enterKey(e) {
  if (e.keyCode === 13) {
    addTask();
  }
}
