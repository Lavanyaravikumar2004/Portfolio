let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("taskList");

function addTask() {
  const task = document.getElementById("taskInput").value;
  const date = document.getElementById("dueDate").value;
  const cat = document.getElementById("category").value;
  if (!task) return alert("Enter a task");
  tasks.push({ text: task, category: cat, date, done: false });
  document.getElementById("taskInput").value = "";
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  renderStats();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    li.className = t.done ? "completed" : "";
    li.innerHTML = `<span ondblclick="editTask(${i})">${t.text} (${t.category}) - ${t.date}</span>
                    <input type="checkbox" ${t.done ? "checked" : ""} onchange="toggle(${i})">
                    <button onclick="remove(${i})">❌</button>`;
    taskList.appendChild(li);
  });
}

function toggle(i) {
  tasks[i].done = !tasks[i].done;
  saveAndRender();
}

function remove(i) {
  tasks.splice(i, 1);
  saveAndRender();
}

function clearAll() {
  if (confirm("Delete all tasks?")) tasks = [], saveAndRender();
}

function editTask(i) {
  const newTask = prompt("Edit task:", tasks[i].text);
  if (newTask !== null) tasks[i].text = newTask, saveAndRender();
}

function filterTasks(type) {
  const filtered = type === 'all' ? tasks : tasks.filter(t => t.done === (type === 'completed'));
  taskList.innerHTML = "";
  filtered.forEach((t, i) => {
    const li = document.createElement("li");
    li.className = t.done ? "completed" : "";
    li.innerHTML = `<span>${t.text} (${t.category}) - ${t.date}</span>
                    <input type="checkbox" ${t.done ? "checked" : ""} onchange="toggle(${i})">
                    <button onclick="remove(${i})">❌</button>`;
    taskList.appendChild(li);
  });
}

function renderStats() {
  const done = tasks.filter(t => t.done).length;
  const stats = document.getElementById("stats");
  stats.innerText = `📊 Total: ${tasks.length}, ✅ Completed: ${done}, 🕓 Pending: ${tasks.length - done}`;
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll("#taskList li").forEach(li => {
    li.style.display = li.innerText.toLowerCase().includes(term) ? "" : "none";
  });
});

document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

saveAndRender();