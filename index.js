const tasks = [
  "Take out the trash",
  "Take the cat to the vet",
  "Go to the ward office",
];

$(function () {
  renderTasks(tasks);
  addEventListenerToAddButton();
});

function renderTasks(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    createRow(tasks[i], i);
  }
}

function createRow(task, index) {
  const tableRef = document.getElementById("table-todo-wrapper").getElementsByTagName("tbody")[0];
  const newRow = tableRef.insertRow();
  newRow.className = `task-row-${index}`;
  const newCellFirst = newRow.insertCell(0);
  const newCellSecond = newRow.insertCell(1);
  const newCellThird = newRow.insertCell(2);

  const newCheckbox = createCheckbox(index);
  const newTask = createTask(task, index);

  const newEditButton = createEditButton(index);
  const newRemoveButton = createRemoveButton(index);

  newCellFirst.appendChild(newCheckbox);
  newCellSecond.appendChild(newTask);
  // newCellThird.append(newEditButton, newRemoveButton);
  newCellThird.appendChild(newRemoveButton);
}

function createCheckbox(index) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add(index);
  checkbox.id = index;
  addEventListenerToCheckbox(checkbox, index);

  return checkbox;
}

function addEventListenerToCheckbox(checkbox, index) {
  checkbox.addEventListener("change", (e) => {
    const checkbox = e.target;
    if (!checkbox.classList.contains("checked")) {
      checkbox.classList.add("checked");
      crossOutTask(index);
    } else {
      checkbox.classList.remove("checked");
      deleteCrossOutTask(index);
    }
  });
}

function crossOutTask(index) {
  const task = document.getElementById(`task-${index}`);
  task.classList.add("cross-out");
}

function deleteCrossOutTask(index) {
  const task = document.getElementById(`task-${index}`);
  task.classList.remove("cross-out");
}

function createTask(task, index) {
  const newTask = document.createElement("text");
  newTask.classList.add(index);
  newTask.id = `task-${index}`;
  newTask.innerText = task;

  return newTask;
}

function createEditButton(index) {
  const editButton = document.createElement("button");
  editButton.classList.add("btn", "btn-warning", "edit-button", index);
  editButton.innerText = "Edit";

  return editButton;
}

function createRemoveButton(index) {
  const removeButton = document.createElement("button");
  removeButton.classList.add("btn", "btn-danger", "remove-button", index);
  removeButton.innerText = "Remove";
  addEventListenerToRemoveButton(removeButton, index);

  return removeButton;
}

function addEventListenerToRemoveButton(removeButton, index) {
  removeButton.addEventListener("click", e => {
    console.log(e.target)
    const table = document.getElementById("table-todo-wrapper");
    const rows = Array.from(table.rows);
    const foundRow = rows.findIndex(row => row.className === `task-row-${index}`);
    table.deleteRow(foundRow);
  });
}

function addEventListenerToAddButton() {
  const addButton = document.getElementById("add-button");
  addButton.addEventListener("click", () => {
    hideAddButton(addButton);
    showTextInput();
  });
}

function hideAddButton(addButton) {
  addButton.classList.add("hide");
}

function showAddButton(addButton) {
  addButton.classList.remove("hide");
}

function showTextInput() {
  const textInput = document.getElementById("add-task-text");
  textInput.classList.remove("hide");
  textInput.focus();
}

function hideTextInput() {
  const textInput = document.getElementById("add-task-text");
  textInput.classList.add("hide");
}