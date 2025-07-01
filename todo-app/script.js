const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const category = document.getElementById("category");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const stats = document.getElementById("stats");
const toggleTheme = document.getElementById("toggleTheme");

const ding = document.getElementById("ding");
const completeAudio = document.getElementById("complete");
const deleteAudio = document.getElementById("delete");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all", search = "") {
  taskList.innerHTML = "";
  let filtered = tasks.filter(task =>
    (filter === "all" || task.status === filter) &&
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.status === "completed" ? "completed" : "";
    li.innerHTML = `
      <span onclick="toggleStatus(${index})">${task.text} 📅 ${task.date} 🗂️ ${task.category}</span>
      <button onclick="deleteTask(${index})">🗑️</button>
    `;
    taskList.appendChild(li);
  });

  stats.innerText = `📋 Total: ${tasks.length} ✅ Completed: ${tasks.filter(t => t.status === "completed").length}`;
}

function addTask() {
  const text = taskInput.value.trim();
  const date = dueDate.value;
  const cat = category.value;

  if (!text || !date) return alert("Please fill all fields!");

  tasks.push({ text, date, category: cat, status: "pending" });
  taskInput.value = "";
  dueDate.value = "";
  saveTasks();
  renderTasks();
  ding.play();
}

function toggleStatus(index) {
  tasks[index].status = tasks[index].status === "pending" ? "completed" : "pending";
  saveTasks();
  renderTasks();
  completeAudio.play();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  deleteAudio.play();
}

function clearAll() {
  if (confirm("Clear all tasks?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}

function exportTasks(type) {
  let data = type === "json" ? JSON.stringify(tasks, null, 2) :
    tasks.map(t => `${t.text} - ${t.date} - ${t.category} - ${t.status}`).join("\n");

  const blob = new Blob([data], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `tasks.${type}`;
  a.click();
}

function filterTasks(type) {
  renderTasks(type, searchInput.value);
}

searchInput.addEventListener("input", () => renderTasks("all", searchInput.value));

// Theme toggle
toggleTheme.onclick = () => {
  document.body.classList.toggle("dark");
  toggleTheme.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
};

// Install PWA
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "inline-block";
});

installBtn.addEventListener("click", () => {
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(choice => {
    if (choice.outcome === "accepted") {
      console.log("App Installed");
      installBtn.style.display = "none";
    }
  });
});

// Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker Registered"));
}

// Initial render
renderTasks();
