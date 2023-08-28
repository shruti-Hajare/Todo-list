let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addTodo");
let taskContainer = document.getElementById("taskContainer");

let todos = [];

window.onload = () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  updateTodos();
};

let todo = {
  id: "",
  text: "",
  done: false,
};

taskInput.onchange = (e) => {
  todo.text = e.target.value;
};

function updateTodos() {
  taskContainer.innerHTML = todos.map((val) => {
    return `<div id="${val.id}" class="task-box">
          <div class="content">
            <input onchange="toggleDone(${val.id})" type="checkbox" ${
      val.done ? "checked" : ""
    } class="checkbox" />
            <input
              type="text"
              class="task ${val.done ? "strikeout" : ""}"
              value="${val.text}"
              readonly
            />
          </div>
          <div class="actions">
            <button onclick="editTodo(${val.id})" class="edit">Edit</button>
            <button onclick="deleteTodo(${
              val.id
            })" class="delete">Delete</button>
          </div>
        </div>`;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

addBtn.onclick = () => {
  if (todo.text.trim().length) {
    todo.id = Math.ceil(Math.random() * 100000);
    todos.push(todo);
    updateTodos();
    todo = { id: "", text: "", done: false };
    taskInput.value = "";
  }
};

function editTodo(id) {
  let ele = document.getElementById(id);
  let inputEle = ele.children[0].children[1];
  let btn = ele.children[1].children[0];
  if (btn.innerHTML.toLowerCase() === "edit") {
    inputEle.removeAttribute("readonly");
    inputEle.focus();
    btn.innerHTML = "save";
  } else {
    let idx = -1;
    for (let index = 0; index < todos.length; index++) {
      const tempTodo = todos[index];
      if (tempTodo.id === id) {
        idx = index;
        break;
      }
    }
    todos[idx].text = inputEle.value;
    updateTodos();
    btn.innerHTML = "edit";
  }
}

function toggleDone(id) {
  let inputEle = document.getElementById(id).children[0].children[1];
  let checkbox = document.getElementById(id).children[0].children[0];
  inputEle.classList.toggle("strikeout");
  let idx = -1;
  for (let index = 0; index < todos.length; index++) {
    const tempTodo = todos[index];
    if (tempTodo.id === id) {
      idx = index;
      break;
    }
  }
  todos[idx].done = checkbox.checked;
  updateTodos();
}

function deleteTodo(id) {
  todos = todos.filter((val) => val.id !== id);
  updateTodos();
}