// script.js
let tasks = [];

function playSound(id) {
  document.getElementById(id).play();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const date = document.getElementById("dueDate").value;
  const cat = document.getElementById("category").value;
  if (!input.value.trim()) return;

  tasks.push({ text: input.value.trim(), date, cat, done: false });
  input.value = "";
  displayTasks();
  playSound("ding");
}

function displayTasks(filter = "all") {
  const list = document.getElementById("taskList");
  const search = document.getElementById("searchInput")?.value.toLowerCase() || "";
  list.innerHTML = "";

  tasks
    .filter(task => {
      if (filter === "completed") return task.done;
      if (filter === "pending") return !task.done;
      return true;
    })
    .filter(task => task.text.toLowerCase().includes(search))
    .forEach((task, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span onclick="toggleTask(${i})" style="cursor:pointer;">${task.done ? '✅' : '⬜'} ${task.text} (${task.date}) [${task.cat}]</span>
        <button onclick="deleteTask(${i})">❌</button>
      `;
      li.className = task.done ? "completed" : "";
      list.appendChild(li);
    });
}

function toggleTask(i) {
  tasks[i].done = !tasks[i].done;
  playSound("complete");
  displayTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  playSound("delete");
  displayTasks();
}

function filterTasks(type) {
  displayTasks(type);
}

function clearAll() {
  tasks = [];
  displayTasks();
}

function exportTasks(type) {
  const data = type === "json" ? JSON.stringify(tasks, null, 2) : tasks.map(t => `${t.text} - ${t.date} - ${t.cat}`).join("\n");
  const blob = new Blob([data], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `tasks.${type}`;
  a.click();
}

document.getElementById("searchInput")?.addEventListener("input", () => displayTasks());

document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
