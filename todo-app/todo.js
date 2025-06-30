let tasks = [];

const taskInput = document.getElementById("task");
const categoryInput = document.getElementById("category");
const taskList = document.getElementById("task-list");
const filterSelect = document.getElementById("filter");
const searchInput = document.getElementById("search");

function renderTasks() {
  taskList.innerHTML = "";

  const filtered = tasks.filter(task => {
    const matchesFilter =
      filterSelect.value === "all" ||
      (filterSelect.value === "completed" && task.completed) ||
      (filterSelect.value === "pending" && !task.completed);

    const matchesSearch = task.text.toLowerCase().includes(searchInput.value.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>${task.text} (${task.category})</span>
      <div>
        <button onclick="toggleComplete(${index})">✅</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  const category = categoryInput.value;

  if (!text) return alert("Enter a task!");
  tasks.push({ text, category, completed: false });

  taskInput.value = "";
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

document.getElementById("add-btn").addEventListener("click", addTask);
filterSelect.addEventListener("change", renderTasks);
searchInput.addEventListener("input", renderTasks);
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
});
