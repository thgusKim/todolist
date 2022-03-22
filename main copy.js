// 유저가 값을 입력한다
// + 버튼을 클릭하면 할일이 추가된다.
// delete 버튼을 누르면 할일이 삭제된다.
// check 버튼을 누르면 할일이 끝나면서 밑줄이 생긴다.
// 진행 중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝난 탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만 나타난다.
// 전체탭을 누르면 다시 전체 아이템으로 돌아온다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let taskAll = document.getElementById("task-all");
let taskNotDone = document.getElementById("task-not-done");
let taskDone = document.getElementById("task-done");
let resultHtml = "";
let list = [];

addButton.addEventListener("click", addTask);
taskAll.addEventListener("click", allTask);
taskNotDone.addEventListener("click", notdone);
taskDone.addEventListener("click", done);

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  render();
}

function render() {
  resultHtml = "";

  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHtml += ` <div class="task">
    <span class="task-done">${taskList[i].taskContent}</span>
    <div>
      <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-left i-check"></i></button>
      <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
    </div>
 </div>`;
    } else {
      resultHtml += ` <div class="task">
      <span>${taskList[i].taskContent}</span>
      <div>
        <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
        <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
   </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHtml;
  let alltaskk = resultHtml;
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9);
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function done() {
  let rresultHtml = document.getElementById("task-board").innerHTML;
  resultHtml = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHtml += ` <div class="task">
  <span class="task-done">${taskList[i].taskContent}</span>
  <div>
    <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-left i-check"></i></button>
    <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
  </div>
</div>`;
    }
    document.getElementById("task-board").innerHTML = resultHtml;
  }
}

function notdone() {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      taskList.splice(i, 1);
    }
  }
  render();
}

function allTask(){
  for (let i = 0; i < taskList.length; i++) {
    document.getElementById("task-board").innerHTML = alltaskk;
  }
}