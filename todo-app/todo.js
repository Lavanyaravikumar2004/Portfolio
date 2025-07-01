let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("taskList");

function addTask() {
  const task = document.getElementById("taskInput").value;
  const date = document.getElementById("dueDate").value;
  const cat = document.getElementById("category").value;
  if (!task) return alert("Enter a task");
  tasks.push({ text: task, category: cat, date, done: false });
  document.getElementById("taskInput").value = "";
  document.getElementById("ding").play();
  saveAndRender();
}

function toggle(i) {
  tasks[i].done = !tasks[i].done;
  document.getElementById("complete").play();
  saveAndRender();
}

function remove(i) {
  document.getElementById("delete").play();
  tasks.splice(i, 1);
  saveAndRender();
}

function exportTasks(format) {
  let content;
  if (format === 'txt') {
    content = tasks.map(t => `${t.text} [${t.category}] - ${t.date} ${t.done ? '(Done)' : ''}`).join('\n');
  } else {
    content = JSON.stringify(tasks, null, 2);
  }

  const blob = new Blob([content], { type: format === 'txt' ? 'text/plain' : 'application/json' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `tasks.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Other functions remain same (editTask, renderStats, filterTasks...)

document.getElementById("searchInput").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll("#taskList li").forEach(li => {
    li.style.display = li.innerText.toLowerCase().includes(term) ? "" : "none";
  });
});

document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const btn = document.getElementById("toggleTheme");
  btn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

saveAndRender();
